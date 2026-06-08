// Kontaktní data pro stránku /kontakt.
//
// Data jsou v lib/contacts-data.json (vygenerováno z Excelu od personálního odd.).
// ⚠️ DOČASNÉ — později nahradit odpovědí z mandik.info (správa kontaktů).
//   Stačí, aby API vracelo stejný tvar: { divisionOrder, regionLabels, people[] },
//   kde person = { firstName, lastName, position, email, phone, mobile, divisions[], regions[] }.

import data from "./contacts-data.json";

export const DIVISION_ORDER = data.divisionOrder;
export const REGION_LABELS = data.regionLabels;
export const PEOPLE = data.people;

// ISO kód země (z public/geo/world-countries.geojson) → klíč oblasti v datech.
// ČR (CZ) i Německo (DE) se řeší zvlášť přes vlastní vrstvy (kraje / spolkové země).
const ISO_TO_REGION = {
  AT: "at", SK: "sk", GB: "uk", FR: "fr",
  CH: "ch", LI: "ch",
  RU: "cis", BY: "cis", UA: "cis", KZ: "cis", GE: "cis", AM: "cis",
  AZ: "cis", MD: "cis", KG: "cis", TJ: "cis", TM: "cis", UZ: "cis",
};

/** ISO země → klíč oblasti (null = řeší vlastní vrstva: ČR kraje / DE spolkové země). */
export function regionKeyForCountry(iso) {
  if (iso === "CZ" || iso === "DE") return null;
  return ISO_TO_REGION[iso] || "export";
}

// NUTS3 kraj → historická země (Čechy / Morava / Slezsko).
export const NUTS_TO_LAND = {
  CZ010: "cechy", CZ020: "cechy", CZ031: "cechy", CZ032: "cechy", CZ041: "cechy",
  CZ042: "cechy", CZ051: "cechy", CZ052: "cechy", CZ053: "cechy", CZ063: "cechy",
  CZ064: "morava", CZ071: "morava", CZ072: "morava",
  CZ080: "slezsko",
};
export const LAND_KEYS = ["cechy", "morava", "slezsko"];

// ── NĚMECKO ──────────────────────────────────────────────────────────────────
// Spolková země (id z public/geo/de-bundeslander.geojson) → { český název, oblast zástupce }.
// Rozdělení oblastí dle e-mailu od kolegyně (DACH).
export const DE_LAND = {
  "DE-SH": { label: "Šlesvicko-Holštýnsko", rep: "de_nord" },
  "DE-HH": { label: "Hamburk", rep: "de_nord" },
  "DE-MV": { label: "Meklenbursko-Přední Pomořansko", rep: "de_nord" },
  "DE-NI": { label: "Dolní Sasko", rep: "de_mitte" },
  "DE-HB": { label: "Brémy", rep: "de_mitte" },
  "DE-ST": { label: "Sasko-Anhaltsko", rep: "de_mitte" },
  "DE-HE": { label: "Hesensko", rep: "de_mitte" },
  "DE-NW": { label: "Severní Porýní-Vestfálsko", rep: "de_nrw" },
  "DE-RP": { label: "Porýní-Falc", rep: "de_sw" },
  "DE-SL": { label: "Sársko", rep: "de_sw" },
  "DE-BW": { label: "Bádensko-Württembersko", rep: "de_bw" },
  "DE-BY": { label: "Bavorsko", rep: "de_by" },
  "DE-BE": { label: "Berlín", rep: "de_bb" },
  "DE-BB": { label: "Braniborsko", rep: "de_bb" },
  "DE-SN": { label: "Sasko", rep: "de_sn" },
  "DE-TH": { label: "Durynsko", rep: "de_sn" },
};
export const DE_LAND_IDS = Object.keys(DE_LAND);

/** id spolkové země → klíč oblasti zástupce. */
export function deRepOf(id) {
  return DE_LAND[id] ? DE_LAND[id].rep : "";
}
/** Pro zvýraznění: všechny spolkové země ve stejné oblasti zástupce jako vybraná. */
export function deIdsForSelection(selKey) {
  const rep = DE_LAND[selKey] ? DE_LAND[selKey].rep : "";
  if (!rep) return [];
  return DE_LAND_IDS.filter((id) => DE_LAND[id].rep === rep);
}

// Poznámky k vybraným oblastem (zobrazí se nad kontakty).
const REGION_NOTES = {
  de_by:
    "Pro Bavorsko zatím nemáme přiděleného regionálního zástupce – kontaktujte prosím back office DACH. (Oblast PSČ 88 a 89 zajišťuje Milko Radat.)",
  de_nrw:
    "Pro vzduchotechnické jednotky (AHU) bude pro tuto oblast v nejbližší době uzavřena smlouva s partnerem Luftkonzept.",
};

// Pro zvýraznění výběru v mapě: klíč oblasti → ISO země, které se zvýrazní.
export const REGION_TO_ISO = {
  at: ["AT"], sk: ["SK"], uk: ["GB"], fr: ["FR"], ch: ["CH", "LI"],
  cis: ["RU", "UA", "BY", "KZ", "GE", "AM", "AZ", "MD", "KG", "TJ", "TM", "UZ"],
  export: [],
};

export function regionLabel(key) {
  if (DE_LAND[key]) return DE_LAND[key].label;
  return REGION_LABELS[key] || key || "";
}

/** Seskupí lidi po divizích v pořadí dle priority. */
function groupByDivision(ppl) {
  const order = DIVISION_ORDER;
  const byDiv = new Map();
  for (const p of ppl) {
    const divs = p.divisions.length ? p.divisions : ["Ostatní"];
    for (const d of divs) {
      if (!byDiv.has(d)) byDiv.set(d, []);
      byDiv.get(d).push(p);
    }
  }
  const rank = (d) => {
    const i = order.indexOf(d);
    return i === -1 ? 999 : i;
  };
  return [...byDiv.entries()]
    .sort((a, b) => rank(a[0]) - rank(b[0]))
    .map(([name, people]) => ({ name, people }));
}

/** Kontakty pro danou oblast, seskupené po divizích (v pořadí dle priority). */
export function getRegionContacts(selKey) {
  if (!selKey) return { key: null, label: "", divisions: [], note: "" };

  // Spolková země Německa → regionální zástupce + sdílené kontakty pro celé Německo ("de").
  if (DE_LAND[selKey]) {
    const { label, rep } = DE_LAND[selKey];
    const ppl = PEOPLE.filter(
      (p) =>
        p.regions.includes(rep) ||
        p.regions.includes("de") ||
        p.regions.includes("all")
    );
    return { key: selKey, label, note: REGION_NOTES[rep] || "", divisions: groupByDivision(ppl) };
  }

  // Ostatní oblasti (ČR země, AT, SK, CH, FR, UK, CIS, export…).
  const ppl = PEOPLE.filter(
    (p) => p.regions.includes(selKey) || p.regions.includes("all")
  );
  return {
    key: selKey,
    label: regionLabel(selKey),
    note: REGION_NOTES[selKey] || "",
    divisions: groupByDivision(ppl),
  };
}
