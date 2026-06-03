// Server-side helpery pro mandik.info API.
// PORTFOLIO_TOKEN čteme z env (na Vercelu doplnit do projekt-settings → Environment Variables).

const API_BASE = "https://mandik.info/api/v1/ltu";

function serverHeaders() {
  return { Authorization: `Bearer ${process.env.PORTFOLIO_TOKEN ?? ""}` };
}

/** Portfolio – kategorie výrobků (Požární technika, Odvod kouře, …) */
export async function fetchPortfolio(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/portfolio/?locale=${locale}`, {
      headers: serverHeaders(),
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : data.results ?? [];
  } catch {
    return [];
  }
}

/** Ke stažení – programy a soubory (.zip, .exe, MANSEL apod.) */
export async function fetchDownloads(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/downloads`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.filter((r) => r.locale === locale);
  } catch {
    return [];
  }
}

/** Dokumenty (obecné PDF dokumenty firmy). Fallback na locale cs pokud daný nemá. */
export async function fetchDocuments(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/documents`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}

/** EPD – Environmentální prohlášení o produktu. */
export async function fetchEpd(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/epd`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}

/** Certifikáty ISO + oborové certifikace. */
export async function fetchCertificates(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/certificates`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}
