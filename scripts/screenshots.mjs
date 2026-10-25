// Takes the screenshots of a demo website for the Work section, at the sizes
// the page shows them (1366×854 for a computer, 390×844 for a phone), and
// saves them as WebP in client/public/images/, replacing the old ones.
//
// Playwright isn't a dependency of this site, so install it just for the run:
//
//   npm install --no-save playwright@1.63.0
//   npx playwright install chromium          (once per computer)
//   node scripts/screenshots.mjs <project> <site>
//
// <project> is a key of `projects` below. <site> is the demo's address, or the
// folder its build wrote (dist/<site id> in the site-starter repo), which this
// script then serves itself.
//
// The clock is fixed, so "Open now" badges and booking dates come out the same
// every time, and animations are off, so nothing is caught halfway in.

import { createServer } from "node:http";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../client/public/images/", import.meta.url));

const views = {
  desktop: { viewport: { width: 1366, height: 854 } },
  phone: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
};

// file: the name in client/public/images/ (content.ts lists the same names).
// section: the id of the section to scroll to. click: elements to click first.
const projects = {
  dental: {
    timeZone: "Asia/Kolkata",
    locale: "en-IN",
    // A Tuesday morning: the clinic shows as open, with two weeks of days to book.
    time: "2026-10-27T11:00:00+05:30",
    shots: [
      { file: "dental-home-desktop", view: "desktop", path: "/" },
      { file: "dental-treatments-desktop", view: "desktop", path: "/", section: "treatments" },
      {
        file: "dental-booking-desktop",
        view: "desktop",
        path: "/",
        section: "book",
        // Tomorrow, in the evening, so the form shows its choices in use.
        click: ['label:has(input[name="booking-day"][value="2026-10-28"])', 'label:has(input[name="booking-time"]) >> nth=-1'],
      },
      { file: "dental-home-mobile", view: "phone", path: "/" },
      { file: "dental-marathi-mobile", view: "phone", path: "/mr/" },
    ],
  },
  restaurant: {
    timeZone: "Asia/Kolkata",
    locale: "en-IN",
    // A Tuesday lunchtime in Vashi.
    time: "2026-10-27T13:00:00+05:30",
    shots: [
      { file: "restaurant-home-desktop", view: "desktop", path: "/" },
      { file: "restaurant-menu-desktop", view: "desktop", path: "/menu/?diet=jain", section: "catalogue" },
      { file: "restaurant-catering-desktop", view: "desktop", path: "/catering/", section: "packages" },
      { file: "restaurant-home-mobile", view: "phone", path: "/" },
      { file: "restaurant-menu-mobile", view: "phone", path: "/menu/?diet=jain", section: "catalogue" },
    ],
  },
};

const [name, site] = process.argv.slice(2);
const project = projects[name];
if (!project || !site) {
  console.error(`Usage: node scripts/screenshots.mjs <${Object.keys(projects).join("|")}> <address or built folder>`);
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error("Playwright isn't installed. Run: npm install --no-save playwright@1.63.0");
  process.exit(1);
}

const server = /^https?:/.test(site) ? null : await serve(site);
const base = server ? server.base : site.replace(/\/$/, "");
const browser = await chromium.launch();
// A blank page for the WebP encoding, away from the demo's security headers.
const encoder = await browser.newPage();

try {
  for (const shot of project.shots) {
    const context = await browser.newContext({
      ...views[shot.view],
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      timezoneId: project.timeZone,
      locale: project.locale,
    });
    const page = await context.newPage();
    await page.clock.setFixedTime(new Date(project.time));
    await page.goto(base + shot.path, { waitUntil: "networkidle" });
    for (const selector of shot.click ?? []) await page.locator(selector).click();
    if (shot.section) await scrollTo(page, shot.section);
    await settle(page);
    const webp = await toWebp(encoder, await page.screenshot());
    await writeFile(path.join(outDir, `${shot.file}.webp`), webp);
    console.log(`${shot.file}.webp  ${Math.round(webp.length / 1024)} KB`);
    await context.close();
  }
} finally {
  await browser.close();
  server?.close();
}

// Brings a section to the top of the screen, or just below the header if the
// header stays on screen. Some sites draw a section only once it is near the
// screen, which moves everything below it, so this measures again until the
// section stays put.
async function scrollTo(page, id) {
  await page.evaluate(async (id) => {
    const section = document.getElementById(id);
    if (!section) throw new Error(`There is no #${id} on ${location.pathname}`);
    const header = document.querySelector("header");
    const pinned = header && /sticky|fixed/.test(getComputedStyle(header).position);
    for (let tries = 0; tries < 10; tries++) {
      const gap = section.getBoundingClientRect().top - (pinned ? header.getBoundingClientRect().bottom : 0);
      if (Math.abs(gap) < 1) return;
      window.scrollBy({ top: gap, behavior: "instant" });
      await new Promise((resolve) => setTimeout(resolve, 150));
    }
  }, id);
}

// Waits for the fonts and for the images on screen. Lazy images further down
// never load, so they aren't waited for.
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const onScreen = [...document.images].filter((image) => {
      const box = image.getBoundingClientRect();
      return box.bottom > 0 && box.top < innerHeight;
    });
    const loaded = Promise.all(onScreen.map((image) => image.decode().catch(() => {})));
    await Promise.race([loaded, new Promise((resolve) => setTimeout(resolve, 10000))]);
  });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(300);
}

// Chromium encodes WebP itself, so no image library is needed.
async function toWebp(page, png) {
  const dataUrl = await page.evaluate(async (base64) => {
    const image = new Image();
    image.src = `data:image/png;base64,${base64}`;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas.getContext("2d").drawImage(image, 0, 0);
    return canvas.toDataURL("image/webp", 0.8);
  }, png.toString("base64"));
  if (!dataUrl.startsWith("data:image/webp")) throw new Error("This browser can't encode WebP");
  return Buffer.from(dataUrl.slice(dataUrl.indexOf(",") + 1), "base64");
}

// Serves a built site's folder on a free port, for the run.
async function serve(root) {
  const types = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".woff2": "font/woff2",
  };
  const httpServer = createServer(async (request, response) => {
    let file = path.join(root, decodeURIComponent(new URL(request.url, "http://localhost").pathname));
    try {
      if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
      response.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
      response.end(await readFile(file));
    } catch {
      response.writeHead(404).end();
    }
  });
  await new Promise((resolve) => httpServer.listen(0, "127.0.0.1", resolve));
  return { base: `http://127.0.0.1:${httpServer.address().port}`, close: () => httpServer.close() };
}
