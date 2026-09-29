"use client";

import { useStore } from "@/lib/store";

export function ManageCookiesButton() {
  const reopen = useStore((s) => s.reopenCookies);
  return (
    <button type="button" onClick={reopen} className="flex min-h-11 items-center border-none bg-transparent p-0 text-[13px] text-n-300 hover:text-n-100 hover:underline">
      Gérer les cookies
    </button>
  );
}
