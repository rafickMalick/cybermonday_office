"use client";

// État global : panier, préférence HT/TTC, commande (persistés) + formulaire de checkout et UI (transitoires).

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { BUNDLE_NAME, getProduct, mustProduct, type PaymentMethod } from "./catalog";
import { bundlePrices, computeCart, orderHasPoste, UPGRADE_WINDOW_MS, addBusinessDays, type CartLine, type TaxMode } from "./pricing";
import { validateCheckout, type FormErrors, type FormValues } from "./validation";
import { formatLongDate } from "./format";

export interface OrderItem { name: string; qty: number; unit: number }

/** Commande enregistrée. Aucune donnée de carte bancaire n'y figure. */
export interface Order {
  no: string;
  date: number;
  items: OrderItem[];
  sub: number; tier: number; vol: number; ship: number; inst: number; base: number; tva: number; ttc: number; postes: number;
  company: string; siret: string; vatNo: string; contact: string; email: string;
  addr: string; bill: string;
  pay: PaymentMethod; po: string;
  hasPoste: boolean; ids: string[];
  /** Fin de l'offre Next Upgrade (timestamp ms). */
  upEnd: number;
  deliv: string;
  install: boolean;
}

interface Persisted {
  cart: CartLine[];
  bundleQty: number;
  tax: TaxMode;
  install: boolean;
  order: Order | null;
  upgrades: Record<string, boolean>;
}

interface Transient {
  hydrated: boolean;
  drawerOpen: boolean;
  justAdded: string | null;
  quoteOpen: boolean;
  quoteDefault: number;
  quoteSent: boolean;
  /** Checkout */
  pay: PaymentMethod;
  billingDiff: boolean;
  form: FormValues;
  errors: FormErrors;
  cgvOk: boolean;
  /** Toasts de commandes récentes : fermés définitivement. */
  toastOff: boolean;
  /** Choix cookies lu dans localStorage (null = pas encore fait). Valable une fois `cookieReady`. */
  cookieChoice: CookieChoice | null;
  cookieReady: boolean;
  /** Le bandeau cookies a été rouvert via « Gérer les cookies ». */
  cookieReopened: boolean;
}

export type CookieChoice = "all" | "necessary";
export const COOKIE_KEY = "etabli_cookies";

interface Actions {
  add: (id: string, qty?: number) => void;
  addBundle: () => void;
  setQty: (id: string | "bundle", qty: number) => void;
  setTax: (t: TaxMode) => void;
  setInstall: (v: boolean) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openQuote: (minPostes?: number) => void;
  closeQuote: () => void;
  submitQuote: () => void;
  setPay: (p: PaymentMethod) => void;
  setBillingDiff: (v: boolean) => void;
  setField: (k: string, v: string) => void;
  fillDemo: () => void;
  setCgv: (v: boolean) => void;
  /** Valide le formulaire ; en cas de succès crée la commande et vide le panier, sinon retourne les erreurs. */
  placeOrder: () => { ok: true; no: string } | { ok: false; errors: FormErrors };
  addUpgrade: (id: string) => void;
  dismissToasts: () => void;
  loadCookieChoice: () => void;
  setCookieChoice: (c: CookieChoice) => void;
  reopenCookies: () => void;
}

export type Store = Persisted & Transient & Actions;

const emptyCart = { cart: [] as CartLine[], bundleQty: 0 };

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      bundleQty: 0,
      tax: "HT",
      install: false,
      order: null,
      upgrades: {},

      hydrated: false,
      drawerOpen: false,
      justAdded: null,
      quoteOpen: false,
      quoteDefault: 10,
      quoteSent: false,
      pay: "card",
      billingDiff: false,
      form: {},
      errors: {},
      cgvOk: false,
      toastOff: false,
      cookieChoice: null,
      cookieReady: false,
      cookieReopened: false,

      add: (id, qty = 1) => {
        const p = getProduct(id);
        if (!p || qty < 1) return;
        set((s) => {
          const i = s.cart.findIndex((l) => l.id === id);
          const cart = [...s.cart];
          if (i >= 0) cart[i] = { ...cart[i], qty: cart[i].qty + qty };
          else cart.push({ id, qty });
          return { cart, drawerOpen: true, justAdded: (qty > 1 ? `${qty} × ` : "") + p.name };
        });
      },
      addBundle: () => set((s) => ({ bundleQty: s.bundleQty + 1, drawerOpen: true, justAdded: BUNDLE_NAME })),
      setQty: (id, qty) =>
        set((s) => {
          if (id === "bundle") return { bundleQty: Math.max(0, qty), justAdded: null };
          const cart = qty <= 0 ? s.cart.filter((l) => l.id !== id) : s.cart.map((l) => (l.id === id ? { ...l, qty } : l));
          return { cart, justAdded: null };
        }),
      setTax: (tax) => set({ tax }),
      setInstall: (install) => set({ install }),
      openDrawer: () => set({ drawerOpen: true, justAdded: null }),
      closeDrawer: () => set({ drawerOpen: false }),
      openQuote: (minPostes = 0) =>
        set((s) => ({
          quoteOpen: true,
          quoteSent: false,
          drawerOpen: false,
          quoteDefault: Math.max(10, minPostes, computeCart(s.cart, s.bundleQty, false).postes),
        })),
      closeQuote: () => set({ quoteOpen: false }),
      submitQuote: () => set({ quoteSent: true }),

      setPay: (pay) => set((s) => ({ pay, errors: omit(s.errors, ["card", "exp", "cvc", "po"]) })),
      setBillingDiff: (billingDiff) => set({ billingDiff }),
      setField: (k, v) =>
        set((s) => ({ form: { ...s.form, [k]: v }, errors: omit(s.errors, [k]) })),
      fillDemo: () =>
        set({
          errors: {},
          form: {
            email: "c.martin@halden.fr", prenom: "Camille", nom: "Martin", tel: "06 12 34 56 78", fonction: "Office manager",
            societe: "Halden SAS", siret: "832 456 789 00021", tva: "FR48832456789",
            adresse: "18 rue de Paradis", cp: "75010", ville: "Paris",
            card: "4242 4242 4242 4242", exp: "09/28", cvc: "123", po: "BC-2026-0412",
          },
        }),
      setCgv: (cgvOk) => set((s) => ({ cgvOk, errors: omit(s.errors, ["cgv"]) })),

      placeOrder: () => {
        const s = get();
        const errors = validateCheckout({ form: s.form, pay: s.pay, billingDiff: s.billingDiff, cgvOk: s.cgvOk });
        if (Object.keys(errors).length) {
          set({ errors });
          return { ok: false, errors };
        }
        const c = computeCart(s.cart, s.bundleQty, s.install);
        const f = s.form;
        const items: OrderItem[] = [];
        if (s.bundleQty) items.push({ name: BUNDLE_NAME, qty: s.bundleQty, unit: bundlePrices().ht });
        for (const l of s.cart) items.push({ name: mustProduct(l.id).name, qty: l.qty, unit: mustProduct(l.id).ht });
        const ids = s.cart.map((l) => l.id);
        const now = Date.now();
        const addr = `${f.adresse}, ${f.cp} ${f.ville}`;
        const order: Order = {
          no: `ETB-${new Date().getFullYear()}-${10000 + Math.floor(Math.random() * 89999)}`,
          date: now, items,
          sub: c.sub, tier: c.tier, vol: c.vol, ship: c.ship, inst: c.inst, base: c.base, tva: c.tva, ttc: c.ttc, postes: c.postes,
          company: f.societe ?? "", siret: f.siret ?? "", vatNo: f.tva ?? "", contact: `${f.prenom} ${f.nom}`, email: f.email ?? "",
          addr, bill: s.billingDiff ? `${f.bAdresse}, ${f.bCp} ${f.bVille}` : addr,
          pay: s.pay, po: f.po ?? "",
          hasPoste: orderHasPoste(s.bundleQty, ids), ids,
          upEnd: now + UPGRADE_WINDOW_MS,
          deliv: formatLongDate(addBusinessDays(now, 4)),
          install: s.install,
        };
        // Les données de carte ne sont jamais conservées.
        const { card: _c, exp: _e, cvc: _v, ...safeForm } = s.form;
        void _c; void _e; void _v;
        set({ order, ...emptyCart, upgrades: {}, install: false, drawerOpen: false, errors: {}, cgvOk: false, form: safeForm });
        return { ok: true, no: order.no };
      },
      addUpgrade: (id) => set((s) => ({ upgrades: { ...s.upgrades, [id]: true } })),
      dismissToasts: () => set({ toastOff: true }),
      loadCookieChoice: () => {
        let c: string | null = null;
        try { c = localStorage.getItem(COOKIE_KEY); } catch { /* stockage indisponible */ }
        set({ cookieChoice: c === "all" || c === "necessary" ? c : null, cookieReady: true });
      },
      setCookieChoice: (cookieChoice) => {
        try { localStorage.setItem(COOKIE_KEY, cookieChoice); } catch { /* stockage indisponible */ }
        set({ cookieChoice, cookieReopened: false });
      },
      reopenCookies: () => set({ cookieReopened: true }),
    }),
    {
      name: "etabli_state",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s): Persisted => ({
        cart: s.cart, bundleQty: s.bundleQty, tax: s.tax, install: s.install, order: s.order, upgrades: s.upgrades,
      }),
      onRehydrateStorage: () => () => useStore.setState({ hydrated: true }),
    },
  ),
);

function omit<T extends Record<string, unknown>>(o: T, keys: string[]): T {
  const c = { ...o };
  for (const k of keys) delete c[k];
  return c;
}
