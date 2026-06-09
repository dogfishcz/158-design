import { Shell } from "@/components/Shell";
import { DownloadsPage } from "@/components/DownloadsPage";
import { fetchDownloads, fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ke stažení, MANDÍK a.s.",
  description: "Programy, manuály, BIM rodiny a další podklady pro projekty MANDÍK.",
};

export default async function Page() {
  const [downloads, categories] = await Promise.all([
    fetchDownloads("cs").catch(() => []),
    fetchPortfolio("cs").catch(() => []),
  ]);

  return (
    <Shell categories={categories}>
      <DownloadsPage downloads={downloads} />
    </Shell>
  );
}
