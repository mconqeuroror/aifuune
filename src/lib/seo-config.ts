import { FAQ_ITEMS } from "@/lib/content";
import { assetUrl } from "@/lib/asset-base";

export const SITE = {
  name: "AI Fuňe",
  legalName: "RYO GROUP s.r.o.",
  founder: "Juraj Olšavský",
  founderAlias: "Mr. Byznys",
  tagline: "Ako zarobiť 10 000 €+ mesačne s AI fuňami",
  locale: "sk_SK",
  language: "sk",
  country: "Slovakia",
  countryCode: "SK",
  region: "SK",
  geo: {
    placename: "Slovensko",
    position: "48.1486; 17.1077",
    icbm: "48.1486, 17.1077",
  },
  email: "jorgebyznys@gmail.com",
  phone: "+421940216575",
  phoneDisplay: "+421 940 216 575",
  discord: "https://discord.gg/aifune",
  twitterHandle: "@aifune",
  themeColor: "#0ea5b5",
  defaultOgImage: "/images/all-b64-0.png",
} as const;

export type SeoPageConfig = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  ogType?: "website" | "article";
  robots?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function siteUrl(): string {
  return (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
}

function absoluteUrl(path: string): string {
  const base = siteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return base ? `${base}${normalized}` : normalized;
}

function absoluteAsset(path: string): string {
  const base = siteUrl();
  const asset = assetUrl(path);
  if (base && asset.startsWith("/")) return `${base}${asset}`;
  if (base && asset.startsWith("http")) return asset;
  return asset;
}

export function getSiteUrl(): string {
  return siteUrl();
}

export function getCanonicalUrl(path: string): string {
  return absoluteUrl(path);
}

export function getOgImageUrl(imagePath = SITE.defaultOgImage): string {
  return absoluteAsset(imagePath);
}

const HOME_DESCRIPTION =
  "Získaj zadarmo video, v ktorom Mr. Byznys ukáže presný postup ako zarobiť 10 000 €+ mesačne s AI fuňami. Od nuly po prvé peniaze — bez skúseností, celé zadarmo.";

const OLYMPICS_DESCRIPTION =
  "Fune Olympics — mesačný rebríček najlepších AI fuňa tvorcov v komunite AI Fuňe. Sleduj výsledky, porovnaj zárobky a inšpiruj sa top performerami.";

export const SEO_PAGES: Record<string, SeoPageConfig> = {
  "/": {
    path: "/",
    title: "AI Fuňe — Ako zarobiť 10 000 €+ mesačne s AI fuňami",
    description: HOME_DESCRIPTION,
    keywords: [
      "AI fuňe",
      "AI modelky",
      "zarábať online",
      "pasívny príjem",
      "Slovensko",
      "Mr. Byznys",
      "kurz zadarmo",
      "video zadarmo",
      "online biznis 2026",
    ],
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.legalName,
        alternateName: SITE.name,
        url: absoluteUrl("/"),
        logo: getOgImageUrl(),
        email: SITE.email,
        telephone: SITE.phone,
        areaServed: {
          "@type": "Country",
          name: SITE.country,
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phone,
          email: SITE.email,
          contactType: "customer support",
          areaServed: SITE.countryCode,
          availableLanguage: ["Slovak"],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        alternateName: SITE.founderAlias,
        url: absoluteUrl("/"),
        inLanguage: SITE.language,
        description: HOME_DESCRIPTION,
        publisher: {
          "@type": "Organization",
          name: SITE.legalName,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AI Fuňe — Zadarmo video",
        url: absoluteUrl("/"),
        description: HOME_DESCRIPTION,
        inLanguage: SITE.language,
        isPartOf: {
          "@type": "WebSite",
          name: SITE.name,
          url: absoluteUrl("/"),
        },
        about: {
          "@type": "Thing",
          name: "AI influencer business",
          description:
            "Podnikanie s AI modelkami a virtuálnymi influencermi na slovenskom trhu",
        },
        primaryImageOfPage: getOgImageUrl(),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: {
            "@type": "Answer",
            text: answer,
          },
        })),
      },
    ],
  },
  "/olympics": {
    path: "/olympics",
    title: "Fune Olympics — Rebríček AI fuňa tvorcov | AI Fuňe",
    description: OLYMPICS_DESCRIPTION,
    keywords: [
      "Fune Olympics",
      "AI Fuňe leaderboard",
      "AI fuňe rebríček",
      "zárobky AI modeliek",
      "komunita AI Fuňe",
      "Slovensko",
    ],
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Fune Olympics Leaderboard",
        url: absoluteUrl("/olympics"),
        description: OLYMPICS_DESCRIPTION,
        inLanguage: SITE.language,
        isPartOf: {
          "@type": "WebSite",
          name: SITE.name,
          url: absoluteUrl("/"),
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: SITE.name,
              item: absoluteUrl("/"),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Fune Olympics",
              item: absoluteUrl("/olympics"),
            },
          ],
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Fune Olympics — July 2026 Leaderboard",
        description: OLYMPICS_DESCRIPTION,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        numberOfItems: 10,
      },
    ],
  },
};

export function getSeoForPath(pathname: string): SeoPageConfig {
  return SEO_PAGES[pathname] ?? SEO_PAGES["/"];
}

/** Plain-text summaries for llms.txt generation */
export const LLMS_SUMMARY = {
  about: HOME_DESCRIPTION,
  olympics: OLYMPICS_DESCRIPTION,
  audience: "Slovak-speaking beginners interested in earning online with AI models.",
  offer:
    "Free educational video + email list. Bonus giveaway (MacBook Air, iPhone 17 Pro, €500, coaching week).",
  faq: FAQ_ITEMS.map(([q, a]) => ({ question: q, answer: a })),
};
