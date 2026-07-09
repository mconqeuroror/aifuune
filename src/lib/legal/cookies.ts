import type { LegalDocument } from "./types";

export const cookiesDocument: LegalDocument = {
  path: "/cookies",
  title: "Cookies",
  description:
    "Zásady používania cookies na webovej stránke AI Fuňe — typy cookies, právne základy a správa súhlasu.",
  updatedAt: "1. apríl 2026",
  effectiveFrom: "1. apríl 2026",
  sections: [
    {
      title: "1. Úvod",
      blocks: [
        {
          type: "p",
          text: "Táto webová stránka používa cookies a podobné technológie na zabezpečenie jej správneho fungovania, analýzu návštevnosti a marketingové účely.",
        },
        {
          type: "p",
          text: "Používaním tejto stránky súhlasíte s používaním cookies v súlade s týmito zásadami.",
        },
      ],
    },
    {
      title: "2. Prevádzkovateľ",
      blocks: [
        { type: "p", text: "Prevádzkovateľom webovej stránky je:" },
        { type: "p", text: "AI Fuňe" },
        { type: "p", text: "Email: jorgebyznys@gmail.com" },
      ],
    },
    {
      title: "3. Čo sú cookies",
      blocks: [
        {
          type: "p",
          text: "Cookies sú malé textové súbory, ktoré sa ukladajú do vášho zariadenia pri návšteve webovej stránky.",
        },
        { type: "p", text: "Pomáhajú:" },
        {
          type: "ul",
          items: [
            "zapamätať si vaše nastavenia",
            "analyzovať správanie používateľov",
            "zobrazovať relevantnú reklamu",
          ],
        },
      ],
    },
    {
      title: "4. Aké cookies používame",
      blocks: [
        { type: "h3", text: "4.1 Nevyhnutné cookies" },
        { type: "p", text: "Tieto cookies sú potrebné na fungovanie stránky." },
        { type: "p", text: "Bez nich by:" },
        {
          type: "ul",
          items: [
            "nefungoval checkout",
            "nebolo možné prihlásenie",
            "stránka by sa nezobrazovala správne",
          ],
        },
        { type: "p", text: "Právny základ: oprávnený záujem" },
        { type: "h3", text: "4.2 Analytické cookies" },
        { type: "p", text: "Používame ich na:" },
        {
          type: "ul",
          items: [
            "meranie návštevnosti",
            "sledovanie správania na stránke",
            "optimalizáciu funnelu",
          ],
        },
        { type: "p", text: "Napríklad: Google Analytics, interné nástroje Emifunnel / Simvoly." },
        { type: "p", text: "Právny základ: súhlas" },
        { type: "h3", text: "4.3 Marketingové cookies" },
        { type: "p", text: "Používame ich na:" },
        {
          type: "ul",
          items: [
            "Facebook reklamy",
            "remarketing",
            "meranie konverzií",
          ],
        },
        { type: "p", text: "Konkrétne: Meta Pixel (Facebook Pixel), prípadne Conversion API." },
        { type: "p", text: "Pomocou nich vieme:" },
        {
          type: "ul",
          items: [
            "sledovať, kto navštívil stránku",
            "zobrazovať reklamy týmto ľuďom",
            "optimalizovať kampane",
          ],
        },
        { type: "p", text: "Právny základ: súhlas" },
      ],
    },
    {
      title: "5. Tretie strany",
      blocks: [
        { type: "p", text: "Cookies môžu byť spracovávané aj tretími stranami:" },
        {
          type: "ul",
          items: [
            "Meta Platforms (Facebook, Instagram)",
            "Google",
            "Simvoly / Emifunnel",
            "platobné brány",
          ],
        },
        {
          type: "p",
          text: "Tieto spoločnosti môžu spracúvať údaje aj mimo EÚ.",
        },
      ],
    },
    {
      title: "6. Prenos údajov mimo EÚ",
      blocks: [
        {
          type: "p",
          text: "Niektoré služby (napr. Meta, Google) môžu prenášať údaje do USA.",
        },
        { type: "p", text: "Ochrana je zabezpečená:" },
        {
          type: "ul",
          items: [
            "štandardnými zmluvnými doložkami (SCC)",
            "bezpečnostnými opatreniami podľa GDPR",
          ],
        },
      ],
    },
    {
      title: "7. Ako spravovať cookies",
      blocks: [
        { type: "p", text: "Pri prvej návšteve webu máte možnosť:" },
        {
          type: "ul",
          items: [
            "prijať všetky cookies",
            "odmietnuť marketingové cookies",
            "nastaviť vlastné preferencie",
          ],
        },
        { type: "p", text: "Cookies môžete kedykoľvek:" },
        {
          type: "ul",
          items: [
            "zmeniť v nastaveniach prehliadača",
            "vymazať zo zariadenia",
          ],
        },
      ],
    },
    {
      title: "8. Odvolanie súhlasu",
      blocks: [
        { type: "p", text: "Súhlas s cookies môžete kedykoľvek odvolať:" },
        {
          type: "ul",
          items: ["cez cookie lištu", "alebo nastavenia prehliadača"],
        },
      ],
    },
    {
      title: "9. Doba uchovávania cookies",
      blocks: [
        { type: "p", text: "Cookies uchovávame:" },
        {
          type: "ul",
          items: [
            "session cookies: počas návštevy",
            "analytické: max. 26 mesiacov",
            "marketingové: max. 24 mesiacov",
          ],
        },
      ],
    },
    {
      title: "10. Vaše práva",
      blocks: [
        { type: "p", text: "Máte právo:" },
        {
          type: "ul",
          items: [
            "na prístup k údajom",
            "na vymazanie",
            "na opravu",
            "na obmedzenie spracovania",
            "namietať spracovanie",
          ],
        },
        {
          type: "p",
          text: 'Viac informácií nájdete v dokumente „Ochrana osobných údajov".',
        },
      ],
    },
    {
      title: "11. Záverečné ustanovenia",
      blocks: [
        { type: "p", text: "Tieto zásady sú platné od: 1. apríl 2026" },
        { type: "p", text: "Prevádzkovateľ si vyhradzuje právo ich meniť." },
        { type: "p", text: "Posledná aktualizácia: 1. apríl 2026" },
      ],
    },
  ],
};
