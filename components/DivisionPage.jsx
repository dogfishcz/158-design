"use client";

import React from "react";

const CategoryCard = ({ category, division }) => {
  const img = category.gallery?.[0];
  return (
    <a
      href={`/vyroba/${category.slug}`}
      className="tile group relative bg-white hairline overflow-hidden flex flex-col transition-shadow hover:shadow-lg"
    >
      <span className="tile-bar" style={{ background: division.color }} />
      <div className="relative aspect-[4/3] bg-mandik-paper-soft">
        {img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={img.url}
            alt={img.description || category.name}
            className="absolute inset-0 w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-display text-5xl" style={{ color: `${division.color}33` }}>
              {division.code}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="h-display text-[20px] text-mandik-ink leading-tight">
          {category.name}
        </h3>
        {category.description && (
          <p className="text-[12px] text-mandik-steel-70 mt-2 leading-relaxed line-clamp-2">
            {category.description}
          </p>
        )}
      </div>
    </a>
  );
};

export const DivisionPage = ({ division, categories }) => (
  <div className="bg-white">
    <div className="max-w-[1320px] mx-auto px-10 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 mono text-[11px] text-mandik-steel-70 mb-10">
        <a href="/" className="hover:text-mandik-ink transition-colors">Domů</a>
        <span>/</span>
        <span className="font-medium text-mandik-ink">{division.name}</span>
      </nav>

      {/* Hlavička divize */}
      <div className="mb-14">
        <h1 className="h-display text-[48px] leading-[1.05] text-mandik-ink mb-3">
          {division.name}
        </h1>
        <div className="w-16 h-1 mb-6" style={{ backgroundColor: division.color }} />
        {division.description && (
          <p className="text-mandik-steel-80 leading-relaxed max-w-3xl text-[15px]">
            {division.description}
          </p>
        )}
      </div>

      {/* Seznam kategorií */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <CategoryCard key={cat.public_id} category={cat} division={division} />
          ))}
        </div>
      ) : (
        <p className="mono text-[12px] text-mandik-steel-70">Žádné kategorie nebyly nalezeny.</p>
      )}
    </div>
  </div>
);
