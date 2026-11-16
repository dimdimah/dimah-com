import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { experienceData } from "@/data/home";

export async function generateStaticParams() {
  return experienceData.map((exp) => ({
    id: exp.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const exp = experienceData.find((item) => item.id === id);
  if (!exp) return { title: "Experience Not Found" };
  return {
    title: `${exp.institution} — ${exp.position}`,
    description: `${exp.position} at ${exp.institution}`,
  };
}

const Page = async ({ params }) => {
  const { id } = await params;
  const exp = experienceData.find((item) => item.id === id);

  if (!exp) {
    notFound();
  }

  return (
    <article>
      {/* Back button */}
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Kembali ke Beranda</span>
      </Link>

      <span className="inline-flex items-center rounded-full border border-line bg-card px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-accent-4">
        {exp.type}
      </span>
      <h1 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-tight tracking-tight text-foreground">
        {exp.institution}
      </h1>
      <div className="mt-3 flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/65">
        <span>{exp.position}</span>
        <span className="w-1 h-1 rounded-full bg-line" />
        <span className="font-mono text-muted-foreground">{exp.duration}</span>
      </div>

      {/* Responsibilities */}
      {exp.responsibilities && (
        <div className="mt-10 border-t border-line pt-6">
          <p className="eyebrow mb-4">Responsibilities &amp; Scope</p>
          <ul className="space-y-2.5">
            {exp.responsibilities.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-xs text-foreground/75 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-1 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools & Tech */}
      {exp.tools && (
        <div className="mt-10 border-t border-line pt-6">
          <p className="eyebrow mb-4">Tools &amp; Technologies</p>
          <div className="flex flex-row flex-wrap gap-1.5">
            {exp.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md border border-line bg-card text-foreground/75"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {exp.achievements && (
        <div className="mt-10 border-t border-line pt-6">
          <p className="eyebrow mb-4">Key Achievements</p>
          <ul className="space-y-2.5">
            {exp.achievements.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-xs text-foreground/75 leading-relaxed"
              >
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-4 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="mt-12 rounded-xl border border-line bg-card p-7">
        <p className="text-sm font-semibold text-foreground">
          Butuh peran seperti ini di timmu?
        </p>
        <p className="mt-1.5 text-xs text-foreground/65">
          Saya terbuka untuk peluang IT Support, Sysadmin, dan pengembangan web.
        </p>
        <Link
          href="/contact"
          className="group mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-[13px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-8px_rgb(91_123_251/0.9)]"
        >
          <span>Diskusikan peluangnya</span>
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
};

export default Page;
