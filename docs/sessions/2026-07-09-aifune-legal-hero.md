# Session: 2026-07-09 — aifune (legal pages, hero polish, UX fixes)

## User request

- Add Slovak TOS, privacy policy, and cookies pages (AI Fuňe as operator)
- Hero typography: larger heading, smaller subheading, green glow on money amounts
- Proof collage: replace “AI” badge with Discord logo; glow on `4000+ €`
- Scroll to top when opening legal pages (and on route change)
- Logo click navigates to lander; if already on lander, scroll to top
- Review and push to git after clean build

## What changed

- **`src/lib/legal/`** — structured Slovak legal content (`terms.ts`, `privacy.ts`, `cookies.ts`, `types.ts`, `index.ts`)
- **`src/pages/LegalPage.tsx`** — shared legal page layout with back link, header, footer
- **`src/components/LegalDocumentContent.tsx`** — section/block renderer (paragraphs, lists, tables)
- **`src/App.tsx`** — routes `/obchodne-podmienky`, `/ochrana-osobnych-udajov`, `/cookies`; `ScrollToTop`
- **`src/components/ScrollToTop.tsx`** — scroll window to top on pathname change
- **`src/components/Footer.tsx`** — real `Link` routes for legal pages
- **`src/lib/seo-config.ts`**, **`scripts/generate-seo-files.mjs`**, **`public/sitemap.xml`** — SEO + sitemap entries for legal URLs
- **`src/components/sections/HeroAndProof.tsx`** — larger h1, smaller subheading, `text-money-glow` on amounts, Discord icon in collage card
- **`src/components/DiscordIcon.tsx`** — Discord mark SVG
- **`src/index.css`** — `.text-money-glow` utility
- **`src/components/Header.tsx`** — fixed header + spacer; logo scroll-to-top when already on `/`
- **`src/components/AmbientBlobs.tsx`** — fixed background blobs (lander/Olympics overflow fix)
- **`src/components/ScrollCaptureModal.tsx`** — centered modal on mobile, body scroll lock
- **`src/components/StickyCtaBar.tsx`**, **`src/pages/OlympicsPage.tsx`**, **`src/pages/LanderPage.tsx`**, **`index.html`** — mobile/safe-area/radius polish from prior turns

## Why

Legal compliance pages in Slovak; improve hero hierarchy and money emphasis; Discord branding in social proof; predictable navigation UX (scroll reset on legal pages and logo home).

## Gotchas

- Local `npm run build` fails on Vercel Blob OIDC in dev; `tsc -b` + `vite build` pass locally
- `src/lib/olympics-content.json` is a scraper artifact — not committed
- Slovak typographic quotes (`„…"`) need single-quoted JS strings to avoid TS parse errors
