/** Logo Établi : pastille accent + point de confiance, mot-symbole en minuscules. */
export function Logo({ pro = false }: { pro?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative block h-6 w-6 rounded-full bg-accent" aria-hidden>
        <span className="absolute -bottom-[3px] -right-[3px] h-[11px] w-[11px] rounded-full border-2 border-bg bg-teal" />
      </span>
      <span className="text-[20px] font-semibold tracking-tightish">établi</span>
      {pro && <span className="pt-[3px] text-[10px] tracking-[.1em] text-n-700">PRO</span>}
    </span>
  );
}
