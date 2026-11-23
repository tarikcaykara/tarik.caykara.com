# Site içeriği

Bu dosya tarik.caykara.com'un tek içerik kaynağıdır. Site metni İngilizcedir; aşağıdaki İngilizce
metinler sitede aynen kullanılır. Bu dosyaya şirket adı, iç sistem adı ve müşteri bilgisi yazılmaz,
çünkü dosya Claude Design'a olduğu gibi yapıştırılır. Sayı ve sonuçlar yalnızca doğrulanmış
kaynaklardan gelir.

## Meta

- Title: Tarik Caykara · Crypto operations & internal tools
- Description: Tarik Caykara works in crypto operations and builds the internal tools around it:
  on-chain fund tracing, funding-rate data and exchange tooling.
- Alternate name (search only, not shown on the site): Tarık Çaykara

## Hero

- Name: Tarik Caykara (the header shows only the name, as a wordmark)
- Role line: Crypto operations · Internal tools (Profile panel and share card)
- Profile panel: Role, Last role (role · organization), Period (from Experience), Chains
  (ERC20 · BEP20 · TRC20), Contact (email)
- Headline: I work in crypto operations and build the tools that make it faster.
- Intro: For over a year at a centralized crypto exchange I traced fund flows for colleagues and built
  internal tools for several teams, including a fund origin tracer and a predicted funding
  aggregator. For my own use I'm building tradedeck, a multi-exchange trading terminal. I'm looking
  for my next operations role at a crypto company.
- Links: LinkedIn (https://www.linkedin.com/in/tarikcaykara/), GitHub
  (https://github.com/tarikcaykara), email (tarik@caykara.com)
- Portrait: none. The "TC" monogram appears only in the favicon.
- Location: not shown.

## Experience

### Operations & Internal Tools · Centralized crypto exchange

- Dates: May 2025 – Aug 2026
- Summary: Supported day-to-day operations and built internal tools for several teams, including a
  few months with the risk & treasury team.
- Highlights:
  - Handled fund-flow tracing requests from colleagues, by user ID or transaction hash, across
    ERC20, BEP20 and TRC20 with a tracing tool I took over and extended.
  - Built and shipped a refund-and-hedge calculator that shows the net outcome after fees, funding
    and withdrawal costs.
  - Built web tooling for the exchange: TR/EN email templates for marketing campaigns, a public
    leaderboard page and site scripts with multi-domain support.

Earlier (2020–2022): software development, video editing and HR.

## Selected work

### Fund origin tracer

- Kind: Open-source project
- Problem: Compliance, fraud and incident-response teams need to know where funds came from and
  where they went. Commercial know-your-transaction tools are expensive and return a risk score
  you cannot inspect.
- Built: A self-hosted tracer in Bun and TypeScript that follows funds backward to their source or
  forward to their destination, from up to 20 transaction hashes or addresses on Ethereum,
  Polygon, Arbitrum and TRON. It stops at labeled exchanges, bridges, mixers and OFAC-sanctioned
  addresses, finds linked wallets and exchange touchpoints, and sets the risk level from
  explainable flags in a policy file you can read and override. It comes with a web UI that
  streams the trace graph live, a CLI, a REST and SSE API, and a printable evidence report.
- Outcome: Released under the MIT license. Every followed transfer, dropped candidate and
  stop reason is visible in the result, each of the 244 bundled address labels cites a verified
  public source, and three recorded demos replay offline without API keys.
- Stack: TypeScript, Bun, React, Hono, SQLite, Docker
- Metrics: 16 flags (explainable, overridable in a policy file); 4 chains (Ethereum · Polygon ·
  Arbitrum · TRON)
- Link: https://github.com/tarikcaykara/fund-origin-tracer

### Predicted funding aggregator

- Kind: Open-source project
- Problem: The Coinalyze API returns predicted funding rates per venue, some per hour and some per 8
  hours, but no aggregate. Coinalyze shows the aggregate only as a chart on coinalyze.net, and that
  chart lags behind.
- Built: A Bun and TypeScript service that pulls predicted funding rates for BTC, ETH and SOL from
  the Coinalyze API for the ten venues coinalyze.net aggregates, normalizes each to % per 8 hours,
  drops stale values and streams simple and open-interest-weighted averages over an authenticated
  WebSocket. A live dashboard shows both averages next to the per-venue breakdown, and the chart
  history is kept in SQLite across restarts.
- Outcome: Checked against the reference chart over 40 samples: every venue with a rate landed within
  5% of its expected ratio, and the chart lagged the API by about 165 minutes for ETH and SOL.
  Container image cut from 1.32 GB to about 260 MB.
- Stack: TypeScript, Bun, WebSocket, SQLite, Docker, GitHub Actions
- Metrics: within 5% (every venue with an API rate, 40 samples); 1.32 GB → ~260 MB
  (container image)
- Link: https://github.com/tarikcaykara/predicted-funding-aggregator

## Kit

- Operations: On-chain fund tracing: ERC20, BEP20, TRC20; Block explorers: Etherscan, BscScan,
  Tronscan; Perpetual futures: funding rates, tick sizes; Exchange campaign tooling: emails,
  leaderboards
- Building tools: Python, TypeScript, Bun, Flask, React, Docker, SQLite, GitHub Actions

## Contact

- Line: Open to operations roles at crypto companies. Email is the fastest way to reach me.
- Links: LinkedIn, GitHub, X (https://x.com/tarikcaykara). The footer shows the same links plus
  email; the Hero keeps only LinkedIn, GitHub and email.

## Notes

Published notes, newest first (the text lives in `src/content/notes/`):

- 2026-11-09: Checking a number nobody publishes (`/notes/checking-a-number-nobody-publishes`)

- Index lead: Short notes on crypto operations and the tools I build.

## 404

- Heading: This page doesn't exist.
- Line: The link may be old or mistyped. Everything on the site starts from the home page.

## Analytics consent

Google Analytics yalnızca ziyaretçi kabul ederse yüklenir.

- Label: Analytics
- Line: This site can use Google Analytics to count visits. It sets cookies, so it only runs if you
  accept.
- Buttons: Accept, Decline
- Footer link that reopens the choice: Cookie settings
