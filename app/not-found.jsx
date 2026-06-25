import { PageChrome } from "@/components/PageChrome";
import { Button } from "@/components/Primitives";
import { fetchPortfolio } from "@/lib/api";

export const metadata = {
  title: "Stránka nenalezena, MANDÍK a.s.",
  robots: { index: false },
};

// Globální 404 v designu webu (hlavička + patička + odkaz na úvod).
export default async function NotFound() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <div className="pt-[180px] lg:pt-[220px] pb-32 px-6 text-center">
        <div className="mono text-[12px] text-mandik-steel-70 uppercase tracking-wider">Chyba 404</div>
        <h1 className="mt-3 h-display text-[44px] sm:text-[56px] leading-[1.0] text-mandik-ink">Stránka nenalezena</h1>
        <div className="mt-5 mx-auto h-1 w-16 bg-accent" />
        <p className="mt-6 text-mandik-steel-80 text-[15px] max-w-md mx-auto leading-relaxed">
          Stránka neexistuje nebo byla přesunuta. Zkuste začít z úvodní stránky, nebo nás kontaktujte.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button variant="primary" href="/">Zpět na úvod</Button>
          <Button variant="ghost" href="/kontakt">Kontakt</Button>
        </div>
      </div>
    </PageChrome>
  );
}
