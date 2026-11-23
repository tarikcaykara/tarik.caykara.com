# tarik.caykara.com

[![CI](https://github.com/tarikcaykara/tarik.caykara.com/actions/workflows/ci.yml/badge.svg)](https://github.com/tarikcaykara/tarik.caykara.com/actions/workflows/ci.yml)

Source of [tarik.caykara.com](https://tarik.caykara.com), the personal site of Tarik Caykara, who
works in crypto operations and builds the internal tools around it. One long home page, plus
short Notes with an RSS feed.

## Stack

- [Astro](https://astro.build) 7, static output, TypeScript strict
- npm and Node 24
- RSS and sitemap from `@astrojs/rss` and `@astrojs/sitemap`
- Prettier with `prettier-plugin-astro`
- Docker: Node builds the site, `nginxinc/nginx-unprivileged` serves `dist/`

## Run it

```sh
npm ci
npm run dev            # http://localhost:4321
npm run check          # astro check
npm run format:check   # Prettier
npm run build          # static site in dist/
```

## Docker

The same image runs the live site. To build and check it locally:

```sh
docker compose up --build --wait
bash scripts/check-site.sh http://127.0.0.1:8080
```

`check-site.sh` checks the redirects, status codes, security headers and the
`<meta name="version">` tag. CI runs the same check on every pull request.

## Content

The site copy lives in `src/config/` and `src/content/`; Notes are Markdown files in
`src/content/notes/`. `docs/CONTENT.md` (in Turkish, with the English copy as it appears on the
site) is the single source for that copy.

## Versions

`version` in `package.json` is the site version. Every page publishes it as
`<meta name="version">`, and each release is tagged `v<version>`.

## License

The code is under the [MIT license](LICENSE). The writing (the site copy and the Notes), the
design export in `design/`, the images and the favicon are not covered: © Tarik Caykara, all
rights reserved.
