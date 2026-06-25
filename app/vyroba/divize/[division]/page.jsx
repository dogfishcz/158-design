import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { DivisionPage } from "@/components/DivisionPage";
import { fetchPortfolio } from "@/lib/api";
import { DIVISIONS } from "@/lib/divisions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const division = DIVISIONS[params.division];
  return {
    title: division ? `${division.name}, MANDÍK a.s.` : "Divize nenalezena",
    description: division?.description ?? "MANDÍK a.s., výrobní portfolio.",
    alternates: division ? { canonical: `/vyroba/divize/${division.slug}` } : undefined,
  };
}

export default async function Page({ params }) {
  const division = DIVISIONS[params.division];
  if (!division) notFound();

  const allCategories = await fetchPortfolio("cs").catch(() => []);
  // Zachovej pořadí dle DIVISIONS, ne dle API.
  const categories = division.categorySlugs
    .map((slug) => allCategories.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <Shell categories={allCategories}>
      <DivisionPage division={division} categories={categories} />
    </Shell>
  );
}
