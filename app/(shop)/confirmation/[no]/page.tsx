import type { Metadata } from "next";
import { ConfirmationView } from "@/components/confirmation/ConfirmationView";

export const metadata: Metadata = { title: "Commande confirmée", robots: { index: false } };

export default async function ConfirmationPage({ params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  return (
    <section className="container-page pb-[clamp(48px,7vw,88px)] pt-[clamp(28px,5vw,56px)]">
      <ConfirmationView no={decodeURIComponent(no)} />
    </section>
  );
}
