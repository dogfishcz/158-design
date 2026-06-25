# MANDIK web v8

Web společnosti MANDÍK a.s. — Next.js 14 (App Router) + Tailwind CSS.

## Spuštění lokálně

```bash
npm install
npm run dev
```

Otevři http://localhost:3000

## Build

```bash
npm run build
npm run start
```

## Nasazení na Vercel

1. Push repozitáře na GitHub.
2. Na [vercel.com](https://vercel.com) → **New Project** → importuj repo.
3. Vercel automaticky detekuje Next.js — žádná další konfigurace není potřeba.
4. Klikni **Deploy**.

Alternativně přes Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Struktura

- `app/` — Next.js App Router (layout, page, globální styly)
- `components/` — React komponenty (Header, Footer, Homepage, ProductDetail, …)
- `public/assets/` — statické soubory (hero video, divize, logo, certifikační loga)

## Routing

Web používá interní state-based routing v komponentě `App.jsx` — všechny obrazovky (Homepage, Product, References, Downloads, About, Contact) jsou renderovány v rámci jediné Next.js stránky. Navigace přepíná `route` state.
