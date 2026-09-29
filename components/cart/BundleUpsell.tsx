"use client";

import { BUNDLE_IDS, BUNDLE_DISCOUNT, mustProduct } from "@/lib/catalog";
import { bundlePrices } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { Button } from "../ui/Button";
import { PriceDisplay } from "../PriceDisplay";

const list = BUNDLE_IDS.map((id) => mustProduct(id).name).join(" · ");
const pct = `−${Math.round(BUNDLE_DISCOUNT * 100)} %`;

/** Encart sombre « Complete Your Workspace » : transforme le panier en poste complet. */
export function BundleUpsell({ compact = false }: { compact?: boolean }) {
  const addBundle = useStore((s) => s.addBundle);
  const b = bundlePrices();
  return (
    <div className={`flex flex-col text-bg bg-n-900 ${compact ? "gap-2.5 rounded-md p-[18px]" : "gap-4 rounded-lg p-[clamp(20px,3vw,28px)]"}`}>
      <div className={`${compact ? "text-[11px] tracking-[.1em]" : "text-[12px] tracking-label"} font-semibold text-accent-400`}>COMPLETE YOUR WORKSPACE</div>
      <div className={`${compact ? "text-[16px] leading-tight" : "text-[clamp(20px,2.4vw,26px)] tracking-tightish"} font-semibold`}>
        {compact ? `Complétez le poste : ${pct} sur le pack 6 articles` : `Transformez votre commande en poste complet : ${pct} sur le pack.`}
      </div>
      <div className={`${compact ? "text-[13px] leading-[1.45]" : "text-[14px] leading-normal"} text-n-300`}>{list}</div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PriceDisplay ht={b.ht} was={b.sum} size={compact ? "sm" : "lg"} dark />
        <Button variant="light" size={compact ? "sm" : "md"} onClick={addBundle}>Ajouter le pack</Button>
      </div>
    </div>
  );
}
