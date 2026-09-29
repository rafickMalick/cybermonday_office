import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";

export type ButtonVariant = "primary" | "dark" | "secondary" | "light" | "outline-light";
export type ButtonSize = "sm" | "md" | "lg" | "xl";

// Noms de classes littéraux : Tailwind ne détecte pas `btn-${variant}` et supprimerait les styles.
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  dark: "btn btn-dark",
  secondary: "btn btn-secondary",
  light: "btn btn-light",
  "outline-light": "btn btn-outline-light",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-11 px-4 text-[14px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-[52px] px-6 text-[15px]",
  xl: "h-14 px-5 text-[16px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", extra = ""): string {
  return `${VARIANTS[variant]} ${SIZES[size]} ${extra}`.trim();
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/** Bouton : primaire (accent, reflet + soulèvement), sombre, secondaire (contour), ou variantes sur fond sombre. */
export function Button({ variant = "primary", size = "md", className = "", type = "button", ...rest }: Props) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}

interface LinkProps extends ComponentProps<typeof Link> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({ variant = "primary", size = "md", className = "", ...rest }: LinkProps) {
  return <Link className={buttonClasses(variant, size, className)} {...rest} />;
}
