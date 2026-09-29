"use client";

import { formatCountdown, pad2, splitDuration } from "@/lib/format";
import { useSaleCountdown } from "@/lib/hooks";

/** « 1j 07:14:03 » : le compte à rebours de l'opération (placeholder avant hydratation). */
export function Countdown({ className = "" }: { className?: string }) {
  const left = useSaleCountdown();
  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {left === null ? "--j --:--:--" : formatCountdown(left)}
    </span>
  );
}

/** Quatre blocs jours / heures / minutes / secondes du hero. */
export function CountdownBlocks() {
  const left = useSaleCountdown();
  const p = left === null ? null : splitDuration(left);
  const cells = [
    { v: p ? pad2(p.d) : "--", l: "jours" },
    { v: p ? pad2(p.h) : "--", l: "heures" },
    { v: p ? pad2(p.m) : "--", l: "min" },
    { v: p ? pad2(p.s) : "--", l: "sec", hot: true },
  ];
  return (
    <div className="flex gap-2" role="timer" aria-label="Temps restant avant la fin des offres">
      {cells.map((c) => (
        <div key={c.l} className="flex min-w-[68px] flex-col gap-0.5 rounded-md border border-n-700 bg-n-800 px-2.5 py-3">
          <span className={`text-[28px] font-semibold tabular-nums ${c.hot ? "text-accent-400" : ""}`}>{c.v}</span>
          <span className="text-[11px] text-n-400">{c.l}</span>
        </div>
      ))}
    </div>
  );
}
