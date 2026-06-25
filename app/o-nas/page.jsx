import { PageChrome } from "@/components/PageChrome";
import { AboutScreen } from "@/components/About";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "O nás, MANDÍK a.s.",
  description:
    "Rodinná firma od roku 1990 a největší český výrobce vzduchotechnických komponentů. Obchod, vývoj i výroba pod jednou střechou v Hostomicích, 350+ zaměstnanců, dodávky do 32 zemí.",
  alternates: { canonical: "/o-nas" },
};

// /o-nas používá AboutScreen (storytelling, timeline, rodinná firma, čísla).
// AboutScreen má vlastní pt offset pro fixed header, proto PageChrome bez paddingu.
export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <AboutScreen />
    </PageChrome>
  );
}
