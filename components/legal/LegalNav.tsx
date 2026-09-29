"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LEGAL_DOCS } from "@/lib/legal";

/** Navigation entre documents ; conserve `?from=checkout` pour le bouton « Retour à la commande ». */
export function LegalNav({ current }: { current: string }) {
  const from = useSearchParams().get("from") === "checkout" ? "?from=checkout" : "";
  return (
    <nav aria-label="Documents" className="no-scrollbar flex gap-1 overflow-x-auto md:sticky md:top-24 md:flex-col">
      {LEGAL_DOCS.map((d) => {
        const on = d.id === current;
        return (
          <Link
            key={d.id}
            href={`/legal/${d.id}${from}`}
            aria-current={on ? "page" : undefined}
            className={`flex min-h-11 flex-none items-center whitespace-nowrap rounded-sm px-3.5 py-[11px] text-[14px] font-medium ${on ? "bg-ink text-white" : "hover:bg-n-200"}`}
          >
            {d.title}
          </Link>
        );
      })}
    </nav>
  );
}

export function BackToCheckout() {
  const from = useSearchParams().get("from") === "checkout";
  if (!from) return null;
  return (
    <Link href="/checkout" className="mb-5 inline-flex h-11 items-center rounded-sm border border-n-300 bg-n-100 px-3.5 text-[14px] hover:border-ink">
      ← Retour à la commande
    </Link>
  );
}
