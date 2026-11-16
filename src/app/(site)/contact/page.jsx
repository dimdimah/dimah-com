import Link from "next/link";
import ContactForm from "@/components/site/contact-form";
import { socialLinks } from "@/data/social";
import { profileData } from "@/data/home";

export const metadata = {
  title: "Kontak — D. Luthfi Aulia Rohman",
  description:
    "Hubungi D. Luthfi Aulia Rohman untuk peluang IT Support, System Administration, atau proyek pengembangan web.",
};

export default function ContactPage() {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-4">Ayo ngobrol</p>
          <h1 className="text-[clamp(1.9rem,4vw,3rem)] leading-[1.08]">
            Siap beralih dari perencanaan ke eksekusi?
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">
            Ceritakan kebutuhan timmu — saya akan membalas dengan jujur soal
            apa yang bisa saya kerjakan dan kapan bisa mulai. Biasanya dibalas
            dalam 1–2 hari kerja.
          </p>

          <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent-4" />
            Tersedia untuk peluang baru
          </div>

          {/* Direct channels */}
          <ul className="mt-10 flex flex-col gap-2.5">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-full border border-line bg-card px-5 py-3.5 font-mono text-sm text-foreground/80 transition-colors hover:border-accent-1/50 hover:text-foreground"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                  <span className="truncate">{item.username}</span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-foreground/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground/70"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {profileData.location}
          </p>
        </div>

        <div className="rounded-xl border border-line bg-card p-7 sm:p-10">
          <ContactForm compact />
        </div>
      </div>
    </section>
  );
}
