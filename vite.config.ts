import { defineConfig, type Plugin } from "vite";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { about, hero, seo, site } from "./client/src/content";
import { imageSizes, imageSrcSet, imageUrl, type ImageIndex } from "./client/src/lib/images";

const here = path.dirname(fileURLToPath(import.meta.url));

// Every file in client/public/images with a short hash of its contents, for
// versioned image addresses and srcsets (client/src/lib/images.ts).
const imageDir = path.resolve(here, "client/public/images");
const images: ImageIndex = Object.fromEntries(
  fs
    .readdirSync(imageDir)
    .sort()
    .map((name) => [name, createHash("sha256").update(fs.readFileSync(path.join(imageDir, name))).digest("hex").slice(0, 10)]),
);

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
      const sameAs = [site.linkedin, site.github].filter(Boolean);
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
          ...(sameAs.length ? { sameAs } : {}),
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
        if (hero.video.src) {
          graph.push({
            "@type": "VideoObject",
            "@id": `${url}#intro-video`,
            name: hero.video.title,
            description: hero.video.description,
            thumbnailUrl: `${site.url}${imageUrl(hero.video.poster, images)}`,
            contentUrl: `${site.url}${hero.video.src}`,
            uploadDate: hero.video.uploadDate,
            duration: hero.video.duration,
            inLanguage: "en-IN",
            publisher: { "@id": `${url}#person` },
          });
        }
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
        `<link rel="preload" as="image" href="${imageUrl(hero.image.src, images)}" imagesrcset="${imageSrcSet(hero.image.src, hero.image.width, images) ?? ""}" imagesizes="${imageSizes.heroScreen}" fetchpriority="high" />`,
        `<script type="application/ld+json">${jsonLd}</script>`,
      ];
      return html.replace("<!-- seo -->", tags.join("\n    "));
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  root: path.resolve(here, "client"),
  plugins: [seoFromContent()],
  define: { __IMAGES__: JSON.stringify(images) },
  resolve: {
    // The components are written for React but run on Preact, which does the
    // same job in 4 KB instead of React's 45 KB: much less for a phone to load.
    alias: [
      { find: /^react-dom\/server$/, replacement: "preact/compat/server" },
      { find: /^react-dom\/client$/, replacement: "preact/compat/client" },
      { find: /^react\/jsx-runtime$/, replacement: "preact/compat/jsx-runtime" },
      { find: /^react\/jsx-dev-runtime$/, replacement: "preact/compat/jsx-dev-runtime" },
      { find: /^react(-dom)?$/, replacement: "preact/compat" },
    ],
  },
  // Bundle the icon libraries into the build-time renderer as well, so their
  // own React imports become Preact too.
  ssr: { noExternal: ["lucide-react", "react-icons"] },
  build: {
    outDir: path.resolve(here, isSsrBuild ? "dist-ssr" : "dist"),
    emptyOutDir: true,
    copyPublicDir: !isSsrBuild,
  },
}));
