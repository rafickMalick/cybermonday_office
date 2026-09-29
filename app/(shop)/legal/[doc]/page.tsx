import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BackToCheckout, LegalNav } from "@/components/legal/LegalNav";
import { COMPANY } from "@/lib/catalog";
import { LEGAL_DOCS, getLegalDoc } from "@/lib/legal";

export function generateStaticParams() {
  return LEGAL_DOCS.map((d) => ({ doc: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = getLegalDoc((await params).doc);
  return d ? { title: d.title } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const doc = getLegalDoc((await params).doc);
  if (!doc) notFound();

  return (
    <section className="container-page pb-[clamp(48px,7vw,88px)] pt-[clamp(28px,5vw,56px)]">
      <Suspense fallback={null}><BackToCheckout /></Suspense>
      <div className="eyebrow mb-2.5 text-accent-700">INFORMATIONS LÉGALES</div>
      <div className="grid items-start gap-[clamp(24px,4vw,56px)] md:[grid-template-columns:240px_minmax(0,1fr)]">
        <Suspense fallback={<div className="h-11" />}><LegalNav current={doc.id} /></Suspense>
        <article className="flex min-w-0 max-w-[760px] flex-col gap-7">
          <div className="flex flex-col gap-2">
            <h1 className="text-[clamp(30px,4vw,44px)] font-semibold leading-[1.1] tracking-tightish">{doc.title}</h1>
            <span className="text-[13px] text-n-700">Dernière mise à jour : {doc.updated}</span>
          </div>
          {doc.sections.map((sec) => (
            <div key={sec.h} className="flex flex-col gap-2.5 border-t border-n-300 pt-[22px]">
              <h2 className="text-[19px] font-semibold tracking-[-0.01em]">{sec.h}</h2>
              {sec.p.map((para, i) => <p key={i} className="m-0 text-[15px] leading-[1.65] text-n-800 [text-wrap:pretty]">{para}</p>)}
            </div>
          ))}
          <div className="rounded-md border border-n-300 bg-n-100 p-[18px] text-[14px] leading-[1.55] text-n-800">
            Une question sur ce document ? juridique@etabli.pro · {COMPANY.phone}, du lundi au vendredi de 9 h à 18 h.
          </div>
        </article>
      </div>
    </section>
  );
}
