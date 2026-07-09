/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_ASSET_BASE?: string;
  readonly VITE_NOINDEX?: string;
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string;
  readonly VITE_BING_SITE_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
