import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { CategoryPage } from "@/components/CategoryPage";
import { fetchPortfolio } from "@/lib/api";
import { getCategoryColor } from "@/lib/divisions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const categories = await fetchPortfolio("cs").catch(() => []);
  const cat = categories.find((c) => c.slug === params.category);
  return {
    title: cat ? `${cat.name}, MANDÍK a.s.` : "Výrobek nenalezen",
    description: cat?.description ?? "MANDÍK a.s., výrobní portfolio.",
  };
}

export default async function Page({ params }) {
  const { category } = params;
  const categories = await fetchPortfolio("cs").catch(() => []);
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  return (
    <Shell categories={categories}>
      <CategoryPage category={cat} accentColor={getCategoryColor(category)} />
    </Shell>
  );
}
