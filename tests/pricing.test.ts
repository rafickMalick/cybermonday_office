import { describe, expect, it } from "vitest";
import { getProduct, PRODUCTS } from "@/lib/catalog";
import {
  addBusinessDays, bundlePrices, computeCart, countPostes, displayPrice, lineTotalWithTier, orderHasPoste, perWorkday,
  soldPercent, tierFor, tierProgress, upgradeOffers,
} from "@/lib/pricing";
import { eur, eur2, pctLabel } from "@/lib/format";

const ht = (id: string) => getProduct(id)!.ht;

describe("catalogue", () => {
  it("contient 10 produits aux slugs et ids uniques", () => {
    expect(PRODUCTS).toHaveLength(10);
    expect(new Set(PRODUCTS.map((p) => p.slug)).size).toBe(10);
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(10);
  });
});

describe("HT / TTC", () => {
  it("TTC = HT × 1,2", () => {
    expect(displayPrice(100, "TTC")).toBeCloseTo(120);
    expect(displayPrice(749, "TTC")).toBeCloseTo(898.8);
  });
  it("HT est inchangé", () => {
    expect(displayPrice(749, "HT")).toBe(749);
  });
});

describe("format fr-FR", () => {
  const norm = (s: string) => s.replace(/[  ]/g, " ");
  it("montants entiers sans décimales, sinon deux", () => {
    expect(norm(eur(749))).toBe("749 €");
    expect(norm(eur(898.8))).toBe("898,80 €");
    expect(norm(eur(1710))).toBe("1 710 €");
  });
  it("eur2 force deux décimales", () => {
    expect(norm(eur2(1710))).toBe("1 710,00 €");
  });
  it("pourcentage de remise", () => {
    expect(pctLabel(749, 999)).toBe("−25 %");
  });
});

describe("remise volume", () => {
  it.each([[1, 0], [2, 0], [3, 5], [4, 5], [5, 10], [9, 10], [10, 15], [25, 15]])("%i postes → −%i %%", (n, pct) => {
    expect(tierFor(n)).toBe(pct);
  });
  it("le nombre de postes = packs + quantité maximale d'une ligne", () => {
    expect(countPostes([{ id: "axis", qty: 4 }, { id: "m1", qty: 2 }], 1)).toBe(5);
    expect(countPostes([], 0)).toBe(0);
  });
  it("applique la remise au sous-total HT", () => {
    const c = computeCart([{ id: "axis", qty: 5 }], 0, false);
    expect(c.postes).toBe(5);
    expect(c.tier).toBe(10);
    expect(c.sub).toBe(529 * 5);
    expect(c.vol).toBe(264.5);
    expect(c.net).toBe(2380.5);
  });
  it("message de progression", () => {
    expect(tierProgress(1).message).toBe("Plus que 2 postes pour débloquer −5 %");
    expect(tierProgress(2).message).toBe("Plus que 1 poste pour débloquer −5 %");
    expect(tierProgress(9).message).toBe("Plus que 1 poste pour débloquer −15 %");
    expect(tierProgress(10).message).toMatch(/Remise maximale/);
    expect(tierProgress(5).current).toBe("−10 % appliqués");
    expect(tierProgress(5).fill).toBe(50);
    expect(tierProgress(30).fill).toBe(100);
  });
});

describe("pack", () => {
  it("= somme des 6 articles − 12 %, arrondi à l'euro", () => {
    const b = bundlePrices();
    expect(b.sum).toBe(1944);
    expect(b.was).toBe(2564);
    expect(b.ht).toBe(1711);
  });
  it("compte comme un poste et entre dans le sous-total", () => {
    const c = computeCart([], 3, false);
    expect(c.postes).toBe(3);
    expect(c.sub).toBe(1711 * 3);
    expect(c.tier).toBe(5);
    expect(c.count).toBe(3);
  });
});

describe("livraison", () => {
  it("19 € HT sous 300 € HT net", () => {
    const c = computeCart([{ id: "m1", qty: 1 }], 0, false);
    expect(c.net).toBe(59);
    expect(c.ship).toBe(19);
    expect(c.base).toBe(78);
  });
  it("offerte dès 300 € HT net", () => {
    expect(computeCart([{ id: "view27", qty: 1 }], 0, false).ship).toBe(0);
    // 299 € net : encore payante ; 300 € : offerte
    expect(computeCart([{ id: "flex2", qty: 2 }, { id: "m1", qty: 1 }], 0, false).net).toBe(297);
    expect(computeCart([{ id: "flex2", qty: 2 }, { id: "m1", qty: 1 }], 0, false).ship).toBe(19);
  });
  it("le seuil s'apprécie après remise volume", () => {
    // 3 × Axis 1587 → −5 % ; loin du seuil
    expect(computeCart([{ id: "k2", qty: 3 }], 0, false).net).toBe(282.15);
    expect(computeCart([{ id: "k2", qty: 3 }], 0, false).ship).toBe(19);
  });
  it("panier vide : pas de frais", () => {
    const c = computeCart([], 0, true);
    expect(c.ship).toBe(0);
    expect(c.inst).toBe(0);
    expect(c.ttc).toBe(0);
  });
  it("date estimée à J+4 jours ouvrés", () => {
    // vendredi 27/11/2026 → lun, mar, mer, jeu : jeudi 3 décembre
    expect(addBusinessDays(new Date(2026, 10, 27), 4).toDateString()).toBe(new Date(2026, 11, 3).toDateString());
    // lundi 30/11 → vendredi 4 décembre
    expect(addBusinessDays(new Date(2026, 10, 30), 4).toDateString()).toBe(new Date(2026, 11, 4).toDateString());
  });
});

describe("installation", () => {
  it("49 € HT par poste", () => {
    const c = computeCart([{ id: "axis", qty: 4 }, { id: "m1", qty: 2 }], 1, true);
    expect(c.postes).toBe(5);
    expect(c.inst).toBe(245);
  });
  it("n'est pas facturée sans l'option", () => {
    expect(computeCart([{ id: "axis", qty: 4 }], 0, false).inst).toBe(0);
  });
});

describe("TVA et totaux", () => {
  it("TVA 20 % sur (net + livraison + installation)", () => {
    const c = computeCart([{ id: "m1", qty: 1 }], 0, true);
    // 59 + 19 + 49 = 127
    expect(c.base).toBe(127);
    expect(c.tva).toBe(25.4);
    expect(c.ttc).toBe(152.4);
  });
  it("TTC = HT + TVA au centime près", () => {
    const c = computeCart([{ id: "lift", qty: 3 }, { id: "flex2", qty: 1 }], 1, true);
    expect(c.ttc).toBeCloseTo(c.base + c.tva, 2);
    expect(Math.round(c.tva * 100)).toBe(Math.round(c.base * 20));
  });
  it("économie = catalogue − prix payé + remise volume", () => {
    const c = computeCart([{ id: "lift", qty: 3 }], 0, false);
    expect(c.save).toBeCloseTo((999 - 749) * 3 + (749 * 3 * 5) / 100, 2);
  });
  it("ignore les produits inconnus", () => {
    expect(computeCart([{ id: "nope", qty: 2 }], 0, false).sub).toBe(0);
  });
});

describe("fiche produit", () => {
  it("total remisé selon la quantité choisie", () => {
    expect(lineTotalWithTier(getProduct("axis")!, 5)).toBe(2380.5);
    expect(lineTotalWithTier(getProduct("axis")!, 1)).toBe(529);
  });
  it("≈ X € HT par jour ouvré = HT ÷ (années × 220)", () => {
    expect(perWorkday(749, 5)).toBeCloseTo(0.681, 3);
  });
  it("part de stock vendu", () => {
    expect(soldPercent({ stock: 14, init: 60 })).toBe(77);
  });
});

describe("Next Upgrade", () => {
  it("poste −20 % uniquement si la commande contient un poste", () => {
    expect(orderHasPoste(1, [])).toBe(true);
    expect(orderHasPoste(0, ["axis"])).toBe(true);
    expect(orderHasPoste(0, ["m1"])).toBe(false);
    expect(upgradeOffers({ sub: 100, hasPoste: false, ids: ["m1"] }).some((u) => u.id === "poste")).toBe(false);
    const withPoste = upgradeOffers({ sub: 2000, hasPoste: true, ids: ["axis"] });
    expect(withPoste[0]).toMatchObject({ id: "poste", ht: 1555.2, was: 1944 });
  });
  it("garantie : 4 % du sous-total, minimum 29 €", () => {
    const w = (sub: number) => upgradeOffers({ sub, hasPoste: false, ids: [] }).find((u) => u.id === "warranty")!;
    expect(w(100).ht).toBe(29);
    expect(w(1000).ht).toBe(40);
    expect(w(1000).was).toBe(70);
    expect(w(100).was).toBe(49);
  });
  it("accessoire : premier non acheté, à −20 %", () => {
    const acc = (ids: string[]) => upgradeOffers({ sub: 0, hasPoste: false, ids }).find((u) => u.id === "acc")!;
    expect(acc([]).title).toContain("Établi Lumen");
    expect(acc(["lumen"]).title).toContain("Établi Talk ANC");
    expect(acc(["lumen"]).ht).toBeCloseTo(ht("talk") * 0.8, 2);
  });
});
