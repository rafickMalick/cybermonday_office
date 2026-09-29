"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { Check, X } from "lucide-react";
import { FREE_SHIPPING_FROM_HT } from "@/lib/pricing";
import { eur, eur2 } from "@/lib/format";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/useCart";
import { useDialog } from "@/lib/useDialog";
import { QtyStepper } from "../QtyStepper";
import { TierProgress } from "../TierProgress";
import { Price } from "../PriceDisplay";
import { Button } from "../ui/Button";
import { PhotoSlot } from "../ui/PhotoSlot";
import { BundleUpsell } from "./BundleUpsell";
import { CrossSell } from "./CrossSell";

/** Panneau latéral du panier : s'ouvre à chaque ajout, 440 px max, glissement 340 ms. */
export function CartDrawer() {
  const open = useStore((s) => s.drawerOpen);
  const close = useStore((s) => s.closeDrawer);
  const justAdded = useStore((s) => s.justAdded);
  const router = useRouter();
  const ref = useRef<HTMLElement>(null);
  const { lines, totals, crossSell, bundleInCart, empty } = useCart();
  const onClose = useCallback(() => close(), [close]);
  useDialog(open, ref, onClose);

  const go = (href: string) => {
    close();
    router.push(href);
  };
  const shipPending = !empty && totals.net < FREE_SHIPPING_FROM_HT;
  const shipFree = !empty && totals.net >= FREE_SHIPPING_FROM_HT;

  return (
    <>
      <div
        onClick={close}
        aria-hidden
        className={`fixed inset-0 z-[80] bg-[rgba(46,43,37,0.45)] transition-opacity duration-[250ms] ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-y-0 right-0 z-[90] flex w-[min(440px,100vw)] flex-col bg-bg shadow-[-24px_0_60px_-30px_rgba(0,0,0,.45)] transition-transform duration-[340ms] [transition-timing-function:cubic-bezier(.2,.8,.2,1)]"
        style={{ transform: open ? "translateX(0)" : "translateX(105%)" }}
      >
        <div className="flex items-center justify-between border-b border-n-300 bg-n-100 px-5 py-2">
          <span className="text-[17px] font-semibold">Panier · {totals.count}</span>
          <button type="button" data-autofocus aria-label="Fermer le panier" onClick={close} className="flex h-11 w-11 items-center justify-center">
            <X size={20} strokeWidth={2.5} aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-[18px] overflow-y-auto px-5 py-4">
          {justAdded && (
            <div role="status" className="flex items-center gap-2.5 rounded-md bg-teal-100 px-3.5 py-3 text-[14px] text-teal-800">
              <Check size={16} strokeWidth={2.75} className="flex-none" aria-hidden />
              <span>Ajouté : <b>{justAdded}</b></span>
            </div>
          )}
          {empty && <span className="text-[15px] text-n-700">Votre panier est vide.</span>}

          {!empty && (
            <div className="flex flex-col gap-2 rounded-md border border-n-300 bg-n-100 p-3.5">
              <div className="flex justify-between gap-2.5 text-[13px]">
                <span className="font-semibold">Vous économisez {eur2(totals.save)} HT</span>
                <span className="text-n-700">vs prix catalogue</span>
              </div>
              {shipPending && (
                <>
                  <span className="text-[13px] text-n-800">Plus que <b>{eur(FREE_SHIPPING_FROM_HT - totals.net)} HT</b> pour la livraison offerte</span>
                  <div className="h-[5px] overflow-hidden rounded-[3px] bg-n-200" aria-hidden>
                    <div className="h-full rounded-[3px] bg-teal-600 transition-[width] duration-[400ms]" style={{ width: `${Math.min(100, (totals.net / FREE_SHIPPING_FROM_HT) * 100)}%` }} />
                  </div>
                </>
              )}
              {shipFree && <span className="text-[13px] font-semibold text-teal-700">✓ Livraison offerte débloquée</span>}
            </div>
          )}

          {lines.map((l) => (
            <div key={l.key} className="flex items-start gap-3">
              <PhotoSlot label={l.name} src={l.image} position={l.imagePos} sizes="64px" tone={l.tone} className="h-16 w-16 flex-none rounded-md" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex justify-between gap-2.5">
                  <span className="text-[14px] font-semibold leading-tight">{l.name}</span>
                  <span className="whitespace-nowrap text-[14px] font-semibold tabular-nums"><Price ht={l.unitHT * l.qty} cents /></span>
                </div>
                <div className="flex items-center justify-between">
                  <QtyStepper value={l.qty} min={1} label={`Quantité : ${l.name}`} onChange={l.set} />
                  <button type="button" onClick={() => l.set(0)} className="min-h-11 px-1 text-[13px] text-n-700 underline underline-offset-[3px]">
                    Retirer<span className="sr-only"> {l.name}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!empty && (
            <div className="rounded-md border border-n-300 bg-n-100 px-4 pt-4"><TierProgress postes={totals.postes} unit="poste" compact /></div>
          )}
          {!empty && !bundleInCart && <BundleUpsell compact />}
          {!empty && (
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-n-800">Complétez avec</span>
              <CrossSell products={crossSell} compact />
            </div>
          )}
        </div>

        {!empty && (
          <div className="flex flex-col gap-2.5 border-t border-n-300 bg-n-100 px-5 pb-[calc(16px+env(safe-area-inset-bottom))] pt-4">
            <div className="flex justify-between text-[14px]"><span>Total HT</span><span className="font-semibold tabular-nums">{eur2(totals.base)}</span></div>
            <div className="flex justify-between text-[13px] text-n-700"><span>Total TTC</span><span className="tabular-nums">{eur2(totals.ttc)}</span></div>
            <Button variant="primary" size="lg" onClick={() => go("/checkout")}>Commander</Button>
            <Link href="/panier" onClick={close} className="btn h-11 rounded-sm border border-n-300 bg-n-100 text-[14px] font-medium hover:border-ink">
              Voir le panier détaillé
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
