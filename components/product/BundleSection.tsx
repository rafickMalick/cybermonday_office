import Link from "next/link";
import { AddBundleCta } from "../cart/AddBundleButton";
import { Price, TaxLabel } from "../PriceDisplay";
import { BUNDLE_DISCOUNT, BUNDLE_IDS, TONES, mustProduct } from "@/lib/catalog";
import { bundlePrices } from "@/lib/pricing";

const PCT = `−${Math.round(BUNDLE_DISCOUNT * 100)} %`;

/** Bloc « Complete Your Workspace » de la fiche produit : 6 articles, −12 % sur le pack. */
export function BundleSection({ currentId }: { currentId: string }) {
  const b = bundlePrices();
  return (
    <section id="bundle" className="container-page pt-[clamp(48px,7vw,80px)]" aria-labelledby="bundle-title">
      <div className="card-lg flex flex-col gap-6 p-[clamp(20px,3.5vw,40px)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="eyebrow text-accent-700">COMPLETE YOUR WORKSPACE</div>
            <h2 id="bundle-title" className="h-3">Complétez le poste, {PCT} sur le pack</h2>
          </div>
          <span className="text-[14px] text-n-700">Livraison groupée · installation en une intervention</span>
        </div>
        <ul className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr))]">
          {BUNDLE_IDS.map((id) => {
            const p = mustProduct(id);
            const current = id === currentId;
            return (
              <li key={id}>
                <Link
                  href={`/produit/${p.slug}`}
                  aria-current={current ? "page" : undefined}
                  className={`flex h-full flex-col overflow-hidden rounded-sm border bg-n-100 ${current ? "border-ink" : "border-n-300 hover:border-n-500"}`}
                >
                  <span className="stripes relative block aspect-square w-full" style={{ backgroundColor: TONES[p.cat] }} aria-hidden>
                    {current && <span className="absolute left-2 top-2 rounded-sm bg-ink px-1.5 py-[3px] text-[11px] font-semibold text-white">Vous consultez</span>}
                  </span>
                  <span className="flex flex-col gap-[3px] p-3">
                    <span className="text-[12px] text-n-700">{p.type}</span>
                    <span className="text-[14px] font-semibold leading-tight">{p.name}</span>
                    <span className="mt-1 text-[13px] tabular-nums"><Price ht={p.ht} /></span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-5 border-t border-n-300 pt-5">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-2.5">
              <span className="text-[14px] text-n-700">Pack 6 articles</span>
              <span className="text-[32px] font-semibold tracking-tightish"><Price ht={b.ht} /></span>
              <span className="text-[13px] font-semibold text-n-700"><TaxLabel /></span>
              <s className="text-[15px] text-n-700"><Price ht={b.sum} /></s>
            </div>
            <span className="text-[14px] font-semibold text-accent-700"><Price ht={b.sum - b.ht} /> d&apos;économie supplémentaire par poste</span>
          </div>
          <AddBundleCta />
        </div>
      </div>
    </section>
  );
}

