import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getCanonicalUrl,
  getOgImageUrl,
  getSeoForPath,
  SITE,
} from "@/lib/seo-config";

const META_ATTR = "data-seo-managed";

function upsertMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  if (!content) return;
  let el = document.head.querySelector(
    `meta[${attribute}="${key}"][${META_ATTR}]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  const selector = `link[rel="${rel}"][${META_ATTR}]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
  el.href = href;
}

function removeManagedAlternates() {
  document
    .querySelectorAll(`link[rel="alternate"][${META_ATTR}]`)
    .forEach((node) => node.remove());
}

function injectAlternateLinks(canonical: string) {
  removeManagedAlternates();
  for (const hreflang of ["sk-SK", "x-default"] as const) {
    const el = document.createElement("link");
    el.rel = "alternate";
    el.href = canonical;
    el.hreflang = hreflang;
    el.setAttribute(META_ATTR, "true");
    document.head.appendChild(el);
  }
}

function removeManagedJsonLd() {
  document
    .querySelectorAll(`script[type="application/ld+json"][${META_ATTR}]`)
    .forEach((node) => node.remove());
}

function injectJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  removeManagedJsonLd();
  const blocks = Array.isArray(data) ? data : [data];
  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute(META_ATTR, "true");
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}

export function SeoHead() {
  const { pathname } = useLocation();
  const seo = getSeoForPath(pathname);
  const canonical = getCanonicalUrl(seo.path);
  const ogImage = getOgImageUrl();
  const robots =
    import.meta.env.VITE_NOINDEX === "true"
      ? "noindex, nofollow"
      : (seo.robots ??
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  const googleVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION ?? "";
  const bingVerification = import.meta.env.VITE_BING_SITE_VERIFICATION ?? "";

  useEffect(() => {
    document.documentElement.lang = SITE.language;
    document.title = seo.title;

    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "keywords", seo.keywords.join(", "));
    upsertMeta("name", "author", SITE.founder);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "bingbot", robots);
    upsertMeta("name", "content-language", SITE.language);
    upsertMeta("name", "geo.region", SITE.region);
    upsertMeta("name", "geo.placename", SITE.geo.placename);
    upsertMeta("name", "geo.position", SITE.geo.position);
    upsertMeta("name", "ICBM", SITE.geo.icbm);
    upsertMeta("name", "theme-color", SITE.themeColor);
    upsertMeta("name", "application-name", SITE.name);
    upsertMeta("name", "apple-mobile-web-app-title", SITE.name);
    upsertMeta("name", "format-detection", "telephone=yes");

    if (googleVerification) {
      upsertMeta("name", "google-site-verification", googleVerification);
    }
    if (bingVerification) {
      upsertMeta("name", "msvalidate.01", bingVerification);
    }

    upsertLink("canonical", canonical);
    injectAlternateLinks(canonical);

    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:type", seo.ogType ?? "website");
    upsertMeta("property", "og:locale", SITE.locale);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", ogImage);
    upsertMeta("property", "og:image:alt", `${SITE.name} logo`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImage);
    upsertMeta("name", "twitter:image:alt", `${SITE.name} logo`);

    if (seo.jsonLd) {
      injectJsonLd(seo.jsonLd);
    } else {
      removeManagedJsonLd();
    }
  }, [
    seo,
    canonical,
    ogImage,
    robots,
    googleVerification,
    bingVerification,
  ]);

  return null;
}
