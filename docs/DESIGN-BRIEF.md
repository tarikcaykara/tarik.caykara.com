# Claude Design promptları

Promptlar Claude Design'a sırayla (1 → 4) yapıştırılır. `<…>` ile işaretli yerleri kullanıcı
doldurur. Prompt 1'de içerik yerine `docs/CONTENT.md`'nin tamamı yapıştırılır; referans siteler
Claude Design'ın web capture aracıyla ya da ekran görüntüsüyle eklenir.

Tasarım onayı için şu ekranlar onaylanmış olmalı: seçilen yönde Home (1440 px ve 390 px), Notes
index, Note article, 404, favicon, 1200×630 paylaşım kartı ve token/bileşen listesi (Prompt 3'ün
çıktısı).

## Prompt 1: brief ve 3 yön

```text
I need a personal portfolio / CV website that I will link from my LinkedIn profile. I work in crypto operations: for over a year at a centralized exchange I traced fund flows for colleagues and built internal tools for several teams. Audience: hiring managers and recruiters for operations and compliance roles at crypto exchanges and other crypto companies. Within 30 seconds they should understand what I do, what I have built, and how to reach me.

Use exactly the content below. Do not invent jobs, employers, numbers or results. If something you need is missing, leave a clearly marked gap instead of making it up.

<<< paste the whole of docs/CONTENT.md here >>>

Site map
1. Home: one long page. Header with my name and nav (Experience, Work, Notes, Contact). Sections in this order: Hero (headline, short intro, LinkedIn / GitHub / email links), Experience (roles with dates and 2–4 concrete highlights each, followed by a one-line "Earlier" summary), Selected work (projects as cards: problem → what I built → outcome, stack tags), Kit (skills in groups), Latest notes (3 most recent), Contact (email + LinkedIn), footer.
2. Notes index (/notes): short notes on crypto operations and the tools I build. Title, date, one-line description.
3. Note article (/notes/<slug>): long-form reading layout.
4. 404 page.

References for personality only, do not copy them: okanerturan.com (playful, sticker-like cards, strong type, warm paper colour) and koative.com (dark, calm, studio feel, generous space).

Show me 3 clearly different visual directions for the Home page, each at desktop 1440px and mobile 390px:
A. "Risk desk": dark and precise, like an internal risk console. Tabular/monospaced numerals, hairline grids, small status chips (OK / WATCH / BREACH) used as section labels. One accent colour; semantic green/amber/red used sparingly.
B. "Ledger": warm light paper, editorial headings with a clean grotesk body, balance-sheet rules, stamped labels, slightly rotated sticker cards in the work section. Playful but credible.
C. "On-chain flow": deep dark background, a lightweight animated hero that draws funds moving between wallet nodes (a nod to transaction tracing), calm typography, lots of space.

Constraints. This will be built as a static Astro site with almost no JavaScript:
- Fonts: only families available on Google Fonts/Fontsource or Fontshare. At most 2 families plus 1 monospace.
- Motion: CSS or a small vanilla JS/canvas only. No WebGL or three.js. Every animation needs a static fallback for prefers-reduced-motion.
- Accessibility: WCAG AA contrast, visible keyboard focus, real text (no text baked into images).
- No stock photos, 3D coins or crypto clichés (rockets, moons, laser eyes, neon "Web3" gradients).
- If my content says I have a portrait, place it in the header or hero; otherwise use a monogram.
- All copy in English.
```

## Prompt 2: yönü seç ve tüm sayfaları çiz

```text
Let's go with direction <A / B / C>. Changes I want: <your notes, or "none">.

Now design the complete set in this direction, each at desktop 1440px and mobile 390px:
- Home with every section from the site map, using my real content.
- Notes index.
- Note article, with a realistic ~1,200-word sample that includes h2 and h3 headings, a table, a code block, a blockquote, a footnote and an inline link.
- 404 page.
- States: link hover and focus, card hover, mobile navigation (keep all four links visible if they fit; otherwise use a simple disclosure menu).
- A favicon as an SVG monogram of my initials.
- A LinkedIn share card (Open Graph image, 1200×630) with my name, a one-line role and the address tarik.caykara.com.
```

## Prompt 3: tasarım sistemini toparla (handoff öncesi)

```text
Before handoff, consolidate the design system:
- Tokens: give every colour a semantic name (bg, surface, text, muted, border, accent, ok, warn, breach, …). Type scale: family, size, line-height, weight and letter-spacing for each step, with mobile and desktop values. Plus spacing scale, radii, shadows and borders, motion durations and easings.
- Component inventory: every component used across all pages, with its variants and states.
- Make every page use only these tokens and components; remove one-off values.
- Layout must be fluid from 360px to 1440px, with no horizontal scrolling at 360px.
- List the exact font families and weights used and where each one is available (Google Fonts / Fontsource / Fontshare).
```

## Prompt 4: dışa aktarma (prompt değil, adım listesi)

Claude Design Claude'a taşındıktan sonra Export menüsünde .zip yok; dosya listesinde ("All files")
toplu indirme de yok. Onun yerine bütün sayfaları içine çağıran genel bakış sayfası dışa aktarılır:

1. Tuvalin sol üstündeki sayfa seçiciden genel bakış sayfasını aç (Phase 6'da `Quiet Site`).
2. Sağ üstte Share → Export → **HTML**. Dosya `~/Downloads`'a `<proje> – <sayfa>.html` adıyla
   iner; içine çağırdığı her sayfa (`<dc-import>`), stiller ve Claude Design'ın çalışma zamanı
   (runtime) gömülüdür.
3. Ajana "indirdim" yaz. Ajan dosyayı açar: her sayfayı `design/handoff/<Ad>.dc.html`, çalışma
   zamanını `design/handoff/support.js` olarak yazar. Home, Notes index, Note article ve 404
   sayfalarının 1440 ve 390 genişlikteki ekran görüntülerini
   `design/handoff/screens/<page>-<width>.png` adıyla kaydeder (örnek: `home-1440.png`).

Export'taki PDF ve PNG yalnızca açık sayfanın görüntüsünü verir. "Hand off to Claude Code" da
kullanılmaz; omp onu doğrudan çekemez.
