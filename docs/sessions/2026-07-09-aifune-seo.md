# Session: 2026-07-09 — aifune (SEO)

## User request

Set up complete SEO: indexing, geo targeting, llms.txt, and full metadata/structured data.

## What changed

- **`src/lib/seo-config.ts`** — site constants, per-route SEO config, JSON-LD schemas (Organization, WebSite, WebPage, FAQPage, BreadcrumbList, ItemList).
- **`src/components/SeoHead.tsx`** — runtime meta/OG/Twitter/geo/canonical/hreflang/JSON-LD injection per route.
- **`src/App.tsx`** — mounts `SeoHead` inside router.
- **`index.html`** — bootstrap SEO meta, favicon, manifest, noscript fallback.
- **`scripts/generate-seo-files.mjs`** — builds `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, `ai.txt`, `humans.txt`.
- **`public/site.webmanifest`** — PWA manifest for mobile/indexing.
- **`vercel.json`** — content-type/cache headers for SEO static files.
- **`src/vite-env.d.ts`**, **`.env.example`** — `VITE_SITE_URL`, verification tokens, `VITE_NOINDEX`.
- **`package.json`** — `seo:generate` + `prebuild` hook.
- **`README.md`** — SEO deployment checklist.

## Why

Production-ready discoverability for Google/Bing, Slovak geo signals, AI crawler context (llms.txt), and structured FAQ data for rich results.

## Gotchas

- Set `VITE_SITE_URL` on Vercel before deploy so sitemap/canonical/OG URLs are absolute.
- Social crawlers that don't execute JS may only see home-page meta from `index.html`; Google handles SPA fine.
- `VITE_NOINDEX=true` blocks all crawlers via robots.txt + meta — use on preview only.
