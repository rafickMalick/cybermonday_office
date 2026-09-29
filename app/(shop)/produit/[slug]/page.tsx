import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BundleSection } from "@/components/product/BundleSection";
import { ProductDetail } from "@/components/product/ProductDetail";
import { PRODUCTS, REVIEWS, getProductBySlug } from "@/lib/catalog";

const BENEFIT_TITLES = ["Ergonomie", "Productivité", "Conformité aux normes", "Durabilité", "Garantie"];

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProductBySlug((await params).slug);
  if (!p) return {};
  return { title: p.name, description: `${p.name} — ${p.short} Garantie ${p.warrantyYears} ans, ${p.norm}.` };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProductBySlug((await params).slug);
  if (!p) notFound();

  const specs = [...p.specs, { k: "Garantie", v: `${p.warrantyYears} ans` }, { k: "Norme", v: p.norm }];

  return (
    <>
      <section className="container-page pt-5">
        <nav aria-label="Fil d'Ariane" className="mb-5 flex flex-wrap gap-2 text-[13px] text-n-700">
          <Link href="/" className="hover:underline">Accueil</Link><span aria-hidden>/</span>
          <Link href="/cyber-deals" className="hover:underline">Cyber Deals</Link><span aria-hidden>/</span>
          <span className="text-ink" aria-current="page">{p.name}</span>
        </nav>
        <ProductDetail product={p} />
      </section>

      <BundleSection currentId={p.id} />

      <section className="container-page pt-[clamp(48px,7vw,80px)]">
        <h2 className="heading-3 mb-6">Pourquoi ce choix pour vos équipes</h2>
        <ol className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {p.benefits.map((text, i) => (
            <li key={i} className="card flex flex-col gap-2.5 p-5">
              <span className="text-[12px] font-semibold text-accent-700">0{i + 1}</span>
              <span className="text-[16px] font-semibold">{BENEFIT_TITLES[i]}</span>
              <span className="text-[14px] leading-[1.55] text-n-800 [text-wrap:pretty]">{text}</span>
            </li>
          ))}
        </ol>
        <div className="mt-[clamp(40px,6vw,64px)] grid gap-[clamp(24px,4vw,48px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div>
            <h3 className="mb-3 text-[20px] font-semibold tracking-tightish">Caractéristiques</h3>
            <dl className="m-0 border-t border-n-300">
              {specs.map((s) => (
                <div key={s.k} className="grid gap-4 border-b border-n-300 py-[13px] text-[14px] [grid-template-columns:minmax(0,1fr)_minmax(0,1.4fr)]">
                  <dt className="text-n-700">{s.k}</dt>
                  <dd className="m-0">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="mb-3 text-[20px] font-semibold tracking-tightish">Avis d&apos;acheteurs professionnels</h3>
            <div className="flex flex-col gap-3">
              {REVIEWS.slice(0, 2).map((r) => (
                <figure key={r.name} className="card m-0 flex flex-col gap-2 p-[18px]">
                  <div className="flex justify-between gap-2"><span className="text-[13px] tracking-[2px]">{r.stars}</span><span className="text-[12px] font-semibold text-teal-700">Achat vérifié</span></div>
                  <blockquote className="m-0 text-[14px] leading-[1.55] text-n-800">{r.text}</blockquote>
                  <figcaption className="text-[13px]"><b>{r.name}</b> <span className="text-n-700">· {r.role}, {r.co}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="h-[clamp(48px,7vw,88px)]" />
    </>
  );
}
