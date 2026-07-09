import type { EmojiName } from "@/lib/emoji-icons";
import { assetUrl } from "@/lib/asset-base";

/** Strongest proof cards — pulled above the fold near hero */
export const HERO_PROOF_CARDS = [
  {
    src: assetUrl("/images/all-b64-21.png"),
    alt: "Výsledok 16 — $8.010,12 · top 2,71% Creators",
  },
  {
    src: assetUrl("/images/all-b64-17.png"),
    alt: "Výsledok 12 — $4.060,27 tento mesiac",
  },
  {
    src: assetUrl("/images/all-b64-7.png"),
    alt: "Výsledok 5 — $3.010,09 earnings",
  },
] as const;

export const CTA_LABEL = "Chcem video zdarma";
export const CTA_LABEL_HOVER = "Chcem video zdarma →";
export const STICKY_CTA_LABEL = "Video Zdarma";

export const CONSENT_TEXT =
  "Zadaním emailu súhlasíš, že ti môžeme písať. Kedykoľvek sa odhlásiš jedným klikom.";

/** Formal legal text — kept for compliance, not shown prominently */
export const LEGAL_FINE_PRINT =
  "Odoslaním formuláru súhlasíš so spracovaním osobných údajov za účelom marketingovej komunikácie. Spracováva Juraj Olšavský - Byznys.";

/** @deprecated use CONSENT_TEXT */
export const GDPR_TEXT_1 = CONSENT_TEXT;
/** @deprecated use CONSENT_TEXT */
export const GDPR_TEXT_2 = CONSENT_TEXT;

export const DISCORD_INVITE_URL = "https://discord.gg/aifune";

export const FORM_ERRORS = {
  empty: "Zabudol si email",
  invalid: "Tento email nevyzerá správne",
  subscribed: "Toto video už máš! Skontroluj si inbox (aj spam)",
  network: "Niečo sa pokazilo. Skús to ešte raz o chvíľu.",
} as const;

export const FORM_ERROR_ICONS: Partial<Record<keyof typeof FORM_ERRORS, EmojiName>> =
  {
    empty: "eyes",
  };

export type BenefitItem = {
  icon: EmojiName;
  text: string;
};

export const BENEFITS: BenefitItem[] = [
  {
    icon: "trophy",
    text: "Prečo sú AI fuňe najlepší biznis roka 2026",
  },
  {
    icon: "rocket",
    text: "Ako som začal ja — aj s chybami, ktorým sa vyhneš",
  },
  {
    icon: "money-bag",
    text: "Ako si spraviť vlastnú fuňu a začať zarábať bez skúseností",
  },
  {
    icon: "hammer-wrench",
    text: "Presný zoznam programov, ktoré na to potrebuješ",
  },
  {
    icon: "chart-up",
    text: "Ako robiť marketing, aby ťa ľudia videli",
  },
  {
    icon: "dollar",
    text: "Presne kde a ako sa k tebe peniaze dostanú",
  },
  {
    icon: "handshake",
    text: "Ako ti pomôžem ja a celá komunita",
  },
];

export const FAQ_ITEMS = [
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
] as const;

/** Social proof cards — lazy-loaded below fold */
export const PROOF_SCREENSHOTS = [
  { src: assetUrl("/images/all-b64-9.png"), alt: "Výsledok 4" },
  { src: assetUrl("/images/all-b64-10.png"), alt: "Výsledok 5" },
  { src: assetUrl("/images/all-b64-11.png"), alt: "Výsledok 6" },
  { src: assetUrl("/images/all-b64-12.png"), alt: "Výsledok 7" },
  { src: assetUrl("/images/all-b64-13.png"), alt: "Výsledok 8" },
  { src: assetUrl("/images/all-b64-14.png"), alt: "Výsledok 9" },
  { src: assetUrl("/images/all-b64-15.png"), alt: "Výsledok 10" },
  { src: assetUrl("/images/all-b64-16.png"), alt: "Výsledok 11" },
  { src: assetUrl("/images/all-b64-18.png"), alt: "Výsledok 13" },
  { src: assetUrl("/images/all-b64-19.png"), alt: "Výsledok 14" },
  { src: assetUrl("/images/all-b64-20.png"), alt: "Výsledok 15" },
  { src: assetUrl("/images/all-b64-22.png"), alt: "Výsledok 17" },
  { src: assetUrl("/images/all-b64-23.png"), alt: "Výsledok 18" },
  { src: assetUrl("/images/all-b64-24.png"), alt: "Výsledok 19" },
  { src: assetUrl("/images/all-b64-25.png"), alt: "Výsledok 20" },
  { src: assetUrl("/images/all-b64-26.png"), alt: "Výsledok 21" },
  { src: assetUrl("/images/all-b64-27.png"), alt: "Výsledok 22" },
  { src: assetUrl("/images/all-b64-28.png"), alt: "Výsledok 23" },
  { src: assetUrl("/images/all-b64-29.png"), alt: "Výsledok 24" },
  { src: assetUrl("/images/all-b64-30.png"), alt: "Výsledok 25" },
  { src: assetUrl("/images/all-b64-31.png"), alt: "Výsledok 26" },
  { src: assetUrl("/images/all-b64-32.png"), alt: "Výsledok 27" },
  { src: assetUrl("/images/all-b64-33.png"), alt: "Výsledok 28" },
  { src: assetUrl("/images/all-b64-34.png"), alt: "Výsledok 29" },
];

export const IMAGES = {
  logo: assetUrl("/images/all-b64-0.png"),
  founderHero: assetUrl("/images/all-b64-2.png"),
  founderStory: assetUrl("/images/all-b64-5.webp"),
  proofSupport1: assetUrl("/images/all-b64-6.png"),
  proofSupport2: assetUrl("/images/all-b64-7.png"),
  proofSupport3: assetUrl("/images/all-b64-8.png"),
  aiExpert: assetUrl("/images/all-b64-3.jpg"),
  heroFerrariSelfie: assetUrl("/images/hero-ferrari-selfie.png"),
  heroBgResult: assetUrl("/images/all-b64-20.png"),
  earningsProof: assetUrl("/images/all-b64-21.png"),
};
