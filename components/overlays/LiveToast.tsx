"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import { LIVE_ORDERS } from "@/lib/catalog";
import { useStore } from "@/lib/store";

const FIRST_MS = 6000;
const EVERY_MS = 20000;
const VISIBLE_MS = 7000;

/** Commandes récentes : 1er affichage à 6 s, puis toutes les 20 s, visible 7 s. Fermable définitivement. */
export function LiveToast() {
  const pathname = usePathname();
  const off = useStore((s) => s.toastOff);
  const dismiss = useStore((s) => s.dismissToasts);
  const drawerOpen = useStore((s) => s.drawerOpen);
  const cookiesPending = useStore((s) => !s.cookieReady || s.cookieChoice === null || s.cookieReopened);
  const [state, setState] = useState<{ on: boolean; i: number }>({ on: false, i: -1 });

  useEffect(() => {
    if (off) return;
    let hide: ReturnType<typeof setTimeout>;
    const cycle = () => {
      setState((s) => ({ on: true, i: (s.i + 1) % LIVE_ORDERS.length }));
      hide = setTimeout(() => setState((s) => ({ ...s, on: false })), VISIBLE_MS);
    };
    const first = setTimeout(cycle, FIRST_MS);
    const every = setInterval(cycle, EVERY_MS);
    return () => { clearTimeout(first); clearInterval(every); clearTimeout(hide); };
  }, [off]);

  const onPdp = pathname.startsWith("/produit");
  const hiddenHere = pathname.startsWith("/checkout") || pathname.startsWith("/confirmation") || pathname.startsWith("/legal");
  if (off || !state.on || hiddenHere || drawerOpen || cookiesPending) return null;
  const t = LIVE_ORDERS[Math.max(0, state.i)];

  return (
    <div
      role="status"
      className={`fixed bottom-[calc(16px+env(safe-area-inset-bottom))] left-4 z-[60] flex w-[min(360px,calc(100vw-32px))] items-start gap-3 rounded-md border border-n-300 bg-n-100 py-3.5 pl-4 pr-2 shadow-lg ${onPdp ? "max-md:bottom-[calc(92px+env(safe-area-inset-bottom))]" : ""}`}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal-100 text-teal-700"><Check size={18} strokeWidth={2.5} aria-hidden /></span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-[13px] leading-[1.4]">
        <span><b>{t.who}</b>, {t.co} à {t.city}</span>
        <span className="text-n-800">a commandé {t.what}</span>
        <span className="text-[12px] text-n-700">{t.ago} · commande vérifiée</span>
      </div>
      <button type="button" onClick={dismiss} aria-label="Masquer les notifications de commandes" className="flex h-11 w-11 flex-none items-center justify-center text-n-700">
        <X size={16} strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
