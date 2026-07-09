export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "table"; headers: [string, string]; rows: [string, string][] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  path: string;
  title: string;
  description: string;
  updatedAt: string;
  effectiveFrom: string;
  sections: LegalSection[];
};
