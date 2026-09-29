"use client";

import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { useStore } from "@/lib/store";

/** « N offres · … prix affichés hors taxes / TTC » — le nombre suit le filtre de catégorie. */
export function DealsSummary() {
  const params = useSearchParams();
  const tax = useStore((s) => s.tax);
  const cat = CATEGORIES.some((c) => c.id === params.get("cat")) ? params.get("cat") : "all";
  const n = PRODUCTS.filter((p) => cat === "all" || p.cat === cat).length;
  return <>{n} offres · stocks alloués par référence · prix affichés {tax === "HT" ? "hors taxes" : "TTC"}</>;
}
