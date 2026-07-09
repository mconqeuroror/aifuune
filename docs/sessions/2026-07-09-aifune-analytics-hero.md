# Session: 2026-07-09 — aifune (analytics + hero/popup polish)

## User request

- Fix PC hero images (rounded corners, visible $10k digit), shrink cookie banner
- Počkaj popup: persist dismiss, only trigger after 60s on page
- Remove hero image bottom fade and edge rings
- Install `@vercel/analytics`, verify lint/build, push to git

## What changed

- **`package.json`**, **`package-lock.json`** — add `@vercel/analytics`
- **`src/App.tsx`** — mount `<Analytics />` from `@vercel/analytics/react`
- **`src/components/sections/HeroAndProof.tsx`** — split rotation from clip wrapper so rounded corners and earnings crop work on desktop; remove bottom gradient fade and `ring-2` edge; tune right image object-position/width; center-anchored desktop cluster; outer-wrapper shadows; Ferrari `object-[68%_32%]` for full face; earnings `object-[8%_28%]` for visible `$10,001` digit
- **`src/components/CookieConsent.tsx`** — smaller compact banner (`max-w-[15.5rem]`, smaller text/button)
- **`src/components/ScrollCaptureModal.tsx`** — 60s gate before scroll/exit-intent triggers; `localStorage` key `aifune-scroll-capture-dismissed` on close / Možno neskôr

## Why

Desktop hero was clipping rotated images and the Discord earnings leading digit; cookie/popup UX was too heavy. Vercel Analytics for production page views. Popup should not annoy returning visitors or fire immediately on land.

## Gotchas

- Hero rotation must live on an outer wrapper — `overflow-hidden` + `rotate` on the same node clips image content
- Shadow on outer wrapper, not inner clip box, or `overflow-hidden` eats the shadow
- Ferrari face sits on the right of the source image — use `object-[68%_*]` not `object-center`
- Earnings `$10,001.40` needs left-biased object-position (`6–8%`) across breakpoints
- Full `npm run build` blob upload still CI-only; local verify uses `tsc -b` + `vite build`
- No ESLint script in repo — typecheck + Vite build used as lint/build gate
