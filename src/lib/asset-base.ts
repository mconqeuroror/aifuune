/**
 * Base URL for static assets. Empty in dev (served from /public).
 * Set VITE_ASSET_BASE to your blob CDN root when deploying, e.g.:
 * https://your-account.blob.vercel-storage.com/aifune
 */
export const ASSET_BASE = (import.meta.env.VITE_ASSET_BASE ?? "").replace(
  /\/$/,
  "",
);

export function assetUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${ASSET_BASE}${normalized}`;
}
