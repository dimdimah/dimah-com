import React from "react";
import Link from "next/link";

export default function RoleFilter({ experienceData = [], projectDatas = [] }) {
  return (
    <>
      {/* Work Experience */}
      {experienceData.length > 0 && (
        <>
          <p className="font-semibold text-foreground/90 tracking-tight mt-1">Work Experience</p>
          <div className="mt-3 flex flex-col gap-1">
            {experienceData.map((exp, index) => (
              <Link
                key={index}
                href={`/experiences/${exp.id}`}
                className="block py-2.5 px-3 rounded-lg -mx-3 hover:bg-zinc-100 dark:hover:bg-zinc-800/40 transition-colors group"
              >
                <div className="flex flex-row justify-between items-baseline">
                  <span className="font-medium text-sm text-foreground/90 group-hover:text-foreground">
                    {exp.institution}
                  </span>
                  <span className="text-xs text-foreground/45 font-mono">{exp.duration}</span>
                </div>
                <h2 className="text-xs text-foreground/65 mt-0.5">{exp.position}</h2>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Projects */}
      {projectDatas.length > 0 && (
        <>
          <p className="font-semibold text-foreground/90 tracking-tight mt-10">Featured Projects</p>
          <div className="mt-4 grid md:grid-cols-2 gap-5">
            {projectDatas.map((project, index) => (
              <Link
                key={index}
                href={project.url || project.links?.[0]?.url || "/"}
                target="_blank"
                className="group relative bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 rounded-xl p-3.5 transition-all duration-150"
              >
                <div className="aspect-[16/9] w-full rounded-lg border border-zinc-200/50 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/40 flex items-center justify-center overflow-hidden">
                  <span className="text-foreground/30 text-xs font-mono font-medium tracking-wider uppercase">
                    {project.nameProject || project.title}
                  </span>
                </div>
                <div className="mt-3.5 flex flex-row items-baseline justify-between w-full">
                  <p className="font-medium text-sm text-foreground/90 group-hover:text-foreground">
                    {project.nameProject || project.title}
                  </p>
                  <p className="text-xs text-foreground/45 font-mono">{project.pub_year || project.metrics}</p>
                </div>
                <h2 className="text-xs text-foreground/60 mt-1 line-clamp-2 leading-relaxed">
                  {project.tagline || project.description}
                </h2>
                <div className="flex flex-row flex-wrap gap-1.5 text-xs mt-3">
                  {(project.techstack || project.tags || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {experienceData.length === 0 && projectDatas.length === 0 && (
        <p className="text-foreground/40 mt-10 text-xs text-center font-mono">
          Tidak ada pengalaman atau proyek yang tersedia.
        </p>
      )}
    </>
  );
}
