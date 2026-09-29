import Image from "next/image";
import type { ReactNode } from "react";

interface Props {
  /** Libellé affiché : « Photo · … ». Sert aussi de texte alternatif quand une photo est fournie. */
  label: string;
  tone?: string;
  className?: string;
  dark?: boolean;
  /** Position du libellé « Photo · … » (emplacement vide uniquement). */
  labelAt?: "top" | "bottom";
  /** Photo à afficher ; sans elle, l'emplacement reste un fond rayé avec son libellé. */
  src?: string;
  /** Attribut `sizes` de l'image, pour le chargement responsive. */
  sizes?: string;
  /** Cadrage de la photo (object-position CSS). */
  position?: string;
  /** Zoom appliqué à la photo (1 = aucun) : sert aux vues « Détail ». */
  zoom?: number;
  priority?: boolean;
  children?: ReactNode;
}

/** Emplacement d'image : affiche la photo si `src` est fournie, sinon un fond rayé avec son libellé. */
export function PhotoSlot({
  label, tone, className = "", dark = false, labelAt = "bottom", src, sizes = "100vw", position = "center", zoom = 1, priority, children,
}: Props) {
  // `relative` l'emporterait sur un `absolute` passé en className (ordre des utilitaires Tailwind).
  const positioned = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  return (
    <div className={`${positioned} overflow-hidden ${className}`} style={{ background: tone }} role="img" aria-label={label}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: position, transform: zoom === 1 ? undefined : `scale(${zoom})`, transformOrigin: position }}
          aria-hidden
        />
      ) : (
        <>
          <div className={`absolute inset-0 ${dark ? "stripes-light" : "stripes"}`} aria-hidden />
          <span
            className={`absolute ${labelAt === "top" ? "left-5 top-[18px]" : "bottom-3 left-3.5"} text-[11px] uppercase tracking-[.06em] ${dark ? "text-n-400" : "text-n-700"}`}
            aria-hidden
          >
            {label}
          </span>
        </>
      )}
      {children}
    </div>
  );
}
