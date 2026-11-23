// Site copy outside the collections; text comes from docs/CONTENT.md
// (Hero, Experience's "Earlier" line, Kit, Contact, Notes).
export const profile = {
  role: "Crypto operations · Internal tools",
  // One sentence in two tones: the second part is muted.
  headline: [
    "I work in crypto operations",
    "and build the tools that make it faster.",
  ],
  intro:
    "For over a year at a centralized crypto exchange I traced fund flows for colleagues and built internal tools for several teams, including a fund origin tracer and a predicted funding aggregator. For my own use I'm building tradedeck, a multi-exchange trading terminal. I'm looking for my next operations role at a crypto company.",
  chains: ["ERC20", "BEP20", "TRC20"],
  kit: {
    operations: {
      title: "Operations",
      rows: [
        { label: "On-chain fund tracing", value: "ERC20, BEP20, TRC20" },
        { label: "Block explorers", value: "Etherscan, BscScan, Tronscan" },
        { label: "Perpetual futures", value: "funding rates, tick sizes" },
        { label: "Exchange campaign tooling", value: "emails, leaderboards" },
      ],
    },
    tools: {
      title: "Building tools",
      items: [
        "Python",
        "TypeScript",
        "Bun",
        "Flask",
        "React",
        "Docker",
        "SQLite",
        "GitHub Actions",
      ],
    },
  },
  contactLine:
    "Open to operations roles at crypto companies. Email is the fastest way to reach me.",
  earlier: "Earlier (2020–2022): software development, video editing and HR.",
  // Notes index lead, also the intro of Latest notes on the home page.
  notesLead: "Short notes on crypto operations and the tools I build.",
} as const satisfies {
  role: string;
  headline: readonly [string, string];
  intro: string;
  chains: readonly string[];
  kit: {
    operations: {
      title: string;
      rows: readonly { label: string; value: string }[];
    };
    tools: { title: string; items: readonly string[] };
  };
  contactLine: string;
  earlier: string;
  notesLead: string;
};
