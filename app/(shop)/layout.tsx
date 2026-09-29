import { CartDrawer } from "@/components/cart/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { TopBar } from "@/components/layout/TopBar";
import { CookieBanner } from "@/components/overlays/CookieBanner";
import { LiveToast } from "@/components/overlays/LiveToast";
import { QuoteModal } from "@/components/overlays/QuoteModal";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-3 focus:text-white">
        Aller au contenu
      </a>
      <TopBar />
      <Header />
      <main id="contenu">{children}</main>
      <Footer />
      <CartDrawer />
      <QuoteModal />
      <CookieBanner />
      <LiveToast />
    </>
  );
}
