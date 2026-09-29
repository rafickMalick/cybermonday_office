"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Button } from "../ui/Button";

/** Bandeau cookies : choix « all » ou « necessary » mémorisé ; rouvert par « Gérer les cookies ». */
export function CookieBanner() {
  const ready = useStore((s) => s.cookieReady);
  const choice = useStore((s) => s.cookieChoice);
  const reopened = useStore((s) => s.cookieReopened);
  const setChoice = useStore((s) => s.setCookieChoice);
  if (!ready || (choice !== null && !reopened)) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed inset-x-4 bottom-[calc(16px+env(safe-area-inset-bottom))] z-[70] mx-auto flex max-w-[720px] flex-wrap items-center gap-x-5 gap-y-4 rounded-md border border-n-300 bg-n-100 px-5 py-[18px] shadow-lg"
    >
      <p className="m-0 flex-[1_1_320px] text-[14px] leading-normal text-n-800">
        Nous utilisons des cookies nécessaires au panier et, avec votre accord, des cookies de mesure d&apos;audience.{" "}
        <Link href="/legal/cookies" className="inline-flex min-h-11 items-center text-accent-700 underline underline-offset-[3px]">En savoir plus</Link>
      </p>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" className="!border-n-400 !text-ink hover:!text-white" onClick={() => setChoice("necessary")}>Refuser</Button>
        <Button variant="dark" onClick={() => setChoice("all")}>Accepter</Button>
      </div>
    </div>
  );
}
