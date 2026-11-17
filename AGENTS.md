# AGENTS.md — Dimah Portfolio

## Project Overview
Portfolio website for **D. Luthfi Aulia Rohman (S.Kom.)** — built with Next.js 15 + Tailwind CSS v4 + shadcn/ui.
Target: **IT Support / Programmer / Systems Administration** position.
Desain UI: Terinspirasi dari estetika teknis **Caveman Docs** (https://docs.caveman.so/) dan studio editor **Framer**.
Halaman: Home (Caveman-style technical spec & directory index), Blog, Contact, Experiences/[id] (SSG), Admin CMS Studio (`/admin`, `/admin/editor`, `/admin/login`).

## Tech Stack
| Layer | Teknologi |
|-------|-----------|
| Framework | Next.js 15.3.8 (App Router with Route Groups) |
| Language | JavaScript (JSX) |
| UI Library | shadcn/ui (New York style), lucide-react |
| Styling | Tailwind CSS v4 + CSS variables |
| Font | Inter (Apple SF Pro alternative) + Geist Mono (via next/font/google) |
| Dark Mode | next-themes (Deep Titanium Slate palette `#0c0c0e`) |
| Toast | sonner |
| Backend & DB | Supabase PostgreSQL + Auth + Storage (Client & Server helpers ready) |
| Image Pipeline | Client-side Canvas WebP converter & auto-resizer (`src/lib/imageCompress.js`) |
| CSS Animation | tw-animate-css |
| Linting | ESLint 9 + eslint-config-next |

## Project Structure
```
src/
├── app/
│   ├── (site)/                       # Rute Publik (Portfolio)
│   │   ├── layout.jsx                # Shell publik (Caveman sticky nav, theme switcher)
│   │   ├── page.jsx                  # Beranda (Caveman technical spec & 4-section index)
│   │   ├── blog/page.jsx             # Blog articles
│   │   ├── contact/page.jsx          # Form kontak aktif & direct copy email
│   │   └── experiences/[id]/page.jsx # Detail pengalaman kerja (SSG pre-rendered)
│   ├── (admin)/admin/                # Rute Admin CMS (Framer Studio UI)
│   │   ├── layout.jsx                # Shell admin (Dark canvas full-width)
│   │   ├── page.jsx                  # Workspace Hub (Module overview cards)
│   │   ├── editor/page.jsx           # 3-Pane Visual Studio Editor (Left tree, Canvas, Right inspector)
│   │   └── login/page.jsx            # Dark minimalist login screen
│   ├── api/
│   │   └── contact/route.js          # Contact API endpoint (POST)
│   ├── globals.css                   # Tailwind v4 tokens & Inter/Geist font variables
│   ├── layout.jsx                    # Root layout (Theme provider & toaster)
│   ├── login/page.jsx                # Auto-redirect ke /admin/login
│   └── not-found.jsx                 # 404 page
├── components/
│   ├── admin/                        # Komponen CMS Studio
│   │   └── ImageUploader.jsx         # Drag & drop WebP image compressor
│   ├── ui/                           # shadcn/ui components
│   ├── roleFilter.jsx                # Work experience & featured projects list
│   ├── theme-provider.jsx            # next-themes wrapper
│   └── theme-switcher.jsx            # Dark/light toggle
├── data/
│   ├── home.js                       # 100% verified data dari PDF CV & Ijazah D. Luthfi Aulia Rohman
│   └── social.js                     # Social & direct contact links (WA, Email, LinkedIn, GitHub)
├── lib/
│   ├── supabase/                     # Supabase client & server instances
│   ├── storage.js                    # Unified Supabase Storage + Local upload & auto-cleanup
│   ├── imageCompress.js              # Client-side WebP compression utility
│   └── utils.js                      # cn() helper
└── supabase/
    └── schema.sql                    # Skema PostgreSQL lengkap + RLS policies
```

## Key Profile & Credentials (Verified from PDF)
- **Nama:** D. Luthfi Aulia Rohman
- **Gelar:** Sarjana Komputer (S.Kom.), S1 Informatika STMIK Amikom Surakarta
- **IPK:** 3,69 / 4,00 (Predikat Cumlaude)
- **Domisili:** Jatinom, Klaten, Jawa Tengah
- **Kontak:** dimaharohman@gmail.com | +62 851-6281-3769
- **Pengalaman Utama:**
  1. Magang IT — RS PKU Aisyiyah Boyolali (Agustus 2026 – Sekarang)
  2. Front-end Web Developer — Web App "Sisurat Singopuran" (Juni 2025 – Agustus 2025)
  3. Product Manager & Full-stack Dev — PKM-KC: Sistem Stok Barang QR Code (Feb 2025 – Mar 2025)
  4. Product Manager & UI/UX — Aplikasi Mobile "Harian" (Juara 1 Nasional CORISINDO)

## Scripts
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run next lint
```

---
*Last updated: 2026-10-01*
