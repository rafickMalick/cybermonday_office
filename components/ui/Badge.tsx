import type { ReactNode } from "react";

type Tone = "accent" | "teal" | "ink" | "soft" | "neutral";

const TONES: Record<Tone, string> = {
  accent: "bg-accent text-white",
  teal: "bg-teal-600 text-white",
  ink: "bg-ink text-white",
  soft: "bg-accent-100 text-accent-800",
  neutral: "bg-n-200 text-n-800",
};

/** Pastille de 6 px de rayon : remise, recommandation, stock limité, économie, garantie. */
export function Badge({ tone = "accent", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-1 text-[12px] font-semibold tabular-nums ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}
