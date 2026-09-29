"use client";

import { useStore } from "@/lib/store";
import { Button, type ButtonSize, type ButtonVariant } from "../ui/Button";

export function AddBundleButton({
  children = "Ajouter le pack", variant = "primary", size = "md", className = "",
}: { children?: React.ReactNode; variant?: ButtonVariant; size?: ButtonSize; className?: string }) {
  const add = useStore((s) => s.addBundle);
  return <Button variant={variant} size={size} className={className} onClick={add}>{children}</Button>;
}

/** Libellé dynamique selon la présence du pack dans le panier. */
export function AddBundleCta({ variant = "dark", size = "lg" }: { variant?: ButtonVariant; size?: ButtonSize }) {
  const inCart = useStore((s) => s.bundleQty > 0);
  return <AddBundleButton variant={variant} size={size}>{inCart ? "Ajouter un poste de plus" : "Ajouter le pack au panier"}</AddBundleButton>;
}
