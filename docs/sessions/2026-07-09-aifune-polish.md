# Session: 2026-07-09 — aifune (SEO copy + Olympics polish)

## User request

- Update SEO meta copy to Juraj/návod wording, keywords, author, and canonical URLs to `www.aifune.sk`
- Regenerate crawler files (`robots.txt`, `llms*.txt`, `ai.txt`, `humans.txt`, `sitemap.xml`) with fixed formatting
- Fix Olympics header double-bar / white strip; make header sticky
- Move crown emoji onto #1 avatar
- Animate leaderboard amounts with staggered count-up (1st → 2nd → 3rd → rest together)
- Push to git

## What changed

- **`src/lib/seo-config.ts`** — `HOME_DESCRIPTION`, expanded `HOME_KEYWORDS`, default `VITE_SITE_URL` fallback `https://www.aifune.sk`, návod copy in JSON-LD/LLMS summary
- **`src/components/SeoHead.tsx`** — `meta author` → Juraj Olšavský
- **`index.html`** — bootstrap description, keywords, author, og/twitter/canonical to `www.aifune.sk`
- **`scripts/generate-seo-files.mjs`** — new copy, default site URL, fixed `robots.txt` blank lines between crawler blocks
- **`public/robots.txt`**, **`sitemap.xml`**, **`llms.txt`**, **`llms-full.txt`**, **`ai.txt`**, **`humans.txt`**, **`site.webmanifest`** — regenerated with `www.aifune.sk` URLs
- **`.env.example`** — `VITE_SITE_URL=https://www.aifune.sk`
- **`src/components/Header.tsx`** — shared sticky header with `olympicsActive` variant; transparent at top, glass on scroll
- **`src/pages/OlympicsPage.tsx`** — uses shared `Header`, crown on avatar, `AnimatedMoney` for earnings
- **`src/pages/LanderPage.tsx`** — page-level hero gradient blobs behind transparent header
- **`src/components/sections/HeroAndProof.tsx`** — adjusted blob placement (blobs moved to page level on lander)
- **`src/components/AnimatedMoney.tsx`** — new staggered count-up component for `$` amounts

## Why

Align production SEO with `aifune.sk` branding and Juraj as author; remove visual header seam on Olympics/lander; add podium-style earnings reveal for leaderboard drama.

## Gotchas

- `overflow-hidden` on page wrappers breaks `position: sticky` — removed from Olympics root
- `public/seo-preview.html` is gitignored (dev-only print preview)
- Set `VITE_SITE_URL=https://www.aifune.sk` on Vercel if still pointing at vercel.app
