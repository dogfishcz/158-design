import { notFound } from "next/navigation";
import { PageChrome } from "@/components/PageChrome";
import { ReferenceDetail } from "@/components/ReferenceDetail";
import { getReferenceBySlug, referencePhotos } from "@/lib/references";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(String(params?.slug || ""));
  const r = getReferenceBySlug(slug);
  if (!r) return { title: "Reference nenalezena, MANDÍK a.s." };
  return {
    title: `${r.project}, reference MANDÍK a.s.`,
    description: `${r.project}, ${r.city} (${r.country}), ${r.year}. Dodávka MANDÍK: ${r.units} jednotek, sektor ${r.sector}.`,
    alternates: { canonical: `/reference/${r.slug}` },
    openGraph: { images: [{ url: referencePhotos(r)[0] }] },
  };
}

// Detail jedné reference: /reference/<slug> (např. /reference/22-bishopsgate).
export default async function Page({ params }) {
  const slug = decodeURIComponent(String(params?.slug || ""));
  const reference = getReferenceBySlug(slug);
  if (!reference) notFound();

  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <ReferenceDetail reference={reference} />
    </PageChrome>
  );
}
