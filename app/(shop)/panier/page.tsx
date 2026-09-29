import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = { title: "Panier" };

export default function CartPage() {
  return (
    <section className="container-page pb-[clamp(48px,7vw,88px)] pt-[clamp(28px,5vw,56px)]">
      <h1 className="mb-6 text-[clamp(32px,4.5vw,48px)] font-semibold tracking-tightish">Panier</h1>
      <CartView />
    </section>
  );
}
