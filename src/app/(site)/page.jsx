import Link from "next/link";
import {
  profileData,
  experienceData,
  projectDatas,
  skillsData,
} from "@/data/home";
import Preloader from "@/components/site/preloader";
import ParticleSphere from "@/components/site/particle-sphere";
import ServicesStage from "@/components/site/services-stage";
import Marquee from "@/components/site/marquee";
import JourneySteps from "@/components/site/journey-steps";
import HighlightSlider from "@/components/site/highlight-slider";
import ContactForm from "@/components/site/contact-form";

export const metadata = {
  title: "D. Luthfi Aulia Rohman — IT Support & Programmer",
  description:
    "Portofolio teknis D. Luthfi Aulia Rohman — Lulusan S1 Informatika (IPK 3,69 / Cumlaude) berpengalaman di IT Rumah Sakit, troubleshooting hardware/jaringan, serta web development.",
};

const TECH_STACK = [
  ...new Set([
    ...experienceData.flatMap((e) => e.tools || []),
    ...projectDatas.flatMap((p) => p.techstack || []),
  ]),
];

export default function HomePage() {
  const heroStats = [
    {
      value: String(experienceData.length).padStart(2, "0"),
      label: "pengalaman & proyek",
    },
    { value: "3,69", label: "IPK · cumlaude" },
    { value: "01", label: "juara nasional 2024" },
  ];

  const skillItems = skillsData.map((cat) => ({
    title: cat.category,
    icon: cat.icon,
    description: cat.skills.slice(0, 4).join(" · "),
  }));

  const journeyItems = experienceData.map((exp) => ({
    title: `${exp.position} — ${exp.institution}`,
    heading: exp.institution,
    kicker: exp.type,
    description: exp.responsibilities?.[0] || exp.position,
    panelText: exp.responsibilities?.slice(0, 2).join(" ") || "",
    tags: exp.tools || [],
  }));

  const highlights = experienceData
    .filter((e) => e.achievements?.length)
    .map((e) => ({
      quote: e.achievements[0],
      author: e.institution,
      role: `${e.position} · ${e.duration}`,
      initials: e.institution
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
    }));

  const contactFacts = [
    "IPK 3,69 / 4,00 — predikat Cumlaude",
    "Magang IT di RS PKU Aisyiyah Boyolali",
    "Juara 1 Kompetisi Nasional CORISINDO 2024",
  ];

  return (
    <>
      <Preloader />

      {/* ============ HERO ============ */}
      <div className="relative -mt-[117px]">
        {/* Sticky background: glows + particle sphere */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          <div className="sticky top-0 h-[100dvh] overflow-hidden">
            <div className="absolute -left-[25%] -top-[35%] h-[80vh] w-[80vw] -rotate-12 animate-drift bg-[radial-gradient(ellipse_at_center,rgba(91,123,251,0.32),transparent_65%)]" />
            <div className="absolute left-1/2 top-1/2 size-[min(80vmin,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(118,98,244,0.5),rgba(91,123,251,0.16)_45%,transparent_70%)]" />
            <div className="absolute inset-0">
              <ParticleSphere />
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[117px] lg:block lg:h-[100svh] lg:min-h-[680px]">
            {/* Watermark */}
            <p
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[17vw] font-semibold leading-none tracking-tighter text-foreground/[0.045]"
            >
              DIMAH
            </p>

            {/* Centered entrance */}
            <div className="animate-rise container-x relative flex flex-1 flex-col items-center justify-center py-14 text-center lg:absolute lg:inset-0 lg:py-0">
              <p className="eyebrow mb-6 rounded-full border border-line bg-black/65 px-4 py-1.5 !text-white/90 backdrop-blur-md dark:bg-black/45">
                IT Support · Programmer
              </p>
              <h1 className="text-display text-legible max-w-5xl text-foreground">
                {profileData.name}
              </h1>
            </div>

            {/* Bottom row: lead + CTAs + stats */}
            <div className="container-x relative grid items-end gap-8 pb-10 lg:absolute lg:inset-x-0 lg:bottom-0 lg:grid-cols-[1fr_auto]">
              <div className="max-w-sm">
                <p className="text-legible text-sm leading-relaxed text-foreground/85">
                  Lulusan S1 Informatika (IPK 3,69 Cumlaude) dengan pengalaman
                  magang IT di rumah sakit — troubleshooting hardware &amp;
                  jaringan, plus pengembangan web dengan Next.js.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[13px] font-semibold tracking-wide text-black transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-white/90 active:translate-y-0"
                  >
                    <span>Hubungi Saya</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                  <Link
                    href="#proyek"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-5 py-3 text-[13px] font-semibold tracking-wide text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/5"
                  >
                    Lihat Portofolio
                  </Link>
                </div>
              </div>

              <dl className="flex gap-8 sm:gap-10">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-display text-2xl font-semibold tabular-nums sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 max-w-[14ch] font-mono text-[10px] uppercase leading-snug tracking-wider text-foreground/60">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>
      </div>

      {/* ============ KEAHLIAN (pinned stage) ============ */}
      <ServicesStage
        id="keahlian"
        eyebrow="Keahlian"
        title="Yang bisa saya kerjakan untuk timmu"
        lead="Empat kategori keahlian yang saya pakai sehari-hari — dari hardware & jaringan sampai membangun produk digital."
        items={skillItems}
      />

      {/* ============ TECH MARQUEE ============ */}
      <section className="py-16 sm:py-20" aria-label="Teknologi">
        <p className="eyebrow mb-8 text-center">
          Teknologi yang saya gunakan
        </p>
        <Marquee duration={45}>
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="flex h-16 w-44 shrink-0 items-center justify-center px-6 font-display text-sm font-semibold uppercase tracking-wide text-foreground/60 transition-colors duration-300 hover:text-foreground sm:w-52"
            >
              {tech}
            </span>
          ))}
        </Marquee>
      </section>

      {/* ============ TENTANG ============ */}
      <section className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[220px_1fr] lg:gap-20">
        <p className="eyebrow lg:pt-2">Tentang saya</p>
        <div className="min-w-0">
          <p className="max-w-3xl text-[clamp(1.25rem,2.4vw,2rem)] font-medium leading-[1.35] tracking-tight text-foreground">
            S1 Informatika{" "}
            <span className="text-accent-4">Cumlaude</span> yang terbiasa
            menangani masalah IT lapangan sekaligus{" "}
            <span className="text-accent-1">menulis kode</span> untuk produk
            digital.
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/70">
            {profileData.description}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                dt: "Pendidikan",
                dd: `${profileData.institution} · ${profileData.degree}`,
              },
              { dt: "IPK", dd: profileData.ipk },
              { dt: "Domisili", dd: profileData.location },
            ].map((f) => (
              <div key={f.dt} className="border-t border-line pt-4">
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.dt}
                </dt>
                <dd className="mt-2 text-sm text-foreground/85">{f.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ PENGALAMAN (auto steps) ============ */}
      <JourneySteps
        id="pengalaman"
        eyebrow="Pengalaman"
        title="Live dalam 4 langkah pengalaman."
        lead="Dari kompetisi nasional sampai magang IT di rumah sakit — setiap peran memiliki tanggung jawab yang jelas."
        items={journeyItems}
      />

      {/* ============ PROYEK ============ */}
      <section id="proyek" className="container-x scroll-mt-28 py-20 sm:py-28">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <p className="eyebrow mb-4">Proyek</p>
          <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
            Beberapa proyek yang sudah saya bangun.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            Implementasi sistem nyata — dari portal rumah sakit sampai
            pengelolaan stok berbasis QR Code.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projectDatas.map((project, i) => (
            <article
              key={project.id}
              className="group relative isolate flex min-h-[280px] flex-col overflow-hidden rounded-xl border border-line bg-card p-7 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-foreground/25 sm:p-9"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 blur-xl transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "radial-gradient(60% 55% at 0% 70%, rgb(150 170 120 / .4), transparent 70%), radial-gradient(55% 55% at 45% 105%, rgb(190 120 200 / .45), transparent 70%), radial-gradient(45% 60% at 100% 95%, rgb(187 231 181 / .4), transparent 70%), radial-gradient(40% 50% at 100% 40%, rgb(91 123 251 / .4), transparent 70%)",
                  opacity: "var(--card-blob-opacity)",
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--card)_22%,var(--card-fade)_50%,transparent_78%)]"
              />

              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {project.pub_year}
                </span>
              </div>

              <div className="mt-auto pt-10">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-4 backdrop-blur">
                  {project.tags?.[0]}
                </span>
                <h3 className="mt-4 text-xl font-semibold leading-snug">
                  {project.nameProject}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-foreground/65">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(project.techstack || []).slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-line px-2 py-0.5 font-mono text-[10px] text-foreground/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============ TYPOGRAPHIC BAND ============ */}
      <section className="overflow-hidden py-16 sm:py-24" aria-hidden="true">
        <Marquee duration={30}>
          <span className="flex items-center gap-8 pr-8 font-display text-[clamp(3rem,10vw,9rem)] font-semibold uppercase leading-[1.05] tracking-tight">
            dimah luthfi <span className="text-accent-1">✳</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_currentColor]">
              IT Support &amp; Programmer
            </span>
            <span className="text-accent-4">✣</span>
          </span>
        </Marquee>
      </section>

      {/* ============ SOROTAN ============ */}
      <HighlightSlider items={highlights} />

      {/* ============ CTA CARD ============ */}
      <section className="container-x py-12">
        <div className="relative isolate grid overflow-hidden rounded-xl border border-line lg:grid-cols-[1.3fr_1fr]">
          <div className="bg-card p-8 sm:p-12">
            <p className="eyebrow mb-5">Kontak</p>
            <h2 className="text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.1]">
              Cocok dengan posisi atau proyekmu? Mari bicarakan detailnya.
            </h2>
            <p className="mt-5 max-w-lg text-sm text-foreground/60">
              Saya terbuka untuk peluang IT Support, System Administration, dan
              pengembangan web — full-time, kontrak, atau proyek.
            </p>
            <div className="mt-9">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white shadow-[0_8px_30px_-8px_rgb(118_98_244/0.7)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgb(91_123_251/0.9)]"
              >
                <span>Mulai percakapan</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col justify-center gap-4 overflow-hidden bg-[#07061a] p-8 sm:p-12">
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 size-80 rounded-full bg-accent-1/40 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 left-0 size-72 rounded-full bg-accent-2/30 blur-[90px]"
            />
            {contactFacts.map((fact) => (
              <p
                key={fact}
                className="relative flex items-center gap-3 rounded-full border border-white/15 bg-black/40 px-5 py-3.5 font-mono text-xs text-white backdrop-blur sm:text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0 text-accent-2"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {fact}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORM KONTAK ============ */}
      <section id="kontak" className="container-x scroll-mt-28 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Ayo ngobrol</p>
            <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              Siap beralih dari perencanaan ke eksekusi?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/65">
              Ceritakan kebutuhan timmu — saya akan membalas dengan jujur soal
              apa yang bisa saya kerjakan dan kapan bisa mulai.
            </p>
            <div className="mt-8 flex items-center gap-3 font-mono text-xs text-muted-foreground">
              <span className="inline-block size-1.5 animate-pulse rounded-full bg-accent-4" />
              Tersedia untuk peluang baru
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
