"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { isMobileNow } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/useCart";
import { useDialog } from "@/lib/useDialog";
import { Logo } from "../Logo";
import { TaxToggle } from "../TaxToggle";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totals } = useCart();
  const openDrawer = useStore((s) => s.openDrawer);
  const openQuote = useStore((s) => s.openQuote);

  // Menu mobile : ouvert pour une page donnée, il se referme tout seul dès que l'on navigue.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const menuRef = useRef<HTMLDivElement>(null);
  const closeMenu = useCallback(() => setMenuPath(null), []);
  useDialog(menuOpen, menuRef, closeMenu);

  const onCart = () => {
    // Mobile : panneau latéral. Desktop : page panier complète.
    if (isMobileNow()) openDrawer();
    else router.push("/panier");
  };

  const mobileLink = "flex min-h-12 items-center rounded-sm px-3.5 text-[16px] font-medium hover:bg-n-200";
  const navLink = "border-none bg-transparent p-0 text-[14px] font-medium hover:text-accent-700";

  return (
    <header className="sticky top-0 z-40 border-b border-n-300 bg-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-page items-center gap-3 px-[clamp(16px,4vw,40px)] md:gap-7">
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
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block"><TaxToggle /></div>
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
          <button
            type="button"
            data-autofocus
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-n-300 bg-n-100 hover:border-ink md:hidden"
          >
            {menuOpen ? <X size={20} strokeWidth={2.5} aria-hidden /> : <Menu size={20} strokeWidth={2.5} aria-hidden />}
          </button>
        </div>
      </div>
      {/* Mobile : menu déroulant sous l'en-tête */}
      <div ref={menuRef} className="md:hidden">
        <div
          onClick={closeMenu}
          aria-hidden
          className={`absolute inset-x-0 top-full h-screen bg-[rgba(46,43,37,0.45)] transition-opacity duration-200 ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        />
        <nav
          id="menu-mobile"
          aria-label="Navigation principale"
          inert={!menuOpen}
          className={`absolute inset-x-0 top-full flex-col gap-1 border-b border-n-300 bg-bg px-4 pb-4 pt-2 shadow-lg ${menuOpen ? "flex" : "hidden"}`}
        >
          <Link href="/cyber-deals" className="flex min-h-12 items-center justify-between rounded-sm bg-accent-100 px-3.5 text-[16px] font-semibold text-accent-800">
            Cyber Deals
            <span className="rounded-sm bg-accent px-1.5 py-0.5 text-[11px] text-white">−30 %</span>
          </Link>
          <Link href="/cyber-deals" className={mobileLink}>Catalogue</Link>
          <Link href="/produit/lift-pro-160#bundle" className={mobileLink}>Poste complet</Link>
          <button type="button" className={`${mobileLink} w-full text-left`} onClick={() => { closeMenu(); openQuote(); }}>Demander un devis</button>
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-n-300 pt-3.5">
            <span className="text-[14px] text-n-700">Afficher les prix</span>
            <TaxToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
