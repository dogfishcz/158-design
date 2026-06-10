"use client";

import React from "react";
import { NEWS } from "@/lib/news";

export const NewsScreen = () => {
  return (
    <div data-screen-label="News" className="page-enter pt-[100px] lg:pt-[116px]">
      <section className="bg-white">
        <div className="max-w-site mx-auto px-6 lg:px-10 pt-12 pb-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">Novinky</h1>
              <div className="mt-4 h-1 w-16 bg-accent" />
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              Nové produkty, certifikace a aktuální dění ve společnosti MANDÍK.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-mandik-paper-soft border-t border-mandik-rule">
        <div className="max-w-site mx-auto px-6 lg:px-10 py-14 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS.map((n) => (
              <a
                key={n.slug}
                href={`/novinky/${n.slug}`}
                style={{ "--tile-color": "#26d07c" }}
                className="tile group relative flex flex-col bg-white overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)]"
              >
                <span className="tile-bar z-10" style={{ background: "#26d07c" }} />
                <div className="relative aspect-[4/3] bg-mandik-paper-soft overflow-hidden">
                  <img src={n.photos[0]} alt={n.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mono text-[11px] text-mandik-steel-70 mb-2">{n.date}</div>
                  <div className="h-display text-[20px] leading-tight text-mandik-ink">{n.title}</div>
                  <div className="mt-3 text-[13px] text-mandik-steel-80 leading-relaxed">{n.perex}</div>
                  <div className="mt-auto pt-4 border-t border-mandik-rule flex items-center gap-2">
                    <span className="h-label text-[11px] text-mandik-steel transition-colors group-hover:text-[var(--tile-color)]">Číst dál</span>
                    <svg className="w-4 h-4 text-mandik-steel-70 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--tile-color)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
