import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");
const OUT = join(PUBLIC_DIR, "assets.manifest.json");

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(relative(PUBLIC_DIR, full).replace(/\\/g, "/"));
    }
  }
  return files.sort();
}

const files = walk(PUBLIC_DIR).filter((f) => f !== "assets.manifest.json");
const manifest = {
  generatedAt: new Date().toISOString(),
  count: files.length,
  files,
};

writeFileSync(OUT, `${JSON.stringify(manifest, null, 2)}\n`, "utf-8");
console.log(`Wrote ${OUT} (${files.length} files)`);
