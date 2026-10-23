// Last build step: renders the page with React on the build machine and puts
// the HTML into dist/index.html, so visitors see content before any
// JavaScript runs and every search engine can read it. main.tsx then attaches
// React to this HTML (hydration) instead of drawing the page again.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const serverDir = path.join(root, "dist-ssr");
const indexFile = path.join(root, "dist", "index.html");
const placeholder = "<!--app-html-->";

const { render } = await import(pathToFileURL(path.join(serverDir, "entry-server.js")).href);
const html = fs.readFileSync(indexFile, "utf8");
if (!html.includes(placeholder)) {
  throw new Error(`dist/index.html has no ${placeholder} placeholder to fill.`);
}
fs.writeFileSync(indexFile, html.replace(placeholder, render()));
fs.rmSync(serverDir, { recursive: true, force: true });
console.log("Prerendered dist/index.html");
