"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PAYMENT_BADGES, type PaymentMethod } from "@/lib/catalog";
import { addBusinessDays, INSTALL_PER_POSTE_HT } from "@/lib/pricing";
import { eur2, formatLongDate, formatShortDate } from "@/lib/format";
import { useNow } from "@/lib/hooks";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "@/lib/store";
import { useCart } from "@/lib/useCart";
import { SummaryRows } from "../SummaryRows";
import { Button, ButtonLink } from "../ui/Button";
import { Field } from "./Field";

const DEMO = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_CHECKOUT_DEMO === "1";

const PAY_OPTIONS: { id: PaymentMethod; label: string; desc: string }[] = [
  { id: "card", label: "Carte bancaire", desc: "Visa, Mastercard, CB · 3-D Secure" },
  { id: "transfer", label: "Virement SEPA", desc: "Expédition à réception du virement" },
  { id: "net30", label: "Paiement à 30 jours", desc: "Pour les entreprises · réponse immédiate" },
  { id: "po", label: "Bon de commande", desc: "Joignez votre n° de BC interne" },
];

/** Saisie assistée : chiffres seulement, groupes de 4 pour la carte, « / » automatique pour l'expiration. */
function normalize(name: string, v: string): string {
  switch (name) {
    case "cp":
    case "bCp":
      return v.replace(/\D/g, "").slice(0, 5);
    case "card":
      return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
    case "cvc":
      return v.replace(/\D/g, "").slice(0, 4);
    case "exp": {
      const d = v.replace(/\D/g, "").slice(0, 4);
      return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    }
    case "tva":
      return v.toUpperCase();
    default:
      return v;
  }
}

export function CheckoutForm() {
  const router = useRouter();
  const hydrated = useStore((s) => s.hydrated);
  const { lines, totals, empty } = useCart();
  const { form, errors, pay, billingDiff, install, cgvOk } = useStore(
    useShallow((s) => ({ form: s.form, errors: s.errors, pay: s.pay, billingDiff: s.billingDiff, install: s.install, cgvOk: s.cgvOk })),
  );
  const st = useStore.getState;
  const now = useNow();
  const alertRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const errCount = Object.keys(errors).length;

  useEffect(() => {
    if (errCount) alertRef.current?.focus();
  }, [errCount]);

  if (!hydrated) return <div className="h-96" aria-busy aria-label="Chargement" />;
  if (empty && !done) {
    return (
      <div className="card-lg flex flex-col items-start gap-4 p-10">
        <span className="text-[18px] font-semibold">Votre panier est vide.</span>
        <ButtonLink href="/cyber-deals">Voir les Cyber Deals</ButtonLink>
      </div>
    );
  }

  const set = (k: string) => (v: string) => st().setField(k, normalize(k, v));
  const f = (k: string) => form[k] ?? "";
  const field = (name: string, label: string, o: Partial<React.ComponentProps<typeof Field>> = {}) => (
    <Field key={name} name={name} label={label} value={f(name)} error={errors[name]} onChange={set(name)} {...o} />
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = st().placeOrder();
    if (r.ok) {
      setDone(true);
      // À brancher : paiement réel (PSP), création de la commande côté serveur, envoi des e-mails.
      router.push(`/confirmation/${r.no}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const delivery = now === null ? "" : formatLongDate(addBusinessDays(now, 4));
  const net30Date = now === null ? "" : formatShortDate(now + 30 * 864e5);
  const payNote =
    pay === "transfer" ? "Les coordonnées bancaires figurent sur la facture PDF. Votre stock est réservé 5 jours."
    : pay === "net30" ? `Facture payable à 30 jours${net30Date ? `, soit le ${net30Date}` : ""}. Sous réserve de validation de votre SIRET, instantanée.`
    : pay === "po" ? "Le numéro de BC apparaîtra sur la facture. Paiement à réception de facture."
    : "";
  const payCta = pay === "card" ? "Payer" : pay === "transfer" ? "Commander et recevoir l’IBAN" : "Valider la commande";

  const card = "card-lg flex flex-col gap-4 p-[clamp(18px,3vw,26px)]";
  const grid = "grid gap-3.5 md:grid-cols-2";
  const step = (n: number, title: string) => (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white" aria-hidden>{n}</span>
      <h2 className="text-[18px] font-semibold">{title}</h2>
    </div>
  );
  const check = "h-[18px] w-[18px] accent-[var(--color-accent)]";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <Link href="/panier" className="flex min-h-11 items-center text-[14px] text-n-800 hover:underline">← Retour au panier</Link>
        {DEMO && (
          <button type="button" onClick={() => st().fillDemo()} className="h-11 rounded-sm border border-dashed border-n-400 px-3 text-[12px] text-n-700">
            Remplir un exemple
          </button>
        )}
      </div>
      <h1 className="mb-2 text-[clamp(30px,4vw,44px)] font-semibold tracking-tightish">Finaliser la commande</h1>
      <p className="mb-7 mt-0 text-[15px] text-n-700">Une seule page. Facture PDF disponible dès la validation.</p>

      {errCount > 0 && (
        <div
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="mb-5 rounded-md border border-danger-border bg-danger-bg px-4 py-3.5 text-[14px] text-danger-ink"
        >
          Merci de compléter les champs signalés ({errCount}).
        </div>
      )}

      <div className="grid items-start gap-[clamp(24px,4vw,48px)] md:[grid-template-columns:minmax(0,1fr)_400px]">
        <div className="flex flex-col gap-[18px]">
          <section className={card} aria-label="Contact">
            {step(1, "Contact")}
            <div className={grid}>
              {field("email", "E-mail professionnel", { full: true, type: "email", autoComplete: "email", inputMode: "email", placeholder: "prenom.nom@entreprise.fr" })}
              {field("prenom", "Prénom", { autoComplete: "given-name" })}
              {field("nom", "Nom", { autoComplete: "family-name" })}
              {field("tel", "Téléphone", { type: "tel", inputMode: "tel", autoComplete: "tel" })}
              {field("fonction", "Fonction (facultatif)", { placeholder: "Office manager, achats…" })}
            </div>
          </section>

          <section className={card} aria-label="Société">
            {step(2, "Société")}
            <div className={grid}>
              {field("societe", "Nom de l’entreprise", { full: true, autoComplete: "organization" })}
              {field("siret", "N° SIRET", { inputMode: "numeric", placeholder: "14 chiffres", maxLength: 17 })}
              {field("tva", "TVA intracommunautaire (facultatif)", { placeholder: "FR12345678901", maxLength: 16 })}
            </div>
          </section>

          <section className={card} aria-label="Livraison">
            {step(3, "Livraison")}
            <div className={grid}>
              {field("adresse", "Adresse de livraison", { full: true, autoComplete: "street-address" })}
              {field("cp", "Code postal", { inputMode: "numeric", autoComplete: "postal-code", maxLength: 5 })}
              {field("ville", "Ville", { autoComplete: "address-level2" })}
            </div>
            <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[14px]">
              <input type="checkbox" checked={billingDiff} onChange={(e) => st().setBillingDiff(e.target.checked)} className={check} />
              Adresse de facturation distincte
            </label>
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-n-300 p-3.5 text-[14px]">
              <input type="checkbox" checked={install} onChange={(e) => st().setInstall(e.target.checked)} className={`${check} mt-px`} />
              <span className="flex flex-col gap-0.5">
                <b className="font-semibold">Installation sur site · {INSTALL_PER_POSTE_HT} € HT / poste</b>
                <span className="text-[13px] text-n-700" suppressHydrationWarning>
                  {delivery ? `Livraison estimée le ${delivery} · ` : ""}montage, réglages, reprise des emballages
                </span>
              </span>
            </label>
          </section>

          {billingDiff && (
            <section className={card} aria-label="Adresse de facturation">
              {step(4, "Adresse de facturation")}
              <div className={grid}>
                {field("bAdresse", "Adresse de facturation", { full: true })}
                {field("bCp", "Code postal", { inputMode: "numeric", maxLength: 5 })}
                {field("bVille", "Ville")}
              </div>
            </section>
          )}

          <section className={card} aria-label="Paiement">
            {step(billingDiff ? 5 : 4, "Paiement")}
            <fieldset className="m-0 grid min-w-0 gap-2.5 border-0 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
              <legend className="sr-only">Moyen de paiement</legend>
              {PAY_OPTIONS.map((o) => (
                <label
                  key={o.id}
                  className="flex min-h-[76px] cursor-pointer items-start gap-3 rounded-sm border border-n-300 bg-n-100 px-4 py-3.5 has-[:checked]:border-2 has-[:checked]:border-accent has-[:checked]:bg-accent-100 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-600"
                >
                  <input type="radio" name="pay" value={o.id} checked={pay === o.id} onChange={() => st().setPay(o.id)} className="peer sr-only" />
                  <span className="mt-px flex h-[18px] w-[18px] flex-none items-center justify-center rounded-full border-2 border-n-400 peer-checked:border-accent" aria-hidden>
                    <span className={`h-2 w-2 rounded-full ${pay === o.id ? "bg-accent" : "bg-transparent"}`} />
                  </span>
                  <span className="flex flex-col gap-[3px]">
                    <span className="text-[15px] font-semibold">{o.label}</span>
                    <span className="text-[13px] leading-[1.4] text-n-700">{o.desc}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            {pay === "card" && (
              <div className={grid}>
                {field("card", "Numéro de carte", { full: true, inputMode: "numeric", autoComplete: "cc-number", placeholder: "1234 5678 9012 3456", tabular: true })}
                {field("exp", "Expiration", { placeholder: "MM/AA", autoComplete: "cc-exp", inputMode: "numeric", tabular: true })}
                {field("cvc", "Cryptogramme", { inputMode: "numeric", autoComplete: "cc-csc", placeholder: "123", tabular: true })}
              </div>
            )}
            {pay === "po" && <div className={grid}>{field("po", "N° de bon de commande", { full: true, placeholder: "BC-2026-0412" })}</div>}
            {payNote && <div className="rounded-md bg-bg px-4 py-3.5 text-[14px] leading-normal text-n-800" suppressHydrationWarning>{payNote}</div>}
          </section>
        </div>

        <aside aria-label="Votre commande" className="flex flex-col gap-3.5 md:sticky md:top-6">
          <div className="card-lg flex flex-col gap-3 p-[22px]">
            <h2 className="mb-1 text-[18px] font-semibold">Votre commande · {totals.count} article{totals.count > 1 ? "s" : ""}</h2>
            {lines.map((l) => (
              <div key={l.key} className="flex items-center gap-3 text-[14px]">
                <span className="relative h-11 w-11 flex-none rounded-md" style={{ background: l.tone }} aria-hidden>
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md bg-ink px-[5px] text-[11px] font-semibold text-white">{l.qty}</span>
                </span>
                <span className="min-w-0 flex-1 leading-tight"><span className="sr-only">{l.qty} × </span>{l.name}</span>
                <span className="whitespace-nowrap tabular-nums">{eur2(l.unitHT * l.qty)}</span>
              </div>
            ))}
            <div className="my-1 h-px bg-n-300" />
            <SummaryRows t={totals} />
            <Button type="submit" variant="primary" size="xl" className="justify-between gap-3">
              <span>{payCta}</span><span className="tabular-nums">{eur2(totals.ttc)}</span>
            </Button>
            <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-normal text-n-800">
              <input type="checkbox" checked={cgvOk} onChange={(e) => st().setCgv(e.target.checked)} aria-invalid={errors.cgv ? true : undefined} aria-describedby={errors.cgv ? "cgv-err" : undefined} className={`${check} mt-px flex-none`} />
              <span>
                J&apos;accepte les{" "}
                <Link href="/legal/cgv?from=checkout" className="text-accent-700 underline underline-offset-[3px]">conditions générales de vente</Link>{" "}
                et la{" "}
                <Link href="/legal/confidentialite?from=checkout" className="text-accent-700 underline underline-offset-[3px]">politique de confidentialité</Link>.
              </span>
            </label>
            {errors.cgv && <span id="cgv-err" className="text-[12px] text-danger">Veuillez accepter les CGV pour valider la commande.</span>}
            <span className="text-[12px] leading-normal text-n-700">Retours sous 30 jours · Facture PDF immédiate · Données hébergées en UE.</span>
          </div>
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Moyens de paiement acceptés">
            {PAYMENT_BADGES.map((b) => <li key={b} className="flex h-7 items-center rounded-sm border border-n-300 bg-n-100 px-[9px] text-[12px] font-semibold text-n-800">{b}</li>)}
          </ul>
        </aside>
      </div>
    </form>
  );
}
