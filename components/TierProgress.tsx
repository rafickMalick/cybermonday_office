import { TIERS } from "@/lib/catalog";
import { tierProgress } from "@/lib/pricing";

/** Barre de remise volume : jalons à 3, 5 et 10 postes (30, 50 et 100 % de la barre). */
export function TierProgress({ postes, unit = "poste", compact = false }: { postes: number; unit?: string; compact?: boolean }) {
  const t = tierProgress(postes, unit);
  return (
    <div className="flex flex-col gap-2.5" role="group" aria-label="Progression de la remise volume">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <span className={`${compact ? "text-[13px]" : "text-[14px]"} font-semibold`}>{t.message}</span>
        <span className={`${compact ? "text-[12px]" : "text-[13px]"} font-semibold text-accent-700`}>{t.current}</span>
      </div>
      <div
        className="relative mb-11 mt-1.5 h-1.5 rounded-[3px] bg-n-200"
        role="progressbar" aria-valuemin={0} aria-valuemax={10} aria-valuenow={Math.min(postes, 10)}
        aria-valuetext={`${postes} postes, ${t.current}`}
      >
        <div className="absolute inset-y-0 left-0 rounded-[3px] bg-accent transition-[width] duration-[400ms]" style={{ width: `${t.fill}%` }} />
        {TIERS.map((x, i) => {
          const reached = postes >= x.n;
          const last = i === TIERS.length - 1;
          return (
            <div
              key={x.n}
              className={`absolute -top-1 flex flex-col gap-1.5 ${last ? "items-end" : "items-center"}`}
              style={{ left: `${x.n * 10}%`, transform: last ? "translateX(-100%)" : "translateX(-50%)" }}
            >
              <span className={`h-3.5 w-3.5 rounded-full border-2 border-accent ${reached ? "bg-accent" : "bg-n-100"}`} />
              <span className={`flex flex-col whitespace-nowrap text-[12px] leading-tight ${last ? "items-end" : "items-center"} ${reached ? "text-ink" : "text-n-700"}`}>
                <b>−{x.p} %</b>
                <span>{x.n} postes</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
