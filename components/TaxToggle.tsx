"use client";

import { useStore } from "@/lib/store";
import type { TaxMode } from "@/lib/pricing";

const MODES: TaxMode[] = ["HT", "TTC"];

/** Contrôle segmenté HT / TTC : s'applique à tous les prix du site. */
export function TaxToggle() {
  const tax = useStore((s) => s.tax);
  const setTax = useStore((s) => s.setTax);
  return (
    <div role="group" aria-label="Affichage des prix" className="flex gap-0.5 rounded-md bg-n-200 p-[3px]">
      {MODES.map((m) => {
        const on = tax === m;
        return (
          <button
            key={m}
            type="button"
            aria-pressed={on}
            onClick={() => setTax(m)}
            className={`h-11 min-w-11 rounded-sm px-3 text-[13px] font-semibold ${
              on ? "bg-n-100 text-ink shadow-[0_1px_2px_rgba(46,43,37,.15)]" : "bg-transparent text-n-700 hover:text-ink"
            }`}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}
