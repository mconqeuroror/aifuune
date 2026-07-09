# Session: 2026-07-09 — aifune (analytics + hero/popup polish)

## User request

- Fix PC hero images (rounded corners, visible $10k digit), shrink cookie banner
- Počkaj popup: persist dismiss, only trigger after 60s on page
- Remove hero image bottom fade and edge rings
- Install `@vercel/analytics`, verify lint/build, push to git

## What changed

- **`package.json`**, **`package-lock.json`** — add `@vercel/analytics`
- **`src/App.tsx`** — mount `<Analytics />` from `@vercel/analytics/react`
- **`src/components/sections/HeroAndProof.tsx`** — split rotation from clip wrapper so rounded corners and earnings crop work on desktop; remove bottom gradient fade and `ring-2` edge; tune right image object-position/width
- **`src/components/CookieConsent.tsx`** — smaller compact banner (`max-w-[15.5rem]`, smaller text/button)
- **`src/components/ScrollCaptureModal.tsx`** — 60s gate before scroll/exit-intent triggers; `localStorage` key `aifune-scroll-capture-dismissed` on close / Možno neskôr

## Why

Desktop hero was clipping rotated images and the Discord earnings leading digit; cookie/popup UX was too heavy. Vercel Analytics for production page views. Popup should not annoy returning visitors or fire immediately on land.

## Gotchas

- Hero rotation must live on an outer wrapper — `overflow-hidden` + `rotate` on the same node clips image content
- Full `npm run build` blob upload still CI-only; local verify uses `tsc -b` + `vite build`
- No ESLint script in repo — typecheck + Vite build used as lint/build gate
