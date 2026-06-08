"use client";

import React from "react";

export const Logo = ({ invert = false, size = 36, onNav, className = "" }) => {
  const color = invert ? "#ffffff" : "#506077";
  const ratio = 2958 / 879;
  const width = size * ratio;
  return (
    <a
      href="/"
      onClick={(e) => { if (onNav) { e.preventDefault(); onNav("home"); } }}
      data-route="home"
      className={`inline-flex items-center select-none shrink-0 hover:opacity-80 transition-opacity ${className}`}
      aria-label="MANDÍK — domů"
      style={{ height: size }}
    >
      <span
        role="img"
        aria-hidden
        style={{
          display: "inline-block",
          width: `${width}px`,
          height: `${size}px`,
          backgroundColor: color,
          WebkitMaskImage: "url(/assets/mandik-logo-white.webp)",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          WebkitMaskPosition: "left center",
          maskImage: "url(/assets/mandik-logo-white.webp)",
          maskRepeat: "no-repeat",
          maskSize: "contain",
          maskPosition: "left center",
        }}
      />
    </a>
  );
};

export const SectionLabel = ({ children, color = "#506077" }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-2 h-2" style={{ background: color }} />
    <span className="h-label text-xs" style={{ color }}>{children}</span>
  </div>
);

export const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`h-display text-[44px] leading-[1.05] text-mandik-ink ${className}`}>{children}</h2>
);

export const Photo = ({ src, label, ratio = "4/3", className = "", priority = false }) => {
  const style = { aspectRatio: ratio.replace("/", " / ") };
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-mandik-paper-soft ${className}`} style={style}>
        <img
          src={src}
          alt={label || ""}
          loading={priority ? "eager" : "lazy"}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
      </div>
    );
  }
  return (
    <div className={`img-placeholder relative ${className}`} style={style}>
      <span>{label || "image"}</span>
    </div>
  );
};

export const Button = ({ children, variant = "primary", href = "#", icon, onClick, target, rel, className = "" }) => {
  const base = "inline-flex items-center gap-3 h-11 px-5 h-label text-[11px] transition-colors duration-150";
  const styles = {
    primary: "bg-accent text-mandik-ink hover:bg-[#1ec170]",
    secondary: "bg-mandik-steel text-white hover:bg-[#3e4d61]",
    vzt: "bg-cat-vzt text-mandik-ink hover:bg-[#5fc0d8]",
    ghost: "bg-transparent text-mandik-ink ring-1 ring-mandik-rule hover:ring-mandik-steel hover:text-mandik-steel",
    invertGhost: "bg-transparent text-white ring-1 ring-white/40 hover:ring-white",
  };
  const isExternal = href && /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      onClick={onClick}
      target={target ?? (isExternal ? "_blank" : undefined)}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      className={`${base} ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon !== false && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      )}
    </a>
  );
};

export const Tile = ({ catColor = "#506077", title, subtitle, meta, href = "#", children, className = "" }) => (
  <a href={href} style={{ "--tile-color": catColor }} className={`tile group relative block bg-white overflow-hidden shadow-sm border border-transparent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[color:var(--tile-color)] ${className}`}>
    <span className="tile-bar" style={{ background: catColor }} />
    {children}
    {(title || subtitle || meta) && (
      <div className="p-5">
        {meta && <div className="mono text-[11px] text-mandik-steel-70 mb-2 uppercase tracking-wider">{meta}</div>}
        {title && <div className="h-display text-[20px] leading-tight text-mandik-ink">{title}</div>}
        {subtitle && <div className="text-sm text-mandik-steel-80 mt-1">{subtitle}</div>}
      </div>
    )}
  </a>
);

export const Stat = ({ value, suffix = "", label, sub, inView }) => {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (!inView) return;
    const target = parseInt(String(value).replace(/[^0-9]/g, ""), 10) || 0;
    const start = performance.now();
    const dur = 1100;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <div className="flex flex-col">
      <div className="h-display text-[64px] leading-none text-mandik-ink tabular-nums">
        {n.toLocaleString("cs-CZ")}<span className="text-mandik-steel">{suffix}</span>
      </div>
      <div className="mt-3 h-label text-[11px] text-mandik-steel">{label}</div>
      {sub && <div className="text-xs text-mandik-steel-80 mt-1">{sub}</div>}
    </div>
  );
};

// Scroll-reveal wrapper — fade-in + slide-up když se element dostane do viewportu.
// Použij přímo: <Reveal><MujKus /></Reveal>
// Volitelně delay (ms) pro stagger u sourozenců.
export const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = React.useRef(null);
  const seen = useInView(ref, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        seen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: seen ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

export const useInView = (ref, opts = { threshold: 0.2 }) => {
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } });
    }, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return seen;
};

export const SpecTable = ({ rows }) => (
  <div className="hairline bg-white">
    {rows.map(([k, v], i) => (
      <div key={i} className="grid grid-cols-[1fr_1.4fr] gap-6 px-5 py-3 hairline mono text-[12px]">
        <div className="text-mandik-steel uppercase tracking-wider">{k}</div>
        <div className="text-mandik-ink">{v}</div>
      </div>
    ))}
  </div>
);

export const CategoryBand = ({ color, label, kicker }) => (
  <div className="flex items-center gap-4">
    <span className="block h-2 w-16" style={{ background: color }} />
    <span className="h-label text-[11px] text-mandik-ink">{label}</span>
    {kicker && <span className="mono text-[11px] text-mandik-steel-70">{kicker}</span>}
  </div>
);
