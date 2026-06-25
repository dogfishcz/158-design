import { PageChrome } from "@/components/PageChrome";
import { NewsScreen } from "@/components/NewsScreen";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Novinky, MANDÍK a.s.",
  description:
    "Nové produkty, certifikace a aktuální dění ve společnosti MANDÍK. Tepelná čerpadla, rooftop jednotky, certifikované požární a regulační klapky.",
  alternates: { canonical: "/novinky" },
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <NewsScreen />
    </PageChrome>
  );
}
