import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const PUBLIC = join(ROOT, "public");

const DEFAULT_SITE_URL = "https://www.aifune.sk";

const HOME_DESCRIPTION =
  "Získaj zadarmo návod, v ktorom ti Juraj ukáže presný postup ako zarobiť 10 000 €+ mesačne s AI fuňami. Od nuly po prvé peniaze — bez skúseností, celé zadarmo";

function loadEnv() {
  const envPath = join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv();

const SITE_URL = (process.env.VITE_SITE_URL ?? DEFAULT_SITE_URL).replace(
  /\/$/,
  "",
);
const NOINDEX = process.env.VITE_NOINDEX === "true";

const SITE = {
  name: "AI Fuňe",
  legalName: "RYO GROUP s.r.o.",
  founder: "Juraj Olšavský",
  founderAlias: "Mr. Byznys",
  email: "jorgebyznys@gmail.com",
  phone: "+421 940 216 575",
  country: "Slovakia",
  language: "Slovak",
};

const ROUTES = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    title: "AI Fuňe — Ako zarobiť 10 000 €+ mesačne s AI fuňami",
    description: HOME_DESCRIPTION,
  },
  {
    path: "/olympics",
    priority: "0.8",
    changefreq: "daily",
    title: "Fune Olympics — Rebríček AI fuňa tvorcov | AI Fuňe",
    description:
      "Fune Olympics — mesačný rebríček najlepších AI fuňa tvorcov v komunite AI Fuňe. Sleduj výsledky, porovnaj zárobky a inšpiruj sa top performerami.",
  },
];

function abs(path) {
  return `${SITE_URL}${path}`;
}

const lastmod = new Date().toISOString().slice(0, 10);

const robots = NOINDEX
  ? "User-agent: *\nDisallow: /\n"
  : [
      "User-agent: *",
      "Allow: /",
      "",
      "# AI crawlers",
      "User-agent: GPTBot",
      "Allow: /",
      "",
      "User-agent: ChatGPT-User",
      "Allow: /",
      "",
      "User-agent: ClaudeBot",
      "Allow: /",
      "",
      "User-agent: PerplexityBot",
      "Allow: /",
      "",
      "User-agent: Google-Extended",
      "Allow: /",
      "",
      `Sitemap: ${abs("/sitemap.xml")}`,
      `Host: ${SITE_URL.replace(/^https?:\/\//, "")}`,
      "",
    ].join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${ROUTES.map(
  (route) => `  <url>
    <loc>${abs(route.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="sk-SK" href="${abs(route.path)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(route.path)}" />
  </url>`,
).join("\n")}
</urlset>
`;

const llms = `# ${SITE.name}

> ${HOME_DESCRIPTION}

${SITE.name} is a Slovak-language educational landing page by ${SITE.founder} (${SITE.founderAlias}) / ${SITE.legalName}. The site offers a free step-by-step guide on building and monetizing AI model / virtual influencer businesses ("AI fuňe") for the Slovak market.

## Primary audience

- Slovak speakers in Slovakia and abroad
- Beginners looking for online income without prior experience
- People interested in AI-generated influencer businesses, Fanvue, and OnlyFans-style monetization

## Key pages

- [Home — free guide signup](${abs("/")}): Main VSL lander with email capture, social proof, FAQ, and founder story.
- [Fune Olympics leaderboard](${abs("/olympics")}): Monthly community earnings leaderboard and hall of fame.

## What users can do

- Request a free educational guide via email signup
- Browse earnings proof screenshots from community members
- View the Fune Olympics creator leaderboard
- Contact support via email or phone

## Contact

- Founder: ${SITE.founder}
- Email: ${SITE.email}
- Phone: ${SITE.phone}
- Company: ${SITE.legalName}
- Country: ${SITE.country}
- Language: ${SITE.language}
- Website: ${SITE_URL}

## Optional

- Full FAQ and extended context: ${abs("/llms-full.txt")}
- Sitemap: ${abs("/sitemap.xml")}
`;

const llmsFull = `${llms}
## Extended FAQ

${[
  [
    "Ako dlho kým zarobím prvé €?",
    "Mne to trvalo týždeň, zarobil som 35 €. Nevedel som ešte nič. Dnes máme ľudí, čo za prvé 2 týždne zarobili 1600 €. Závisí to od teba.",
  ],
  [
    "Dá sa to robiť popri škole alebo práci?",
    "Áno. Väčšina našich ľudí má školu, prácu alebo rodinu. Stačia 2 hodiny denne.",
  ],
  [
    "Čo všetko sa naučíš?",
    "Úplne všetko, čo potrebuješ na štart. Video ide do detailov, krok po kroku.",
  ],
  [
    "Nie je už neskoro?",
    "Naopak. AI modelky sú teraz na takej úrovni, že ich už nevieš rozoznať od reálnych ľudí. Dobrých je málo — ukážem ti, ako takú spraviť.",
  ],
  [
    "Zarobím na 100%?",
    "Nie som veštec. Ak nemakáš, nezarobíš. Ale ak makáš a si konzistentný, šanca je fakt slušná.",
  ],
  [
    "Je to legálne?",
    "Áno. Nič skryté. Ľudia presne vedia, za čo platia.",
  ],
]
  .map(([q, a]) => `### ${q}\n\n${a}`)
  .join("\n\n")}

## Topics covered in the free guide

- Why AI fuňe are positioned as a strong online business opportunity in 2026
- Founder journey and common beginner mistakes
- How to create your own AI model and start earning
- Required tools and software stack (Fanvue, OnlyFans ecosystem)
- Marketing basics for visibility
- Monetization and payout mechanics
- Community and mentorship support

## Indexing note

This site is intended for public indexing unless VITE_NOINDEX is enabled in deployment.
`;

const humans = `/* TEAM */
Founder: ${SITE.founder} (${SITE.founderAlias})
Company: ${SITE.legalName}
Contact: ${SITE.email}
Phone: ${SITE.phone}
Site: ${SITE_URL}

/* THANKS */
Community members featured in social proof and Fune Olympics leaderboard

/* SITE */
Standards: HTML5, CSS3, Slovak language
Components: React, Tailwind CSS
Country: ${SITE.country}
Language: ${SITE.language}
Last update: ${lastmod}
`;

writeFileSync(join(PUBLIC, "robots.txt"), `${robots}\n`, "utf8");
writeFileSync(join(PUBLIC, "sitemap.xml"), `${sitemap}\n`, "utf8");
writeFileSync(join(PUBLIC, "llms.txt"), `${llms}\n`, "utf8");
writeFileSync(join(PUBLIC, "llms-full.txt"), `${llmsFull}\n`, "utf8");
writeFileSync(join(PUBLIC, "humans.txt"), `${humans}\n`, "utf8");
writeFileSync(join(PUBLIC, "ai.txt"), `${llms}\n`, "utf8");

console.log("Generated SEO files in public/:");
console.log("  robots.txt, sitemap.xml, llms.txt, llms-full.txt, humans.txt, ai.txt");
console.log(`  Site URL: ${SITE_URL}`);
