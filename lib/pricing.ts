// Règles de prix, remises, livraison, installation et TVA — fonctions pures, testées dans tests/pricing.test.ts.

import { BUNDLE_DISCOUNT, BUNDLE_IDS, TIERS, mustProduct, getProduct, type Product } from "./catalog";
import { r2 } from "./format";

export type TaxMode = "HT" | "TTC";

export const VAT_RATE = 0.2;
export const SHIPPING_HT = 19;
export const FREE_SHIPPING_FROM_HT = 300;
export const INSTALL_PER_POSTE_HT = 49;
/** Jours ouvrés de garantie par an, pour l'équivalent « par jour ouvré ». */
export const WORKDAYS_PER_YEAR = 220;

export interface CartLine { id: string; qty: number }

/** Multiplie un prix HT selon le mode d'affichage. */
export const displayPrice = (ht: number, mode: TaxMode): number => (mode === "TTC" ? ht * (1 + VAT_RATE) : ht);

/** Remise volume en % pour un nombre de postes donné. */
export function tierFor(postes: number): number {
  let pct = 0;
  for (const t of TIERS) if (postes >= t.n) pct = t.p;
  return pct;
}

// --- Pack ---------------------------------------------------------------------------------

/** Somme des prix HT séparés, somme des prix catalogue, prix HT du pack (arrondi à l'euro). */
export function bundlePrices() {
  const sum = BUNDLE_IDS.reduce((s, id) => s + mustProduct(id).ht, 0);
  const was = BUNDLE_IDS.reduce((s, id) => s + mustProduct(id).was, 0);
  return { sum, was, ht: Math.round(sum * (1 - BUNDLE_DISCOUNT)) };
}

// --- Panier -------------------------------------------------------------------------------

/** Nombre de postes = quantité de packs + quantité maximale d'une même ligne. */
export function countPostes(lines: CartLine[], bundleQty: number): number {
  return bundleQty + lines.reduce((m, l) => Math.max(m, l.qty), 0);
}

export interface CartTotals {
  /** Sous-total HT avant remise volume. */
  sub: number;
  /** Total des prix catalogue HT (pour calculer l'économie). */
  was: number;
  postes: number;
  /** % de remise volume appliqué. */
  tier: number;
  vol: number;
  /** Sous-total HT après remise volume. */
  net: number;
  ship: number;
  inst: number;
  /** Total HT (net + livraison + installation). */
  base: number;
  tva: number;
  ttc: number;
  /** Économie HT vs prix catalogue, remise volume comprise. */
  save: number;
  /** Nombre d'articles (pack compris). */
  count: number;
}

export function computeCart(lines: CartLine[], bundleQty: number, install: boolean): CartTotals {
  let sub = 0;
  let was = 0;
  let count = bundleQty;
  for (const l of lines) {
    const p = getProduct(l.id);
    if (!p) continue;
    sub += p.ht * l.qty;
    was += p.was * l.qty;
    count += l.qty;
  }
  if (bundleQty > 0) {
    const b = bundlePrices();
    sub += b.ht * bundleQty;
    was += b.was * bundleQty;
  }
  const postes = countPostes(lines, bundleQty);
  const tier = tierFor(postes);
  const vol = r2((sub * tier) / 100);
  const net = r2(sub - vol);
  const ship = sub === 0 || net >= FREE_SHIPPING_FROM_HT ? 0 : SHIPPING_HT;
  const inst = install && sub > 0 ? INSTALL_PER_POSTE_HT * Math.max(postes, 1) : 0;
  const base = r2(net + ship + inst);
  const tva = r2(base * VAT_RATE);
  const ttc = r2(base + tva);
  return { sub, was, postes, tier, vol, net, ship, inst, base, tva, ttc, save: r2(was - sub + vol), count };
}

export interface TierProgress {
  message: string;
  current: string;
  /** Remplissage de la barre, en % (10 postes = 100 %). */
  fill: number;
}

/** Message et remplissage de la barre de remise volume. `unit` : « poste », « article »… */
export function tierProgress(postes: number, unit = "poste"): TierProgress {
  const t = tierFor(postes);
  const next = TIERS.find((x) => postes < x.n);
  const rest = next ? next.n - postes : 0;
  return {
    message: next
      ? `Plus que ${rest} ${unit}${rest > 1 ? "s" : ""} pour débloquer −${next.p} %`
      : "Remise maximale débloquée. Au-delà de 10 postes : devis.",
    current: t ? `−${t} % appliqués` : "Remise volume",
    fill: Math.min(postes / 10, 1) * 100,
  };
}

// --- Fiche produit ------------------------------------------------------------------------

/** Total HT pour `qty` postes d'un produit, remise volume incluse (barre d'achat de la fiche). */
export function lineTotalWithTier(p: Product, qty: number): number {
  return r2(p.ht * qty * (1 - tierFor(qty) / 100));
}

/** Coût HT par jour ouvré sur la durée de garantie. */
export const perWorkday = (ht: number, warrantyYears: number): number => ht / (warrantyYears * WORKDAYS_PER_YEAR);

/** Pourcentage de stock déjà vendu. */
export const soldPercent = (p: Pick<Product, "stock" | "init">): number => Math.round((1 - p.stock / p.init) * 100);

// --- Livraison ----------------------------------------------------------------------------

/** Ajoute `n` jours ouvrés (hors samedi et dimanche) à une date. */
export function addBusinessDays(from: Date | number, n: number): Date {
  const d = new Date(from);
  while (n > 0) {
    d.setDate(d.getDate() + 1);
    const w = d.getDay();
    if (w !== 0 && w !== 6) n--;
  }
  return d;
}

// --- Next Upgrade -------------------------------------------------------------------------

export const UPGRADE_WINDOW_MS = 15 * 60 * 1000;

export interface UpgradeOffer {
  id: "poste" | "warranty" | "acc";
  kicker: string;
  title: string;
  desc: string;
  /** Prix HT de l'offre. */
  ht: number;
  /** Prix HT de référence barré. */
  was: number;
}

export interface UpgradeInput {
  /** Sous-total HT de la commande. */
  sub: number;
  /** La commande contient au moins un poste (pack, bureau ou chaise). */
  hasPoste: boolean;
  /** Ids produits de la commande. */
  ids: string[];
}

/** Offres proposées après commande : poste −20 %, +2 ans de garantie, accessoire non acheté −20 %. */
export function upgradeOffers(o: UpgradeInput): UpgradeOffer[] {
  const ups: UpgradeOffer[] = [];
  const b = bundlePrices();
  if (o.hasPoste) {
    ups.push({ id: "poste", kicker: "Poste supplémentaire", title: "Équipez un poste de plus : pack complet à −20 %", desc: "Au lieu de −12 %. Même configuration, livré et installé avec votre commande.", ht: r2(b.sum * 0.8), was: b.sum });
  }
  ups.push({
    id: "warranty", kicker: "Extension de garantie", title: "+2 ans de garantie sur toute la commande",
    desc: "Intervention sur site sous 48 h, pièces et main-d’œuvre incluses.",
    ht: Math.max(29, Math.round(o.sub * 0.04)), was: Math.max(49, Math.round(o.sub * 0.07)),
  });
  const accId = ["lumen", "talk", "cam4k", "dock12"].find((id) => !o.ids.includes(id)) ?? "lumen";
  const acc = mustProduct(accId);
  ups.push({ id: "acc", kicker: "Accessoire complémentaire", title: `${acc.name} · ${acc.type}`, desc: acc.short, ht: r2(acc.ht * 0.8), was: acc.was });
  return ups;
}

/** Une commande contient un « poste » si elle a un pack, un bureau ou une chaise. */
export const orderHasPoste = (bundleQty: number, ids: string[]): boolean =>
  bundleQty > 0 || ids.includes("lift") || ids.includes("axis");
