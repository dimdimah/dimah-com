# 🔄 WORKFLOW — Alur Iterasi Orchestrator → Coder → Reviewer

## Diagram Alur

```
User memberi tugas
      │
      ▼
[Orchestrator] Baca AGENTS.md + PROGRESS.md
      │
      ▼
[Orchestrator] Membuat roadmap sub-tugas
      │
      ▼
┌──────────────────────────────────────────┐
│  Untuk setiap sub-tugas (berurutan):      │
│                                            │
│   [Orchestrator] → delegasikan sub-tugas  │
│           │                               │
│           ▼                               │
│   [Coder] → eksekusi sub-tugas            │
│           │                               │
│           ▼                               │
│   [Reviewer] → periksa hasil              │
│           │                               │
│      ┌────┴────┐                          │
│      │         │                          │
│   LULUS   PERLU REVISI                    │
│      │         │                          │
│      │         └──► kembali ke [Coder]    │
│      │              dengan feedback       │
│      ▼              spesifik              │
│  lanjut ke sub-tugas berikutnya           │
└──────────────────────────────────────────┘
      │
      ▼
Semua sub-tugas LULUS?
      │
      ▼
[Orchestrator] Tulis entri baru ke PROGRESS.md
      │
      ▼
[Orchestrator] Ringkasan akhir ke user
```

## Format Output Wajib di Terminal/Chat

Setiap iterasi harus terlihat jelas dengan label peran, contoh:

```
[Orchestrator]: Memecah tugas menjadi...
1. Update data profil di src/data/home.js
2. Redesign halaman Experiences/[id] dengan konten dinamis
3. Tambah unit test untuk ProfileCard

[Orchestrator]: Mendelegasikan ke Coder → Sub-tugas 1: Update data profil

[Coder]: Mengeksekusi bagian "Update data profil" karena data perlu disesuaikan
- File yang disentuh: src/data/home.js
- Perubahan: menambah field `location` pada profileData

[Coder]: Sub-tugas "Update data profil" selesai, menyerahkan ke Reviewer.

[Reviewer]: Hasil pemeriksaan terhadap bagian "Update data profil" adalah LULUS
- lint: PASS
- build: PASS

[Orchestrator]: Mendelegasikan ke Coder → Sub-tugas 2: ...
```

## Kriteria "Tugas Selesai"

Orchestrator hanya boleh menutup sesi dengan ringkasan akhir jika:
- ✅ Semua sub-tugas di roadmap berstatus LULUS dari Reviewer
- ✅ `lint` dan `build` keduanya PASS di sub-tugas terakhir
- ✅ Tidak ada feedback Reviewer yang belum ditindaklanjuti
- ✅ Ringkasan perubahan (file yang diubah/dibuat) sudah ditampilkan ke user
- ✅ Entri baru sudah ditambahkan ke `PROGRESS.md`

## Catatan Penggunaan Lintas-Agent

File-file di folder `.agents/` ini generik dan tidak terikat tool tertentu. Berlaku untuk:
- Claude Code
- Cursor / Windsurf
- Cline / Roo Code
- Copilot Workspace
- Agent custom lain yang bisa membaca instruksi dari file project

Jika tool AI-mu tidak otomatis membaca file `AGENTS.md`/`.agents/`, tempelkan isi `AGENTS.md` sebagai system prompt / custom instructions secara manual di awal sesi.
