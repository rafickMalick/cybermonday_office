"use client";

import type { Product } from "@/lib/catalog";
import { PhotoSlot } from "../ui/PhotoSlot";
import { TONES, imagePos, productImage } from "@/lib/catalog";
import { pctLabel } from "@/lib/format";
import { useStore } from "@/lib/store";
import { PriceDisplay } from "../PriceDisplay";

/** Accessoires suggérés : ajout en un clic. `compact` pour le panneau latéral. */
export function CrossSell({ products, compact = false }: { products: Product[]; compact?: boolean }) {
  const add = useStore((s) => s.add);
  if (!products.length) return null;
  return (
    <div className="flex flex-col gap-2">
      {products.map((p) => (
        <div key={p.id} className={`flex items-center gap-3 rounded-md border border-n-300 bg-n-100 ${compact ? "p-2.5" : "p-3.5"}`}>
          <PhotoSlot label={p.name} src={productImage(p)} position={imagePos(p)} sizes="56px" tone={TONES[p.cat]} className={`flex-none rounded-md ${compact ? "h-11 w-11" : "h-14 w-14"}`} />
          <div className="flex min-w-0 flex-1 flex-col">
            <span className={`${compact ? "text-[13px]" : "text-[14px]"} font-semibold leading-tight`}>{p.name}</span>
            <span className={`${compact ? "text-[12px]" : "text-[13px]"} flex flex-wrap items-baseline gap-x-1.5 tabular-nums`}>
              <PriceDisplay ht={p.ht} size="inline" showTax={false} />
              <span className="font-semibold text-accent-700">{pctLabel(p.ht, p.was)}</span>
            </span>
          </div>
          <button
            type="button"
            aria-label={`Ajouter ${p.name}`}
            onClick={() => add(p.id, 1)}
            className={`btn btn-secondary h-11 w-11 flex-none px-0 text-[20px]`}
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}
