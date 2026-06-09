"use client";

import React from "react";
import { SectionLabel, SectionTitle, Button, Photo } from "./Primitives";

export const ContactStub = ({ onNav }) => (
  <div data-screen-label="Contact" className="page-enter pt-[140px] pb-32 min-h-screen bg-mandik-paper-soft">
    <div className="max-w-[1320px] mx-auto px-10">
      <SectionLabel>Kontakt</SectionLabel>
      <SectionTitle>Poptávka, technická podpora,<br/>servis.</SectionTitle>
      <div className="mt-10 grid grid-cols-12 gap-px bg-mandik-rule hairline">
        <div className="col-span-7 bg-white p-10">
          <div className="grid grid-cols-2 gap-5">
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Jméno *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none focus:ring-1 focus:ring-accent" placeholder="Patrik Vrsecký" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Firma *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" placeholder="" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">E-mail *</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" type="email" />
            </label>
            <label className="block">
              <span className="h-label text-[10px] text-mandik-steel-70">Telefon</span>
              <input className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" />
            </label>
            <label className="block col-span-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Výrobní oblast</span>
              <div className="mt-2 flex flex-wrap gap-1">
                {["AHC komponenty","AHU jednotky","Topné systémy","Speciální aplikace"].map((c) => (
                  <span key={c} className="px-3 py-1.5 hairline mono text-[11px] text-mandik-steel hover:bg-mandik-rule cursor-pointer">{c}</span>
                ))}
              </div>
            </label>
            <label className="block col-span-2">
              <span className="h-label text-[10px] text-mandik-steel-70">Poptávka</span>
              <textarea rows="6" className="w-full mt-1 px-3 py-2.5 hairline bg-white outline-none" placeholder="Popište prosím zakázku, požadované rozměry, normy …"></textarea>
            </label>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <label className="flex items-center gap-2 mono text-[11px] text-mandik-steel-80">
              <input type="checkbox" className="accent-[#26d07c]" /> Souhlasím se zpracováním osobních údajů
            </label>
            <Button variant="primary" href="#">Odeslat poptávku</Button>
          </div>
        </div>
        <div className="col-span-5 bg-mandik-steel text-white p-10">
          <div className="h-label text-[11px] text-white/55">Sídlo</div>
          <div className="mt-3 h-display text-[20px]">MANDÍK, a.s.</div>
          <div className="mono text-[12px] text-white/75 mt-2 leading-relaxed">
            Dobříšská 550<br/>
            267 24 Hostomice<br/>
            Česká republika
          </div>
          <div className="mt-8 h-label text-[11px] text-white/55">Spojení</div>
          <div className="mt-3 mono text-[13px] space-y-1">
            <div>+420 318 697 111</div>
            <div>mandik@mandik.cz</div>
          </div>
          <div className="mt-8 h-label text-[11px] text-white/55">Servis 24/7</div>
          <div className="mt-3 mono text-[13px]">+420 725 909 998</div>

          <div className="mt-10 h-label text-[11px] text-white/55">GPS</div>
          <div className="mt-3 mono text-[13px]">49.8569° N, 14.0376° E</div>

          <div className="mt-10">
            <Photo label="LEAFLET MAPA, HOSTOMICE" ratio="4/3" />
          </div>
        </div>
      </div>
    </div>
  </div>
);
