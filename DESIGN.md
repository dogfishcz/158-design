# MANDÍK web v8 — designové konvence

Sjednocená pravidla pro opakující se UI prvky. **Drž se jich u všech nových i upravovaných stránek.**

## Nadpisy sekcí (platí na celém webu)

- **Žádná malá „odrážka" / kicker** nad nadpisem (dříve `<SectionLabel>` s barevným čtverečkem) — odstraněno.
- Nadpis (`h-display`) a **pod ním vodorovná zelená čárka** (accent `#26d07c`):
  - Hlavní nadpis stránky (h1, ~48px): `<div className="w-16 h-1 bg-accent mb-6" />`
  - Nadpis sekce / podsekce (h2, ~26px): `<div className="mt-2 h-1 w-12 bg-accent" />`
- Na **divizních** stránkách smí být čárka v barvě divize:
  - AHC `#74d1ea` · AHU `#26d07c` · HEAT `#f2a900` · SPEC `#ffd700`

## Dlaždice (kategorie, výrobky, dokumenty, certifikáty …)

Všechny dlaždice v podstránkách mají **jednotný design**:

- **Obal:** `tile group relative bg-white hairline overflow-hidden flex flex-col transition-shadow hover:shadow-lg`
- **Levý barevný proužek** `tile-bar` (volitelně; barva divize / accent), vyjede při hoveru.
- **Obrázek:** `aspect-[4/3]` (dokumenty) nebo `aspect-square` (výrobky), `object-contain`,
  na hover se **mírně přiblíží**: `transition-transform duration-300 group-hover:scale-105`.
- **Nadpis:** `h-display`, `text-mandik-ink`, **větší písmo**:
  - výrobky / kategorie ~`text-[20px]`
  - dokumenty / certifikáty ~`text-[16px]`
  - **NEPODBARVOVAT na hover** — žádné `group-hover:text-...`.
- **Popis / subtitle:** `text-mandik-steel-70`, menší.

## Co NEdělat

- Nepoužívat malý kicker label nad nadpisy.
- Neměnit barvu nadpisu dlaždice při hoveru.
- Nepoužívat odlišné varianty dlaždic na různých stránkách — vše sjednoceno do jednoho vzoru
  (např. certifikáty používají stejnou dlaždici jako EPD/dokumenty, ne malé „badge").

## Stav sjednocení (aktualizovat při změnách)

- [x] Stránka výrobků (`CategoryPage`) — bez hover podbarvení, zoom obrázku.
- [x] Divizní stránka (`DivisionPage`) — bez hover podbarvení, zoom obrázku.
- [x] Certifikace a dokumenty (`CertificatesPage`) — sjednocené dlaždice, čárky pod nadpisy.
- [ ] Homepage dlaždice (kontrola při příští úpravě).
