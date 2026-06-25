import { PageChrome } from "@/components/PageChrome";
import { ContactStub } from "@/components/Contact";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Poptávka, MANDÍK a.s.",
  description:
    "Pošlete nám poptávku na vzduchotechnické komponenty, jednotky, průmyslové vytápění nebo speciální aplikace. Ozveme se s technickým návrhem a cenovou nabídkou.",
  alternates: { canonical: "/poptavka" },
};

// Poptávkový formulář: cíl tlačítka "Poptávka" v hlavičce
// a "Poptat podobné řešení" na detailu reference.
export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <PageChrome categories={categories}>
      <ContactStub />
    </PageChrome>
  );
}
