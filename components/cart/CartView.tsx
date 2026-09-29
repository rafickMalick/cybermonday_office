"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { INSTALL_PER_POSTE_HT } from "@/lib/pricing";
import { eur2 } from "@/lib/format";
import { PAYMENT_BADGES } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/useCart";
import { Price } from "../PriceDisplay";
import { QtyStepper } from "../QtyStepper";
import { QuoteButton } from "../QuoteButton";
import { SummaryRows } from "../SummaryRows";
import { TierProgress } from "../TierProgress";
import { Button, ButtonLink } from "../ui/Button";
import { PhotoSlot } from "../ui/PhotoSlot";
import { BundleUpsell } from "./BundleUpsell";
import { CrossSell } from "./CrossSell";

/** Page panier complète : lignes, remise volume, cross-sell, récapitulatif sticky de 380 px. */
export function CartView() {
  const hydrated = useStore((s) => s.hydrated);
  const install = useStore((s) => s.install);
  const setInstall = useStore((s) => s.setInstall);
  const tax = useStore((s) => s.tax);
  const router = useRouter();
  const { lines, totals, crossSell, bundleInCart, empty } = useCart();

  if (!hydrated) return <div className="h-64" aria-busy aria-label="Chargement du panier" />;

  if (empty) {
    return (
      <div className="card-lg flex flex-col items-start gap-4 p-10">
        <span className="text-[18px] font-semibold">Votre panier est vide.</span>
        <ButtonLink href="/cyber-deals">Voir les Cyber Deals</ButtonLink>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-[clamp(24px,4vw,48px)] md:[grid-template-columns:minmax(0,1fr)_380px]">
      <div className="flex flex-col gap-7">
        <div className="card-lg px-5 pt-5"><TierProgress postes={totals.postes} unit="poste" /></div>

        <ul className="m-0 list-none border-t border-n-300 p-0">
          {lines.map((l) => (
            <li key={l.key} className="grid gap-4 border-b border-n-300 py-5 [grid-template-columns:clamp(72px,12vw,104px)_minmax(0,1fr)]">
              <Link href={l.href} aria-label={l.name} className="relative block aspect-square">
                <PhotoSlot label={l.name} src={l.image} position={l.imagePos} sizes="104px" tone={l.tone} className="absolute inset-0 rounded-sm" />
              </Link>
              <div className="flex min-w-0 flex-col gap-3">
                <div className="flex justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-[3px]">
                    {l.isBundle && <span className="self-start rounded-sm bg-accent-100 px-[7px] py-[3px] text-[11px] font-semibold text-accent-800">Pack −12 %</span>}
                    <span className="text-[16px] font-semibold">{l.name}</span>
                    <span className="text-[13px] text-n-700">{l.sub}</span>
                  </div>
                  <div className="flex flex-none flex-col items-end gap-[3px]">
                    <span className="text-[16px] font-semibold tabular-nums"><Price ht={l.unitHT * l.qty} cents /></span>
                    <span className="whitespace-nowrap text-[12px] text-n-700"><Price ht={l.unitHT} /> / u. · <s><Price ht={l.wasHT} /></s></span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <QtyStepper value={l.qty} min={1} label={`Quantité : ${l.name}`} onChange={l.set} />
                  <button type="button" onClick={() => l.set(0)} className="min-h-11 py-2.5 text-[13px] text-n-700 underline underline-offset-[3px]">
                    Retirer<span className="sr-only"> {l.name}</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {!bundleInCart && <BundleUpsell />}

        <section className="flex flex-col gap-3" aria-labelledby="xsell">
          <h2 id="xsell" className="text-[20px] font-semibold tracking-tightish">Souvent ajoutés par les équipes</h2>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,220px),1fr))]">
            {crossSell.map((p) => <CrossSell key={p.id} products={[p]} />)}
          </div>
        </section>
      </div>

      <aside aria-label="Récapitulatif" className="flex flex-col gap-3.5 md:sticky md:top-24">
        <div className="card-lg flex flex-col gap-3 p-[22px]">
          <h2 className="mb-1 text-[18px] font-semibold">Récapitulatif</h2>
          <SummaryRows t={totals} />
          <span className="text-[13px] font-semibold text-accent-700">Vous économisez {eur2(totals.save)} HT</span>
          <label className="flex cursor-pointer items-start gap-3 rounded-md border border-n-300 p-3.5 text-[14px]">
            <input type="checkbox" checked={install} onChange={(e) => setInstall(e.target.checked)} className="mt-px h-[18px] w-[18px] accent-[var(--color-accent)]" />
            <span className="flex flex-col gap-0.5">
              <b className="font-semibold">Livraison et installation sur site</b>
              <span className="text-[13px] text-n-700">Montage, réglages et reprise des emballages · {INSTALL_PER_POSTE_HT} € HT par poste</span>
            </span>
          </label>
          <Button variant="primary" size="xl" className="justify-between" onClick={() => router.push("/checkout")}>
            <span>Passer commande</span><ArrowRight size={18} strokeWidth={2.75} aria-hidden />
          </Button>
          <QuoteButton variant="secondary" size="md" className="justify-start">Transformer en devis</QuoteButton>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Moyens de paiement">
          {PAYMENT_BADGES.map((b) => <li key={b} className="flex h-7 items-center rounded-sm border border-n-300 bg-n-100 px-[9px] text-[12px] font-semibold text-n-800">{b}</li>)}
        </ul>
        <span className="text-[13px] leading-normal text-n-700">Paiement sécurisé 3-D Secure · Retours sous 30 jours · Facture PDF immédiate</span>
        <span className="sr-only">Prix des lignes affichés {tax}. Le récapitulatif reste détaillé en HT, TVA et TTC.</span>
      </aside>
    </div>
  );
}
