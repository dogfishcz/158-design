// Server-side helpery pro mandik.info API.
// PORTFOLIO_TOKEN čteme z env (na Vercelu doplnit do projekt-settings → Environment Variables).

const API_BASE = "https://mandik.info/api/v1/ltu";
const FILES_HOSTS = /https:\/\/mandik\.(?:info|online)\/api\/v1\/downloads\//g;

// Soubory (gallery, image_link, link) API vrací na mandik.info, kde dávají 404, reálně leží na
// mandik.online. Tam je ale certifikát, kterému Chrome nevěří, proto jdou přes naši proxy.
async function readJson(res) {
  return JSON.parse((await res.text()).replace(FILES_HOSTS, "/api/soubory/"));
}

function serverHeaders() {
  return { Authorization: `Bearer ${process.env.PORTFOLIO_TOKEN ?? ""}` };
}

/** Portfolio, kategorie výrobků (Požární technika, Odvod kouře, …) */
export async function fetchPortfolio(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/portfolio/?locale=${locale}`, {
      headers: serverHeaders(),
      next: { revalidate: 600 },
    });
    if (!res.ok) return [];
    const data = await readJson(res);
    return Array.isArray(data) ? data : data.results ?? [];
  } catch {
    return [];
  }
}

/** Ke stažení, programy a soubory (.zip, .exe, MANSEL apod.) */
export async function fetchDownloads(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/downloads`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await readJson(res);
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
    const data = await readJson(res);
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}

/** EPD, Environmentální prohlášení o produktu. */
export async function fetchEpd(locale = "cs") {
  try {
    const res = await fetch(`${API_BASE}/resources/epd`, {
      headers: serverHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await readJson(res);
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
    const data = await readJson(res);
    const filtered = data.filter((r) => r.locale === locale);
    return filtered.length > 0 ? filtered : data.filter((r) => r.locale === "cs");
  } catch {
    return [];
  }
}
