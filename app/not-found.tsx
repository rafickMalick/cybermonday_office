import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-page flex-col items-start justify-center gap-4 page-x">
      <div className="eyebrow text-accent-700">404</div>
      <h1 className="heading-2">Cette page n&apos;existe pas.</h1>
      <ButtonLink href="/cyber-deals">Voir les Cyber Deals</ButtonLink>
    </main>
  );
}
