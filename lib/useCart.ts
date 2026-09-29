"use client";

import { useMemo } from "react";
import { BUNDLE_NAME, BUNDLE_SUB, CROSS_SELL_IDS, TONES, getProduct, mustProduct } from "./catalog";
import { bundlePrices, computeCart } from "./pricing";
import { useStore } from "./store";

export interface CartLineView {
  key: string;
  name: string;
  sub: string;
  qty: number;
  /** Montants HT unitaires. */
  unitHT: number;
  wasHT: number;
  tone: string;
  isBundle: boolean;
  href: string;
  set: (qty: number) => void;
}

/** Vue dérivée du panier : lignes affichables, totaux, suggestions cross-sell. */
export function useCart() {
  const cart = useStore((s) => s.cart);
  const bundleQty = useStore((s) => s.bundleQty);
  const install = useStore((s) => s.install);
  const setQty = useStore((s) => s.setQty);

  return useMemo(() => {
    const totals = computeCart(cart, bundleQty, install);
    const lines: CartLineView[] = [];
    if (bundleQty > 0) {
      const b = bundlePrices();
      lines.push({
        key: "bundle", name: BUNDLE_NAME, sub: BUNDLE_SUB, qty: bundleQty, unitHT: b.ht, wasHT: b.sum, tone: TONES.bureaux,
        isBundle: true, href: "/produit/lift-pro-160#bundle", set: (q) => setQty("bundle", q),
      });
    }
    for (const l of cart) {
      const p = getProduct(l.id);
      if (!p) continue;
      lines.push({
        key: p.id, name: p.name, sub: p.type, qty: l.qty, unitHT: p.ht, wasHT: p.was, tone: TONES[p.cat],
        isBundle: false, href: `/produit/${p.slug}`, set: (q) => setQty(p.id, q),
      });
    }
    const inCart = new Set(cart.map((l) => l.id));
    const crossSell = CROSS_SELL_IDS.filter((id) => !inCart.has(id)).slice(0, 3).map(mustProduct);
    return { lines, totals, crossSell, bundleInCart: bundleQty > 0, empty: totals.count === 0, install };
  }, [cart, bundleQty, install, setQty]);
}
