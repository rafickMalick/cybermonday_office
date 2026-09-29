"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { Order } from "@/lib/store";
import { Button } from "../ui/Button";

/** Génère la facture PDF côté navigateur (bibliothèque chargée à la demande) et la télécharge. */
export function InvoiceButton({ order }: { order: Order }) {
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  const download = async () => {
    setBusy(true);
    setFailed(false);
    try {
      const [{ pdf }, { InvoiceDocument }] = await Promise.all([import("@react-pdf/renderer"), import("../invoice/InvoiceDocument")]);
      const blob = await pdf(<InvoiceDocument order={order} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Facture-${order.no}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
    } catch {
      setFailed(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button variant="dark" size="lg" className="!h-[50px]" onClick={download} disabled={busy} aria-busy={busy}>
        <Download size={18} strokeWidth={2.75} aria-hidden />
        {busy ? "Génération…" : "Télécharger la facture PDF"}
      </Button>
      {failed && <span role="alert" className="self-center text-[13px] text-danger">La facture n&apos;a pas pu être générée. Réessayez.</span>}
    </>
  );
}
