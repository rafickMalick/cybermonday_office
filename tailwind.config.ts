import type { Config } from "tailwindcss";

// Les valeurs vivent dans app/globals.css (variables CSS) ; Tailwind ne fait que les exposer.
const v = (name: string) => `var(--color-${name})`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    // Point de rupture mobile/desktop du design : 760px.
    screens: { md: "760px", lg: "1024px" },
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        ink: v("text"),
        n: {
          100: v("neutral-100"),
          200: v("neutral-200"),
          300: v("neutral-300"),
          400: v("neutral-400"),
          500: v("neutral-500"),
          600: v("neutral-600"),
          700: v("neutral-700"),
          800: v("neutral-800"),
          900: v("neutral-900"),
        },
        accent: {
          DEFAULT: v("accent"),
          100: v("accent-100"),
          200: v("accent-200"),
          300: v("accent-300"),
          400: v("accent-400"),
          500: v("accent-500"),
          600: v("accent-600"),
          700: v("accent-700"),
          800: v("accent-800"),
          900: v("accent-900"),
        },
        teal: {
          DEFAULT: v("accent-2"),
          100: v("accent-2-100"),
          200: v("accent-2-200"),
          300: v("accent-2-300"),
          400: v("accent-2-400"),
          500: v("accent-2-500"),
          600: v("accent-2-600"),
          700: v("accent-2-700"),
          800: v("accent-2-800"),
          900: v("accent-2-900"),
        },
        danger: { DEFAULT: "#B42318", bg: "#FDF0EE", border: "#F1B8B0", ink: "#8F1C10" },
      },
      fontFamily: { sans: ["var(--font-plex)", "system-ui", "sans-serif"] },
      borderRadius: { sm: "6px", md: "10px", lg: "16px" },
      boxShadow: { lg: "0 12px 32px rgba(46,43,37,.22)" },
      maxWidth: { page: "1280px", checkout: "1200px" },
      letterSpacing: { tightish: "-0.02em", label: "0.12em" },
    },
  },
  plugins: [],
};

export default config;
