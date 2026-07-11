# SilverTech · Spółdzielnia Socjalna · Landing + Marketplace

## Project Overview
- **Name**: SilverTech · Spółdzielnia Socjalna
- **Goal**: Przełomowa strona landing page dla spółdzielni socjalnej SilverTech z Poznania — podmiotu ekonomii społecznej świadczącego hybrydową opiekę senioralną (AI-companion głosowy Adam + opiekunowie w terenie)
- **Features**: 12-sekcyjny landing page narracyjny + pełny marketplace 35 usług codziennego życia dla seniora

## URLs
- **Produkcja (Cloudflare Pages)**: https://silvertech-410.pages.dev/
- **GitHub**: https://github.com/walerys1003/silverTech
- **Strony**:
  - `/` — Landing page (12 sekcji narracyjnych)
  - `/marketplace` — Marketplace Adam Koncierż (katalog 35 usług + 16 wykonawców)

## Design
Projekt wdrożony z **Genspark Design handoff** (repo `designer2-d43c9f82-5df5-4e13-a7c0-0b63a52e0ca7`, wersja IV — final production).

**Fidelity**: High-fidelity, pixel-perfect production ready.

**Design tokens**:
- Paleta: paper `#F1EDE4`, ink `#171A16`, night `#0E140F`, sage `#4A6B5A`, ochre `#B8895A` + 4 kolory semaforu
- Typografia: Instrument Serif (headlines) + Inter (body), pełna skala fluid clamp()
- Skala global: `html { zoom: 1.5; }` — świadoma decyzja klienta

**12 sekcji landing page**:
1. Hero — "Nie budujemy startupu. Budujemy instytucję." + wideo cinematic Samson vs lew
2. Manifest (dark) — 7 deklaracji podpisanych przez Tomasza Kotlińskiego
3. Diagnoza — 3 portrety seniorów (Halina · Zdzisław · Krystyna) hyperrealistic AI
4. Demografia — dane GUS + SVG wykres
5. Adam — AI Companion (dark) — wave-panel + character bible + 5 mockupów aplikacji
6. Semafor 4-kolorowy — SLA strip
7. Marketplace teaser → link do podstrony
8. Pakiety ASYSTA — 4 karty subskrypcji (Kontakt 99 / Dom 199 / Zdrowie 349 / Aktywny 499)
9. Założyciel — Tomasz Kotliński, portret + bio
10. Poznań — mapa 45+ partnerstw
11. Okno strategiczne (dark) — timeline 1995 / 2026 / 2055
12. Jak zacząć — pierwszy tydzień + CTA telefoniczny +48 501 42 00 42

**Marketplace**: Hero z voice-bar (rotujące prompty), katalog 35 usług w 9 kategoriach z filtrem, 3 warstwy zaufania, 16 wykonawców, 3 kroki zamówienia

## Performance Optimizations
- **WebP konwersja**: 10 dużych PNG → WebP (jakość 88), redukcja 90-97% (57MB → 3.8MB)
- **Kompresja wideo**: Hero MP4 29MB → 12MB (H.264 CRF 24, brak audio, faststart)
- **Resource hints**: `<link rel="preload">` dla hero video, poster i first-fold image
- **Loading strategy**: `loading="eager"` + `fetchpriority="high"` dla hero assets, `loading="lazy"` + `decoding="async"` dla below-fold images
- **Cache headers**: Assets 1yr immutable, HTML no-cache (via `_headers`)
- **Total size**: 87MB → 20MB (77% redukcja)

## Data Architecture
- **Data Models**: Statyczne dane inline w HTML (35 usług z data-cat, 16 wykonawców, 7 deklaracji manifestu, 45+ partnerstw)
- **Storage Services**: Brak — projekt jest w 100% statyczny (zero backend, zero build-step)
- **Data Flow**: Wszystkie interakcje lokalne (filtr kategorii, scroll reveals IntersectionObserver, rotujące voice prompts, wave-form animacja JS)

## User Guide
1. Otwórz stronę główną `/` — landing page narracyjny z 12 sekcjami
2. Przewijaj, aby odkrywać sekcje z animacjami scroll reveal
3. Użyj bocznej nawigacji (rzymskie liczby i–xii) do skoku między sekcjami
4. Kliknij "Otwórz Marketplace ↗" w sekcji VII, aby przejść do katalogu usług
5. Na marketplace użyj filtrów kategorii (Dom, Zdrowie, Mobilność, etc.)
6. Zadzwoń: +48 501 42 00 42 (pon.-pt. 09:00-17:00)

## Tech Stack
- **Static HTML/CSS/JS** — self-contained, zero build-step, zero framework
- **Cloudflare Pages** — hosting statyczny
- **Google Fonts** — Instrument Serif + Inter (CDN)
- **Wrangler** — CLI dla Cloudflare Pages

## Deployment
- **Platform**: Cloudflare Pages (BYOK — user's own CF account)
- **Project name**: silvertech
- **Status**: ✅ Active — https://silvertech-410.pages.dev/
- **Tech Stack**: Czysty static HTML/CSS/JS + 19 zoptymalizowanych assetów (20MB)
- **Last Updated**: 2026-07-11

## Project Structure
```
webapp/
├── public/                    ← Cloudflare Pages output (pages_build_output_dir)
│   ├── index.html             ← Landing page (109KB, 12 sekcji)
│   ├── marketplace.html       ← Marketplace Adam Koncierż (62KB)
│   ├── _headers               ← Cache + security headers
│   ├── _routes.json           ← Static routing (no Functions)
│   ├── site.webmanifest       ← PWA manifest
│   └── assets/                ← 19 zoptymalizowanych assetów (20MB)
│       ├── samson-lion-hero.mp4          ← Wideo cinematic hero (12MB, skompresowane)
│       ├── samson-lion-hero-poster.jpg   ← Poster wideo (320KB)
│       ├── portrait-halina.webp          ← Portret AI · Pani Halina (541KB)
│       ├── portrait-zdzislaw.webp        ← Portret AI · Pan Zdzisław (715KB)
│       ├── portrait-krystyna.webp        ← Portret AI · Pani Krystyna (300KB)
│       ├── tomasz-kotlinski.jpg          ← Portret założyciela (1.8MB)
│       ├── adam-hero-family.webp         ← Mockup: ojciec + syn (691KB)
│       ├── adam-triptych-pl.webp         ← Mockup: 3 telefony (311KB)
│       ├── adam-screen-voice.webp        ← Mockup: Adam voice (243KB)
│       ├── adam-screen-rodzina.webp      ← Mockup: rodzina (385KB)
│       ├── adam-screen-zdrowie.webp      ← Mockup: monitoring zdrowia (177KB)
│       ├── samson-lion-transparent.webp  ← Emblemat fallback (334KB)
│       ├── og-image-1200.png            ← Open Graph 1200×630 (1.4MB, PNG dla social)
│       ├── og-image-1200.webp           ← Open Graph WebP (56KB)
│       ├── favicon-32/192/512.png        ← Favicony
│       └── apple-touch-icon.png         ← iOS icon
├── wrangler.jsonc             ← Cloudflare Pages config
├── package.json               ← Scripts (dev/deploy)
├── ecosystem.config.cjs       ← PM2 config
└── README.md                  ← Ten plik
```
