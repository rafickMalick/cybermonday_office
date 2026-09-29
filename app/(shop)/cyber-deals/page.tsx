import type { Metadata } from "next";
import { Suspense } from "react";
import { Countdown } from "@/components/Countdown";
import { DealsBrowser, DealsFallback } from "@/components/product/DealsBrowser";
import { DealsSummary } from "@/components/product/DealsHeading";

export const metadata: Metadata = {
  title: "Cyber Deals",
  description: "Toutes les offres Cyber Monday Pro : bureaux assis-debout, chaises, écrans, visio. Remises volume dès 3 postes.",
};

export default function CyberDealsPage() {
  return (
    <section className="container-page pb-[clamp(48px,7vw,88px)] pt-[clamp(28px,5vw,56px)]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-2.5">
          <div className="eyebrow text-accent-700">CYBER MONDAY PRO</div>
          <h1 className="text-[clamp(34px,5vw,56px)] font-semibold leading-[1.05] tracking-tightish">Cyber Deals</h1>
          <p className="m-0 text-[15px] text-n-700">
            <Suspense fallback="Offres Cyber Monday"><DealsSummary /></Suspense>
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-md bg-n-900 px-4 py-3 text-bg" role="timer" aria-label="Temps restant">
          <span className="text-[13px] text-n-400">Fin dans</span>
          <Countdown className="text-[22px] font-semibold" />
        </div>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-3.5 rounded-md border border-accent-300 bg-accent-100 px-[18px] py-3.5">
        <span className="text-[14px] font-semibold text-accent-800">Équipez une équipe</span>
        <span className="text-[14px] text-accent-800">−5 % dès 3 postes · −10 % dès 5 · −15 % dès 10, appliqué automatiquement au panier.</span>
      </div>
      <Suspense fallback={<DealsFallback />}>
        <DealsBrowser />
      </Suspense>
    </section>
  );
}
