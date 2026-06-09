// Novinky (dočasná data, později z mandik.info / CMS). Jeden zdroj pro homepage,
// podstránku /novinky i detail /novinky/<slug>.
// Datum u RTU a RDM je zatím orientační, uprav dle skutečnosti.
export const NEWS = [
  {
    slug: "novinky-monzun-hp",
    date: "15. 6. 2023",
    category: "Průmyslové vytápění",
    title: "Nové tepelné čerpadlo MONZUN-HP",
    perex: "Splitové tepelné čerpadlo vzduch-vzduch s výkonem 20/33 kW pro vytápění i chlazení.",
    photos: ["/assets/novinky/novinky-monzun-hp.jpg"],
    body: [
      "Firma MANDÍK a.s. představila nový průmyslový produkt, splitové tepelné čerpadlo vzduch-vzduch MONZUN-HP. Jde o odpověď na měnící se energetický trh, který postupně omezuje využívání fosilních paliv včetně zemního plynu.",
      "Jednotka nabízí výkony 20/33 kW a vyznačuje se robustní konstrukcí z lakovaného plechu. Hlavní výhody zahrnují možnost reverzace chodu pro chlazení, plynulou regulaci výkonu a stejný jmenovitý výkon pro vytápění i chlazení.",
      "Zařízení lze ovládat základním analogovým regulátorem VULCAN nebo multizónovým ovladačem ZEUS, který umožňuje připojit až 31 agregátů a řídit různé produkty z portfolia firmy.",
      "Omezování fosilních paliv je správná cesta k energetické bezpečnosti a k trvalé udržitelnosti. Budoucnost vidíme v řešeních, která kombinují vytápění i chlazení průmyslových prostor.",
    ],
  },
  {
    slug: "novinky-RTU1",
    date: "2025",
    category: "Vzduchotechnické jednotky",
    title: "Kompaktní vzduchotechnická jednotka typu Rooftop",
    perex: "Kompaktní jednotka typu Rooftop s integrovaným tepelným čerpadlem pro komerční objekty.",
    photos: ["/assets/novinky/novinky-RTU1.png", "/assets/novinky/novinky-RTU2.png"],
    body: [
      "S hrdostí představujeme kompaktní vzduchotechnickou jednotku typu „Rooftop“, inovativní jednotku pro úpravu vzduchu s integrovaným tepelným čerpadlem.",
      "Tento moderní systém zajišťuje optimální komfort a úsporu energie pro komerční objekty.",
      "S důrazem na udržitelnost a vysokou efektivitu je kompaktní vzduchotechnická jednotka typu „Rooftop“ ideální volbou pro moderní budovy.",
    ],
  },
  {
    slug: "novinky-RDM-atex",
    date: "2024",
    category: "Regulační technika",
    title: "Certifikované regulační klapky RDM a RDTM do prostor s nebezpečím výbuchu (ATEX)",
    perex: "Klapky RDM a RDTM nově certifikované do prostor s nebezpečím výbuchu (Ex / ATEX).",
    photos: ["/assets/novinky/novinky-RDM-atex.jpg"],
    body: [
      "Regulační klapky RDM a RDTM jsou nově certifikované pro použití v prostorách s nebezpečím výbuchu (Ex). Certifikace zaručuje spolehlivý výkon i ve velmi specifických a náročných podmínkách.",
      "Nový ATEX design se loučí se starými vodiči svodu náboje z listů. Místo toho je svod náboje zahrnut do sestavy skrytých vodičů, které eliminují nepříjemnosti spojené s předchozí verzí. Údržba je jednodušší a snižuje se riziko poškození, což zajišťuje dlouhodobou spolehlivost a vyšší efektivitu provozu.",
      "Hlavní benefity: svod náboje sestavou skrytých vodičů zvyšující spolehlivost, snazší údržba snižující nebezpečí poškození a certifikovaná účinnost od odborníků z FTZÚ, zajišťující splnění přísných bezpečnostních norem.",
    ],
  },
];

export const getNewsBySlug = (slug) => NEWS.find((n) => n.slug === slug) || null;
