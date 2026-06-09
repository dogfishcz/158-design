import { Shell } from "@/components/Shell";
import { CertificatesPage } from "@/components/CertificatesPage";
import { fetchCertificates, fetchDocuments, fetchEpd, fetchPortfolio } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Certifikace a dokumenty, MANDÍK a.s.",
  description: "Aktuální platné certifikáty, environmentální prohlášení (EPD) a firemní dokumenty MANDÍK.",
};

export default async function Page() {
  const [certificates, documents, epd, categories] = await Promise.all([
    fetchCertificates("cs").catch(() => []),
    fetchDocuments("cs").catch(() => []),
    fetchEpd("cs").catch(() => []),
    fetchPortfolio("cs").catch(() => []),
  ]);

  return (
    <Shell categories={categories}>
      <CertificatesPage certificates={certificates} documents={documents} epd={epd} />
    </Shell>
  );
}
