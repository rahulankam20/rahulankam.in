import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

// Used only at build time by scripts/prerender.mjs, to put the finished page
// into dist/index.html for fast first paint and for search engines.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
