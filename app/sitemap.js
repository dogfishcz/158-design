import { fetchPortfolio } from "@/lib/api";
import { PINS } from "@/lib/references";
import { NEWS } from "@/lib/news";
import { DIVISIONS } from "@/lib/divisions";
import { SITE_URL } from "@/lib/seo";

// /sitemap.xml: statické stránky + výrobky z API + reference + novinky.
// Generuje se při každém požadavku, takže nové výrobky se propíší samy.
export default async function sitemap() {
  const url = (p) => `${SITE_URL}${p}`;

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/o-nas", priority: 0.8, changeFrequency: "monthly" },
    { path: "/reference", priority: 0.8, changeFrequency: "monthly" },
    { path: "/novinky", priority: 0.8, changeFrequency: "weekly" },
    { path: "/servis", priority: 0.8, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/poptavka", priority: 0.7, changeFrequency: "yearly" },
    { path: "/ke-stazeni", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kariera", priority: 0.6, changeFrequency: "monthly" },
    { path: "/certifikace-a-dokumenty", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ochrana-osobnich-udaju", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookies", priority: 0.2, changeFrequency: "yearly" },
    { path: "/whistleblowing", priority: 0.2, changeFrequency: "yearly" },
  ].map(({ path, ...rest }) => ({ url: url(path), ...rest }));

  // Divize s více kategoriemi mají vlastní rozcestník /vyroba/divize/<slug>.
  const divisionRoutes = Object.values(DIVISIONS)
    .filter((d) => d.categorySlugs.length > 1)
    .map((d) => ({ url: url(`/vyroba/divize/${d.slug}`), priority: 0.7, changeFrequency: "monthly" }));

  // Kategorie a výrobky z mandik.info API.
  const categories = await fetchPortfolio("cs").catch(() => []);
  const productRoutes = [];
  for (const c of categories) {
    productRoutes.push({ url: url(`/vyroba/${c.slug}`), priority: 0.8, changeFrequency: "monthly" });
    const groups = [...(c.groups ?? [])];
    for (const sub of c.subcategories ?? []) groups.push(...(sub.groups ?? []));
    for (const g of groups) {
      productRoutes.push({ url: url(`/vyroba/${c.slug}/${g.slug}`), priority: 0.7, changeFrequency: "monthly" });
    }
  }

  const referenceRoutes = PINS.map((p) => ({
    url: url(`/reference/${p.slug}`),
    priority: 0.5,
    changeFrequency: "yearly",
  }));

  const newsRoutes = NEWS.map((n) => ({
    url: url(`/novinky/${n.slug}`),
    priority: 0.6,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...divisionRoutes, ...productRoutes, ...referenceRoutes, ...newsRoutes];
}
