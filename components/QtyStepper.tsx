"use client";

/** Sélecteur de quantité : boutons de 44 px minimum. */
export function QtyStepper({
  value,
  onChange,
  min = 1,
  size = "md",
  label = "Quantité",
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const h = size === "lg" ? "h-[52px]" : "h-11";
  const w = size === "lg" ? "w-[46px]" : "w-11";
  return (
    <div className={`inline-flex items-center rounded-md border border-n-300 bg-n-100 ${h}`} role="group" aria-label={label}>
      <button type="button" aria-label="Diminuer" className={`${w} h-full text-[20px] hover:bg-n-200 rounded-l-md`} onClick={() => onChange(Math.max(min, value - 1))}>
        −
      </button>
      <span className="min-w-[30px] text-center font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Augmenter" className={`${w} h-full text-[20px] hover:bg-n-200 rounded-r-md`} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}
