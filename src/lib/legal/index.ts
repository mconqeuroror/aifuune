import { cookiesDocument } from "./cookies";
import { privacyDocument } from "./privacy";
import { termsDocument } from "./terms";
import type { LegalDocument } from "./types";

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  termsDocument,
  privacyDocument,
  cookiesDocument,
];

export const LEGAL_DOCUMENTS_BY_PATH = Object.fromEntries(
  LEGAL_DOCUMENTS.map((doc) => [doc.path, doc]),
) as Record<string, LegalDocument>;

export function getLegalDocument(path: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS_BY_PATH[path];
}

export { cookiesDocument, privacyDocument, termsDocument };
export type { LegalBlock, LegalDocument, LegalSection } from "./types";
