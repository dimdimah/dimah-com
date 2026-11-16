"use client";

import { useState } from "react";
import { toast } from "sonner";

const TOPICS = [
  "IT Support / Sysadmin",
  "Pengembangan Web",
  "Kolaborasi Lainnya",
];

export default function ContactForm({ compact = false }) {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: `[${topic}]\n${formData.message}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal mengirim pesan.");
        return;
      }
      toast.success("Pesan berhasil dikirim!", {
        description: "Terima kasih, saya akan menghubungi Anda segera.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Gagal mengirim pesan.", {
        description: "Terjadi kesalahan jaringan. Coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent-1/60";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <fieldset>
        <legend className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Apa yang ingin kamu kerjakan?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                topic === t
                  ? "border-transparent bg-brand text-white"
                  : "border-line text-foreground/70 hover:border-foreground/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Nama kamu
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Nama lengkap"
            className={inputCls}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Alamat email kamu
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="nama@email.com"
            className={inputCls}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Detail proyek
        </span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={compact ? 4 : 5}
          placeholder="Ceritakan singkat kebutuhan atau posisi yang kamu tawarkan…"
          className={`${inputCls} min-h-32 resize-y`}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgb(91_123_251/0.9)] disabled:opacity-50"
        >
          <span>{loading ? "Mengirim…" : "Kirim pesan"}</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Biasanya dibalas dalam 1–2 hari kerja.
        </span>
      </div>
    </form>
  );
}
