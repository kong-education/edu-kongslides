# Kong · reveal.js template

Open `index.html` in a browser (needs internet for reveal.js + Google Fonts).
Local server recommended: `python3 -m http.server` then open http://localhost:8000

## Per-slide controls
- Theme: `class="theme-dark | theme-electric | theme-bay | theme-white"` (default: dark)
- Vertical align: `v-center`, `v-end`
- Skip logo + marks: `no-chrome` (logo) / `no-marks` (marks only)
- Skip grid: add `no-grid` to the section class (e.g. `class="theme-dark no-grid"`)

## Swap in the official logo
Edit the two `<symbol>` blocks at the top of `index.html`. Keep `fill="currentColor"`.
Widen `.kong-logo` in `css/kong.css` to match the lockup ratio.

## Components
`.label` `.pill` (`.fill` `.ai`) `.btn` `.card` `.stat` `.cols` (`.cols-3`) `.statement` `.flow` `.node-gw` `pre code`
