"use client";

import React from "react";
import { getDivisionByCategorySlug } from "@/lib/divisions";

// Vykresluje stránku kategorie výrobků (např. /vyroba/pozarni-technika).
// Data odpovídají odpovědi mandik.info/api/v1/ltu/portfolio (jeden item z pole).
// `accentColor` je barva divize, do které kategorie patří (např. AHC = #74d1ea).

const GroupCard = ({ group, categorySlug, accentColor }) => {
  const img = group.gallery?.[0];
  return (
    <a
      href={`/vyroba/${categorySlug}/${group.slug}`}
      style={{ "--tile-color": accentColor }}
      className="tile group relative bg-white overflow-hidden flex flex-col shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]"
    >
      <span className="tile-bar" style={{ background: accentColor }} />
      <div className="relative aspect-[4/3] bg-mandik-paper-soft">
        {img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={img.url}
            alt={img.description || group.name}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-display text-5xl text-mandik-steel/20">M</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="h-display text-[20px] text-mandik-ink leading-tight">
          {group.name}
        </h3>
        {group.subtitle && (
          <p className="mono text-[11px] text-mandik-steel-70 mt-1">{group.subtitle}</p>
        )}
      </div>
    </a>
  );
};

const GroupGrid = ({ groups = [], categorySlug, accentColor }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
    {groups.map((g) => (
      <GroupCard key={g.public_id} group={g} categorySlug={categorySlug} accentColor={accentColor} />
    ))}
  </div>
);

export const CategoryPage = ({ category, accentColor = "#26d07c" }) => {
  const hasSubcategories = (category.subcategories?.length ?? 0) > 0;
  const division = getDivisionByCategorySlug(category.slug);
  // Divizi v drobečkové navigaci ukazujeme jen u divize s více kategoriemi (AHC).
  // U divizí s jedinou kategorií by vznikla duplicita (např. Vzduchotechnické jednotky / Vzduchotechnické jednotky).
  const showDivision = division && division.categorySlugs.length > 1;

  return (
    <div className="bg-white">
      <div className="max-w-[1320px] mx-auto px-10 py-16">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
          <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
          <span>/</span>
          {showDivision && (
            <>
              <a href={`/vyroba/divize/${division.slug}`} className="hover:text-mandik-ink transition-colors">{division.name}</a>
              <span>/</span>
            </>
          )}
          <span className="text-mandik-ink font-medium">{category.name}</span>
        </nav>

        {/* Hlavička kategorie */}
        <div className="mb-14">
          <h1 className="h-display text-[48px] leading-[1.05] text-mandik-ink mb-5">
            {category.name}
          </h1>
          <div className="w-16 h-1 mb-6" style={{ background: accentColor }} />
          {category.description && (
            <p className="text-mandik-steel-80 leading-relaxed max-w-3xl text-[15px]">
              {category.description}
            </p>
          )}
        </div>

        {/* Skupiny */}
        {hasSubcategories ? (
          <div className="space-y-14">
            {category.subcategories.map((sub) => (
              <section key={sub.public_id}>
                <div className="mb-6">
                  <h2 className="h-display text-[26px] text-mandik-ink">{sub.name}</h2>
                  <div className="mt-1 w-10 h-1" style={{ background: accentColor }} />
                </div>
                <GroupGrid groups={sub.groups} categorySlug={category.slug} accentColor={accentColor} />
              </section>
            ))}
          </div>
        ) : (
          <GroupGrid groups={category.groups} categorySlug={category.slug} accentColor={accentColor} />
        )}
      </div>
    </div>
  );
};
