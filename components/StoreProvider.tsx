"use client";

import { useEffect } from "react";
import { useLiveTicker } from "@/lib/hooks";
import { useStore } from "@/lib/store";

/** Réhydrate le panier depuis localStorage après le premier rendu (évite tout écart SSR/client). */
export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useStore.persist.rehydrate();
    useStore.getState().loadCookieChoice();
  }, []);
  useLiveTicker();
  return <>{children}</>;
}
