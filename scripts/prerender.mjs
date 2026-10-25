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
html = html.replace(stylesheet[0], () => `<style>${css}</style>`);
fs.rmSync(cssFile);

fs.writeFileSync(indexFile, html);
fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`Prerendered dist/index.html, with ${Math.round(css.length / 1024)} KB of CSS inlined`);
