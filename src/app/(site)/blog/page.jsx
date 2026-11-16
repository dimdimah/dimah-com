import Link from "next/link";

export const metadata = {
  title: "Blog — D. Luthfi Aulia Rohman",
  description:
    "Catatan teknis seputar IT support, troubleshooting, dan pengembangan web.",
};

export default function BlogPage() {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-4">Insight</p>
        <h1 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">
          Catatan teknis sedang disiapkan.
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-foreground/65">
          Artikel seputar troubleshooting hardware &amp; jaringan, serta
          pengembangan web akan dimuat di sini. Kembali lagi nanti.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgb(91_123_251/0.9)]"
          >
            <span>Kembali ke overview</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-[13px] font-semibold text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/5"
          >
            Hubungi saya
          </Link>
        </div>
      </div>
    </section>
  );
}
