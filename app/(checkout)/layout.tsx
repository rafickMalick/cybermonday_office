import { CheckoutHeader } from "@/components/layout/CheckoutHeader";

/** Checkout : aucun menu, aucun pied de page — uniquement le logo et « Paiement sécurisé ». */
export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CheckoutHeader />
      <main>{children}</main>
    </>
  );
}
