# rahulankam.in

The website of Rahul Ankam, a full-stack developer in Mumbai. It sells websites and online stores to businesses, and shows Rahul's work and experience.

Built with React, Vite and Tailwind CSS. The page is pre-rendered to plain HTML at build time, so it loads fast on phones and every search engine can read it. Hosted free on Cloudflare, as a Worker that only serves the built files: see [DEPLOY.md](DEPLOY.md).

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

### Screenshots of the demo websites

The dental and restaurant screenshots are taken by `scripts/screenshots.mjs`, at the sizes the page shows them. It fixes the clock (so "Open now" badges and booking dates look right) and turns animations off. Playwright isn't a dependency here, so install it just for the run:

```bash
npm install --no-save playwright@1.63.0
npx playwright install chromium     # once per computer
node scripts/screenshots.mjs restaurant path/to/site-starter/dist/demo-restaurant
```

The second argument is the demo's built folder (`npm run build -- <site id>` in the site-starter repo) or its address once it's online. The script overwrites the project's five images; the file names and alt texts are in `content.ts`.

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

- `client/index.html`: the page shell. `<!-- seo -->` is filled in by the plugin in `vite.config.ts`; `<!--app-html-->` by `scripts/prerender.mjs`.
- `client/src/sections/`: one file per page section, in page order in `App.tsx`.
- `client/src/components/`: navbar, footer, buttons, theme switch, floating WhatsApp button.
- `client/public/`: copied as-is, including `_headers` (Cloudflare security and caching headers), `404.html`, `robots.txt` and `sitemap.xml`.
- `wrangler.jsonc`: tells Cloudflare to publish `dist/` as static files. Its `name` must match the Worker's name in the dashboard.
- `.github/workflows/ci.yml`: checks every pull request type-checks and builds. It doesn't deploy; Cloudflare does.

The contact form sends through EmailJS (free plan: 200 messages a month), loaded only when someone submits.
