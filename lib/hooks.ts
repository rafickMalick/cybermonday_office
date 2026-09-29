"use client";

import { useEffect, useSyncExternalStore } from "react";
import { create } from "zustand";
import { PRODUCTS } from "./catalog";

// --- Horloge partagée : un seul intervalle pour tous les compteurs ---------------------------

const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;
let tick = 0;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    timer = setInterval(() => {
      tick = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  tick = Date.now();
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

/** Heure courante en ms, rafraîchie chaque seconde. `null` avant le montage (évite les écarts d'hydratation). */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, () => tick || null, () => null);
}

// --- Date de fin de l'opération -------------------------------------------------------------

const END_KEY = "etabli_end";
const FALLBACK_MS = (31 * 3600 + 14 * 60) * 1000;

/**
 * Date de fin du Cyber Monday. En production : NEXT_PUBLIC_SALE_END (ISO 8601).
 * Sinon, une fin locale à +31 h 14 min, mémorisée dans le navigateur.
 */
export function getSaleEnd(now: number = Date.now()): number {
  const fromEnv = Date.parse(process.env.NEXT_PUBLIC_SALE_END ?? "");
  if (!Number.isNaN(fromEnv)) return fromEnv;
  try {
    const stored = Number(localStorage.getItem(END_KEY));
    if (stored && stored > now) return stored;
    const end = now + FALLBACK_MS;
    localStorage.setItem(END_KEY, String(end));
    return end;
  } catch {
    return now + FALLBACK_MS;
  }
}

/** Millisecondes restantes avant la fin de l'opération, `null` avant le montage. */
export function useSaleCountdown(): number | null {
  const now = useNow();
  if (now === null) return null;
  return Math.max(0, getSaleEnd(now) - now);
}

// --- Compteur « N entreprises consultent » ---------------------------------------------------

interface LiveState {
  viewers: Record<string, number>;
  jitter: () => void;
}

export const useLive = create<LiveState>((set) => ({
  viewers: Object.fromEntries(PRODUCTS.map((p, i) => [p.id, 11 + ((i * 7) % 23)])),
  jitter: () =>
    set((s) => ({
      viewers: Object.fromEntries(
        Object.entries(s.viewers).map(([id, v]) => [id, Math.max(6, v + Math.round(Math.random() * 4 - 2))]),
      ),
    })),
}));

/** Fait varier le compteur de visiteurs de ±2 toutes les 6 s. À monter une seule fois. */
export function useLiveTicker() {
  useEffect(() => {
    const t = setInterval(() => useLive.getState().jitter(), 6000);
    return () => clearInterval(t);
  }, []);
}

// --- Media query ---------------------------------------------------------------------------

/** Vrai sur mobile (< 760 px). Lu à la demande dans les gestionnaires d'événements. */
export const isMobileNow = (): boolean => typeof window !== "undefined" && window.matchMedia("(max-width: 759px)").matches;
