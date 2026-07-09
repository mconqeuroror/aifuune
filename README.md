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

## Static assets (blob-ready)

All static files live under `public/` and are listed in `public/assets.manifest.json` (128 files: images, emojis, fonts).

| Path | Contents |
|------|----------|
| `public/images/` | Lander proof screenshots |
| `public/images/olympics/` | Olympics hero images |
| `public/images/olympics/avatars/` | Leaderboard avatars |
| `public/emojis/apple/` | Self-hosted Apple emoji PNGs |
| `public/fonts/` | Self-hosted DM Sans + Space Grotesk woff2 |

Regenerate the manifest after adding assets:

```bash
npm run assets:manifest
```

Re-download fonts if needed:

```bash
npm run fonts:download
```

## Vercel + Blob deployment

1. Push this repo and connect it on Vercel.
2. Upload everything under `public/` to your Vercel Blob store, **preserving paths** (e.g. blob key `images/all-b64-0.png`, not a flat folder).
3. Set the Vercel env var:

   ```
   VITE_ASSET_BASE=https://your-account.public.blob.vercel-storage.com/aifune
   ```

   (no trailing slash)

4. Redeploy. Image, emoji, and font URLs will point at blob; the SPA shell is served from Vercel.

Without `VITE_ASSET_BASE`, assets are served from `/public` on the same origin (fine for local dev and first deploy).

## Build

```bash
npm run build
npm run preview
```

`vercel.json` includes SPA rewrites so `/olympics` works on direct navigation.
