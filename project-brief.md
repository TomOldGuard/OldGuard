# Project Brief — Old Guard / PLaiGROUND

Paste this into a new Claude design chat to continue work on the site.

---

## What it is
**Old Guard** is a digital sandbox — a public archive of experiments at the
intersection of AI and design. Not a portfolio: no bio, no CV, no contact form.
The site exists purely to display the work. Tagline: **PLaiGROUND**.

Made by Tom Johnson, collaboratively with Claude. Hosted on GitHub Pages.

## Structure
- **`index.html`** — the index. A large `PLaiGROUND` lockup, a count of
  experiments, and a single list of experiment cards (newest first).
- **`experiments/NNN-slug.html`** — one page per experiment, each a real
  working mini-demo. Crumbs at top → interactive stage → notes (with a small
  `NNN · Title` header) → prev/next nav.
- **`colophon.html`** — about the site + authorship + construction.
- **`assets/`** — shared `styles.css`, `components.css` (the `.og-*`
  primitive layer), `chrome.js` (header/footer/nav), `experiments.js`
  (the registry), `logo.png` (hexagon mark).

## Adding an experiment (the system)
1. Append an entry to `assets/experiments.js` (num, slug, title, href).
2. Create `experiments/NNN-slug.html` — copy any existing one as a template.
   **Compose the UI from the `.og-*` primitives** (see Components) and write
   bespoke CSS only for the part that makes the experiment unique.
The index, counts, and prev/next nav all pick it up automatically. List is
sorted newest-first; `renderExpNav` maps "Next" → newer, "Previous" → older.

## Current experiments
- 007 · Magic Eye² — autostereogram of eye forms (single/pair/triple/cyclops/wink)
- 006 · Monster Madness — split-page book; flip head/body/legs to compose hybrids
- 005 · Superprecise — 5-round precision-stop game, increasing sweep speed
- 004 · No pineapple — procedural pizza generator with serial-seeded recall
- 003 · Notice period — real-time countdown (5m/1h/1d/1w/30d presets)
- 002 · Legion of Doom — procedural villain roster, 12 per draft
- 001 · Button button — a button that nests a button on each click

## Design system
- **Type:** JetBrains Mono only — weight + size do the work. Min 24px on big
  surfaces; UPPERCASE + wide letter-spacing for labels/meta. Body copy is
  15px / 1.6 in `--fg`, capped ~60ch — one measure shared across pages.
- **Color:** light by default — `--bg #fafafa` / `--fg #0a0a0a`, hairline
  `--line #d8d8d8`, with a single accent `--accent #ED6E5D` (coral, constant in
  both themes). A half-circle toggle (top-right) flips to dark
  (`--bg #0a0a0a` / `--fg #fafafa` / `--line #2a2a2a`), persisted in localStorage.
- **Layout:** structured grid, 1px hairline rules (`--line`, #d8d8d8 light /
  #2a2a2a dark), generous whitespace, big numbered index. Fully responsive.
- **Motion:** subtle hover states only (offset shift, accent reveal) plus the
  live experiment demos.
- **Voice:** minimal, experimental, design-forward, playful, precise. Belongs on
  the internet of ideas, not a template. Avoid AI-slop tropes (gradients,
  rounded-corner+left-accent cards, emoji). Procedural illustration is drawn in
  the coral accent, single-line style.

## Components — the `.og-*` layer
`styles.css` owns the page chrome; `assets/components.css` owns the primitives
that recur **inside** experiment stages. Compose from these; only hand-write CSS
for the bit that makes a demo unique. Rendered live at `design-system.html`
(linked from the colophon) — eyeball it after any change, it's the drift check.
That page now documents the page chrome too — breadcrumb + prev/next chips,
`.icon-btn`, `.exp-nav`, the index card, and the page-title hero — not just the
`.og-*` primitives.

- **`.og-label`** — the one uppercase micro-caption (10px / 0.12em / muted).
  Every field label, stat caption, meta key. Never re-type these properties.
- **`.og-display`** — big tabular readout number; `.acc` turns it coral.
- **`.og-stat`** — a label-over-value cell (`.og-label` + `.og-stat-val`,
  `.acc` for coral). **`.og-stats`** is the self-framing hairline grid that
  holds a row of them — set columns with `--og-cols` / `--og-cols-sm`, add
  `.flush` to drop the top rule. (Embedding in a bordered panel? Use bare
  `.og-stat` cells in your own wrapper.)
- **`.og-btn`** — outline action button. `.subtle` = muted hairline,
  `.sm` = compact pill, `[aria-pressed]` = selected. `.og-key` is a keycap chip
  and `.og-btn-icon` a 12px inline icon — both drop inside the button.
- **`.og-cellbtn`** — soft borderless button that fills a hairline grid cell
  (modes, action rows). Wrap a row in **`.og-cellbtns`** for auto dividers;
  `[aria-pressed]` selects (dim fill + coral text, matching `.og-btn`).
- **`.og-link`** — inline text link: coral + 1px underline. Block/card anchors
  stay unstyled; use this only on real text links.
- **`.og-meta`** — justify-between caption row; `<b>` reads fg, `.acc` coral.
- **`.og-range`** — the styled slider (2px track, coral thumb).

Genuinely bespoke demo pieces (the scanner track, the onigiri reveal, Ronnie's
preset dots, the pizza receipt) stay local — systematise the connective tissue,
not the experiment's reason for existing.

## House rules
- Canonical HTML (explicit closing tags, double-quoted attrs) for direct editing.
- Flex/grid + `gap` for any row of siblings, not inline flow.
- Directional affordances use `<` / `>` glyphs (prev/next, card chevrons,
  keycaps) — never `→` / `←`.
- Inline text links use `.og-link` (coral + underline); block/card anchors stay
  unstyled.
- Every experiment must be a genuinely working demo, not a mockup.
- Keep it static and dependency-free — it has to run from GitHub Pages.
