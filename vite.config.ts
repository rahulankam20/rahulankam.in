import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { about, featured, seo, site } from "./client/src/content";

const here = path.dirname(fileURLToPath(import.meta.url));

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Writes the title, description, link-preview tags and search-engine data
// into index.html from content.ts, so they always match the page itself.
function seoFromContent(): Plugin {
  return {
    name: "seo-from-content",
    transformIndexHtml(html) {
      const title = site.showServices ? seo.title : seo.portfolioTitle;
      const description = site.showServices ? seo.description : seo.portfolioDescription;
      const url = `${site.url}/`;
      const image = `${site.url}${seo.image}`;
      const job = about.experience[0];
      const address = {
        "@type": "PostalAddress",
        addressLocality: site.locality,
        addressRegion: site.region,
        addressCountry: "IN",
      };
      const graph: object[] = [
        {
          "@type": "Person",
          "@id": `${url}#person`,
          name: site.name,
          url,
          jobTitle: job.role,
          worksFor: { "@type": "Organization", name: job.org },
          address,
          alumniOf: { "@type": "CollegeOrUniversity", name: "Terna Engineering College" },
          sameAs: [site.linkedin, site.github],
        },
      ];
      if (site.showServices) {
        graph.push({
          "@type": "ProfessionalService",
          "@id": `${url}#service`,
          name: `${site.name}: websites and online stores`,
          description,
          url,
          image,
          email: site.email,
          ...(site.phone ? { telephone: site.phone } : {}),
          address,
          areaServed: ["Mumbai", "Navi Mumbai", "India"],
          founder: { "@id": `${url}#person` },
        });
      }
      const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
        /</g,
        "\\u003c",
      );
      const tags = [
        `<title>${escapeHtml(title)}</title>`,
        `<meta name="description" content="${escapeHtml(description)}" />`,
        `<link rel="canonical" href="${url}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:site_name" content="${escapeHtml(site.name)}" />`,
        `<meta property="og:locale" content="en_IN" />`,
        `<meta property="og:url" content="${url}" />`,
        `<meta property="og:title" content="${escapeHtml(title)}" />`,
        `<meta property="og:description" content="${escapeHtml(description)}" />`,
        `<meta property="og:image" content="${image}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${escapeHtml(seo.imageAlt)}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
        `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
        `<meta name="twitter:image" content="${image}" />`,
        `<link rel="preload" as="image" href="${featured.images[0].src}" fetchpriority="high" />`,
        `<script type="application/ld+json">${jsonLd}</script>`,
      ];
      return html.replace("<!-- seo -->", tags.join("\n    "));
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  root: path.resolve(here, "client"),
  plugins: [react(), seoFromContent()],
  build: {
    outDir: path.resolve(here, isSsrBuild ? "dist-ssr" : "dist"),
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
  },
}));
