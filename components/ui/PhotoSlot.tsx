import type { ReactNode } from "react";

interface Props {
  /** Libellé affiché : « Photo · … ». */
  label: string;
  tone?: string;
  className?: string;
  dark?: boolean;
  /** Position du libellé « Photo · … ». */
  labelAt?: "top" | "bottom";
  children?: ReactNode;
}

/** Emplacement d'image : aucune photo n'est fournie, à remplacer par un <Image /> le moment venu. */
export function PhotoSlot({ label, tone, className = "", dark = false, labelAt = "bottom", children }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: tone }} role="img" aria-label={label}>
      <div className={`absolute inset-0 ${dark ? "stripes-light" : "stripes"}`} aria-hidden />
      <span
        className={`absolute ${labelAt === "top" ? "left-5 top-[18px]" : "bottom-3 left-3.5"} text-[11px] uppercase tracking-[.06em] ${dark ? "text-n-400" : "text-n-700"}`}
        aria-hidden
      >
        {label}
      </span>
      {children}
    </div>
  );
}
