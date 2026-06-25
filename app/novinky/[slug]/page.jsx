import { notFound } from "next/navigation";
import { PageChrome } from "@/components/PageChrome";
import { NewsDetail } from "@/components/NewsDetail";
import { getNewsBySlug } from "@/lib/news";
import { fetchPortfolio } from "@/lib/api";
import { absUrl, jsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

// "15. 6. 2023" -> "2023-06-15"; samotny rok ("2025") je platne ISO datum.
const newsDateToIso = (d) => {
  const m = /^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})$/.exec(String(d || "").trim());
  if (m) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
  return /^\d{4}$/.test(String(d || "").trim()) ? String(d).trim() : undefined;
};

export async function generateMetadata({ params }) {
  const slug = decodeURIComponent(String(params?.slug || ""));
  const n = getNewsBySlug(slug);
  if (!n) return { title: "Novinka nenalezena, MANDÍK a.s." };
  return {
    title: `${n.title}, MANDÍK a.s.`,
    description: n.perex,
    alternates: { canonical: `/novinky/${n.slug}` },
    openGraph: {
      type: "article",
      images: n.photos?.length ? [{ url: n.photos[0] }] : undefined,
    },
  };
}

// Detail jedné novinky: /novinky/<slug>.
export default async function Page({ params }) {
  const slug = decodeURIComponent(String(params?.slug || ""));
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const categories = await fetchPortfolio("cs").catch(() => []);

  // Strojově čitelná data článku (Google News výsledky, AI vyhledávače).
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    description: item.perex,
    image: item.photos?.map((p) => absUrl(p)),
    datePublished: newsDateToIso(item.date),
    author: { "@type": "Organization", name: "MANDÍK, a.s." },
    publisher: {
      "@type": "Organization",
      name: "MANDÍK, a.s.",
      logo: { "@type": "ImageObject", url: absUrl("/assets/mandik-logo-white.webp") },
    },
    mainEntityOfPage: absUrl(`/novinky/${item.slug}`),
  };

  return (
    <PageChrome categories={categories}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <NewsDetail item={item} />
    </PageChrome>
  );
}
