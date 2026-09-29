"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/catalog";
import { ProductCard } from "../ProductCard";

type Sort = "pop" | "disc" | "asc" | "desc";

const SORTERS: Record<Sort, (a: Product, b: Product) => number> = {
  pop: (a, b) => b.reviews - a.reviews,
  disc: (a, b) => 1 - b.ht / b.was - (1 - a.ht / a.was),
  asc: (a, b) => a.ht - b.ht,
  desc: (a, b) => b.ht - a.ht,
};

/** Grille par défaut (toutes catégories, tri popularité) : rendue côté serveur pendant que l'URL est lue. */
export function DealsFallback() {
  const deals = [...PRODUCTS].sort(SORTERS.pop);
  return (
    <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
      {deals.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

/** Chips de catégories, tri et grille de produits. L'état vit dans l'URL (?cat=…&sort=…) pour être partageable. */
export function DealsBrowser() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const cat = CATEGORIES.some((c) => c.id === params.get("cat")) ? (params.get("cat") as string) : "all";
  const sortParam = params.get("sort") as Sort | null;
  const sort: Sort = sortParam && sortParam in SORTERS ? sortParam : "pop";

  const update = (next: { cat?: string; sort?: Sort }) => {
    const q = new URLSearchParams(params.toString());
    const c = next.cat ?? cat;
    const s = next.sort ?? sort;
    if (c === "all") q.delete("cat"); else q.set("cat", c);
    if (s === "pop") q.delete("sort"); else q.set("sort", s);
    const qs = q.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const deals = PRODUCTS.filter((p) => cat === "all" || p.cat === cat).sort(SORTERS[sort]);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="no-scrollbar flex max-w-full gap-2 overflow-x-auto pb-0.5" role="group" aria-label="Catégories">
          {CATEGORIES.map((c) => {
            const on = c.id === cat;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => update({ cat: c.id })}
                className={`h-11 flex-none whitespace-nowrap rounded-sm border px-3.5 text-[13px] font-medium ${on ? "border-ink bg-ink text-white" : "border-n-300 bg-n-100 text-ink hover:border-ink"}`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-2 text-[13px] text-n-700">
          Trier
          <select
            value={sort}
            onChange={(e) => update({ sort: e.target.value as Sort })}
            className="h-11 rounded-sm border border-n-300 bg-n-100 px-2.5 text-[14px] text-ink"
          >
            <option value="pop">Popularité</option>
            <option value="disc">Remise la plus forte</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </label>
      </div>
      <p className="sr-only" role="status">{deals.length} offres affichées</p>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
