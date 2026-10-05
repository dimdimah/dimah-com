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
    <div>
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground mb-8 transition-colors group"
      >
        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
        <span>Kembali ke Beranda</span>
      </Link>

      <p className="text-xs uppercase font-mono tracking-wider text-foreground/40 mb-3">
        {exp.type}
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground leading-snug">
        {exp.institution}
      </h1>
      <div className="flex flex-row flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-foreground/60 font-medium">
        <span>{exp.position}</span>
        <span className="w-1 h-1 rounded-full bg-foreground/30" />
        <span className="font-mono text-foreground/45">{exp.duration}</span>
      </div>

      {/* Responsibilities */}
      {exp.responsibilities && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-foreground/90 tracking-tight mb-3">
            Responsibilities & Scope
          </h2>
          <ul className="space-y-2.5">
            {exp.responsibilities.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-foreground/75 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Tools & Tech */}
      {exp.tools && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-foreground/90 tracking-tight mb-3">
            Tools & Technologies
          </h2>
          <div className="flex flex-row flex-wrap gap-1.5">
            {exp.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {exp.achievements && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold text-foreground/90 tracking-tight mb-3">
            Key Achievements
          </h2>
          <ul className="space-y-2.5">
            {exp.achievements.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-xs text-foreground/75 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Page;
