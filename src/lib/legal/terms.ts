import type { LegalDocument } from "./types";

export const termsDocument: LegalDocument = {
  path: "/obchodne-podmienky",
  title: "Obchodné podmienky",
  description:
    "Všeobecné obchodné podmienky AI Fuňe pre predaj digitálnych produktov online.",
  updatedAt: "1. apríl 2026",
  effectiveFrom: "1. apríl 2026",
  sections: [
    {
      title: "1. Úvodné ustanovenia",
      blocks: [
        {
          type: "p",
          text: '1.1. Tieto Všeobecné obchodné podmienky (ďalej len „VOP") upravujú práva a povinnosti medzi predávajúcim a kupujúcim pri predaji digitálnych produktov prostredníctvom internetu.',
        },
        {
          type: "p",
          text: "1.2. Tieto VOP sú neoddeliteľnou súčasťou zmluvy uzatvorenej na diaľku medzi predávajúcim a kupujúcim.",
        },
        {
          type: "p",
          text: "1.3. Odoslaním objednávky kupujúci potvrdzuje, že sa oboznámil s týmito VOP a súhlasí s nimi.",
        },
        { type: "p", text: "1.4. Právne vzťahy sa riadia najmä:" },
        {
          type: "ul",
          items: [
            "zákonom č. 40/1964 Zb. Občiansky zákonník",
            "zákonom č. 108/2024 Z. z. o ochrane spotrebiteľa",
            "zákonom č. 22/2004 Z. z. o elektronickom obchode",
            "zákonom č. 391/2015 Z. z. o alternatívnom riešení sporov",
            "zákonom č. 18/2018 Z. z. o ochrane osobných údajov (GDPR)",
          ],
        },
      ],
    },
    {
      title: "2. Identifikačné údaje predávajúceho",
      blocks: [
        { type: "p", text: "AI Fuňe" },
        { type: "p", text: "Email: jorgebyznys@gmail.com" },
        { type: "p", text: "Telefón (zákaznícka podpora): +421 940 216 575" },
        { type: "p", text: '(ďalej len „Predávajúci")' },
      ],
    },
    {
      title: "3. Predmet predaja",
      blocks: [
        { type: "p", text: "3.1. Predmetom predaja sú digitálne produkty, najmä:" },
        {
          type: "ul",
          items: [
            "online kurzy",
            "členské sekcie a komunity",
            "video obsah, návody, šablóny",
            "digitálne materiály a dokumenty",
          ],
        },
        {
          type: "p",
          text: "3.2. Produkty sú dodávané výlučne v digitálnej forme bez fyzického nosiča.",
        },
        { type: "p", text: "3.3. Prístup k produktom je poskytovaný:" },
        {
          type: "ul",
          items: ["emailom", "cez členskú sekciu", "alebo prostredníctvom odkazu"],
        },
        {
          type: "p",
          text: "3.4. Kupujúci berie na vedomie, že ide o digitálny obsah.",
        },
      ],
    },
    {
      title: "4. Objednávka a uzatvorenie zmluvy",
      blocks: [
        {
          type: "p",
          text: "4.1. Objednávka prebieha prostredníctvom webovej stránky predávajúceho.",
        },
        { type: "p", text: "4.2. Zmluva vzniká:" },
        { type: "ul", items: ["odoslaním objednávky", "a jej zaplatením"] },
        {
          type: "p",
          text: "4.3. Predávajúci si vyhradzuje právo objednávku odmietnuť (napr. technická chyba, nesprávna cena).",
        },
      ],
    },
    {
      title: "5. Cena a platobné podmienky",
      blocks: [
        { type: "p", text: "5.1. Všetky ceny sú uvedené v EUR." },
        { type: "p", text: "5.2. Predávajúci nie je platcom DPH." },
        { type: "p", text: "5.3. Platba je možná výlučne:" },
        { type: "ul", items: ["online kartou cez platobnú bránu"] },
        { type: "p", text: "5.4. Produkt je sprístupnený až po úhrade." },
      ],
    },
    {
      title: "6. Dodanie produktu",
      blocks: [
        { type: "p", text: "6.1. Dodanie prebieha automaticky po zaplatení." },
        { type: "p", text: "6.2. Dodanie môže byť:" },
        { type: "ul", items: ["okamžité", "alebo do 24 hodín"] },
        { type: "p", text: "6.3. Kupujúci je povinný mať:" },
        {
          type: "ul",
          items: [
            "internet",
            "zariadenie schopné prehrávať obsah",
          ],
        },
      ],
    },
    {
      title: "7. Odstúpenie od zmluvy",
      blocks: [
        { type: "p", text: "7.1. Kupujúci nemá právo na odstúpenie od zmluvy, ak:" },
        {
          type: "ul",
          items: [
            "digitálny obsah bol dodaný",
            "dal výslovný súhlas so začatím dodania",
            "bol poučený, že tým stráca právo na odstúpenie",
          ],
        },
        {
          type: "p",
          text: "7.2. Tento súhlas kupujúci udeľuje pri nákupe (checkbox).",
        },
        {
          type: "p",
          text: "7.3. Ak tieto podmienky nie sú splnené, má kupujúci právo odstúpiť do 14 dní.",
        },
      ],
    },
    {
      title: "8. Reklamačný poriadok",
      blocks: [
        { type: "p", text: "8.1. Reklamovať je možné iba:" },
        {
          type: "ul",
          items: ["technické problémy", "nefunkčný obsah"],
        },
        {
          type: "p",
          text: "8.2. Reklamáciu je potrebné zaslať na: jorgebyznys@gmail.com",
        },
        { type: "p", text: "8.3. Reklamácia musí obsahovať:" },
        {
          type: "ul",
          items: ["meno", "email", "popis problému"],
        },
        { type: "p", text: "8.4. Lehota na vybavenie: max. 30 dní" },
        { type: "p", text: "8.5. Nie je možné reklamovať:" },
        {
          type: "ul",
          items: [
            "nespokojnosť",
            "zmenu názoru",
            "nevyužitie produktu",
          ],
        },
      ],
    },
    {
      title: "9. Autorské práva",
      blocks: [
        {
          type: "p",
          text: "9.1. Všetok obsah je chránený autorským zákonom.",
        },
        { type: "p", text: "9.2. Kupujúci získava:" },
        { type: "ul", items: ["nevýhradnú", "neprenosnú licenciu"] },
        { type: "p", text: "9.3. Zakazuje sa:" },
        {
          type: "ul",
          items: [
            "zdieľanie",
            "kopírovanie",
            "predaj",
            "poskytovanie tretím osobám",
          ],
        },
      ],
    },
    {
      title: "10. Ochrana osobných údajov",
      blocks: [
        {
          type: "p",
          text: "10.1. Spracovanie údajov prebieha v súlade s GDPR.",
        },
        { type: "p", text: "10.2. Údaje sa používajú na:" },
        {
          type: "ul",
          items: [
            "vybavenie objednávky",
            "komunikáciu",
            "marketing (ak je súhlas)",
          ],
        },
        {
          type: "p",
          text: '10.3. Podrobnosti sú uvedené v dokumente „Ochrana osobných údajov".',
        },
      ],
    },
    {
      title: "11. Cookies",
      blocks: [
        { type: "p", text: "11.1. Web používa cookies na:" },
        {
          type: "ul",
          items: ["funkčnosť", "analytiku", "marketing"],
        },
        { type: "p", text: "11.2. Používateľ má možnosť cookies spravovať." },
      ],
    },
    {
      title: "12. Alternatívne riešenie sporov",
      blocks: [
        { type: "p", text: "Orgán dozoru: Slovenská obchodná inšpekcia (SOI), www.soi.sk" },
        { type: "p", text: "ODR platforma: https://ec.europa.eu/odr" },
      ],
    },
    {
      title: "13. Záverečné ustanovenia",
      blocks: [
        {
          type: "p",
          text: "13.1. Tieto VOP nadobúdajú platnosť dňom zverejnenia.",
        },
        { type: "p", text: "13.2. Predávajúci si vyhradzuje právo ich meniť." },
        { type: "p", text: "13.3. Právne vzťahy sa riadia právom SR." },
        { type: "p", text: "Posledná aktualizácia: 1. apríl 2026" },
      ],
    },
  ],
};
