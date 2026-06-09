"use client";

import React from "react";

export const ImageGallery = ({ images = [], name, accentColor = "#26d07c" }) => {
  const [active, setActive] = React.useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/3] hairline bg-mandik-paper-soft flex items-center justify-center">
        <span className="h-display text-7xl text-mandik-steel/20">M</span>
      </div>
    );
  }

  const current = images[Math.min(active, images.length - 1)];

  return (
    <div>
      <div className="relative aspect-[4/3] hairline bg-mandik-paper-soft overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.url}
          alt={current.description || name}
          className="absolute inset-0 w-full h-full object-contain p-4"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={active === i ? { borderColor: accentColor } : undefined}
              className={`relative w-16 h-16 overflow-hidden border-2 transition-colors ${
                active === i ? "" : "border-mandik-rule hover:border-mandik-steel"
              }`}
              aria-label={`Obrázek ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
