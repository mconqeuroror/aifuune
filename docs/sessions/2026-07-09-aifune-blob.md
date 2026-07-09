# Session: 2026-07-09 — aifune blob + SEO push

## User request

Upload static assets to Vercel Blob (public key provided for blob store), wire CDN into the app, and push to GitHub.

## What changed

- **`scripts/upload-assets-to-blob.mjs`** — uploads `images/`, `emojis/`, `fonts/` on Vercel builds (OIDC); writes `src/data/blob-asset-manifest.json`.
- **`src/data/blob-asset-manifest.json`** — blob URL manifest placeholder (filled on CI build).
- **`package.json`** — `blob:upload` script; build runs blob upload before `vite build`.
- **`.env.example`** — documents `VITE_ASSET_BASE`, `VITE_SITE_URL`, blob store id.
- **SEO stack** (prior in session): `SeoHead`, `seo-config.ts`, `generate-seo-files.mjs`, crawler files, `vercel.json` headers.
- **`README.md`** — blob store details and env vars.

## Vercel configuration (dashboard)

| Env | Value |
|-----|-------|
| `VITE_ASSET_BASE` | `https://anyflommv08jxhpm.public.blob.vercel-storage.com` |
| `VITE_SITE_URL` | `https://aifuune.vercel.app` |
| `BLOB_STORE_ID` | `store_AnyFloMmV08jxHPm` |
| `BLOB_WEBHOOK_PUBLIC_KEY` | Ed25519 PEM (user-provided) |

## Deploy result

- Production: https://aifuune.vercel.app
- Blob store: **119 files**, ~11.36 MB uploaded on first production build.

## Why

Serve heavy static media from Vercel Blob CDN; keep SPA shell + SEO files on Vercel. User's public key is the blob webhook verification key (`BLOB_WEBHOOK_PUBLIC_KEY`), not an upload credential — uploads use OIDC on Vercel CI.

## Gotchas

- Local `npm run blob:upload` fails without development OIDC or `BLOB_READ_WRITE_TOKEN`; uploads run on Vercel build instead.
- `public/seo-preview.html` is dev-only and gitignored.
- Redeploy after git push so `VITE_SITE_URL` is baked into sitemap/SEO build output.
