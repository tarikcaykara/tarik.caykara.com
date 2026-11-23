// @ts-check
import { readFileSync } from "node:fs";
import { satteri } from "@astrojs/markdown-satteri";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import { site } from "./src/config/site";

const outDir = "./dist";

// A page that asks for noindex (BaseLayout) stays out of the sitemap: Search Console
// reports a submitted URL marked noindex as an error. The sitemap is written after
// the pages, so this reads the built HTML: / is index.html, /notes is notes.html.
/** @param {string} page absolute page URL */
function indexable(page) {
  const file = new URL(page).pathname.slice(1) || "index";
  const html = readFileSync(
    new URL(`${outDir}/${file}.html`, import.meta.url),
    "utf8",
  );
  return !/<meta name="robots" content="[^"]*noindex/.test(html);
}

// Note markup for the design (src/styles/prose.css): every table is wrapped in
// <div class="q-table-wrap"> so a wide table scrolls inside its own box, and the
// "Footnotes" heading, visually hidden by default, is shown.
/** @type {import("@astrojs/markdown-satteri").SatteriProcessorOptions["hastPlugins"]} */
const notePlugins = [
  {
    name: "wrap-tables",
    element: {
      filter: ["table"],
      visit(node, ctx) {
        ctx.wrapNode(node, {
          type: "element",
          tagName: "div",
          properties: { className: ["q-table-wrap"] },
          children: [],
        });
      },
    },
  },
  {
    name: "show-footnote-label",
    element: {
      filter: ["h2"],
      visit(node, ctx) {
        if (node.properties.id === "footnote-label") {
          ctx.setProperty(node, "className", undefined);
        }
      },
    },
  },
];

// One URL form: no trailing slash; /notes is built as notes.html.
export default defineConfig({
  site: site.url,
  outDir,
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap({ filter: indexable })],
  // Downloaded at build time and served from /_astro/fonts/ (immutable cache).
  // Fallbacks follow the design's stacks; they also draw the arrows (→ ↗ ←),
  // which the latin subset leaves out. A metric-adjusted Arial fallback would
  // come first and draw them in Arial instead, so it is turned off.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Geist",
      cssVariable: "--font-sans",
      weights: [400, 500, 600],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: [
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "sans-serif",
      ],
      optimizedFallbacks: false,
    },
    {
      provider: fontProviders.fontsource(),
      name: "Geist Mono",
      cssVariable: "--font-mono",
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      optimizedFallbacks: false,
    },
  ],
  markdown: {
    // Code blocks are one colour in the design; Shiki would inject inline colours.
    syntaxHighlight: false,
    processor: satteri({ hastPlugins: notePlugins }),
  },
});
