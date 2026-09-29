"use client";

import { eur, eur2 } from "@/lib/format";
import { displayPrice } from "@/lib/pricing";
import { useStore } from "@/lib/store";

/** Prix (HT ou TTC selon la bascule), suffixe de taxe et prix barré. Les montants sont donnés en HT. */
export function PriceDisplay({
  ht,
  was,
  size = "md",
  showTax = true,
  cents = false,
  dark = false,
}: {
  ht: number;
  was?: number;
  size?: "inline" | "sm" | "md" | "lg" | "xl";
  showTax?: boolean;
  cents?: boolean;
  dark?: boolean;
}) {
  const tax = useStore((s) => s.tax);
  const fmt = cents ? eur2 : eur;
  const sizes = { sm: "text-[20px]", inline: "text-[inherit]", md: "text-[24px]", lg: "text-[26px]", xl: "text-[clamp(34px,4vw,44px)]" };
  const muted = dark ? "text-n-400" : "text-n-700";
  return (
    <span className="flex flex-wrap items-baseline gap-x-2">
      <span className={`${sizes[size]} font-semibold tracking-tightish tabular-nums`}>{fmt(displayPrice(ht, tax))}</span>
      {showTax && <span className={`text-[12px] font-semibold ${muted}`}>{tax}</span>}
      {was !== undefined && (
        <s className={`text-[14px] tabular-nums ${muted}`}>
          <span className="sr-only">Prix barré </span>
          {fmt(displayPrice(was, tax))}
        </s>
      )}
    </span>
  );
}

/** Montant seul, sensible à la bascule HT/TTC. */
export function Price({ ht, cents = false }: { ht: number; cents?: boolean }) {
  const tax = useStore((s) => s.tax);
  return <>{(cents ? eur2 : eur)(displayPrice(ht, tax))}</>;
}

/** Libellé de la taxe active (« HT » / « TTC »). */
export function TaxLabel() {
  return <>{useStore((s) => s.tax)}</>;
}
