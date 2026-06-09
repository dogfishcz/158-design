import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { GroupPage } from "@/components/GroupPage";
import { fetchPortfolio } from "@/lib/api";
import { getCategoryColor } from "@/lib/divisions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const categories = await fetchPortfolio("cs").catch(() => []);
  const cat = categories.find((c) => c.slug === params.category);
  const group = findGroup(cat, params.group);
  return {
    title: group ? `${group.name}, ${cat?.name ?? "MANDÍK a.s."}` : "Výrobek nenalezen",
    description: group?.description ?? group?.subtitle ?? "MANDÍK a.s., detail výrobku.",
  };
}

function findGroup(cat, slug) {
  if (!cat) return null;
  if (cat.groups?.length > 0) {
    const direct = cat.groups.find((g) => g.slug === slug);
    if (direct) return direct;
  }
  for (const sub of cat.subcategories ?? []) {
    const found = sub.groups?.find((g) => g.slug === slug);
    if (found) return found;
  }
  return null;
}

function findGroupWithSubcategory(cat, slug) {
  if (!cat) return { group: null };
  if (cat.groups?.length > 0) {
    const direct = cat.groups.find((g) => g.slug === slug);
    if (direct) return { group: direct };
  }
  for (const sub of cat.subcategories ?? []) {
    const found = sub.groups?.find((g) => g.slug === slug);
    if (found) return { group: found, subcategoryName: sub.name };
  }
  return { group: null };
}

export default async function Page({ params }) {
  const { category, group: groupSlug } = params;
  const categories = await fetchPortfolio("cs").catch(() => []);
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const { group, subcategoryName } = findGroupWithSubcategory(cat, groupSlug);
  if (!group) notFound();

  return (
    <Shell categories={categories}>
      <GroupPage category={cat} group={group} subcategoryName={subcategoryName} accentColor={getCategoryColor(category)} />
    </Shell>
  );
}
