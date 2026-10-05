import Link from "next/link";
import { MapPin } from "lucide-react";
import { getCmsData } from "@/app/actions/cms";
import RoleFilter from "@/components/roleFilter";

export const metadata = {
  title: "D. Luthfi Aulia Rohman — IT Support & Programmer",
  description: "Portofolio teknis D. Luthfi Aulia Rohman — Lulusan S1 Informatika (IPK 3,73 / Cumlaude) berpengalaman di IT Rumah Sakit, troubleshooting hardware/jaringan, serta web development.",
};

export default async function HomePage() {
  const {
    profile: profileData,
    educations: educationData,
    experiences: experienceData,
    projects: projectDatas,
    skills: skillsData,
  } = await getCmsData();
  return (
    <div className="space-y-12">
      {/* 1. HERO SECTION (Caveman Technical Spec Style) */}
      <section className="border-b border-zinc-200/80 dark:border-zinc-800/80 pb-12">
        <h1 className="text-[32px] sm:text-[42px] font-bold tracking-[-0.02em] text-foreground leading-[1.12]">
          {profileData.name}
        </h1>


        <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-xs text-foreground/65">
          <span>{profileData.position}</span>
          <span className="text-foreground/30">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            {profileData.location || "Jatinom, Klaten, Indonesia"}
          </span>
        </div>


        <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-foreground/75">
          {profileData.description}
        </p>

        {/* Technical Terminal Spec Box (ala Caveman Command Bar) */}
        <div className="mt-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-900/60 p-3.5 font-mono text-xs text-foreground/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-emerald-500 font-bold">$</span>
              <span className="text-foreground/90 font-medium">availability --status</span>
              <span className="text-foreground/35 hidden sm:inline">→</span>
            </div>
            <div className="flex items-center gap-1.5 pl-4 sm:pl-0">
              <span className="text-foreground/35 sm:hidden">↳</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px] sm:text-xs">
                {profileData.position}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-[11px] text-foreground/50 pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60 dark:border-zinc-800/60">
            <span>{profileData.institution || "Amikom"} · IPK {profileData.ipk?.split(" ")[0] || "3,73"}</span>
            <span>•</span>
            <a
              href={profileData.cv_url || profileData.links?.find((l) => l.text === "CV")?.url || "/admin.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:opacity-75 transition-opacity"
            >
              download cv (pdf)
            </a>
          </div>
        </div>

        {/* Two Highlight Spec Boxes — generated from first two skill categories */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillsData.slice(0, 2).map((cat) => (
            <div key={cat.category} className="rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 p-4">
              <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                {cat.category}
              </p>
              <p className="mt-2.5 text-xs text-foreground/75 leading-relaxed">
                {cat.skills.slice(0, 4).join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. DIRECTORY INDEX HEADER (ala Caveman "Explore the reference") */}
      <section className="space-y-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            structured index
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.02em] text-foreground">
            Explore the reference
          </h2>
          <p className="mt-1 text-xs text-foreground/60 leading-relaxed">
            Riwayat pengalaman kerja, proyek implementasi sistem, dan kualifikasi akademik terverifikasi.
          </p>
        </div>

        {/* Section 01: Work Experience & Projects */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400 font-semibold">
              01
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Work Experiences & Projects
            </span>
          </div>

          <RoleFilter
            experienceData={experienceData}
            projectDatas={projectDatas}
          />
        </div>

        {/* Section 02: Education & Credentials */}
        <div className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-6">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400 font-semibold">
              02
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Education & Academic Credentials
            </span>
            <span className="text-xs text-foreground/45 ml-auto font-mono hidden sm:inline">
              formal degree · sarjana komputer (s.kom.)
            </span>
          </div>

          <div className="space-y-3 mt-3">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex flex-row justify-between items-baseline">
                  <span className="font-semibold text-sm text-foreground">
                    {edu.institution}
                  </span>
                  <span className="text-xs text-foreground/50 font-mono">
                    {edu.duration}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  {edu.description}
                </p>
                {edu.focus ? (
                  <p className="text-xs text-foreground/70 mt-1 leading-relaxed">
                    {edu.focus}
                  </p>
                ) : null}
                {edu.thesis ? (
                  <p className="text-xs text-foreground/60 mt-1.5 font-mono bg-zinc-100/60 dark:bg-zinc-900/60 p-2 rounded border border-zinc-200/50 dark:border-zinc-800">
                    {edu.thesis}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAVE-STYLE FOOTER */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 pt-8 mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
        <div>
          <span>{profileData.name?.toLowerCase()} · {profileData.location?.toLowerCase()}</span>
        </div>
        <div className="flex items-center gap-4">
          {profileData.email && (
            <Link
              href={`mailto:${profileData.email}`}
              className="hover:text-foreground transition-colors"
            >
              {profileData.email}
            </Link>
          )}
          {profileData.phone && (
            <Link
              href={`https://wa.me/${profileData.phone.replace(/[^0-9]/g, "").replace(/^0/, "62")}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {profileData.phone}
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
