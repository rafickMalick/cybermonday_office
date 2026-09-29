import { Countdown } from "../Countdown";

export function TopBar() {
  return (
    <div className="bg-n-900 text-[13px] text-n-200">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 px-[clamp(16px,4vw,40px)] py-2 text-center">
        <span className="text-[11px] font-semibold tracking-[.12em] text-accent-400">CYBER MONDAY PRO</span>
        <span className="md:hidden">Jusqu&apos;à −30 % · fin des offres dans</span>
        <span className="hidden md:inline">Jusqu&apos;à −30 % sur l&apos;équipement de bureau · fin des offres dans</span>
        <Countdown className="font-semibold text-n-100" />
      </div>
    </div>
  );
}
