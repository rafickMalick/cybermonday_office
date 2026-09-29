import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = { title: "Finaliser la commande", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <section className="mx-auto max-w-checkout page-x pb-[clamp(48px,7vw,88px)] pt-[clamp(24px,4vw,48px)]">
      <CheckoutForm />
    </section>
  );
}
