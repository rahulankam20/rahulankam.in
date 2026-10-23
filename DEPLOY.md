# Putting rahulankam.in live

About 30 minutes of clicking, plus up to a day waiting for the domain to switch over. Everything here is on free plans. Checked October 2026; dashboards move buttons around, so look for the same words if a label differs.

## 1. Create the Cloudflare Pages project

The site is on the `main` branch of `rahulankam20/rahulankam.in`, ready to build.

1. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free).
2. **Workers & Pages → Create application → Pages → Connect to Git.** Cloudflare now shows Workers first; Pages is still supported, so pick the Pages option.
3. Connect GitHub and choose `rahulankam20/rahulankam.in`. You can give Cloudflare access to just this one repository.
4. Settings:
   - Production branch: `main`
   - Framework preset: **React (Vite)**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: nothing to set; `.nvmrc` pins Node 22.
5. **Save and Deploy.** When it finishes, open the `….pages.dev` link and check the site.

## 2. Move the domain's DNS to Cloudflare

Your site lives on the bare domain (`rahulankam.in`), and Cloudflare Pages can only serve a bare domain whose DNS is on Cloudflare.

1. Cloudflare: **Add a domain** (or **Onboard a domain**) → `rahulankam.in` → **Free** plan.
2. It imports your current DNS records. Delete GoDaddy's parking records (an `A` record for `@` and a `CNAME` for `www` pointing at GoDaddy). Don't add a record for the site yourself: Pages does that in step 3, and a hand-made one causes a 522 error.
3. Cloudflare shows **two nameservers**. Copy them exactly.
4. GoDaddy: **Domain Portfolio → rahulankam.in → DNS**.
   - If **DNSSEC** is on, turn it off first. It's the most common reason a domain gets stuck.
   - **Nameservers → Change nameservers → I'll use my own nameservers.** Paste Cloudflare's two and save. Confirm with the code GoDaddy sends if it asks.
5. Wait for Cloudflare's "your domain is active" email. Usually under an hour; it can take up to 24 hours.

## 3. Point the domain at the site

1. **Workers & Pages → your project → Custom domains → Set up a domain → `rahulankam.in`.** Cloudflare creates the DNS record and the HTTPS certificate.
2. Send `www` to the bare domain:
   - DNS: add an `A` record, name `www`, value `192.0.2.1`, **Proxied** (orange cloud). It only exists so the redirect below can catch the request.
   - **Rules → Redirect Rules → Create from template → "Redirect from WWW to root"**, status 301. Save.
3. Open `https://rahulankam.in` and `https://www.rahulankam.in`; both should show the site.

## 4. After it's live

- **Visitor numbers:** project → **Metrics → Web Analytics → Enable**. Free, no cookies, so no cookie banner needed.
- **Google:** add `rahulankam.in` at [Google Search Console](https://search.google.com/search-console) as a *Domain* property (it gives you a TXT record to add in Cloudflare DNS), then submit `https://rahulankam.in/sitemap.xml`.
- **WhatsApp preview:** send `https://rahulankam.in` to yourself on WhatsApp. If an old preview sticks, send `https://rahulankam.in/?v=2`; WhatsApp caches previews per link.
- **Contact form:** send yourself a test message. The EmailJS template should use `{{from_name}}`, `{{from_email}}` and `{{message}}`. The free plan allows 200 messages a month. Its domain allowlist is paid-only, so the form uses EmailJS's free bot blocking and rate limit; add reCAPTCHA in EmailJS if spam starts.

## Email on your domain (Zoho Mail, later)

Zoho Mail's Forever Free plan is still offered in India (up to 5 users, 5 GB each, used in Zoho's web and phone apps; "available only in select data centers", so confirm at sign-up).

1. Sign up with `rahulankam.in`.
2. Zoho's admin console lists the records to add. Add exactly those in **Cloudflare DNS**: a verification TXT, three MX records (for the India data centre: `mx.zoho.in` 10, `mx2.zoho.in` 20, `mx3.zoho.in` 50), one SPF TXT and one DKIM TXT. Zoho has a one-click Cloudflare option too.
3. Keep Cloudflare **Email Routing** turned off; it would take over the MX records.
4. Once mail arrives, set `site.email` in `client/src/content.ts` to the new address and push.

## Updating the site later

Edit `client/src/content.ts` (or anything else), commit, and push to `main`. Cloudflare rebuilds and publishes in about a minute. Pull requests get their own preview link.
