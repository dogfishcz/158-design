"use client";

import React from "react";
import { Button } from "./Primitives";
import { ReferenceGallery } from "./ReferenceGallery";
import { NEWS } from "@/lib/news";

export const NewsDetail = ({ item }) => {
  if (!item) {
    return (
      <div data-screen-label="NewsDetail" className="page-enter pt-[120px] lg:pt-[140px] pb-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 text-center">
          <h1 className="h-display text-[40px] text-mandik-ink">Novinka nenalezena</h1>
          <p className="mt-4 text-mandik-steel-80">Tento článek neexistuje nebo byl přesunut.</p>
          <div className="mt-8 flex justify-center">
            <Button variant="primary" href="/novinky">Zpět na novinky</Button>
          </div>
        </div>
      </div>
    );
  }

  const others = NEWS.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div data-screen-label="NewsDetail" className="page-enter pt-[100px] lg:pt-[116px]">
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <a href="/novinky" className="inline-flex items-center gap-2 mono text-[11px] text-mandik-steel-70 hover:text-mandik-ink transition-colors mb-8">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Zpět na novinky
          </a>

          <div className="mono text-[11px] text-mandik-steel-70 uppercase tracking-wider">{item.category} · {item.date}</div>
          <h1 className="mt-2 h-display text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.02] text-mandik-ink max-w-4xl">{item.title}</h1>
          <div className="mt-4 h-1 w-16 bg-accent" />

          <div className="mt-8 max-w-4xl">
            <ReferenceGallery photos={item.photos} alt={item.title} />
          </div>

          <div className="mt-8 max-w-3xl space-y-4 text-[15px] lg:text-[16px] text-mandik-steel-80 leading-relaxed">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="primary" href="/poptavka">Mám zájem o produkt</Button>
            <Button variant="ghost" href="/novinky">Všechny novinky</Button>
          </div>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-mandik-paper-soft border-t border-mandik-rule">
          <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14">
            <div className="h-label text-[11px] text-mandik-steel-70 mb-6">Další novinky</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {others.map((n) => (
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
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mono text-[11px] text-mandik-steel-70 mb-1">{n.date}</div>
                    <div className="h-display text-[18px] leading-tight text-mandik-ink">{n.title}</div>
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
      )}
    </div>
  );
};
