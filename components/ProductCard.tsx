"use client";

import Link from "next/link";
import { BADGES, BOUGHT, TONES, imagePos, productImage, type Product } from "@/lib/catalog";
import { eur } from "@/lib/format";
import { pctLabel } from "@/lib/format";
import { soldPercent } from "@/lib/pricing";
import { useLive } from "@/lib/hooks";
import { useStore } from "@/lib/store";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { PhotoSlot } from "./ui/PhotoSlot";
import { PriceDisplay } from "./PriceDisplay";

export function ProductCard({ product: p }: { product: Product }) {
  const add = useStore((s) => s.add);
  const viewers = useLive((s) => s.viewers[p.id]);
  const sold = soldPercent(p);
  const badge = BADGES[p.id];
  const href = `/produit/${p.slug}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-n-300 bg-n-100 transition-[border-color,box-shadow] duration-200 hover:border-n-400 hover:shadow-[0_18px_40px_-24px_rgba(46,43,37,0.35)]">
      <Link href={href} className="relative block aspect-[4/3]" aria-label={`Voir ${p.name}`}>
        <PhotoSlot label={`${p.name} · ${p.type}`} src={productImage(p)} position={imagePos(p)} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" tone={TONES[p.cat]} className="absolute inset-0" />
        <div className="absolute inset-x-3 top-3 flex flex-wrap gap-1.5">
          <Badge tone="accent" className="!text-[13px] !py-1">{pctLabel(p.ht, p.was)}</Badge>
          {badge && <Badge tone="teal">{badge}</Badge>}
          {p.stock < 20 && <Badge tone="ink" className="!font-medium">Stock limité</Badge>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2.5 px-4 pb-[18px] pt-4">
        <div className="flex justify-between gap-2 text-[12px] text-n-700">
          <span>{p.type}</span>
          <span className="whitespace-nowrap">★ {String(p.rating).replace(".", ",")} ({p.reviews})</span>
        </div>
        <Link href={href} className="text-[17px] font-semibold leading-tight tracking-tightish hover:text-accent-700">
          {p.name}
        </Link>
        <p className="m-0 text-[14px] leading-[1.45] text-n-700 [text-wrap:pretty]">{p.short}</p>
        <div className="mt-auto pt-1.5">
          <PriceDisplay ht={p.ht} was={p.was} />
        </div>
        <div className="flex flex-wrap gap-1.5 text-[12px]">
          <Badge tone="soft" className="!py-[3px] !px-[7px]">Économie {eur(p.was - p.ht)} HT</Badge>
          <Badge tone="neutral" className="!py-[3px] !px-[7px] !font-normal">Garantie {p.warrantyYears} ans</Badge>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[12px] text-n-700">
            <span>Plus que {p.stock} en stock</span>
            <span>{sold} % vendus</span>
          </div>
          <div className="h-1 overflow-hidden rounded-[2px] bg-n-200" aria-hidden>
            <div className="h-full rounded-[2px] bg-ink" style={{ width: `${sold}%` }} />
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-n-700">
          <span className="h-1.5 w-1.5 flex-none rounded-full bg-teal-500" aria-hidden />
          <span>
            {BOUGHT[p.id]} commandes ce mois · <span suppressHydrationWarning>{viewers}</span> entreprises consultent
          </span>
        </div>
        <Button variant="primary" className="mt-1 w-full text-[14px]" onClick={() => add(p.id, 1)}>
          Ajouter au panier<span className="sr-only"> : {p.name}</span>
        </Button>
      </div>
    </article>
  );
}
