"use client";

import { useState } from "react";
import { Clock, Users } from "lucide-react";
import { BADGES, BOUGHT, TONES, type Product } from "@/lib/catalog";
import { eur, eur2, pctLabel } from "@/lib/format";
import { lineTotalWithTier, perWorkday, soldPercent } from "@/lib/pricing";
import { useLive } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { Countdown } from "../Countdown";
import { PriceDisplay, Price } from "../PriceDisplay";
import { QtyStepper } from "../QtyStepper";
import { QuoteButton } from "../QuoteButton";
import { TierProgress } from "../TierProgress";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { PhotoSlot } from "../ui/PhotoSlot";

const VIEWS = ["Vue de face", "Détail", "En situation", "Dimensions"];
const QTY_CHOICES = [1, 3, 5, 10];

/** Partie haute de la fiche : galerie, prix, Flash Deal, choix de quantité, CTA, barre d'achat mobile. */
export function ProductDetail({ product: p }: { product: Product }) {
  const [view, setView] = useState(0);
  const [qty, setQty] = useState(1);
  const add = useStore((s) => s.add);
  const tax = useStore((s) => s.tax);
  const viewers = useLive((s) => s.viewers[p.id]);
  const sold = soldPercent(p);
  const badge = BADGES[p.id];
  const total = lineTotalWithTier(p, qty);
  const alt = tax === "HT" ? `${eur(p.ht * 1.2)} TTC` : `${eur(p.ht)} HT`;

  return (
    <>
      <div className="grid items-start gap-[clamp(24px,4vw,56px)] md:[grid-template-columns:minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* Galerie */}
        <div className="flex flex-col gap-3 md:sticky md:top-24">
          <PhotoSlot label={`Photo · ${p.type} · ${VIEWS[view]}`} tone={TONES[p.cat]} className="aspect-square rounded-lg">
            <span className="absolute left-4 top-4 rounded-sm bg-accent px-2.5 py-[5px] text-[14px] font-semibold text-white">{pctLabel(p.ht, p.was)}</span>
          </PhotoSlot>
          <div className="grid grid-cols-4 gap-2.5">
            {VIEWS.map((v, i) => (
              <button
                key={v}
                type="button"
                aria-label={v}
                aria-pressed={i === view}
                onClick={() => setView(i)}
                className={`aspect-square rounded-sm border-2 text-[10px] text-n-700 ${i === view ? "border-ink" : "border-transparent"}`}
                style={{ background: TONES[p.cat] }}
              >
                {v.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <div className="flex flex-col gap-2.5">
            <div className="text-[13px] text-n-700">{p.type} · Réf. {p.ref}</div>
            <h1 className="text-[clamp(30px,3.6vw,44px)] font-semibold leading-[1.08] tracking-tightish">{p.name}</h1>
            <div className="flex flex-wrap gap-x-3.5 gap-y-1 text-[14px] text-n-800">
              <span>★ {String(p.rating).replace(".", ",")} · {p.reviews} avis vérifiés</span>
              <span>Garantie {p.warrantyYears} ans</span>
              <span>{p.norm}</span>
            </div>
            <p className="m-0 text-[16px] leading-[1.55] text-n-800">{p.short}</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <PriceDisplay ht={p.ht} was={p.was} size="xl" />
            <span className="text-[14px] text-n-700">soit {alt} · éco-participation incluse</span>
            <div className="mt-1.5 flex flex-wrap gap-2">
              <Badge tone="soft" className="!px-2.5 !py-1.5 !text-[13px]">Économie <Price ht={p.was - p.ht} /> par poste</Badge>
              <Badge tone="neutral" className="!px-2.5 !py-1.5 !text-[13px] !font-medium">
                ≈ {eur2(perWorkday(p.ht, p.warrantyYears))} HT par jour ouvré sur {p.warrantyYears} ans de garantie
              </Badge>
            </div>
          </div>

          {badge && (
            <div className="flex items-center gap-3 rounded-md bg-teal-100 px-4 py-3.5 text-teal-800">
              <Users size={20} strokeWidth={2.25} className="flex-none" aria-hidden />
              <span className="text-[14px] leading-[1.45]"><b>{badge}</b> · commandé par {BOUGHT[p.id]} entreprises ce mois-ci, 96 % le recommandent.</span>
            </div>
          )}

          {/* Flash Deal */}
          <div className="card flex flex-col gap-3.5 p-[18px]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-[14px] font-semibold"><Clock size={16} strokeWidth={2.75} className="text-accent" aria-hidden />Flash Deal · se termine dans</span>
              <Countdown className="text-[18px] font-semibold" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[13px] text-n-800"><span>Plus que {p.stock} unités au prix Cyber Monday</span><span>{sold} % du stock vendu</span></div>
              <div className="h-1.5 overflow-hidden rounded-[3px] bg-n-200" aria-hidden><div className="h-full rounded-[3px] bg-ink" style={{ width: `${sold}%` }} /></div>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-n-800">
              <span className="h-[7px] w-[7px] rounded-full bg-teal-500" aria-hidden />
              <span><span suppressHydrationWarning>{viewers}</span> entreprises consultent cette offre en ce moment</span>
            </div>
          </div>

          {/* Achat */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[14px] font-semibold" id="qty-label">Nombre de postes à équiper</span>
              <div className="flex gap-1.5" role="group" aria-labelledby="qty-label">
                {QTY_CHOICES.map((n) => {
                  const on = qty === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setQty(n)}
                      className={`h-11 min-w-11 rounded-sm border px-2.5 text-[13px] font-semibold ${on ? "border-ink bg-ink text-white" : "border-n-300 bg-n-100 hover:border-ink"}`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="rounded-md border border-n-300 bg-n-100 px-[18px] pt-[18px]"><TierProgress postes={qty} unit="poste" /></div>
            <div className="flex flex-wrap items-stretch gap-2.5">
              <QtyStepper value={qty} onChange={setQty} size="lg" label="Nombre de postes" />
              <Button variant="primary" size="lg" className="min-w-[200px] flex-1 justify-between !text-[15px]" onClick={() => add(p.id, qty)}>
                <span>Ajouter au panier</span>
                <span className="tabular-nums"><Price ht={total} cents /></span>
              </Button>
            </div>
            {qty >= 10 && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-n-900 px-4 py-3.5 text-bg">
                <span className="text-[14px]">10 postes ou plus : tarif négocié et planning d&apos;installation dédié.</span>
                <QuoteButton variant="light" size="sm" minPostes={qty}>Demander un devis</QuoteButton>
              </div>
            )}
            <QuoteLinkText minPostes={qty} />
          </div>

          <ul className="m-0 grid list-none gap-px overflow-hidden rounded-md border border-n-300 bg-n-300 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,210px),1fr))]">
            {[
              { t: "Livraison 3 à 5 jours ouvrés", d: "Offerte dès 300 € HT" },
              { t: "Installation sur site", d: "49 € HT par poste, en option" },
              { t: "Retours sous 30 jours", d: "Reprise gratuite" },
              { t: `Garantie ${p.warrantyYears} ans`, d: "Extension possible à la commande" },
            ].map((x) => (
              <li key={x.t} className="flex flex-col gap-0.5 bg-n-100 px-4 py-3.5">
                <span className="text-[14px] font-semibold">{x.t}</span>
                <span className="text-[13px] text-n-700">{x.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Barre d'achat fixée en bas (mobile) */}
      <div className="h-[76px] md:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-3 border-t border-n-300 bg-n-100 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 md:hidden">
        <div className="flex flex-col">
          <span className="text-[18px] font-semibold tabular-nums">
            <Price ht={p.ht} /> <span className="text-[11px] text-n-700">{tax}</span>
          </span>
          <span className="text-[12px] font-semibold text-accent-700">{pctLabel(p.ht, p.was)} · <Countdown /></span>
        </div>
        <Button variant="primary" size="md" className="flex-1" onClick={() => add(p.id, qty)}>Ajouter · {qty}</Button>
      </div>
    </>
  );
}

function QuoteLinkText({ minPostes }: { minPostes: number }) {
  const openQuote = useStore((s) => s.openQuote);
  return (
    <button
      type="button"
      onClick={() => openQuote(minPostes)}
      className="min-h-11 self-start bg-transparent py-1 text-[14px] font-medium underline underline-offset-[3px] hover:text-accent-700"
    >
      Demander un devis pour cette référence
    </button>
  );
}

