import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships the page already rendered (scripts/prerender.mjs),
// so React only attaches to it. The dev server doesn't, so render from scratch.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
