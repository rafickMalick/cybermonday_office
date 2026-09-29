import { eur2 } from "@/lib/format";
import type { CartTotals } from "@/lib/pricing";

type Rows = Pick<CartTotals, "sub" | "tier" | "vol" | "postes" | "ship" | "inst" | "base" | "tva" | "ttc">;

/** Récapitulatif toujours détaillé : sous-total HT, remise, livraison, installation, total HT, TVA, total TTC. */
export function SummaryRows({ t, showPostes = true, big = true }: { t: Rows; showPostes?: boolean; big?: boolean }) {
  const row = (label: string, value: string, opts: { color?: string; w?: number } = {}) => (
    <div key={label} className={`flex justify-between gap-3 text-[14px] ${opts.color ?? ""}`} style={{ fontWeight: opts.w ?? 400 }}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
  return (
    <>
      {row("Sous-total HT", eur2(t.sub))}
      {t.vol > 0 && row(`Remise volume −${t.tier} %${showPostes ? ` (${t.postes} postes)` : ""}`, "−" + eur2(t.vol), { color: "text-accent-700", w: 600 })}
      {row("Livraison", t.ship ? eur2(t.ship) : "Offerte")}
      {t.inst > 0 && row("Installation sur site", eur2(t.inst))}
      {row("Total HT", eur2(t.base), { w: 600 })}
      {row("TVA 20 %", eur2(t.tva), { color: "text-n-700" })}
      <div className="flex items-baseline justify-between gap-3 border-t border-n-300 pt-3">
        <span className={`${big ? "text-[15px]" : ""} font-semibold`}>Total TTC</span>
        <span className={`${big ? "text-[26px]" : "text-[22px]"} font-semibold tracking-tightish tabular-nums`}>{eur2(t.ttc)}</span>
      </div>
    </>
  );
}
