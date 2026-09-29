// Formatage des prix et dates au format fr-FR.

const nf2 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2, maximumFractionDigits: 2 });
const nf0 = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 0, maximumFractionDigits: 0 });

/** Arrondi au centime. */
export const r2 = (v: number): number => Math.round((v + Number.EPSILON) * 100) / 100;

/** Prix compact : sans décimales si le montant est entier (« 749 € »), sinon deux décimales. */
export function eur(v: number): string {
  const r = r2(v);
  return (Number.isInteger(r) ? nf0 : nf2).format(r);
}

/** Prix avec toujours deux décimales (totaux, factures). */
export function eur2(v: number): string {
  return nf2.format(r2(v));
}

/** Pourcentage de remise affiché : « −25 % » (vrai signe moins). */
export function pctLabel(ht: number, was: number): string {
  return "−" + Math.round((1 - ht / was) * 100) + " %";
}

export const pad2 = (n: number): string => String(n).padStart(2, "0");

/** « 1 j 07:14:03 » décomposé à partir d'un nombre de millisecondes restantes. */
export function splitDuration(ms: number) {
  const left = Math.max(0, ms);
  return {
    d: Math.floor(left / 864e5),
    h: Math.floor(left / 36e5) % 24,
    m: Math.floor(left / 6e4) % 60,
    s: Math.floor(left / 1e3) % 60,
  };
}

export function formatCountdown(ms: number): string {
  const { d, h, m, s } = splitDuration(ms);
  return `${d}j ${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

export const formatLongDate = (d: Date | number): string =>
  new Date(d).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

export const formatShortDate = (d: Date | number): string => new Date(d).toLocaleDateString("fr-FR");

/** Normalise les espaces insécables et signes typographiques pour les polices PDF standard. */
export function pdfSafe(t: string): string {
  return String(t)
    .replace(/[  ]/g, " ")
    .replace(/−/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"');
}
