import { BUNDLE_IDS, mustProduct } from "@/lib/catalog";
import { Price } from "../PriceDisplay";

/** Liste des 6 articles du pack avec leur prix. */
export function BundleItems() {
  return (
    <ul className="m-0 flex list-none flex-col border-t border-n-300 p-0">
      {BUNDLE_IDS.map((id) => {
        const p = mustProduct(id);
        return (
          <li key={id} className="flex justify-between gap-3 border-b border-n-200 py-[11px] text-[14px]">
            <span><span className="text-n-700">{p.type}</span> · {p.name}</span>
            <span className="whitespace-nowrap tabular-nums"><Price ht={p.ht} /></span>
          </li>
        );
      })}
    </ul>
  );
}
