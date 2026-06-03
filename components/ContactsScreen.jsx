"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SectionLabel, SectionTitle } from "./Primitives";
import { COUNTRIES, GENERAL_CONTACTS, getRegion } from "@/lib/contacts";

// maplibre-gl sahá na window → načítat jen na klientu
const ContactsMap = dynamic(() => import("./ContactsMap").then((m) => m.ContactsMap), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-[#222b36]">
      <span className="mono text-[11px] text-white/40">Načítání mapy…</span>
    </div>
  ),
});

const MailIcon = () => (
  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const PhoneIcon = () => (
  <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const ContactCard = ({ label, name, role, company, email, phone, address }) => (
  <div className="border border-white/10 bg-white/[0.04] p-5">
    {label && <div className="h-label text-[10px] text-accent">{label}</div>}
    {(name || company) && (
      <div className="h-display text-[20px] leading-tight text-white mt-2">{name || company}</div>
    )}
    {role && !label && <div className="mono text-[11px] text-white/55 mt-0.5">{role}</div>}
    {name && company && <div className="mono text-[11px] text-white/55 mt-0.5">{company}</div>}

    <div className="mt-4 space-y-2">
      {email && (
        <a href={`mailto:${email}`} className="flex items-center gap-2.5 text-[14px] text-white/85 hover:text-white transition-colors">
          <MailIcon /> {email}
        </a>
      )}
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-[14px] text-white/85 hover:text-white transition-colors">
          <PhoneIcon /> {phone}
        </a>
      )}
    </div>

    {address && (
      <div className="mono text-[12px] text-white/55 mt-4 pt-4 border-t border-white/10 leading-relaxed">
        {address.map((line) => <div key={line}>{line}</div>)}
      </div>
    )}
  </div>
);

export function ContactsScreen() {
  const country = COUNTRIES[0]; // zatím jen ČR; model podporuje víc zemí
  const [selected, setSelected] = React.useState(null);
  const region = selected ? getRegion(selected, country.code) : null;

  return (
    <div data-screen-label="Kontakt" className="page-enter">
      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-12 pb-12">
          <div className="grid grid-cols-12 gap-8 lg:gap-10 items-end">
            <div className="col-span-12 lg:col-span-8">
              <SectionLabel>Kontakt</SectionLabel>
              <h1 className="h-display text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95] text-mandik-ink">
                Najděte svůj
                <br />
                <span className="text-mandik-steel">kontakt.</span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-4 text-mandik-steel-80 text-[15px] leading-relaxed">
              Vyberte kraj na mapě a zobrazíme vám obchodního zástupce pro vaši oblast. Ústředna
              a&nbsp;vedení společnosti jsou vám k&nbsp;dispozici vždy.
            </div>
          </div>
        </div>
      </section>

      {/* MAPA + KONTAKTY */}
      <section className="bg-mandik-steel text-white border-t border-mandik-rule">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14 lg:py-20">
          <div className="grid grid-cols-12 gap-8 lg:gap-10">
            {/* Mapa */}
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 bg-accent" />
                <span className="h-label text-[11px] text-white/70">{country.name}</span>
              </div>
              <div className="h-[420px] sm:h-[520px] overflow-hidden border border-white/10">
                <ContactsMap
                  country={country}
                  selected={selected}
                  onSelect={setSelected}
                  className="h-full w-full"
                />
              </div>
              <p className="mono text-[11px] text-white/45 mt-3">
                Klikněte na kraj v&nbsp;mapě pro zobrazení kontaktu. Přiblížení mapy: Ctrl&nbsp;+&nbsp;kolečko.
              </p>
            </div>

            {/* Panel kontaktů */}
            <div className="col-span-12 lg:col-span-5">
              <h2 className="h-display text-[28px] leading-tight">Kontakty pro vybranou oblast</h2>

              {/* Vybraný region */}
              <div className="mt-5">
                {region ? (
                  <>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent text-mandik-ink h-label text-[11px]">
                        {region.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="mono text-[11px] text-white/50 hover:text-white transition-colors"
                      >
                        Zrušit výběr ✕
                      </button>
                    </div>
                    <div className="space-y-3">
                      {region.contacts.map((c, i) => (
                        <ContactCard key={i} label={c.role} name={c.name} email={c.email} phone={c.phone} />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="border border-dashed border-white/15 p-6 text-center">
                    <p className="text-white/60 text-[14px] leading-relaxed">
                      Vyberte kraj na mapě a zobrazíme vám příslušného obchodního zástupce.
                    </p>
                  </div>
                )}
              </div>

              {/* Obecné kontakty */}
              <div className="mt-8 pt-8 border-t border-white/15">
                <div className="h-label text-[11px] text-white/45 mb-4">Ústředna a vedení</div>
                <div className="space-y-3">
                  {GENERAL_CONTACTS.map((c, i) => (
                    <ContactCard
                      key={i}
                      label={c.label}
                      company={c.company}
                      role={c.role}
                      email={c.email}
                      phone={c.phone}
                      address={c.address}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
