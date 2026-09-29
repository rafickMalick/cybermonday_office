"use client";

import type { ReactNode } from "react";
import { useStore } from "@/lib/store";
import { Button, type ButtonSize, type ButtonVariant } from "./ui/Button";

/** Ouvre la modale de devis. `minPostes` pré-remplit le nombre de postes (au moins 10). */
export function QuoteButton({
  children, variant = "secondary", size = "md", className = "", minPostes,
}: { children: ReactNode; variant?: ButtonVariant; size?: ButtonSize; className?: string; minPostes?: number }) {
  const openQuote = useStore((s) => s.openQuote);
  return (
    <Button variant={variant} size={size} className={className} onClick={() => openQuote(minPostes)}>
      {children}
    </Button>
  );
}

/** Lien textuel qui ouvre la modale de devis (navigation, pied de page). */
export function QuoteLink({ children, className = "" }: { children: ReactNode; className?: string }) {
  const openQuote = useStore((s) => s.openQuote);
  return (
    <button type="button" className={className} onClick={() => openQuote()}>
      {children}
    </button>
  );
}
