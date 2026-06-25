import { PageChrome } from "@/components/PageChrome";
import { ReferencesScreen } from "@/components/References";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reference, MANDÍK a.s.",
  description:
    "Naše výrobky a řešení jsou součástí tisíců projektů po celém světě. Od průmyslových hal přes nemocnice a datová centra až po jaderné elektrárny a výškové budovy.",
  alternates: { canonical: "/reference" },
};

// /reference používá ReferencesScreen (mapa dodávek, dlaždice referencí).
// Obsah má vlastní pt offset pro fixed header, proto PageChrome bez paddingu.
export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <ReferencesScreen />
    </PageChrome>
  );
}
