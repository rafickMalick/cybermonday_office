import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { AddBundleButton } from "@/components/cart/AddBundleButton";
import { Countdown, CountdownBlocks } from "@/components/Countdown";
import { BundleItems } from "@/components/home/BundleItems";
import { Price, PriceDisplay, TaxLabel } from "@/components/PriceDisplay";
import { ProductCard } from "@/components/ProductCard";
import { QuoteButton } from "@/components/QuoteButton";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoSlot } from "@/components/ui/PhotoSlot";
import { BUNDLE_DISCOUNT, CATEGORIES, FEATURED_IDS, LOGOS, PRODUCTS, REVIEWS, SITE_IMAGES, TIERS, TONES, CATEGORY_COVER, imagePos, mustProduct, productImage } from "@/lib/catalog";
import { bundlePrices } from "@/lib/pricing";

const TRUST = [
  { k: "01", title: "Livraison offerte dès 300 € HT", desc: "Expédition sous 24 à 48 h" },
  { k: "02", title: "Installation sur site", desc: "Montage et réglages en option" },
  { k: "03", title: "Garantie jusqu’à 10 ans", desc: "Extension disponible sur tout le catalogue" },
  { k: "04", title: "Retours sous 30 jours", desc: "Reprise gratuite, sans justificatif" },
];
const TIER_EXAMPLES = ["Une petite équipe ou un nouveau pôle", "Un open space ou une agence", "Un étage ou un déménagement"];
const PCT = `−${Math.round(BUNDLE_DISCOUNT * 100)} %`;
const section = "section-y container-page";

export default function HomePage() {
  const b = bundlePrices();
  const featured = FEATURED_IDS.map(mustProduct);
  const cats = CATEGORIES.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-n-900 text-bg">
        <div className="mx-auto grid max-w-page items-center gap-[clamp(32px,5vw,64px)] px-[clamp(16px,4vw,40px)] py-[clamp(40px,7vw,96px)] [grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr))]">
          <div className="flex flex-col gap-7">
            <div className="text-[12px] font-semibold tracking-[.14em] text-accent-400">CYBER MONDAY · ÉDITION PRO 2026</div>
            <h1 className="heading-hero [text-wrap:balance]">L&apos;équipement de bureau pro, jusqu&apos;à −30 %.</h1>
            <p className="m-0 max-w-[540px] text-[clamp(16px,1.6vw,19px)] leading-[1.55] text-n-300 [text-wrap:pretty]">
              Bureaux assis-debout, sièges ergonomiques, écrans et visio. Prix HT affichés, facture immédiate et paiement à 30 jours pour les entreprises.
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="text-[13px] text-n-400">Fin des offres dans</div>
              <CountdownBlocks />
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/cyber-deals" size="lg" className="!text-[15px]">
                Voir les Cyber Deals <ArrowRight size={18} strokeWidth={2.75} aria-hidden />
              </ButtonLink>
              <QuoteButton variant="outline-light" size="lg">Devis pour une équipe</QuoteButton>
            </div>
          </div>
          <PhotoSlot label="Poste de travail complet" src={SITE_IMAGES.hero} priority sizes="(min-width:1024px) 50vw, 100vw" position="50% 60%" tone="var(--color-neutral-800)" dark labelAt="top" className="aspect-[4/3.4] rounded-lg">
            <div className="absolute inset-x-4 bottom-4 flex max-w-[360px] flex-col gap-2.5 rounded-md bg-bg p-[18px] text-ink">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] tracking-[.08em] text-n-700">COMPLETE YOUR WORKSPACE</span>
                <span className="rounded-sm bg-accent px-[7px] py-[3px] text-[12px] font-semibold text-white">{PCT}</span>
              </div>
              <div className="text-[17px] font-semibold tracking-tightish">Poste complet · 6 articles</div>
              <PriceDisplay ht={b.ht} was={b.sum} size="lg" />
              <ButtonLink href="/produit/lift-pro-160#bundle" variant="dark" size="sm">Découvrir le pack</ButtonLink>
            </div>
          </PhotoSlot>
        </div>
      </section>

      {/* Arguments de confiance */}
      <section className="border-b border-n-300 bg-n-100" aria-label="Nos engagements">
        <ul className="m-0 mx-auto grid max-w-page list-none gap-x-7 gap-y-[18px] px-[clamp(16px,4vw,40px)] py-[22px] [grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))]">
          {TRUST.map((t) => (
            <li key={t.k} className="flex items-start gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-accent-100 text-[12px] font-semibold text-accent-700" aria-hidden>{t.k}</span>
              <div className="flex flex-col gap-0.5"><span className="text-[14px] font-semibold">{t.title}</span><span className="text-[13px] leading-[1.4] text-n-700">{t.desc}</span></div>
            </li>
          ))}
        </ul>
      </section>

      {/* Produits vedettes */}
      <section className={section}>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2.5">
            <div className="eyebrow text-accent-700">FLASH DEALS · <Countdown /></div>
            <h2 className="heading-2">Les références en vedette</h2>
          </div>
          <ButtonLink href="/cyber-deals" variant="secondary" size="sm">Toutes les offres ({PRODUCTS.length})</ButtonLink>
        </div>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr))]">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Complete Your Workspace */}
      <section className={section}>
        <div className="grid overflow-hidden rounded-lg border border-n-300 bg-n-100 [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))]">
          <div className="flex flex-col gap-[18px] p-[clamp(24px,4vw,48px)]">
            <div className="eyebrow text-accent-700">COMPLETE YOUR WORKSPACE</div>
            <h2 className="heading-2 [text-wrap:balance]">Un poste complet, prêt à travailler, {PCT} sur le pack.</h2>
            <p className="m-0 max-w-[480px] text-[16px] leading-[1.55] text-n-700">
              Six références pensées pour fonctionner ensemble, livrées en une fois et installées sur site si vous le souhaitez.
            </p>
            <BundleItems />
          </div>
          <PhotoSlot label="Pack poste complet" src={SITE_IMAGES.pack} sizes="(min-width:1024px) 50vw, 100vw" position="50% 40%" tone="var(--color-surface)" labelAt="top" className="flex min-h-[320px] flex-col justify-end gap-4 p-[clamp(24px,4vw,48px)] !overflow-visible">
            <div className="relative flex flex-col gap-4 self-start rounded-md bg-bg p-5 shadow-lg">
              <div className="relative flex flex-col gap-1.5">
                <span className="text-[14px] text-n-700">Prix séparés <s><Price ht={b.sum} /></s></span>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="text-[clamp(36px,4vw,48px)] font-semibold tracking-tightish"><Price ht={b.ht} /></span>
                  <span className="text-[14px] font-semibold text-n-700"><TaxLabel /></span>
                </div>
                <span className="text-[14px] font-semibold text-accent-700">Vous économisez <Price ht={b.sum - b.ht} /> par poste</span>
              </div>
              <div className="relative flex flex-wrap gap-2.5">
                <AddBundleButton size="md">Ajouter le pack</AddBundleButton>
                <ButtonLink href="/produit/lift-pro-160#bundle" variant="secondary">Voir le détail</ButtonLink>
              </div>
            </div>
          </PhotoSlot>
        </div>
      </section>

      {/* Catalogue */}
      <section className={section}>
        <h2 className="heading-2 mb-6">Catalogue</h2>
        <ul className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fill,minmax(min(100%,150px),1fr))]">
          {cats.map((c) => {
            const from = Math.min(...PRODUCTS.filter((p) => p.cat === c.id).map((p) => p.ht));
            return (
              <li key={c.id}>
                <Link href={`/cyber-deals?cat=${c.id}`} className="flex h-full flex-col overflow-hidden rounded-sm border border-n-300 bg-n-100 hover:border-ink">
                  {c.id === "all" ? null : (
                    <PhotoSlot label={c.label} src={productImage(mustProduct(CATEGORY_COVER[c.id]))} position={imagePos(mustProduct(CATEGORY_COVER[c.id]))} sizes="(min-width:1024px) 15vw, 45vw" tone={TONES[c.id]} className="aspect-[4/3] w-full" />
                  )}
                  <span className="flex flex-col gap-1 p-3.5">
                    <span className="text-[15px] font-semibold leading-tight">{c.label}</span>
                    <span className="text-[13px] text-n-700">dès <Price ht={from} /> <TaxLabel /></span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Remises volume */}
      <section className={section}>
        <div className="flex flex-col gap-7 rounded-lg bg-n-900 p-[clamp(24px,4vw,48px)] text-bg">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[620px] flex-col gap-3">
              <div className="eyebrow text-accent-400">REMISES SUR VOLUME</div>
              <h2 className="heading-2 [text-wrap:balance]">Plus vous équipez de postes, plus la remise augmente.</h2>
              <p className="m-0 text-[15px] leading-normal text-n-300">Cumulable avec les Cyber Deals. Calculée automatiquement dans le panier.</p>
            </div>
            <QuoteButton variant="outline-light" size="md">Plus de 10 postes : devis sous 24 h</QuoteButton>
          </div>
          <ul className="m-0 grid list-none gap-3 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
            {TIERS.map((t, i) => (
              <li key={t.n} className="flex flex-col gap-1.5 rounded-md border border-n-700 bg-n-800 p-[22px]">
                <span className="text-[clamp(36px,4vw,48px)] font-semibold tracking-tightish text-accent-400">−{t.p} %</span>
                <span className="text-[15px] font-semibold">dès {t.n} postes</span>
                <span className="text-[13px] text-n-400">{TIER_EXAMPLES[i]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Preuve sociale */}
      <section className="section-y container-page pb-[clamp(48px,7vw,88px)]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="heading-2">Ils équipent leurs équipes avec Établi</h2>
          <span className="text-[14px] text-n-700">4 800 entreprises équipées · ★ 4,7 / 5 · 2 184 avis vérifiés</span>
        </div>
        <ul aria-label="Références clients (exemples)" className="m-0 mb-6 grid list-none border-y border-n-300 p-0 [grid-template-columns:repeat(auto-fit,minmax(min(100%,140px),1fr))]">
          {LOGOS.map((l) => (
            <li
              key={l.name}
              className="flex h-[76px] items-center justify-center text-[19px] text-n-800"
              style={{ fontWeight: l.weight, letterSpacing: l.spacing, fontFamily: l.serif ? "Georgia, serif" : undefined }}
            >
              {l.name}
            </li>
          ))}
        </ul>
        <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card m-0 flex flex-col gap-3 p-[22px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[14px] tracking-[2px]" aria-label={`Note : ${r.stars.split("★").length - 1} sur 5`}>{r.stars}</span>
                <span className="flex items-center gap-1 text-[12px] font-semibold text-teal-700"><Check size={14} strokeWidth={2.75} aria-hidden />Achat vérifié</span>
              </div>
              <div className="text-[16px] font-semibold leading-tight">{r.title}</div>
              <blockquote className="m-0 text-[14px] leading-[1.55] text-n-800 [text-wrap:pretty]">{r.text}</blockquote>
              <figcaption className="mt-auto flex flex-col gap-0.5 border-t border-n-200 pt-3">
                <span className="text-[14px] font-semibold">{r.name}</span>
                <span className="text-[13px] text-n-700">{r.role} · {r.co}</span>
                <span className="text-[12px] text-n-700">{r.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
