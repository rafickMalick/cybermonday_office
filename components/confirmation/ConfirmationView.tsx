"use client";

import { Check } from "lucide-react";
import { PAYMENT_LABELS } from "@/lib/catalog";
import { eur, eur2, formatShortDate, pad2 } from "@/lib/format";
import { useNow } from "@/lib/hooks";
import { upgradeOffers } from "@/lib/pricing";
import { useStore, type Order } from "@/lib/store";
import { SummaryRows } from "../SummaryRows";
import { ButtonLink } from "../ui/Button";
import { InvoiceButton } from "./InvoiceButton";

export function ConfirmationView({ no }: { no: string }) {
  const hydrated = useStore((s) => s.hydrated);
  const order = useStore((s) => s.order);

  if (!hydrated) return <div className="h-64" aria-busy />;
  if (!order || order.no !== no) {
    return (
      <div className="card-lg flex flex-col items-start gap-4 p-10">
        <span className="text-[18px] font-semibold">Aucune commande récente.</span>
        <ButtonLink href="/cyber-deals">Voir les Cyber Deals</ButtonLink>
      </div>
    );
  }
  return <Confirmed order={order} />;
}

function Confirmed({ order: o }: { order: Order }) {
  const now = useNow();
  const upgrades = useStore((s) => s.upgrades);
  const addUpgrade = useStore((s) => s.addUpgrade);
  const left = now === null ? o.upEnd - o.date : Math.max(0, o.upEnd - now);
  const expired = now !== null && left === 0;
  const timer = `${pad2(Math.floor(left / 6e4))}:${pad2(Math.floor(left / 1e3) % 60)}`;
  const offers = upgradeOffers({ sub: o.sub, hasPoste: o.hasPoste, ids: o.ids });
  const payInfo =
    o.pay === "net30" ? `Échéance le ${formatShortDate(o.date + 30 * 864e5)}`
    : o.pay === "po" ? `BC ${o.po}`
    : o.pay === "transfer" ? "IBAN sur la facture"
    : "Paiement accepté";
  const steps = [
    { label: "Commande confirmée", desc: new Date(o.date).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" }), done: true },
    { label: "Préparation", desc: "Expédition sous 24 à 48 h", done: false, current: true },
    { label: o.install ? "Livraison et installation" : "Livraison", desc: `Prévue le ${o.deliv}`, done: false },
  ];

  return (
    <>
      <div className="mb-[clamp(28px,4vw,40px)] flex flex-col gap-[18px]">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-700 text-white"><Check size={24} strokeWidth={2.75} aria-hidden /></span>
        <h1 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-[1.05] tracking-tightish">Merci, votre commande est confirmée.</h1>
        <p className="m-0 text-[16px] text-n-800" role="status">
          Commande <b className="font-semibold">{o.no}</b> · confirmation envoyée à {o.email}
        </p>
        <div className="flex flex-wrap gap-2.5">
          <InvoiceButton order={o} />
          <ButtonLink href="/cyber-deals" variant="secondary" size="lg" className="!h-[50px]">Continuer mes achats</ButtonLink>
        </div>
      </div>

      <div className="grid items-start gap-[clamp(20px,3vw,32px)] md:[grid-template-columns:minmax(0,1.15fr)_minmax(0,1fr)]">
        {/* Next Upgrade */}
        <section aria-labelledby="up-title" className="flex flex-col gap-[22px] rounded-lg bg-n-900 p-[clamp(20px,3.5vw,36px)] text-bg">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex max-w-[460px] flex-col gap-2">
              <div className="eyebrow text-accent-400">NEXT UPGRADE · RÉSERVÉ À CETTE COMMANDE</div>
              <h2 id="up-title" className="text-[clamp(24px,3vw,32px)] font-semibold tracking-tightish [text-wrap:balance]">Ajoutez-le à la même livraison, sans frais de port.</h2>
            </div>
            <div className="flex flex-col items-start gap-0.5 rounded-md border border-n-700 bg-n-800 px-3.5 py-2.5" role="timer" aria-label={expired ? "Offre expirée" : "Temps restant pour l'offre"}>
              <span className="text-[12px] text-n-400">{expired ? "Offre expirée" : "Expire dans"}</span>
              <span className="text-[26px] font-semibold tabular-nums text-n-100" suppressHydrationWarning>{timer}</span>
            </div>
          </div>
          {offers.map((u, i) => {
            const added = !!upgrades[u.id];
            const exp = expired && !added;
            return (
              <div key={u.id} className={`grid items-center gap-4 rounded-md border p-[18px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr))] ${i === 0 ? "border-accent-600 bg-accent-900" : "border-n-700 bg-n-800"}`}>
                <div className="flex flex-col gap-[5px]">
                  <span className="text-[12px] font-semibold text-accent-400">{u.kicker}</span>
                  <span className="text-[17px] font-semibold leading-tight">{u.title}</span>
                  <span className="text-[13px] leading-[1.45] text-n-300">{u.desc}</span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[22px] font-semibold tabular-nums">{eur(u.ht)} <span className="text-[12px] font-medium text-n-400">HT</span></span>
                    <s className="text-[13px] text-n-400">{eur(u.was)}</s>
                  </div>
                  <button
                    type="button"
                    disabled={added || exp}
                    onClick={() => addUpgrade(u.id)}
                    className={`h-11 rounded-sm px-4 text-[14px] font-semibold ${exp ? "opacity-50" : ""} ${added ? "bg-teal-700 text-white" : i === 0 ? "bg-accent text-white" : "bg-bg text-ink"}`}
                  >
                    {added ? "Ajouté ✓" : exp ? "Expirée" : "Ajouter en 1 clic"}
                  </button>
                </div>
              </div>
            );
          })}
          <span className="text-[12px] text-n-400">Ajout en un clic · facture complémentaire générée automatiquement · même moyen de paiement.</span>
        </section>

        <div className="flex flex-col gap-3.5">
          <section className="card-lg flex flex-col gap-3.5 p-[22px]" aria-labelledby="track">
            <h2 id="track" className="text-[18px] font-semibold">Suivi</h2>
            <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
              {steps.map((st) => (
                <li key={st.label} className="flex items-start gap-3" aria-current={st.current ? "step" : undefined}>
                  <span className={`mt-1 h-3 w-3 flex-none rounded-full border-2 ${st.done ? "border-teal-700 bg-teal-700" : st.current ? "border-ink bg-n-100" : "border-n-400 bg-n-100"}`} aria-hidden />
                  <div className="flex flex-col gap-px"><span className="text-[14px] font-semibold">{st.label}</span><span className="text-[13px] text-n-700">{st.desc}</span></div>
                </li>
              ))}
            </ol>
          </section>
          <section className="card-lg flex flex-col gap-2.5 p-[22px]" aria-labelledby="recap">
            <h2 id="recap" className="mb-1 text-[18px] font-semibold">Récapitulatif</h2>
            {o.items.map((i) => (
              <div key={i.name} className="flex justify-between gap-3 text-[14px]"><span>{i.qty} × {i.name}</span><span className="whitespace-nowrap tabular-nums">{eur2(i.unit * i.qty)} HT</span></div>
            ))}
            <div className="my-1 h-px bg-n-300" />
            <SummaryRows t={o} showPostes={false} big={false} />
          </section>
          <section className="card-lg grid gap-4 p-[22px] text-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]" aria-label="Informations de commande">
            <div className="flex flex-col gap-[3px]"><span className="text-[12px] text-n-700">Société</span><span className="font-semibold">{o.company}</span><span className="text-n-700">SIRET {o.siret}</span></div>
            <div className="flex flex-col gap-[3px]"><span className="text-[12px] text-n-700">Livraison</span><span>{o.addr}</span></div>
            <div className="flex flex-col gap-[3px]"><span className="text-[12px] text-n-700">Paiement</span><span className="font-semibold">{PAYMENT_LABELS[o.pay]}</span><span className="text-n-700">{payInfo}</span></div>
          </section>
        </div>
      </div>
    </>
  );
}
