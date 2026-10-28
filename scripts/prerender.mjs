// Last build step: renders the page on the build machine and puts the HTML
// into dist/index.html, so visitors see content before any JavaScript runs and
// every search engine can read it. main.tsx then attaches to this HTML
// (hydration) instead of drawing the page again.
//
// It also moves the stylesheet into the page itself, so a phone can paint as
// soon as the HTML arrives instead of waiting for a second request.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const serverDir = path.join(root, "dist-ssr");
const indexFile = path.join(distDir, "index.html");
const placeholder = "<!--app-html-->";

const { render } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);
let html = fs.readFileSync(indexFile, "utf8");
if (!html.includes(placeholder)) {
  throw new Error(`dist/index.html has no ${placeholder} placeholder to fill.`);
}
html = html.replace(placeholder, render());

const stylesheet = html.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (!stylesheet) throw new Error("dist/index.html has no stylesheet link to inline.");
const cssFile = path.join(distDir, stylesheet[1]);
const css = fs.readFileSync(cssFile, "utf8");
// Font addresses in the CSS are absolute (/assets/...), so they still work inline.
// The heading font is preloaded on wide screens only. There, the big headline's
// words would move a fraction of a pixel when the font swaps in. On a phone the
// preloaded font lands during hydration and makes one long task (about 90 ms of
// blocking time in Lighthouse), and "Bricolage Fallback" (index.css) already
// keeps the shift at 0, so phones skip it.
const headingFont = css.match(/\/assets\/bricolage-grotesque-latin-wght-normal-[\w-]+\.woff2/);
if (!headingFont) throw new Error("The CSS has no Latin Bricolage Grotesque file to preload.");
html = html.replace(
  stylesheet[0],
  () =>
    `<link rel="preload" href="${headingFont[0]}" as="font" type="font/woff2" crossorigin media="(min-width: 1024px)" />\n    <style>${css}</style>`,
);
fs.rmSync(cssFile);

fs.writeFileSync(indexFile, html);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`Prerendered dist/index.html, with ${Math.round(css.length / 1024)} KB of CSS inlined`);
