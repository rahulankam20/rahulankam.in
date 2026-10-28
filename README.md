# rahulankam.in

The website of Rahul Ankam, a full-stack developer in Mumbai. It sells websites and online stores to businesses, and shows Rahul's work and experience.

Built with Vite and Tailwind CSS. The components are written for React but run on [Preact](https://preactjs.com), which does the same job in 4 KB instead of React's 45 KB (aliases in `vite.config.ts`). The page is pre-rendered to plain HTML at build time, with its CSS inside, so it paints on a phone as soon as the HTML arrives and every search engine can read it. Hosted free on Cloudflare, as a Worker that only serves the built files: see [DEPLOY.md](DEPLOY.md).

## Changing what the site says

Every word, price and link is in **[client/src/content.ts](client/src/content.ts)**. Edit that file, push to `main`, and Cloudflare rebuilds the site in about a minute. The page title, the WhatsApp/LinkedIn link preview and Google's structured data are generated from the same file, so they stay in sync.

Common edits:

| To change | Edit in `content.ts` |
| --- | --- |
| Phone, WhatsApp, email | `site.phone`, `site.whatsapp` (digits with country code; empty hides WhatsApp), `site.email` |
| LinkedIn and GitHub links | `site.linkedin`, `site.github` (empty hides the link; both are hidden for now, with the old addresses in a comment) |
| Show the resume button | `site.resumeUrl` → `"/RAHUL_ANKAM_RESUME.pdf"` once that PDF is up to date |
| Prices and packages | `services.packages` and `services.care` |
| Turn off everything freelance | `site.showServices` → `false` (hides prices, services, process, FAQ and the floating WhatsApp button) |
| Experience, education, skills | `about` |
| A project in Work | `projects`: one card each, in page order. Each card has its own link to send to a client, such as `rahulankam.in/#work-dental` |
| A demo's "View the live demo" button | that project's `liveUrl` (empty hides the button) |

Images live in `client/public/images/` (WebP, 15 to 90 KB each). The link-preview image is `client/public/og-image.jpg` (1200×630; keep it under 300 KB for WhatsApp).

- **Smaller copies for phones:** each screenshot has a smaller copy beside it, `name-<width>.webp`: 683 px wide for computer screenshots, 260 px for phone screenshots, 72 px for the logo. The page offers them in a `srcset`, so a phone downloads a size close to what it shows. After adding an image, run `node scripts/screenshots.mjs --variants` (with Playwright installed, below) to make its copies.
- **Versioned addresses:** the build adds `?v=<hash of the file>` to every image address (`client/src/lib/images.ts`), so `_headers` can let browsers keep images for a year and a changed image still shows at once.

### Screenshots of the demo websites

The dental, restaurant and Tableside screenshots are taken by `scripts/screenshots.mjs`, at the sizes the page shows them. It fixes the clock (so "Open now" badges and booking dates look right) and turns animations off. Playwright isn't a dependency here, so install it just for the run:

```bash
npm install --no-save playwright@1.63.0
npx playwright install chromium     # once per computer
node scripts/screenshots.mjs restaurant path/to/site-starter/dist/demo-restaurant
```

The second argument is the demo's built folder (`npm run build -- <site id>` in the site-starter repo) or its address once it's online. The script overwrites the project's five images and their smaller copies; the file names and alt texts are in `content.ts`.

Tableside needs its Worker, so point the script at a fresh local copy, never the live demo: it first fills the floor with an evening's orders through the API, then signs in as staff for the floor and kitchen shots.

```bash
# in the tableside repo
node scripts/preview.mjs --port 8799 --fresh --var UPI_VPA:cafesohrab@upi
# here
node scripts/screenshots.mjs tableside http://127.0.0.1:8799
```

## Motion

All of it is CSS, in the "Motion" block at the end of `client/src/index.css`: no animation library, and no JavaScript except the hero card's lean towards the pointer. Every animation sits behind `prefers-reduced-motion: no-preference`, and the scroll-driven ones also behind `@supports (animation-timeline: view())`; without either, everything is simply in place. Only `transform`, `opacity` and `clip-path` animate, so nothing shifts the layout.

- **On load:** one entrance. The headline's words rise out of their masks and the video card settles from a tilt; both move, neither fades, because they are the largest things on the first screen.
- **On scroll, one scene per screen:** the hero card leans back while its backdrop drifts at three depths; each project's screenshots are uncovered and its phones rise and straighten; the project numbers rise out of their masks; the process steps are sticky stacking cards on a phone and a self-drawing line on a laptop; the "why me" icons spin into place; the experience timeline draws itself; the call-to-action panel opens while its glows drift apart.
- **Reveals:** add `data-reveal` (or `="fade"`, `"zoom"`, `"left"`, `"right"`, `"wipe"`) to an element, and `revealDelay(index)` from `lib/motion.tsx` to stagger a row.
- **Fonts:** headings fall back to "Bricolage Fallback", Arial resized to Bricolage Grotesque's measure, so they keep their line breaks when the web font arrives. Wide screens also preload the font (`scripts/prerender.mjs`); phones don't, because there it lands during hydration and costs about 90 ms of blocking time.

Budget, measured on the built page with Lighthouse's mobile emulation: performance 95 or better, LCP under 2.5 s, blocking time under 100 ms, CLS under 0.05. On 28 October 2026 it scored 99 on a phone (LCP 2.04–2.09 s, blocking 0–6 ms, CLS 0) and 100 on a computer.

## Running it locally

Needs Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev       # http://localhost:5173, live reload
npm run check     # TypeScript
npm run build     # production build into dist/, pre-rendered
npm run preview   # serve dist/ at http://localhost:4173
```

## How it fits together

- `client/index.html`: the page shell. `<!-- seo -->` is filled in by the plugin in `vite.config.ts`; `<!--app-html-->` by `scripts/prerender.mjs`, which also moves the stylesheet into the page.
- `client/src/sections/`: one file per page section, in page order in `App.tsx`.
- `client/src/lib/motion.tsx`: `revealDelay`, `loadDelay`, `motionVars` (the custom properties an animation reads) and `Tilt`.
- `client/src/components/`: navbar, footer, buttons, theme switch, floating WhatsApp button.
- `client/public/`: copied as-is, including `_headers` (Cloudflare security and caching headers), `404.html`, `robots.txt` and `sitemap.xml`.
- `wrangler.jsonc`: tells Cloudflare to publish `dist/` as static files. Its `name` must match the Worker's name in the dashboard.
- `.github/workflows/ci.yml`: checks every pull request type-checks and builds. It doesn't deploy; Cloudflare does.

The contact form sends through EmailJS (free plan: 200 messages a month), loaded only when someone submits.
