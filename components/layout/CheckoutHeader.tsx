import { Lock } from "lucide-react";
import { Logo } from "../Logo";

/** En-tête du checkout : logo et « Paiement sécurisé », sans aucune navigation. */
export function CheckoutHeader() {
  return (
    <header className="border-b border-n-300 bg-n-100">
      <div className="mx-auto flex h-16 max-w-checkout items-center justify-between gap-4 px-[clamp(16px,4vw,40px)]">
        <Logo />
        <span className="flex items-center gap-2 text-[13px] text-n-800">
          <Lock size={16} strokeWidth={2.5} aria-hidden />
          Paiement sécurisé
        </span>
      </div>
    </header>
  );
}
