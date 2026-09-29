"use client";

import { useCallback, useRef } from "react";
import { X } from "lucide-react";
import { useStore } from "@/lib/store";
import { useDialog } from "@/lib/useDialog";
import { Button } from "../ui/Button";

const input = "h-[46px] rounded-sm border border-n-300 bg-n-100 px-3 text-[16px]";
const label = "flex flex-col gap-1.5 text-[13px] font-medium text-n-800";

/** Modale « Demander un devis » : entreprise, e-mail, nombre de postes (≥ 10 pré-rempli), besoin. */
export function QuoteModal() {
  const open = useStore((s) => s.quoteOpen);
  const sent = useStore((s) => s.quoteSent);
  const defaultN = useStore((s) => s.quoteDefault);
  const close = useStore((s) => s.closeQuote);
  const submit = useStore((s) => s.submitQuote);
  const ref = useRef<HTMLDivElement>(null);
  const onClose = useCallback(() => close(), [close]);
  useDialog(open, ref, onClose);
  if (!open) return null;

  return (
    <>
      <div onClick={close} aria-hidden className="fixed inset-0 z-[100] bg-[rgba(46,43,37,0.55)]" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="fixed left-1/2 top-1/2 z-[110] flex max-h-[calc(100vh-24px)] w-[min(520px,calc(100vw-24px))] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg bg-n-100 p-[clamp(20px,4vw,32px)] shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <h2 id="quote-title" className="text-[22px] font-semibold tracking-tightish">Demander un devis</h2>
            <span className="text-[14px] text-n-700">Réponse sous 24 h ouvrées · tarifs Cyber Monday garantis 15 jours</span>
          </div>
          <button type="button" aria-label="Fermer" onClick={close} className="flex h-11 w-11 flex-none items-center justify-center">
            <X size={20} strokeWidth={2.5} aria-hidden />
          </button>
        </div>
        {sent ? (
          <>
            <div role="status" className="rounded-md bg-teal-100 p-[18px] text-[15px] leading-normal text-teal-800">
              Demande envoyée. Un conseiller entreprise vous recontacte sous 24 h avec un devis PDF.
            </div>
            <Button variant="dark" size="md" data-autofocus onClick={close}>Fermer</Button>
          </>
        ) : (
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              // À brancher : envoi de la demande au CRM / back-office.
              submit();
            }}
          >
            <label className={label}>Entreprise<input required name="co" autoComplete="organization" data-autofocus className={input} /></label>
            <label className={label}>E-mail professionnel<input required type="email" name="em" autoComplete="email" className={input} /></label>
            <label className={label}>Nombre de postes<input required type="number" min={10} name="n" defaultValue={defaultN} inputMode="numeric" className={input} /></label>
            <label className={label}>
              Besoin (références, délais, installation)
              <textarea name="msg" rows={3} className="rounded-md border border-n-300 bg-n-100 px-3 py-2.5 text-[16px]" />
            </label>
            <Button type="submit" variant="primary" size="md" className="h-[50px]">Envoyer la demande</Button>
          </form>
        )}
      </div>
    </>
  );
}
