#!/usr/bin/env node
/**
 * Upload public/ media to Vercel Blob during Vercel CI builds (OIDC auth).
 * Skips locally unless UPLOAD_BLOB_ASSETS=1 and credentials work.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { put } from "@vercel/blob";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const MANIFEST_IN = path.join(PUBLIC, "assets.manifest.json");
const MANIFEST_OUT = path.join(ROOT, "src/data/blob-asset-manifest.json");

export const BLOB_ASSET_BASE =
  process.env.VITE_ASSET_BASE?.replace(/\/$/, "") ||
  "https://anyflommv08jxhpm.public.blob.vercel-storage.com";

const SKIP = new Set([
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "ai.txt",
  "humans.txt",
  "assets.manifest.json",
  "seo-preview.html",
  "site.webmanifest",
]);

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    value = value.replace(/\\n/g, "\n");
    if (!(key in process.env)) process.env[key] = value;
  }
}

function mimeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return (
    {
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".woff2": "font/woff2",
    }[ext] ?? "application/octet-stream"
  );
}

function authConfig() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return { token: process.env.BLOB_READ_WRITE_TOKEN };
  }
  if (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID) {
    return {
      oidcToken: process.env.VERCEL_OIDC_TOKEN,
      storeId: process.env.BLOB_STORE_ID,
    };
  }
  return null;
}

export async function uploadAssetsToBlob() {
  const auth = authConfig();
  if (!auth) {
    console.log("Blob upload skipped: no credentials.");
    return null;
  }

  if (!fs.existsSync(MANIFEST_IN)) {
    throw new Error("Missing public/assets.manifest.json — run npm run assets:manifest");
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_IN, "utf8"));
  const files = manifest.files.filter((f) => !SKIP.has(f));

  console.log(`Uploading ${files.length} assets to Vercel Blob…`);

  const uploaded = [];
  let assetBase = BLOB_ASSET_BASE;

  for (let i = 0; i < files.length; i++) {
    const rel = files[i];
    const abs = path.join(PUBLIC, rel);
    if (!fs.existsSync(abs)) continue;

    const body = fs.readFileSync(abs);
    const blob = await put(rel.replace(/\\/g, "/"), body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: mimeFor(rel),
      cacheControlMaxAge: 31536000,
      ...auth,
    });

    if (i === 0) {
      const url = new URL(blob.url);
      assetBase = `${url.protocol}//${url.host}`;
    }

    uploaded.push({ path: rel, url: blob.url, size: body.length });

    if ((i + 1) % 15 === 0 || i === files.length - 1) {
      console.log(`  ${i + 1}/${files.length}`);
    }
  }

  const out = {
    uploadedAt: new Date().toISOString(),
    assetBase,
    storeId: process.env.BLOB_STORE_ID ?? null,
    count: uploaded.length,
    files: uploaded,
  };

  fs.mkdirSync(path.dirname(MANIFEST_OUT), { recursive: true });
  fs.writeFileSync(MANIFEST_OUT, `${JSON.stringify(out, null, 2)}\n`, "utf8");

  console.log(`Blob upload complete. Base: ${assetBase}`);
  return out;
}

async function main() {
  loadEnvFile(path.join(ROOT, ".vercel", ".env.production.local"));
  loadEnvFile(path.join(ROOT, ".env.blob.prod"));
  loadEnvFile(path.join(ROOT, ".env.local"));

  const onVercel = process.env.VERCEL === "1";
  const forced = process.env.UPLOAD_BLOB_ASSETS === "1";

  if (!onVercel && !forced) {
    console.log(
      "Blob upload skipped locally (set UPLOAD_BLOB_ASSETS=1 to force, or deploy on Vercel).",
    );
    return;
  }

  try {
    await uploadAssetsToBlob();
  } catch (error) {
    if (onVercel) throw error;
    console.warn("Blob upload failed locally:", error);
  }
}

const isDirectRun = process.argv[1] === fileURLToPath(import.meta.url);
if (isDirectRun) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
