import { Shell } from "@/components/Shell";
import { ServisScreen } from "@/components/Servis";
import { fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/servis" },
  title: "Servis, MANDÍK a.s.",
  description:
    "Profesionální servis a technická podpora MANDÍK, vzduchotechnické komponenty (AHC), jednotky (AHU) a průmyslové vytápění (HEAT). Uvedení do provozu, pozáruční servis, retrofit a další.",
};

export default async function Page() {
  const categories = await fetchPortfolio("cs").catch(() => []);
  return (
    <Shell categories={categories}>
      <ServisScreen />
    </Shell>
  );
}
