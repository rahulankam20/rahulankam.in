import type { Config } from "tailwindcss";

// Colours come from CSS variables in client/src/index.css, one set for light
// and one for dark, so every utility below works in both themes.
const color = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const systemSans = [
  "ui-sans-serif",
  "system-ui",
  "-apple-system",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
];

export default {
  darkMode: "class",
  content: ["./client/index.html", "./client/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: color("background"),
        foreground: color("foreground"),
        card: color("card"),
        muted: { DEFAULT: color("muted"), foreground: color("muted-foreground") },
        border: color("border"),
        primary: { DEFAULT: color("primary"), foreground: color("primary-foreground") },
        accent: color("accent"),
        whatsapp: { DEFAULT: color("whatsapp"), foreground: color("whatsapp-foreground") },
      },
      fontFamily: {
        sans: systemSans,
        // Headings: self-hosted from @fontsource-variable/bricolage-grotesque (imported in main.tsx).
        // "Bricolage Fallback" (index.css) is Arial resized to Bricolage's measure, so the
        // headings don't reflow when the web font swaps in.
        display: ['"Bricolage Grotesque Variable"', '"Bricolage Fallback"', ...systemSans],
      },
    },
  },
  plugins: [],
} satisfies Config;
