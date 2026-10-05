# PROGRESS.md

> File ini adalah "memory" project antar-sesi. AI Agent **wajib membaca** file ini di awal sesi (sebelum membuat roadmap) dan **wajib menambah entri baru** di akhir sesi (setelah semua sub-tugas LULUS). Jangan hapus/timpa entri lama — file ini bersifat *append-only* log, kecuali bagian "Snapshot" yang memang diupdate tiap sesi.

---

## 📸 Snapshot Project (selalu diupdate, bukan log)

- **Status umum**: ~80% — skills section, contact form aktif, API route, proyek baru (SITRACK, SiSurat, FinFlow). Yang kurang: halaman Experiences/[id] masih skeleton, Blog masih placeholder, unit test belum ada.
- **Fitur/modul aktif dikerjakan**: `<nama fitur yang lagi jalan>`
- **Known issues belum diperbaiki**:
  - `formMessage.jsx` component tidak dipakai di mana pun (redundan, kontak form inline di `contact/page.jsx`)
  - `experiences/[id]/page.jsx` masih skeleton (`last chapter {id}`), belum connect ke data
  - Deskripsi profil di `home.js` mengandung teks panjang dengan link Instagram & CV yang dideteksi via kata per kata — rentan typo
  - Project images masih pakai placeholder (`/face-recognitons.png`) untuk SITRACK, SiSurat, IT Asset, Help Desk — perlu screenshot asli
- **Keputusan arsitektur penting yang masih berlaku**:
  - Semua konten statis dari `src/data/` — no database, no CMS
  - Pure JavaScript (JSX), tidak pakai TypeScript
  - Tailwind CSS v4 dengan `@custom-variant dark`
  - Inline SVG icons di `social.js` (lucide-react tidak dipakai untuk social icons)
  - Contact form aktif via API route `/api/contact` — siap integrasi email service (Resend, SendGrid, dll)
  - ESLint 9 + eslint-config-next@15 untuk linting

---

## 📜 Session Log (append di bawah, urutan terbaru paling atas)

### Session — `2026-07-24`
**Tugas diminta**: Realisasikan poin 1-3 (Skills section, IT Support projects, active contact form) + tambah proyek dari GitHub (skripsi-dashboard, sisurat-singopuran, zenni-coins)

**Sub-tugas selesai (LULUS Reviewer)**:
- Tambah `skillsData` di `src/data/home.js` — 4 kategori IT Support (Troubleshooting, Network, Administration, Soft Skills)
- Tambah Skills section di `src/app/page.jsx` — mengikuti pattern list section lain (hover bg-lime)
- Update FinFlow dengan data aktual (zenni-coins): URL, techstack (Supabase, Recharts, TypeScript)
- Tambah SITRACK dan SiSurat Singopuran ke projectDatas
- Tambah IT Asset Inventory & Help Desk Ticket Tracker (proyek dummy IT Support)
- Aktifkan contact form: hapus `disabled`, tambah state management + submit handler
- Buat API route `src/app/api/contact/route.js` — validasi input, return JSON
- Setup ESLint 9 + eslint-config-next@15
- Update `AGENTS.md` dan `PROGRESS.md` sesuai state terbaru
- Build & lint PASS ✅

**Keputusan/catatan penting untuk sesi berikutnya**:
- `eslint.config.mjs` pakai `@eslint/eslintrc` FlatCompat untuk kompatibilitas
- API route `/api/contact` masih log ke console — perlu integrasi email service untuk production
- Skills section didesain ulang mengikuti pattern list section lain (bukan border card)
- Project images placeholder perlu diganti dengan screenshot asli

**Belum selesai / carry-over**:
- Halaman `experiences/[id]` masih skeleton — perlu implementasi detail experience
- `formMessage.jsx` unused component — perlu decide: hapus atau integrasi
- Blog page masih placeholder — bisa diganti jadi IT Guides/Documentation
- Profile description masih rentan typo karena link detection split-by-word

---

<!-- Entri sesi berikutnya ditambahkan di bawah garis ini, dengan format yang sama -->
