# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# MANDÍK web v8

Web společnosti MANDÍK a.s. (český výrobce vzduchotechniky, požární techniky a průmyslového vytápění). Next.js 14 App Router + Tailwind, čistě JavaScript (`.jsx`, ne TypeScript). Obsah je v češtině (`lang="cs"`). Nasazení na Vercel.

## Texty (obsah webu)
- NIKDY nepoužívej dlouhou pomlčku "—" (em dash) ani "–" (en dash), a to nikde v obsahu webu: nadpisy, popisky, odstavce, názvy produktů i meta titulky (a ideálně ani v komentářích v kódu).
- Místo nich použij čárku, dvojtečku nebo normální spojovník "-".
- U číselných rozsahů použij "až" (např. "0,5 až 5 mm") nebo spojovník (např. "1990-2026").

## Příkazy
- `npm run dev` - vývojový server na http://localhost:3000
- `npm run build` - produkční build
- `npm run start` - spuštění produkčního buildu
- `npm run lint` - ESLint (next lint)

Testy v repozitáři nejsou.

## Prostředí
- `PORTFOLIO_TOKEN` - Bearer token pro `mandik.info` API (viz `lib/api.js`). Bez něj všechny `fetch*` funkce vrací `[]`, takže výrobní portfolio bude prázdné. Na Vercelu se nastavuje v Project Settings → Environment Variables.

## Architektura

### Routing (důležité, README je v tomto zastaralé)
Web používá **reálné Next.js App Router stránky** v `app/`. Pozůstatkem starší verze je SPA shell:
- `app/page.jsx` → `components/App.jsx` je homepage s in-memory state routingem (`route` state) - ale drží už jen stuby `references` a `contact`. Všechno ostatní jsou samostatné stránky a navigace mezi nimi probíhá přes `<a href>` (full-page navigace).
- Homepage si renderuje `Header`/`Footer` sama uvnitř `App`. **Ostatní stránky** se obalují `components/Shell.jsx` (fixní hlavička + patička, `main` má `pt-[116px]` kvůli fixed headeru).

### Výrobní katalog (data z externího API)
Strom kategorií a výrobků přichází z `https://mandik.info/api/v1/ltu` přes `lib/api.js` (`fetchPortfolio`, `fetchDownloads`, `fetchDocuments`, `fetchEpd`, `fetchCertificates`). Všechny helpery jsou server-side, polykají chyby a vrací `[]` při selhání.
- `app/api/portfolio/route.js` jen proxuje `fetchPortfolio` pro klientské použití.
- Stránky katalogu: `app/vyroba/[category]/page.jsx` a `app/vyroba/[category]/[group]/page.jsx`. Kategorie i skupiny se dohledávají podle `slug` z API odpovědi; skupina může být buď přímo v `cat.groups`, nebo v `cat.subcategories[].groups` (viz `findGroup`/`findGroupWithSubcategory`).
- API stránky mají `export const dynamic = "force-dynamic"`; cachování řeší `next: { revalidate }` ve fetchích (portfolio 600 s, resources 3600 s).

#### Změřená omezení API (2026-07-29, neměř znovu)
- `/portfolio/` je **jediný** endpoint katalogu. Endpoint na jeden výrobek neexistuje (404), stejně jako search, filtry, paginace a webhooky. Jediný parametr je `?locale`.
- Odpověď cs: 429 KB, 8 kategorií, 13 podkategorií, **106 skupin**, 807 souborů ke stažení, 144 obrázků. 5 kategorií je plochých, 3 mají jen podkategorie.
- **Žádné strukturované parametry.** Jen `characteristics` (věty, dva tvary: string i `{level, characteristic}`) a `specification` (HTML s inline styly, u 80 ze 106).
- Reálné překlady má portál jen pro **cs, en, de, fr, nl** (+ uk jako torzo, 39 skupin). Ostatní locale kódy tiše vrací angličtinu, `en-GB` ani `de-AT` portál nezná.
- `public_id` je stabilní napříč jazyky, `slug` ne. Vazby (reference, prodejní vrstva) stavět na `public_id`.
- `gallery` a `downloads` jsou veřejné URL bez tokenu, ale neoptimalizované (vzorek PNG 463 KB) a **všech 144 obrázků má prázdný alt**.
- Známá chyba v datech na straně MANDÍKu: výrobek `fdma-120` má v EN slug `sedm-2d`.
- Antipattern k neopakování: detail výrobku posílá 1 MB HTML, 93 % je serializovaný celý katalog (`categories` jde jako prop do klientského `Header`).

### Chystaná v9 (Vue + Tailwind)
Analýza rozsahu, korekce cenové nabídky, specifikace rozhraní a mapa stránek jsou v `analyza-novy-web.txt`. Klíčový rámec: dvě CMS, portál mandik.info (výrobky, spravuje MANDÍK) a naše hotové CMS (stránky, reference, kariéra, kontakty, prodejní vrstva), 7 jazykových mutací, cca 1130 URL.

### Divize (lokální kurátorské seskupení nad kategoriemi)
`lib/divisions.js` mapuje 4 divize (AHC, AHU, HEAT, SPEC) na seznamy `categorySlugs` z API a přiřazuje jim značkové barvy. `getCategoryColor(slug)` vrací barvu divize pro danou kategorii (akcentová zelená jako fallback). Divize s víc kategoriemi mají rozcestník `app/vyroba/divize/[division]/page.jsx`.

### Lokální obsahová data (zatím bez API/CMS)
Tato data jsou v `lib/` jako čisté datové moduly (bez `"use client"`, aby je četly i serverové stránky, sitemap a JSON-LD) a jsou označená jako DOČASNÁ:
- `lib/references.js` - `PINS` (reference na mapě + detaily), používá homepage mapa, `/reference`, `/reference/[slug]`.
- `lib/news.js` - `NEWS` (novinky), používá homepage, `/novinky`, `/novinky/[slug]`.
- `lib/contacts.js` + `lib/contacts-data.json` - kontakty pro `/kontakt` (vygenerováno z Excelu), včetně mapování ISO země → oblast pro `ContactsMap`.

### SEO
`lib/seo.js` je jediný zdroj pravdy: `SITE_URL` = `https://www.mandik.com`, `SITE_NAME`, `absUrl()`, `ORGANIZATION_JSONLD`, a `jsonLd()` (serializace, která escapuje `<` kvůli XSS přes `</script>`).
- Organization JSON-LD se vkládá v `app/layout.jsx`; Product + BreadcrumbList JSON-LD na stránce skupiny výrobku.
- `app/sitemap.js` se generuje dynamicky: statické routy + divize + výrobky z API + reference + novinky. `app/robots.js` doplňuje robots.txt.
- Fakta v `ORGANIZATION_JSONLD` drž v souladu s patičkou a `/kontakt`.

### Design tokens
- `tailwind.config.js` - barvy `mandik.*` (steel/ink/paper/rule), `cat.*` (barvy kategorií vzt/ahu/heat/special), `accent` (#26d07c). Fonty: `display` = Saira Semi Condensed, `mono` = JetBrains Mono (načítané v `layout.jsx` z Google Fonts).
- `max-w-site` = **1440px** je jeden centrální knob pro šířku celého webu (token `maxWidth.site`).
- `app/globals.css` - utility třídy mimo Tailwind: `.h-display`, `.h-label` (uppercase, letter-spacing), `.mono`, `.hairline`, `.header-blur`, animace pinů/přechodů stránek.

### Konvence
- Import alias `@/*` → kořen repa (`jsconfig.json`).
- Interaktivní komponenty mají `"use client"`; datové moduly v `lib/` a serverové stránky ne.
- `reactStrictMode: true` (`next.config.mjs`).

