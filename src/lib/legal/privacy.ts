import type { LegalDocument } from "./types";

export const privacyDocument: LegalDocument = {
  path: "/ochrana-osobnych-udajov",
  title: "Ochrana osobných údajov",
  description:
    "Zásady ochrany osobných údajov AI Fuňe v súlade s GDPR a zákonom č. 18/2018 Z. z.",
  updatedAt: "1. apríl 2026",
  effectiveFrom: "1. apríl 2026",
  sections: [
    {
      title: "1. Úvod",
      blocks: [
        { type: "p", text: "Vaše osobné údaje spracúvame v súlade s:" },
        {
          type: "ul",
          items: [
            "Nariadením (EÚ) 2016/679 (GDPR)",
            "zákonom č. 18/2018 Z. z. o ochrane osobných údajov",
          ],
        },
        {
          type: "p",
          text: "Bezpečnosť a ochrana vašich údajov je pre nás prioritou.",
        },
      ],
    },
    {
      title: "2. Prevádzkovateľ",
      blocks: [
        { type: "p", text: "Prevádzkovateľom osobných údajov je:" },
        { type: "p", text: "AI Fuňe" },
        { type: "p", text: "Email: jorgebyznys@gmail.com" },
        { type: "p", text: "Telefón: +421 940 216 575" },
      ],
    },
    {
      title: "3. Aké údaje spracúvame",
      blocks: [
        { type: "p", text: "Spracúvame najmä:" },
        { type: "h3", text: "Identifikačné údaje" },
        {
          type: "ul",
          items: ["meno, priezvisko", "IČO, DIČ (pri firmách)"],
        },
        { type: "h3", text: "Kontaktné údaje" },
        { type: "ul", items: ["email", "telefón"] },
        { type: "h3", text: "Fakturačné údaje" },
        { type: "ul", items: ["adresa", "krajina", "údaje o platbe"] },
        { type: "h3", text: "Technické údaje" },
        {
          type: "ul",
          items: ["IP adresa", "cookies", "správanie na webe"],
        },
        { type: "h3", text: "Marketingové údaje" },
        {
          type: "ul",
          items: [
            "odpovede vo formulároch",
            "reakcie na emaily",
            "aktivita vo funneli",
          ],
        },
      ],
    },
    {
      title: "4. Účely a právne základy spracovania",
      blocks: [
        { type: "h3", text: "4.1 Realizácia objednávky" },
        {
          type: "ul",
          items: [
            "spracovanie objednávky",
            "dodanie kurzu / prístupov",
            "vystavenie faktúry",
          ],
        },
        { type: "p", text: "Právny základ: plnenie zmluvy" },
        { type: "h3", text: "4.2 Účtovníctvo a zákonné povinnosti" },
        {
          type: "ul",
          items: ["evidencia platieb", "archivácia dokladov"],
        },
        { type: "p", text: "Právny základ: zákonná povinnosť" },
        { type: "h3", text: "4.3 Komunikácia so zákazníkom" },
        {
          type: "ul",
          items: ["podpora", "reklamácie", "odpovede na otázky"],
        },
        { type: "p", text: "Právny základ: oprávnený záujem" },
        { type: "h3", text: "4.4 Marketing (emaily, funnel)" },
        {
          type: "ul",
          items: ["newsletter", "predajné emaily", "remarketing"],
        },
        {
          type: "p",
          text: "Právny základ: súhlas alebo oprávnený záujem (pri existujúcom zákazníkovi)",
        },
        { type: "h3", text: "4.5 Webináre a komunitné programy" },
        {
          type: "ul",
          items: [
            "registrácia na webinár",
            "prístup do komunity",
            "komunikácia v rámci programu",
          ],
        },
        {
          type: "p",
          text: "Právny základ: súhlas alebo plnenie zmluvy",
        },
        { type: "h3", text: "4.6 Cookies a analytika" },
        {
          type: "ul",
          items: ["meranie návštevnosti", "optimalizácia reklám"],
        },
        {
          type: "p",
          text: "Právny základ: súhlas (marketing cookies), oprávnený záujem (základné cookies)",
        },
      ],
    },
    {
      title: "5. Príjemcovia údajov",
      blocks: [
        { type: "p", text: "Vaše údaje môžu byť sprístupnené:" },
        {
          type: "ul",
          items: [
            "poskytovateľom webu a funnelu (napr. Mioweb / Systeme.io / hosting)",
            "platobným bránam (napr. Stripe, GoPay)",
            "email nástrojom (napr. SmartEmailing, MailerLite, ActiveCampaign)",
            "účtovníkovi",
            "marketingovým nástrojom (Meta, Google)",
            "spolupracovníkom",
          ],
        },
        { type: "p", text: "Všetci sú viazaní mlčanlivosťou a GDPR." },
      ],
    },
    {
      title: "6. Prenos do tretích krajín",
      blocks: [
        {
          type: "p",
          text: "Niektoré nástroje (napr. Meta, Google, email nástroje) môžu prenášať údaje mimo EÚ.",
        },
        { type: "p", text: "V takom prípade používame:" },
        {
          type: "ul",
          items: [
            "štandardné zmluvné doložky (SCC)",
            "alebo nástroje s adekvátnou ochranou",
          ],
        },
      ],
    },
    {
      title: "7. Doba uchovávania údajov",
      blocks: [
        {
          type: "table",
          headers: ["Typ údajov", "Doba"],
          rows: [
            ["Faktúry a objednávky", "10 rokov"],
            ["Marketingové údaje", "do odvolania súhlasu (max. 5 rokov)"],
            ["Kontaktné formuláre", "12 mesiacov"],
            ["Webináre / registrácie", "5 rokov"],
            ["Cookies", "max. 2 roky"],
          ],
        },
      ],
    },
    {
      title: "8. Práva dotknutej osoby",
      blocks: [
        { type: "p", text: "Máte právo:" },
        {
          type: "ul",
          items: [
            "na prístup k údajom",
            "na opravu údajov",
            'na vymazanie („byť zabudnutý")',
            "na obmedzenie spracovania",
            "na prenosnosť údajov",
            "namietať spracovanie",
            "odvolať súhlas",
            "podať sťažnosť na Úrad na ochranu osobných údajov",
          ],
        },
      ],
    },
    {
      title: "9. Ako si uplatniť práva",
      blocks: [
        { type: "p", text: "Napíšte nám na: jorgebyznys@gmail.com" },
        { type: "p", text: "Odpovieme do 30 dní." },
      ],
    },
    {
      title: "10. Bezpečnosť údajov",
      blocks: [
        { type: "p", text: "Používame:" },
        {
          type: "ul",
          items: [
            "HTTPS zabezpečenie",
            "obmedzený prístup k údajom",
            "heslá a zabezpečené systémy",
            "pravidelné zálohy",
          ],
        },
      ],
    },
    {
      title: "11. Automatizované rozhodovanie",
      blocks: [
        {
          type: "p",
          text: "Nevykonávame automatizované rozhodovanie s právnym dopadom.",
        },
      ],
    },
    {
      title: "12. Záverečné ustanovenia",
      blocks: [
        { type: "p", text: "Tieto zásady sú platné od: 1. apríl 2026" },
        { type: "p", text: "Vyhradzujeme si právo ich aktualizovať." },
        { type: "p", text: "Posledná aktualizácia: 1. apríl 2026" },
      ],
    },
  ],
};
