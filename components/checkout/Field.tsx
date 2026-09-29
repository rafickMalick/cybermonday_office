import type { InputHTMLAttributes } from "react";

export interface FieldProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  full?: boolean;
  type?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  placeholder?: string;
  tabular?: boolean;
  maxLength?: number;
}

/** Champ de formulaire : libellé, saisie 16 px (pas de zoom iOS), message d'erreur relié par aria-describedby. */
export function Field({ name, label, value, error, onChange, full, type = "text", inputMode, autoComplete, placeholder, tabular, maxLength }: FieldProps) {
  const id = `f-${name}`;
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-[13px] font-medium text-n-800">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`h-[46px] rounded-sm border bg-n-100 px-3 text-[16px] text-ink outline-accent ${tabular ? "tabular-nums" : ""} ${error ? "border-danger" : "border-n-300"}`}
      />
      {error && <span id={`${id}-err`} className="text-[12px] text-danger">{error}</span>}
    </div>
  );
}
