"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { isMobileNow } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/useCart";
import { Logo } from "../Logo";
import { TaxToggle } from "../TaxToggle";

const LINKS = [
  { href: "/cyber-deals", label: "Cyber Deals", badge: "−30 %" },
  { href: "/cyber-deals?all", label: "Catalogue", short: "Catalogue" },
  { href: "/produit/lift-pro-160#bundle", label: "Poste complet", short: "Poste complet" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totals } = useCart();
  const openDrawer = useStore((s) => s.openDrawer);
  const openQuote = useStore((s) => s.openQuote);

  const onCart = () => {
    // Mobile : panneau latéral. Desktop : page panier complète.
    if (isMobileNow()) openDrawer();
    else router.push("/panier");
  };

  const navLink = "border-none bg-transparent p-0 text-[14px] font-medium hover:text-accent-700";

  return (
    <header className="sticky top-0 z-40 border-b border-n-300 bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center gap-7 px-[clamp(16px,4vw,40px)]">
        <Link href="/" aria-label="Établi — accueil"><Logo pro /></Link>
        <nav aria-label="Navigation principale" className="hidden gap-6 md:flex">
          <Link href="/cyber-deals" className="flex items-center gap-1.5 text-[14px] font-semibold text-accent-700" aria-current={pathname === "/cyber-deals" ? "page" : undefined}>
            Cyber Deals
            <span className="rounded-sm bg-accent px-[5px] py-0.5 text-[10px] text-white">−30 %</span>
          </Link>
          <Link href="/cyber-deals" className={navLink}>Catalogue</Link>
          <Link href="/produit/lift-pro-160#bundle" className={navLink}>Poste complet</Link>
          <button type="button" className={navLink} onClick={() => openQuote()}>Demander un devis</button>
        </nav>
        <div className="ml-auto flex items-center gap-2.5">
          <TaxToggle />
          <button
            type="button"
            onClick={onCart}
            aria-label={`Panier, ${totals.count} article${totals.count > 1 ? "s" : ""}`}
            className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-n-300 bg-n-100 hover:border-ink"
          >
            <ShoppingBag size={20} strokeWidth={2.5} aria-hidden />
            {totals.count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md bg-accent px-[5px] text-[11px] font-bold text-white">
                {totals.count}
              </span>
            )}
          </button>
        </div>
      </div>
      <nav aria-label="Navigation principale" className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 md:hidden">
        <Link href="/cyber-deals" className="btn btn-primary h-11 flex-none px-3.5 text-[13px]">Cyber Deals</Link>
        {LINKS.slice(1).map((l) => (
          <Link key={l.label} href={l.href.replace("?all", "")} className="flex h-11 flex-none items-center rounded-sm border border-n-300 bg-n-100 px-3.5 text-[13px]">
            {l.label}
          </Link>
        ))}
        <button type="button" onClick={() => openQuote()} className="h-11 flex-none rounded-sm border border-n-300 bg-n-100 px-3.5 text-[13px]">Devis</button>
      </nav>
    </header>
  );
}
