import { Shell } from "@/components/Shell";
import { KarieraScreen } from "@/components/Kariera";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kariéra — MANDÍK a.s.",
  description:
    "Otevřené pracovní pozice ve společnosti MANDÍK, a.s. — vývoj, konstrukce a automatizace vzduchotechniky v Hostomicích.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <Shell categories={categories}>
      <KarieraScreen />
    </Shell>
  );
}
