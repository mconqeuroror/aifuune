# Session: 2026-07-09 — aifune (Evil Eye Olympics + hero ShapeGrid)

## User request

Remove magnifying glass hover effect (overkill). Push pending changes including Evil Eye Fune Olympics implementation.

## What changed

- **Removed magnify** — deleted `src/components/MagnifyImage.tsx`; reverted hero/proof images to plain `<img>`; stripped `.magnify-lens*` rules from `src/index.css`
- **`src/components/EvilEye.tsx`**, **`src/components/EvilEye.css`** — WebGL evil-eye background via `ogl`; mouse-tracking pupil on Olympics page
- **`src/pages/OlympicsPage.tsx`** — dark theme with fixed EvilEye backdrop; liquid-glass panels (`glass-liquid*`), gold heading gradient, narrower centered layout
- **`src/components/Header.tsx`** — `olympicsDark` variant for scrolled glass + badge on black background
- **`src/index.css`** — Olympics dark theme tokens (`.olympics-theme`, liquid glass rows, heading/kicker/table styles, `glass-header-olympics-scrolled`)
- **`src/components/ShapeGrid.tsx`**, **`src/components/ShapeGrid.css`** — animated cyan grid hero background
- **`src/components/sections/HeroAndProof.tsx`** — ShapeGrid behind hero (`direction="up"`, opacity 45–50%); wider CTA stack `max-w-[43.2rem]`; full-bleed infinite proof slider
- **`src/components/Footer.tsx`** — rounded top corners + cyan gradient footer
- **`package.json`** — add `ogl` dependency for EvilEye

## Why

Magnify lens felt heavy and glitchy on touch/tablet; Olympics page needs a dramatic branded backdrop (evil eye + liquid glass) distinct from the light lander.

## Gotchas

- `src/lib/olympics-content.json` is scraper output — not committed
- EvilEye canvas is `pointer-events-none` + `fixed`; header/main sit above at `z-10`/`z-50`
- ShapeGrid `direction="up"` in code scrolls visually downward (offset math is inverted vs label)
