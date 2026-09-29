import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { StoreProvider } from "@/components/StoreProvider";
import "./globals.css";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Établi — Cyber Monday Pro", template: "%s · Établi" },
  description:
    "Équipement de bureau professionnel jusqu'à −30 % : bureaux assis-debout, chaises ergonomiques, écrans et visio. Prix HT, facture immédiate, paiement à 30 jours.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#F4F3F0" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={plex.variable}>
      <body className="min-h-screen bg-bg font-sans text-ink">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
