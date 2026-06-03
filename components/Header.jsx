"use client";

import React from "react";
import { Logo } from "./Primitives";

// --- Statická data pro Naše společnost (struktura z v5) ---
const COMPANY_ITEMS = [
  { slug: "o-nas",       label: "O nás",                    href: "/o-nas",                    photo: "/assets/header-o-nas.jpg" },
  { slug: "reference",   label: "Reference",                href: "/",                         photo: "/assets/header-reference.jpg" },
  { slug: "novinky",     label: "Novinky",                  href: "/",                         photo: "/assets/header-novinky.jpg" },
  { slug: "kariera",     label: "Kariéra",                  href: "/",                         photo: "/assets/header-kariera.jpg" },
  { slug: "certifikaty", label: "Certifikace a dokumenty",  href: "/certifikace-a-dokumenty",  photo: "/assets/header-certifikaty.jpg" },
];

const COMPANY_DESCRIPTION =
  "Výrobce vzduchotechnických komponentů, protipožárních prvků a průmyslového vytápění pro projekty po celém světě. Více než třicetiletá tradice, vývoj a výroba pod jednou střechou v České republice.";

const LOCALES = [
  { code: "cs", label: "CZ", flag: "https://flagcdn.com/w20/cz.png" },
  { code: "en", label: "EN", flag: "https://flagcdn.com/w20/gb.png" },
  { code: "de", label: "DE", flag: "https://flagcdn.com/w20/de.png" },
  { code: "uk", label: "UK", flag: "https://flagcdn.com/w20/ua.png" },
];

const NAV_LABELS = {
  cs: { company: "Naše společnost", products: "Výrobky", service: "Servis", downloads: "Ke stažení", contact: "Kontakt", inquiry: "Poptávka", placeholder: "Hledat výrobek, kód, dokument…", distrib: "Pro distributory" },
  en: { company: "Our Company",     products: "Products", service: "Service", downloads: "Downloads",  contact: "Contact", inquiry: "Inquiry",  placeholder: "Search product, code, document…", distrib: "For distributors" },
  de: { company: "Unser Unternehmen", products: "Produkte", service: "Service", downloads: "Downloads", contact: "Kontakt", inquiry: "Anfrage", placeholder: "Produkt, Code, Dokument suchen…", distrib: "Für Vertriebspartner" },
  uk: { company: "Наша компанія",    products: "Продукти", service: "Сервіс", downloads: "Завантаження", contact: "Контакти", inquiry: "Запит", placeholder: "Шукати продукт, код, документ…", distrib: "Для дистриб’юторів" },
};

// --- LangSwitcher (z v5, beze změn) ---
const LangSwitcher = ({ value = "cs", onChange }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const current = LOCALES.find((l) => l.code === value) ?? LOCALES[0];

  React.useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 h-label text-[13px] text-white/75 hover:text-white transition-colors"
        aria-label="Vybrat jazyk"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.flag} alt={current.label} width={20} height={14} className="rounded-sm opacity-80" />
        <span>{current.label}</span>
        <svg className={`w-3.5 h-3.5 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        className={`absolute top-full right-0 mt-2 bg-mandik-steel shadow-2xl border border-white/10 py-1 w-[7rem] z-50
          transition-all duration-200 origin-top
          ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
      >
        {LOCALES.map(({ code, label, flag }) => (
          <li key={code}>
            <button
              onClick={() => { onChange?.(code); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 h-label text-[13px] transition-colors ${
                value === code ? "text-accent" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flag} alt={label} width={20} height={14} className="rounded-sm flex-shrink-0" />
              <span className="w-6 text-left">{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// --- Mega menu (3 sloupce: popis | seznam | foto, s green hover scrubberem mezi sloupci) ---
// imageFit:
//   "cover"   — celoplošná fotka vyplní pravý sloupec (např. Naše společnost — landscape fotky)
//   "contain" — produktová fotka (default) — proporčně zmenšená, vystředěná, beze ořezu
const MegaMenu = ({
  open,
  label,
  description,
  items,
  activeSlug,
  onActiveChange,
  onItemClick,
  onMouseEnter,
  onMouseLeave,
  imageFit = "contain",
}) => {
  const [mouseY, setMouseY] = React.useState(null);
  const active = items.find((i) => i.slug === activeSlug) ?? items[0];
  const desc = active?.description ?? description;
  const photo = active?.imageUrl ?? active?.photo;

  return (
    <div
      className="absolute left-0 right-0 top-full pointer-events-none"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`overflow-hidden transition-[max-height] duration-300 ease-out ${
          open ? "max-h-[420px] pointer-events-auto" : "max-h-0"
        }`}
      >
        <div className="bg-mandik-steel border-t border-white/20 shadow-2xl">
          <div
            className="grid grid-cols-[1fr_2px_1fr_2px_1fr] min-h-[320px]"
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setMouseY(e.clientY - r.top);
            }}
            onMouseLeave={() => setMouseY(null)}
          >
            {/* Sloupec 1: popis */}
            <div className="p-10 flex flex-col justify-center">
              <p className="text-[12px] uppercase tracking-[0.2em] text-accent mb-4 font-bold h-label">
                {label}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
            </div>

            {/* Separator 1 + scrubber */}
            <div className="relative bg-white/15 overflow-hidden">
              <div
                className="absolute inset-x-0 w-full h-14 bg-accent"
                style={{
                  transform: `translateY(${mouseY !== null ? mouseY - 28 : -56}px)`,
                  opacity: mouseY !== null ? 1 : 0,
                  transition: "transform 0.08s ease-out, opacity 0.15s ease-out",
                }}
              />
            </div>

            {/* Sloupec 2: seznam */}
            <div className="py-8 px-6 flex flex-col justify-center">
              <ul className="space-y-0.5">
                {items.map((item) => {
                  const isActive = activeSlug === item.slug;
                  const className = `group flex items-center gap-3 w-full px-3 py-2.5 text-[11px] tracking-widest uppercase font-medium h-label transition-all duration-200 text-left ${
                    isActive ? "text-white translate-x-2" : "text-white/60 hover:text-white hover:translate-x-2"
                  }`;
                  const inner = (
                    <>
                      <span className={`h-0.5 bg-accent flex-shrink-0 transition-all duration-200 ${isActive ? "w-5" : "w-0 group-hover:w-5"}`} />
                      {item.label}
                    </>
                  );
                  return (
                    <li key={item.slug}>
                      {item.href ? (
                        <a
                          href={item.href}
                          onMouseEnter={() => onActiveChange?.(item.slug)}
                          onClick={() => onItemClick?.(item)}
                          className={className}
                        >
                          {inner}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onItemClick?.(item)}
                          onMouseEnter={() => onActiveChange?.(item.slug)}
                          className={className}
                        >
                          {inner}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Separator 2 + scrubber */}
            <div className="relative bg-white/15 overflow-hidden">
              <div
                className="absolute inset-x-0 w-full h-14 bg-accent"
                style={{
                  transform: `translateY(${mouseY !== null ? mouseY - 28 : -56}px)`,
                  opacity: mouseY !== null ? 1 : 0,
                  transition: "transform 0.08s ease-out, opacity 0.15s ease-out",
                }}
              />
            </div>

            {/* Sloupec 3: foto */}
            {imageFit === "cover" ? (
              /* Landscape fotka vyplní celý sloupec (Naše společnost) */
              <div className="relative overflow-hidden">
                {photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={photo}
                    alt={active?.label ?? ""}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
                    <span className="text-white/30 text-5xl h-display">M</span>
                  </div>
                )}
              </div>
            ) : (
              /* Produktová fotka — vystředěná, zmenšená beze ořezu (Výrobky) */
              <div className="relative overflow-hidden flex items-center justify-center p-8">
                {photo ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={photo}
                    alt={active?.label ?? ""}
                    className="max-w-[300px] max-h-[300px] w-auto h-auto object-contain transition-opacity duration-300"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                ) : (
                  <div className="w-full max-w-[220px] aspect-square bg-white/10 flex items-center justify-center">
                    <span className="text-white/30 text-5xl h-display">M</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Hlavní Header ---
// Když je předán `onNav`, používá se SPA navigace (homepage).
// Bez `onNav` se z odkazů stanou reálné <a href="..."> — pro statické routy.
export const Header = ({ route, onNav, lang = "cs", onLang, categories = [] }) => {
  const t = NAV_LABELS[lang] ?? NAV_LABELS.cs;

  const [companyOpen, setCompanyOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const [activeCompanySlug, setActiveCompanySlug] = React.useState("o-nas");
  const [activeCategorySlug, setActiveCategorySlug] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mobileExpanded, setMobileExpanded] = React.useState(null); // "company" | "products" | null
  const searchInputRef = React.useRef(null);

  const companyTimer = React.useRef(null);
  const productsTimer = React.useRef(null);

  // Sliding green underline pod hovered nav položkou (vrácení chování z původní v7).
  const navRef = React.useRef(null);
  const [barRect, setBarRect] = React.useState(null); // { x, w } | null
  const trackBar = (e) => {
    if (!navRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = navRef.current.getBoundingClientRect();
    setBarRect({ x: rect.left - parentRect.left, w: rect.width });
  };
  const clearBar = () => setBarRect(null);

  React.useEffect(() => {
    if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 320);
  }, [searchOpen]);

  // Top utility row schovává při scroll > 0 (uživatel mimo hero).
  // Při scrollY === 0 (vrátil se nahoru) se znovu objeví. Threshold je 4px,
  // aby drobné kýve nezmizelo a ihned nevrátilo lištu.
  const [atTop, setAtTop] = React.useState(true);
  React.useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    // Aktivní výchozí kategorie při prvním načtení API
    if (!activeCategorySlug && categories.length > 0) {
      setActiveCategorySlug(categories[0].slug);
    }
  }, [categories, activeCategorySlug]);

  const closeAll = () => {
    setCompanyOpen(false);
    setProductsOpen(false);
  };

  const companyEnter = () => {
    if (companyTimer.current) clearTimeout(companyTimer.current);
    setCompanyOpen(true);
    setProductsOpen(false);
  };
  const companyLeave = () => {
    companyTimer.current = setTimeout(() => setCompanyOpen(false), 160);
  };
  const productsEnter = () => {
    if (productsTimer.current) clearTimeout(productsTimer.current);
    setProductsOpen(true);
    setCompanyOpen(false);
  };
  const productsLeave = () => {
    productsTimer.current = setTimeout(() => setProductsOpen(false), 160);
  };

  // Helper: navigace přes onNav (SPA mode), nebo přes reálné URL (fallback).
  // Když položka nemá spaRoute (např. "Ke stažení" má vlastní Next.js stránku /ke-stazeni),
  // necháme browser provést běžnou navigaci přes href — nikdy se nezobrazí starý SPA stub.
  const navigateOrLink = (e, spaRoute, href = "/") => {
    if (onNav && spaRoute) {
      e.preventDefault();
      onNav(spaRoute);
    }
    closeAll();
  };

  // Pro mega-menu kategorií: namapuj API odpovědi na formát očekávaný MegaMenu.
  // Položky mají reálné `href` na /vyroba/[slug], aby fungovaly jako Next.js routy.
  const productsItems = categories.map((c) => ({
    slug: c.slug,
    label: c.name,
    href: `/vyroba/${c.slug}`,
    description: c.description,
    imageUrl: c.gallery?.[0]?.url || c.icons?.[0]?.url,
  }));

  // Header je průhledný (header-blur) v klidovém stavu a stane se zcela neprůhledným
  // (bg-mandik-steel) když na něj uživatel najede myší nebo když je otevřené mega menu.
  const [headerHovered, setHeaderHovered] = React.useState(false);
  const isOpaque = headerHovered || companyOpen || productsOpen;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Vnitřní obal s max-w-[1320px] — vlastní vizuální "kostka" hlavičky.
          Background a hover handler jsou na něm, ne na <header>, aby se efekt projevil jen v rozsahu šířky mega menu. */}
      <div
        className={`pointer-events-auto max-w-[1320px] mx-auto transition-[background-color,backdrop-filter] duration-200 ${
          isOpaque ? "bg-mandik-steel" : "header-blur"
        }`}
        onMouseLeave={() => { companyLeave(); productsLeave(); setHeaderHovered(false); }}
        onMouseEnter={() => {
          if (companyTimer.current) clearTimeout(companyTimer.current);
          if (productsTimer.current) clearTimeout(productsTimer.current);
          setHeaderHovered(true);
        }}
      >
      {/* Top utility row — schová se při scroll dolů, vrátí se na hero */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          atTop ? "max-h-9 opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!atTop}
      >
       <div className="border-b border-white/15">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-between text-white/70 text-[11px] gap-3">
          <div className="hidden lg:flex items-center gap-3 mono">
            <span className="h-label text-[10px] text-white/55">Dodací termíny:</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5" style={{ background: "#74d1ea" }} /><span className="h-label text-[10px]" style={{ color: "#74d1ea" }}>AHC</span> 14 dní</span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5" style={{ background: "#26d07c" }} /><span className="h-label text-[10px]" style={{ color: "#26d07c" }}>AHU</span> 8 týdnů</span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5" style={{ background: "#f2a900" }} /><span className="h-label text-[10px]" style={{ color: "#f2a900" }}>HEAT</span> 2 týdny</span>
            <span className="opacity-50">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5" style={{ background: "#ffd700" }} /><span className="h-label text-[10px]" style={{ color: "#ffd700" }}>SPEC</span> individual</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+420318697111" className="flex items-center gap-2 hover:text-white mono">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +420 311 706 706
            </a>
            <a href="mailto:mandik@mandik.cz" className="flex items-center gap-2 hover:text-white mono">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              mandik@mandik.cz
            </a>
          </div>
        </div>
       </div>
      </div>

      {/* Hlavní lišta (v5 layout) */}
      <div className="relative">
        <nav className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-10 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo — vede vždy na "/" (homepage)
              -ml-3 (= -12px): posune logo k levé hraně rozbalovacích menu.
              Zvyš na -ml-4 (-16px) / sniž na -ml-2 (-8px) podle potřeby. */}
          <Logo invert size={78} onNav={onNav} className="-ml-2" />

          {/* Primary nav — self-stretch protáhne <ul> na plnou výšku nav baru (h-20),
              takže sliding green bar uvnitř s absolute bottom-0 sedí přesně na dolní hraně. */}
          <ul
            ref={navRef}
            className="relative hidden md:flex items-center gap-7 lg:gap-9 self-stretch"
            onMouseLeave={clearBar}
          >
            <li
              className="relative"
              onMouseEnter={(e) => { companyEnter(); trackBar(e); }}
              onMouseLeave={companyLeave}
            >
              {/* NAŠE SPOLEČNOST není odkaz — mega menu se otevírá hoverem,
                  konkrétní podstránka se vybírá v rozbaleném seznamu. */}
              <span
                className="flex items-center gap-1.5 h-label text-[13px] text-white/85 hover:text-white transition-colors duration-150 py-6 cursor-default select-none"
              >
                {t.company}
                <svg className={`w-3.5 h-3.5 text-accent flex-shrink-0 transition-transform duration-200 ${companyOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </li>
            <li
              className="relative"
              onMouseEnter={(e) => { productsEnter(); trackBar(e); }}
              onMouseLeave={productsLeave}
            >
              {/* VÝROBKY není odkaz — kategorie se vybírá z mega menu. */}
              <span
                className="flex items-center gap-1.5 h-label text-[13px] text-white/85 hover:text-white transition-colors duration-150 py-6 cursor-default select-none"
              >
                {t.products}
                <svg className={`w-3.5 h-3.5 text-accent flex-shrink-0 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </li>
            {[
              {                     href: "/servis",      label: t.service },     // Real Next.js page
              {                     href: "/ke-stazeni",  label: t.downloads },   // Real Next.js page
              {                     href: "/kontakt",     label: t.contact },     // Real Next.js page
            ].map(({ route: r, href, label }) => (
              <li key={label} onMouseEnter={trackBar}>
                <a
                  href={href}
                  onClick={(e) => navigateOrLink(e, r, href)}
                  className="h-label text-[13px] text-white/85 hover:text-white transition-colors duration-150 py-6 whitespace-nowrap"
                >
                  {label}
                </a>
              </li>
            ))}

            {/* Sliding green underline */}
            <span
              className="absolute bottom-0 h-[2px] bg-accent pointer-events-none transition-[transform,width,opacity] duration-200 ease-out"
              style={{
                transform: `translateX(${barRect?.x ?? 0}px)`,
                width: `${barRect?.w ?? 0}px`,
                opacity: barRect ? 1 : 0,
              }}
            />
          </ul>

          {/* Pravá strana: search + lang + Poptávka */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search */}
            <div className={`relative h-20 overflow-hidden flex items-center transition-[width] duration-300 ease-out ${searchOpen ? "w-64" : "w-7"}`}>
              <button
                onClick={() => setSearchOpen(true)}
                className={`absolute right-0 p-1.5 text-white/70 hover:text-white transition-all duration-200 ${searchOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                aria-label="Vyhledávání"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <div className={`absolute inset-0 flex items-center gap-2 transition-all duration-300 ease-out ${searchOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"}`}>
                <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 min-w-0 bg-transparent text-white text-sm placeholder:text-white/35 outline-none tracking-wide mono"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-white/50 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Zavřít"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <LangSwitcher value={lang} onChange={onLang} />

            <button
              type="button"
              onClick={(e) => { e.preventDefault(); if (onNav) onNav("contact"); else window.location.href = "/kontakt"; closeAll(); }}
              className="inline-flex h-9 items-center px-4 bg-accent text-mandik-ink h-label text-[11px] hover:bg-[#1ec170] transition-colors"
            >
              {t.inquiry}
            </button>
          </div>

          {/* Mobilní hamburger — jen do md breakpointu */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:opacity-80 transition-opacity"
            aria-label={mobileOpen ? "Zavřít menu" : "Otevřít menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mega-menu: Naše společnost */}
        <MegaMenu
          open={companyOpen}
          label={t.company}
          description={COMPANY_DESCRIPTION}
          items={COMPANY_ITEMS}
          activeSlug={activeCompanySlug}
          onActiveChange={setActiveCompanySlug}
          /* Když má položka vlastní href (např. /certifikace-a-dokumenty), browser navigace
             přes <a href> už proběhla — nesmíme spustit SPA route jinak by se kratince
             zobrazil špatný stub. */
          onItemClick={(it) => { if (it.route && !it.href) onNav(it.route); closeAll(); }}
          onMouseEnter={companyEnter}
          onMouseLeave={companyLeave}
          imageFit="cover"
        />

        {/* Mega-menu: Výrobky (z mandik.online API) */}
        <MegaMenu
          open={productsOpen && productsItems.length > 0}
          label={t.products}
          description="Vyberte výrobkovou řadu pro zobrazení jejího popisu a obrázku."
          items={productsItems}
          activeSlug={activeCategorySlug}
          onActiveChange={setActiveCategorySlug}
          /* Klik na kategorii vede přes <a href="/vyroba/[slug]"> (browser navigace) — onNav by
             v SPA módu zbytečně rendroval ProductDetail před tím, než dojde k full-page navigaci. */
          onItemClick={() => closeAll()}
          onMouseEnter={productsEnter}
          onMouseLeave={productsLeave}
        />
      </div>
      </div>

      {/* Mobilní drawer — překryv s odkazy. Otevírá se klikem na hamburger. */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 pointer-events-auto bg-mandik-steel text-white overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-4 border-b border-white/15">
            <Logo invert size={56} className="-ml-2" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 text-white hover:opacity-80"
              aria-label="Zavřít menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* pl-6 (24px) odsadí celý sloupec doprava, aby nadpisy začaly přibližně
              tam, kde je vizuálně písmeno "M" v logu. Pokud chceš víc/méně,
              změň pl-6 (24px) na pl-5 (20px), pl-7 (28px), pl-8 (32px), atd. */}
          <nav className="pl-6 pr-4 py-6 space-y-1">
            {/* NAŠE SPOLEČNOST — expandable */}
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === "company" ? null : "company")}
                className="w-full flex items-center justify-between h-label text-[14px] py-4 text-left"
                aria-expanded={mobileExpanded === "company"}
              >
                {t.company}
                <svg
                  className={`w-4 h-4 text-accent transition-transform duration-200 ${mobileExpanded === "company" ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "company" && (
                <ul className="pb-4 pl-4 space-y-1">
                  {COMPANY_ITEMS.map((item) => (
                    <li key={item.slug}>
                      <a
                        href={item.href ?? "/"}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-white/80 py-2 hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* VÝROBKY — expandable */}
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setMobileExpanded(mobileExpanded === "products" ? null : "products")}
                className="w-full flex items-center justify-between h-label text-[14px] py-4 text-left"
                aria-expanded={mobileExpanded === "products"}
              >
                {t.products}
                <svg
                  className={`w-4 h-4 text-accent transition-transform duration-200 ${mobileExpanded === "products" ? "rotate-180" : ""}`}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileExpanded === "products" && categories.length > 0 && (
                <ul className="pb-4 pl-4 space-y-1">
                  {categories.map((c) => (
                    <li key={c.slug}>
                      <a
                        href={`/vyroba/${c.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="block text-sm text-white/80 py-2 hover:text-white transition-colors"
                      >
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a href="/servis" className="block h-label text-[14px] py-4 border-b border-white/10" onClick={() => setMobileOpen(false)}>{t.service}</a>
            <a href="/ke-stazeni" className="block h-label text-[14px] py-4 border-b border-white/10" onClick={() => setMobileOpen(false)}>{t.downloads}</a>
            <a href="/kontakt" className="block h-label text-[14px] py-4 border-b border-white/10" onClick={() => setMobileOpen(false)}>{t.contact}</a>

            {/* Poptávka CTA */}
            <div className="pt-6">
              <a
                href="/"
                onClick={(e) => { if (onNav) { e.preventDefault(); onNav("contact"); } setMobileOpen(false); }}
                className="inline-flex h-11 items-center px-5 bg-accent text-mandik-ink h-label text-[13px] hover:bg-[#1ec170] transition-colors"
              >
                {t.inquiry}
              </a>
            </div>

            {/* Výběr jazyka — rozbalovací seznam (stejně jako Naše společnost / Výrobky) */}
            <div className="pt-6 border-t border-white/15 mt-6">
              {(() => {
                const current = LOCALES.find((l) => l.code === lang) ?? LOCALES[0];
                return (
                  <div className="border-b border-white/10">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(mobileExpanded === "lang" ? null : "lang")}
                      className="w-full flex items-center justify-between h-label text-[14px] py-4 text-left"
                      aria-expanded={mobileExpanded === "lang"}
                    >
                      <span className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={current.flag} alt={current.label} width={20} height={14} className="rounded-sm" />
                        <span>{current.label}</span>
                      </span>
                      <svg
                        className={`w-4 h-4 text-accent transition-transform duration-200 ${mobileExpanded === "lang" ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileExpanded === "lang" && (
                      <ul className="pb-4 pl-4 space-y-1">
                        {LOCALES.map(({ code, label, flag }) => {
                          const isActive = code === lang;
                          return (
                            <li key={code}>
                              <button
                                type="button"
                                onClick={() => { onLang?.(code); setMobileExpanded(null); }}
                                className={`w-full flex items-center gap-2 text-sm py-2 transition-colors ${
                                  isActive ? "text-accent font-semibold" : "text-white/80 hover:text-white"
                                }`}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={flag} alt={label} width={20} height={14} className="rounded-sm" />
                                <span>{label}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Kontakt info */}
            <div className="pt-6">
              <a href="tel:+420311706706" className="flex items-center gap-2 text-sm text-white/80 py-2">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +420 311 706 706
              </a>
              <a href="mailto:mandik@mandik.cz" className="flex items-center gap-2 text-sm text-white/80 py-2">
                <svg className="w-3.5 h-3.5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                mandik@mandik.cz
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
