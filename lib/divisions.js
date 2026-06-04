// Mapování domácích dlaždic na divize (z v5).
// Každá divize odpovídá skupině kategorií z mandik.info API.

export const DIVISIONS = {
  "vzduchotechnicke-komponenty": {
    name: "Vzduchotechnické komponenty",
    code: "AHC",
    slug: "vzduchotechnicke-komponenty",
    description:
      "Komponenty pro vzduchotechnické rozvody, distribuci, regulaci a požární ochranu.",
    color: "#74d1ea",
    categorySlugs: [
      "pozarni-technika",
      "technika-odvodu-koure-a-tepla",
      "regulacni-technika",
      "distribucni-elementy",
      "doplnkove-prvky-vzt",
    ],
  },
  "vzduchotechnicke-jednotky": {
    name: "Vzduchotechnické jednotky",
    code: "AHU",
    slug: "vzduchotechnicke-jednotky",
    description:
      "Komplexní jednotky pro úpravu, filtraci a distribuci vzduchu v budovách.",
    color: "#26d07c",
    categorySlugs: ["vzduchotechnicke-jednotky"],
  },
  "prumyslove-vytapeni": {
    name: "Průmyslové vytápění",
    code: "HEAT",
    slug: "prumyslove-vytapeni",
    description:
      "Řešení pro průmyslové vytápění – tepelné clony, ohřívače a sálavé panely.",
    color: "#f2a900",
    categorySlugs: ["prumyslove-vytapeni-a-chlazeni"],
  },
  "specialni-aplikace": {
    name: "Speciální aplikace",
    code: "SPEC",
    slug: "specialni-aplikace",
    description:
      "Speciální výrobky pro náročné průmyslové, seismické a požárně odolné prostředí.",
    color: "#ffd700",
    categorySlugs: ["specialni-aplikace"],
  },
};

/** Vrátí divizi, do které patří daná kategorie (podle slugu). */
export function getDivisionByCategorySlug(categorySlug) {
  return Object.values(DIVISIONS).find((d) => d.categorySlugs.includes(categorySlug));
}

/** Vrátí barvu divize pro danou kategorii. Fallback je akcentová zelená. */
export function getCategoryColor(categorySlug) {
  return getDivisionByCategorySlug(categorySlug)?.color ?? "#26d07c";
}
