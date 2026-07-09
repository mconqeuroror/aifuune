import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

function assetBaseFonts(): Plugin {
  return {
    name: "asset-base-fonts",
    transform(code, id) {
      if (!id.endsWith("fonts.css")) return null;
      const base = (process.env.VITE_ASSET_BASE ?? "").replace(/\/$/, "");
      if (!base) return null;
      return code.replace(/url\('\/fonts\//g, `url('${base}/fonts/`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), assetBaseFonts()],  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
