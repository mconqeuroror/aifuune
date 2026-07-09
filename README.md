# AI Fuňe

Slovak VSL landing page + Fuňe Olympics leaderboard subsite.

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS v4 + shadcn-style UI
- Framer Motion

## Routes

- `/` — main lander
- `/olympics` — leaderboard subsite

## Development

```bash
npm install
npm run dev
```

## Static assets (Vercel Blob)

Media files (`images/`, `emojis/`, `fonts/`) upload automatically to Vercel Blob on every **Vercel production/preview build** via `scripts/upload-assets-to-blob.mjs`.

| Setting | Value |
|---------|-------|
| Blob store | `aifuune-blob` (`store_AnyFloMmV08jxHPm`) |
| CDN base | `https://anyflommv08jxhpm.public.blob.vercel-storage.com` |
| Manifest | `src/data/blob-asset-manifest.json` (generated on build) |

SEO/crawler files (`robots.txt`, `sitemap.xml`, `llms.txt`, etc.) stay on the Vercel app origin.

### Vercel env (already configured)

```bash
VITE_ASSET_BASE=https://anyflommv08jxhpm.public.blob.vercel-storage.com
VITE_SITE_URL=https://aifuune.vercel.app
BLOB_STORE_ID=store_AnyFloMmV08jxHPm
BLOB_WEBHOOK_PUBLIC_KEY=...  # webhook verification for client uploads
```

Local dev leaves `VITE_ASSET_BASE` empty — assets serve from `/public`.

Manual re-upload (requires Vercel OIDC on the environment or `BLOB_READ_WRITE_TOKEN`):

```bash
UPLOAD_BLOB_ASSETS=1 npm run blob:upload
```

## Build

```bash
npm run build
npm run preview
```

`vercel.json` includes SPA rewrites so `/olympics` works on direct navigation.

## SEO

Generated on every build (`prebuild`):

| File | Purpose |
|------|---------|
| `public/robots.txt` | Crawler rules + sitemap URL |
| `public/sitemap.xml` | `/` and `/olympics` with hreflang |
| `public/llms.txt` | LLM crawler context ([llmstxt.org](https://llmstxt.org)) |
| `public/llms-full.txt` | Extended FAQ + topics for AI crawlers |
| `public/ai.txt` | Alias of `llms.txt` |
| `public/humans.txt` | Team / site credits |
| `public/site.webmanifest` | PWA manifest |

Per-route meta, Open Graph, Twitter cards, geo tags, canonical URLs, and JSON-LD are injected at runtime via `SeoHead`.

### Required env for production SEO

```bash
VITE_SITE_URL=https://your-domain.sk   # canonical, sitemap, OG absolute URLs
```

### Optional env

```bash
VITE_GOOGLE_SITE_VERIFICATION=...   # Google Search Console
VITE_BING_SITE_VERIFICATION=...     # Bing Webmaster Tools
VITE_NOINDEX=true                   # block indexing on staging
```

After deploy, submit `https://your-domain.sk/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Regenerate SEO files manually:

```bash
npm run seo:generate
```
