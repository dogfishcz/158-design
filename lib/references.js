// Data referencí (piny na mapě + detaily). Čistý datový modul bez "use client",
// aby ho mohly číst i serverové stránky (metadata, sitemap, JSON-LD).
// Mapa a UI je v components/EuropeMap.jsx, která odsud importuje a re-exportuje.

export const PINS = [
  { id: 1,  city: "Praha",      country: "CZ", lon: 14.43, lat: 50.08, project: "Národní muzeum, rekonstrukce", year: 2024, units: 412, area: "AHC komponenty", sector: "Kultura", featured: true },
  { id: 2,  city: "Brno",       country: "CZ", lon: 16.61, lat: 49.20, project: "Spielberk Office Centre",       year: 2023, units: 188, area: "AHC komponenty", sector: "Administrativa" },
  { id: 3,  city: "Bratislava", country: "SK", lon: 17.11, lat: 48.15, project: "Eurovea II, Tower",            year: 2024, units: 261, area: "AHC komponenty", sector: "Výškové budovy" },
  { id: 4,  city: "Vídeň",      country: "AT", lon: 16.37, lat: 48.21, project: "DC Tower 2",                    year: 2025, units: 540, area: "AHU jednotky",   sector: "Výškové budovy", featured: true },
  { id: 5,  city: "Berlín",     country: "DE", lon: 13.40, lat: 52.52, project: "Sony Center, retrofit",        year: 2023, units: 320, area: "AHC komponenty", sector: "Administrativa" },
  { id: 6,  city: "Mnichov",    country: "DE", lon: 11.58, lat: 48.14, project: "BMW Welt, AHC",                year: 2024, units: 174, area: "AHC komponenty", sector: "Průmysl", featured: true },
  { id: 7,  city: "Hamburk",    country: "DE", lon:  9.99, lat: 53.55, project: "Elbtower, AHU 9.6",            year: 2025, units: 980, area: "AHU jednotky",   sector: "Výškové budovy", featured: true },
  { id: 8,  city: "Varšava",    country: "PL", lon: 21.01, lat: 52.23, project: "Varso Tower",                   year: 2022, units: 615, area: "AHC komponenty", sector: "Výškové budovy", featured: true },
  { id: 9,  city: "Paříž",      country: "FR", lon:  2.35, lat: 48.86, project: "La Défense, Tour Hekla",       year: 2024, units: 442, area: "AHU jednotky",   sector: "Administrativa", featured: true },
  { id: 10, city: "Londýn",     country: "GB", lon: -0.13, lat: 51.51, project: "22 Bishopsgate (PKI-EI)",       year: 2023, units: 1340, area: "AHC komponenty", sector: "Výškové budovy", featured: true },
  { id: 11, city: "Amsterdam",  country: "NL", lon:  4.90, lat: 52.37, project: "Zuidas, Atrium Tower",         year: 2024, units: 280, area: "AHU jednotky",   sector: "Administrativa" },
  { id: 12, city: "Loviisa",    country: "FI", lon: 26.22, lat: 60.46, project: "Loviisa NPP, KTA 1401",        year: 2023, units: 96,  area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 13, city: "Stockholm",  country: "SE", lon: 18.07, lat: 59.33, project: "Karolinska, nemocnice",        year: 2025, units: 530, area: "AHU jednotky",   sector: "Zdravotnictví", featured: true },
  { id: 14, city: "Madrid",     country: "ES", lon: -3.70, lat: 40.42, project: "IFEMA Pavilón 14",              year: 2024, units: 220, area: "AHU jednotky",   sector: "Veř. budovy" },
  { id: 15, city: "Vatikán",    country: "VA", lon: 12.45, lat: 41.90, project: "Vatikán, Archivum Secretum",   year: 2022, units: 64,  area: "AHU jednotky",   sector: "Kultura", featured: true },
  { id: 16, city: "Záhřeb",     country: "HR", lon: 15.98, lat: 45.81, project: "Hotel Esplanade, retrofit",    year: 2025, units: 80,  area: "Topné systémy",  sector: "Hospitality" },
  { id: 17, city: "Atény",      country: "GR", lon: 23.73, lat: 37.98, project: "Letiště Eleftherios Venizelos", year: 2023, units: 360, area: "AHC komponenty", sector: "Infrastruktura" },
  { id: 18, city: "Paks",       country: "HU", lon: 18.86, lat: 46.63, project: "Paks II, speciální aplikace",  year: 2025, units: 240, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 19, city: "Bukurešť",   country: "RO", lon: 26.10, lat: 44.43, project: "One Cotroceni Park",            year: 2024, units: 305, area: "AHC komponenty", sector: "Administrativa" },
  { id: 20, city: "Sofia",      country: "BG", lon: 23.32, lat: 42.70, project: "Sofia Tech Park",               year: 2024, units: 132, area: "AHC komponenty", sector: "Technol. kampusy" },
  { id: 21, city: "Curych",     country: "CH", lon:  8.55, lat: 47.38, project: "ETH Hönggerberg HIB",           year: 2025, units: 410, area: "AHU jednotky",   sector: "Vzdělávání", featured: true },
  { id: 22, city: "Lyon",       country: "FR", lon:  4.84, lat: 45.76, project: "Confluences, Tower",           year: 2023, units: 152, area: "AHC komponenty", sector: "Výškové budovy" },
  { id: 23, city: "Kodaň",      country: "DK", lon: 12.57, lat: 55.68, project: "Niels Bohr Building",           year: 2024, units: 600, area: "AHU jednotky",   sector: "Vzdělávání", featured: true },
  { id: 24, city: "Oslo",       country: "NO", lon: 10.75, lat: 59.91, project: "Munch Museet",                  year: 2022, units: 75,  area: "AHU jednotky",   sector: "Kultura" },
  { id: 25, city: "Lisabon",    country: "PT", lon: -9.14, lat: 38.72, project: "Champalimaud Foundation",       year: 2023, units: 190, area: "AHU jednotky",   sector: "Zdravotnictví" },
  { id: 26, city: "Tallin",     country: "EE", lon: 24.75, lat: 59.44, project: "Maakri kvartál",                year: 2025, units: 88,  area: "AHC komponenty", sector: "Administrativa" },
  { id: 27, city: "Kyjev",      country: "UA", lon: 30.52, lat: 50.45, project: "Rekonstrukce nemocnic",         year: 2024, units: 410, area: "AHU jednotky",   sector: "Zdravotnictví" },
  { id: 28, city: "Záporoží",   country: "UA", lon: 35.13, lat: 47.85, project: "ZNPP, speciální aplikace",     year: 2022, units: 144, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 29, city: "Helsinki",   country: "FI", lon: 24.94, lat: 60.17, project: "Oodi knihovna, AHU retrofit",  year: 2024, units: 140, area: "AHU jednotky",   sector: "Veř. budovy" },
  { id: 30, city: "Manchester", country: "GB", lon: -2.24, lat: 53.48, project: "Co-op Live Arena",              year: 2024, units: 410, area: "AHC komponenty", sector: "Infrastruktura" },
  { id: 31, city: "Dublin",     country: "IE", lon: -6.27, lat: 53.35, project: "Capital Dock, kanceláře",      year: 2023, units: 180, area: "AHC komponenty", sector: "Administrativa" },
  { id: 32, city: "Barcelona",  country: "ES", lon:  2.17, lat: 41.39, project: "Hospital Clínic, rekonstrukce", year: 2025, units: 290, area: "AHU jednotky",  sector: "Zdravotnictví" },
  { id: 33, city: "Černobyl",   country: "UA", lon: 30.10, lat: 51.39, project: "ČJE, sarkofág, větrání NSC",   year: 2019, units: 230, area: "Speciální aplikace", sector: "Jaderná technika", photos: ["/assets/reference/reference-chernobyl.jpg"], special: true, featured: true },
  { id: 34, city: "Frankfurt",  country: "DE", lon:  8.68, lat: 50.11, project: "Equinix FR8, datacentrum",     year: 2024, units: 720, area: "AHU jednotky",   sector: "Datacentrum", featured: true },
  { id: 35, city: "Temelín",    country: "CZ", lon: 14.38, lat: 49.18, project: "JE Temelín, bloky 1+2",        year: 1995, units: 1080, area: "Speciální aplikace", sector: "Jaderná technika", special: true, featured: true },
  { id: 36, city: "Lucembursko", country: "LU", lon: 6.13, lat: 49.61, project: "Cloud region GCP, DC",         year: 2025, units: 410, area: "AHU jednotky",   sector: "Datacentrum" },
];

export const AREA_COLOR = {
  "AHC komponenty": "#74d1ea",
  "AHU jednotky": "#26d07c",
  "Topné systémy": "#f2a900",
  "Speciální aplikace": "#ffd700",
};

// Fotky referencí. Dočasně podle sektoru; ke konkrétní referenci lze v PINS doplnit
// pole `photos: ["/assets/reference/...", ...]` (max 5) a galerie je použije přednostně.
const SECTOR_PHOTO = {
  "Administrativa": "reference-administrativni.jpg",
  "Datacentrum": "reference-datacenter.jpg",
  "Zdravotnictví": "reference-nemocnice.jpg",
  "Infrastruktura": "reference-logistika.jpg",
  "Průmysl": "reference-logistika.jpg",
  "Technol. kampusy": "reference-datacenter.jpg",
};
export const referencePhotos = (pin) => {
  if (pin && Array.isArray(pin.photos) && pin.photos.length) return pin.photos.slice(0, 5);
  const f = (pin && SECTOR_PHOTO[pin.sector]) || "reference.jpg";
  return [`/assets/reference/${f}`];
};

// Slug pro URL detailu reference (např. /reference/22-bishopsgate).
const slugify = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
(() => { const seen = {}; PINS.forEach((p) => { let s = slugify(p.project); if (seen[s]) s = `${s}-${p.id}`; seen[s] = true; p.slug = s; }); })();
export const getReferenceBySlug = (slug) => PINS.find((p) => p.slug === slug) || null;
