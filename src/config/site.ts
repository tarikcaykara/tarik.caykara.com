// Site-wide values; text comes from docs/CONTENT.md (Meta).
export const site = {
  // Origin only: no path, no trailing slash.
  url: "https://tarik.caykara.com",
  name: "Tarik Caykara",
  // Turkish spelling, for search only (Person JSON-LD); the site shows `name`.
  alternateName: "Tarık Çaykara",
  title: "Tarik Caykara · Crypto operations & internal tools",
  description:
    "Tarik Caykara works in crypto operations and builds the internal tools around it: on-chain fund tracing, funding-rate data and exchange tooling.",
  locale: "en_US",
  // Google Analytics 4 web stream; loads only after consent (ConsentBanner).
  googleAnalyticsId: "G-HP6J5VS2W9",
  links: {
    linkedin: "https://www.linkedin.com/in/tarikcaykara/",
    github: "https://github.com/tarikcaykara",
    x: "https://x.com/tarikcaykara",
    email: "tarik@caykara.com",
  },
} as const;
