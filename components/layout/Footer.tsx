import Link from "next/link";
import { COMPANY, PAYMENT_BADGES } from "@/lib/catalog";
import { LEGAL_DOCS } from "@/lib/legal";
import { QuoteButton } from "../QuoteButton";
import { ManageCookiesButton } from "../overlays/ManageCookiesButton";

const COLS: { title: string; items: string[] }[] = [
  { title: "Catalogue", items: ["Bureaux assis-debout", "Chaises ergonomiques", "Écrans & bras", "Visioconférence"] },
  { title: "Services pro", items: ["Paiement à 30 jours", "Installation sur site", "Garantie étendue", "Compte entreprise"] },
  { title: "Aide", items: ["Livraison & retours 30 j", "Suivi de commande", `${COMPANY.phone} · 9h–18h`] },
];

export function Footer() {
  return (
    <footer className="bg-n-900 text-n-300">
      <div className="mx-auto flex max-w-page flex-col gap-9 px-[clamp(16px,4vw,40px)] pb-7 pt-[clamp(40px,6vw,64px)]">
        <div className="flex flex-wrap items-end justify-between gap-7 border-b border-n-700 pb-8">
          <div className="flex max-w-[520px] flex-col gap-2.5">
            <span className="text-[clamp(24px,3vw,32px)] font-semibold tracking-tightish text-bg">Plus de 10 postes à équiper ?</span>
            <span className="text-[15px] leading-normal">Un conseiller dédié prépare votre devis sous 24 h, avec planning de livraison et d&apos;installation.</span>
          </div>
          <QuoteButton variant="light" size="lg">Demander un devis</QuoteButton>
        </div>
        <div className="grid gap-7 text-[14px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr))]">
          <div className="flex flex-col gap-2.5">
            <span className="text-[20px] font-semibold tracking-tightish text-bg">établi</span>
            <span className="leading-normal">Équipement de bureau professionnel pour indépendants, PME et grandes équipes.</span>
          </div>
          {COLS.map((c) => (
            <div key={c.title} className="flex flex-col gap-2">
              <span className="font-semibold text-bg">{c.title}</span>
              {c.items.map((i) => <span key={i}>{i}</span>)}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-n-700 pt-5">
          <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Moyens de paiement">
            {PAYMENT_BADGES.map((b) => (
              <li key={b} className="flex h-7 items-center rounded-sm border border-n-600 px-[9px] text-[12px] font-semibold text-n-200">{b}</li>
            ))}
          </ul>
          <span className="text-[12px]">{COMPANY.name} · {COMPANY.rcs} · © 2026</span>
        </div>
        <nav aria-label="Informations légales" className="flex flex-wrap gap-x-5 gap-y-1 text-[13px]">
          {LEGAL_DOCS.map((d) => (
            <Link key={d.id} href={`/legal/${d.id}`} className="flex min-h-11 items-center text-n-300 hover:text-n-100 hover:underline">{d.title}</Link>
          ))}
          <ManageCookiesButton />
        </nav>
      </div>
    </footer>
  );
}
