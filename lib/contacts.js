// Kontaktní data pro stránku /kontakt.
//
// ⚠️ PLACEHOLDER DATA — jména a čísla obchodních zástupců jsou smyšlená.
// Struktura je navržená tak, aby se dala 1:1 nahradit odpovědí z mandik.info:
//   countries[].regions[].contacts[]  ← per-region (kraj) kontakty
//   general[]                          ← obecné kontakty (vždy zobrazené)
//
// Region se klíčuje přes `id` = NUTS3 kód, který sedí s vlastností `nuts`
// ve public/geo/cz-kraje.geojson (a do budoucna s ID regionů z mandik.info).

// --- Obchodní zástupci (placeholder) ---
const REPS = {
  zapad: {
    role: "Obchodní zástupce — Čechy západ",
    name: "Ing. Tomáš Dvořák",
    email: "t.dvorak@mandik.cz",
    phone: "+420 702 111 222",
  },
  vychod: {
    role: "Obchodní zástupce — Čechy východ",
    name: "Ing. Petr Novotný",
    email: "p.novotny@mandik.cz",
    phone: "+420 702 333 444",
  },
  morava: {
    role: "Obchodní zástupce — Morava a Slezsko",
    name: "Ing. Martin Sedláček",
    email: "m.sedlacek@mandik.cz",
    phone: "+420 702 555 666",
  },
};

// Přiřazení krajů (NUTS3) k zástupci.
const CZ_REGIONS = [
  { id: "CZ010", name: "Hlavní město Praha", contacts: [REPS.zapad] },
  { id: "CZ020", name: "Středočeský kraj", contacts: [REPS.zapad] },
  { id: "CZ031", name: "Jihočeský kraj", contacts: [REPS.zapad] },
  { id: "CZ032", name: "Plzeňský kraj", contacts: [REPS.zapad] },
  { id: "CZ041", name: "Karlovarský kraj", contacts: [REPS.zapad] },
  { id: "CZ042", name: "Ústecký kraj", contacts: [REPS.zapad] },
  { id: "CZ051", name: "Liberecký kraj", contacts: [REPS.zapad] },
  { id: "CZ052", name: "Královéhradecký kraj", contacts: [REPS.vychod] },
  { id: "CZ053", name: "Pardubický kraj", contacts: [REPS.vychod] },
  { id: "CZ063", name: "Kraj Vysočina", contacts: [REPS.vychod] },
  { id: "CZ064", name: "Jihomoravský kraj", contacts: [REPS.morava] },
  { id: "CZ071", name: "Olomoucký kraj", contacts: [REPS.morava] },
  { id: "CZ072", name: "Zlínský kraj", contacts: [REPS.morava] },
  { id: "CZ080", name: "Moravskoslezský kraj", contacts: [REPS.morava] },
];

export const COUNTRIES = [
  {
    code: "CZ",
    name: "Česká republika",
    geojson: "/geo/cz-kraje.geojson",
    regionKey: "nuts", // vlastnost ve features, která drží region.id
    center: [15.34, 49.8],
    zoom: 6.4,
    regions: CZ_REGIONS,
  },
];

// Obecné kontakty — zobrazují se vždy, nezávisle na vybraném regionu.
export const GENERAL_CONTACTS = [
  {
    label: "Ústředna | nákup | doprava",
    company: "MANDÍK, a.s.",
    email: "mandik@mandik.cz",
    phone: "+420 311 706 706",
  },
  {
    label: "Asistentka ředitele",
    company: "MANDÍK, a.s.",
    role: "Asistentka ředitele",
    email: "mandik@mandik.cz",
    phone: "+420 311 706 700",
    address: ["Dobříšská 550", "267 24 Hostomice pod Brdy"],
  },
];

/** Najde zemi podle kódu (default CZ). */
export function getCountry(code = "CZ") {
  return COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
}

/** Vrátí region (vč. kontaktů) podle id (NUTS3) v rámci země. */
export function getRegion(regionId, countryCode = "CZ") {
  return getCountry(countryCode).regions.find((r) => r.id === regionId) ?? null;
}
