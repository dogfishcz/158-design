import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { GroupPage } from "@/components/GroupPage";
import { fetchPortfolio } from "@/lib/api";
import { getCategoryColor } from "@/lib/divisions";
import { SITE_URL, absUrl, jsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const categories = await fetchPortfolio("cs").catch(() => []);
  const cat = categories.find((c) => c.slug === params.category);
  const group = findGroup(cat, params.group);
  return {
    title: group ? `${group.name}, ${cat?.name ?? "MANDÍK a.s."}` : "Výrobek nenalezen",
    description: group?.description ?? group?.subtitle ?? "MANDÍK a.s., detail výrobku.",
    alternates: group ? { canonical: `/vyroba/${cat.slug}/${group.slug}` } : undefined,
    openGraph: group?.gallery?.[0]?.url ? { images: [{ url: group.gallery[0].url }] } : undefined,
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

  // Strojově čitelná data výrobku a drobečkové navigace (Google i AI vyhledávače).
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: group.name,
    description: group.description ?? group.subtitle ?? undefined,
    image: group.gallery?.length ? group.gallery.map((g) => g.url) : undefined,
    brand: { "@type": "Brand", name: "MANDÍK" },
    manufacturer: { "@type": "Organization", name: "MANDÍK, a.s.", url: SITE_URL },
    url: absUrl(`/vyroba/${cat.slug}/${group.slug}`),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Domů", item: absUrl("/") },
      { "@type": "ListItem", position: 2, name: cat.name, item: absUrl(`/vyroba/${cat.slug}`) },
      { "@type": "ListItem", position: 3, name: group.name, item: absUrl(`/vyroba/${cat.slug}/${group.slug}`) },
    ],
  };

  return (
    <Shell categories={categories}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <GroupPage category={cat} group={group} subcategoryName={subcategoryName} accentColor={getCategoryColor(category)} />
    </Shell>
  );
}
