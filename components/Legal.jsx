import React from "react";

// Sdílené prezentační prvky pro právní/textové podstránky
// (Cookies, Ochrana osobních údajů, Whistleblowing).
// Drží jednotný design dle DESIGN.md: nadpis + zelená čárka, čistá sazba textu.

export const LegalLayout = ({ title, current, intro, children }) => (
  <div className="bg-white">
    <div className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
        <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
        <span>/</span>
        <span className="text-mandik-ink">{current}</span>
      </nav>

      {/* Hlavička */}
      <header className="mb-12">
        <h1 className="h-display text-[40px] sm:text-[48px] leading-[1.05] text-mandik-ink">{title}</h1>
        <div className="mt-4 h-1 w-16 bg-accent" />
        {intro && (
          <p className="mt-6 text-[15px] text-mandik-steel-80 leading-relaxed">{intro}</p>
        )}
      </header>

      <div className="space-y-12">{children}</div>
    </div>
  </div>
);

export const LegalSection = ({ title, children }) => (
  <section>
    <h2 className="h-display text-[22px] text-mandik-ink">{title}</h2>
    <div className="mt-2 h-0.5 w-10 bg-accent" />
    <div className="mt-5 space-y-4 text-[15px] text-mandik-steel-80 leading-relaxed">{children}</div>
  </section>
);

// Odrážkový seznam s jednotným stylem
export const LegalList = ({ items, ordered = false }) => {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`${ordered ? "list-decimal" : "list-disc"} pl-5 space-y-2 marker:text-accent`}>
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </Tag>
  );
};

// Zvýrazněný informační box (poznámky, kontakt)
export const LegalNote = ({ children }) => (
  <div className="bg-mandik-paper-soft hairline p-4 text-[14px] text-mandik-steel-80 leading-relaxed">
    {children}
  </div>
);
