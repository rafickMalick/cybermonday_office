// Validation du formulaire de commande B2B (règles du README).

import type { PaymentMethod } from "./catalog";

export const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
export const VAT_RE = /^[A-Z]{2}[0-9A-Z]{8,12}$/;

export const stripSpaces = (s: string): string => s.replace(/\s/g, "");

export const isEmail = (s: string): boolean => EMAIL_RE.test(s.trim());
/** SIRET : 14 chiffres (espaces tolérés). La clé de Luhn n'est pas contrôlée. */
export const isSiret = (s: string): boolean => /^\d{14}$/.test(stripSpaces(s));
/** N° de TVA intracommunautaire : 2 lettres puis 8 à 12 caractères alphanumériques (espaces tolérés). */
export const isVatNumber = (s: string): boolean => VAT_RE.test(stripSpaces(s).toUpperCase());
/** Code postal français : 5 chiffres. */
export const isPostalCode = (s: string): boolean => /^\d{5}$/.test(s.trim());
export const isCardNumber = (s: string): boolean => /^\d{16}$/.test(stripSpaces(s));
export const isCvc = (s: string): boolean => /^\d{3,4}$/.test(s.trim());

/** Expiration MM/AA valide et non échue à la date `now`. */
export function isCardExpiry(s: string, now: Date = new Date()): boolean {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(s.trim());
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return false;
  // Valide jusqu'à la fin du mois d'expiration.
  return new Date(year, month, 1).getTime() > now.getTime();
}

export type FormValues = Partial<Record<string, string>>;
export type FormErrors = Record<string, string>;

export interface CheckoutInput {
  form: FormValues;
  pay: PaymentMethod;
  billingDiff: boolean;
  cgvOk: boolean;
  now?: Date;
}

const REQUIRED = ["email", "prenom", "nom", "societe", "adresse", "cp", "ville"] as const;

/** Retourne les messages d'erreur par champ ; objet vide si le formulaire est valide. */
export function validateCheckout({ form: f, pay, billingDiff, cgvOk, now }: CheckoutInput): FormErrors {
  const e: FormErrors = {};
  const val = (k: string) => (f[k] ?? "").trim();
  const req = (k: string, msg = "Champ requis") => {
    if (!val(k)) e[k] = msg;
  };

  REQUIRED.forEach((k) => req(k));
  if (val("email") && !isEmail(val("email"))) e.email = "Adresse e-mail invalide";
  if (!isSiret(val("siret"))) e.siret = "14 chiffres requis";
  if (val("tva") && !isVatNumber(val("tva"))) e.tva = "Format attendu : FR12345678901";
  if (val("cp") && !isPostalCode(val("cp"))) e.cp = "5 chiffres";
  if (billingDiff) {
    req("bAdresse");
    req("bVille");
    req("bCp");
    if (val("bCp") && !isPostalCode(val("bCp"))) e.bCp = "5 chiffres";
  }
  if (pay === "card") {
    if (!isCardNumber(val("card"))) e.card = val("card") ? "Numéro incomplet (16 chiffres)" : "Champ requis";
    if (!val("exp")) e.exp = "Champ requis";
    else if (!isCardExpiry(val("exp"), now)) e.exp = "Format MM/AA, date non échue";
    if (!val("cvc")) e.cvc = "Champ requis";
    else if (!isCvc(val("cvc"))) e.cvc = "3 ou 4 chiffres";
  }
  if (pay === "po") req("po", "Numéro de bon de commande requis");
  if (!cgvOk) e.cgv = "Veuillez accepter les CGV";
  return e;
}
