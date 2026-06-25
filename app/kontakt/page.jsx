import { Shell } from "@/components/Shell";
import { ContactsScreen } from "@/components/ContactsScreen";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/kontakt" },
  title: "Kontakt, MANDÍK a.s.",
  description:
    "Kontakty MANDÍK a.s., vyberte kraj na interaktivní mapě a zobrazte obchodního zástupce pro vaši oblast. Ústředna, nákup, doprava a vedení společnosti.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <Shell categories={categories}>
      <ContactsScreen />
    </Shell>
  );
}
