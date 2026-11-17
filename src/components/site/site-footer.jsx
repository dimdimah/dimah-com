import Link from "next/link";
import { experienceData, skillsData } from "@/data/home";
import { socialLinks } from "@/data/social";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      {/* Big CTA */}
      <div className="container-x py-20 sm:py-28">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">Ayo ngobrol</p>
          <h2 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">
            Punya posisi atau proyek yang cocok untuk saya?
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-foreground/65">
            Terbuka untuk peluang IT Support, System Administration, dan
            pengembangan web. Ceritakan kebutuhanmu — saya biasanya membalas
            dalam 1–2 hari kerja.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgb(91_123_251/0.9)]"
            >
              <span>Diskusikan peluangnya</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <Link
              href="/#proyek"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-[13px] font-semibold text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/5"
            >
              Lihat proyek saya
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-x border-t border-line py-12">
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4"
        >
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Pengalaman
            </p>
            <ul className="mt-4 space-y-2.5">
              {experienceData.map((exp) => (
                <li key={exp.id}>
                  <Link
                    href={`/experiences/${exp.id}`}
                    className="text-xs text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {exp.institution}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Keahlian
            </p>
            <ul className="mt-4 space-y-2.5">
              {skillsData.map((cat) => (
                <li key={cat.category}>
                  <Link
                    href="/#keahlian"
                    className="text-xs text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {cat.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Jelajahi
            </p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: "/", label: "Overview" },
                { href: "/blog", label: "Blog" },
                { href: "/contact", label: "Kontak" },
                { href: "/it-supp.pdf", label: "CV (PDF)", download: "CV-D-Luthfi-Aulia-Rohman.pdf" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    download={item.download}
                    className="text-xs text-foreground/70 transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Kontak langsung
            </p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-xs text-foreground/70 transition-colors hover:text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 text-muted-foreground group-hover:text-accent-2 transition-colors"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </svg>
                    <span>{item.username}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="container-x border-t border-line py-5">
        <div className="flex flex-col items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:flex-row sm:items-center">
          <span>
            © {year} dimah luthfi — IT Support &amp; Programmer
          </span>
          <span>Jatinom, Klaten, Jawa Tengah</span>
        </div>
      </div>
    </footer>
  );
}
