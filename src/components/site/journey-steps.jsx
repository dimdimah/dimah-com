"use client";

import { useEffect, useState } from "react";

const STEP_MS = 5200;

/**
 * easternboss "proses" pattern: auto-advancing step accordion with
 * STEP 01/04 counter and step-fill progress bar (5.2s per step).
 */
export default function JourneySteps({ id, eyebrow, title, lead, items }) {
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(
      () => setActive((a) => (a + 1) % items.length),
      STEP_MS
    );
    return () => clearTimeout(t);
  }, [active, reduced, items.length]);

  const item = items[active];

  return (
    <section id={id} className="container-x scroll-mt-28 py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-sm leading-relaxed text-foreground/65">
            {lead}
          </p>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left: step list */}
        <ol className="flex flex-col gap-2">
          {items.map((it, i) => {
            const isActive = i === active;
            return (
              <li key={it.title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full rounded-xl border px-5 py-4 text-left transition-colors duration-300 ${
                    isActive
                      ? "border-foreground/25 bg-card"
                      : "border-line bg-transparent hover:bg-card/60"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? "text-accent-1" : "text-muted-foreground"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-foreground" : "text-foreground/75"
                      }`}
                    >
                      {it.title}
                    </span>
                  </span>
                  <span
                    className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="overflow-hidden">
                      <span className="mt-2 block pl-7 text-xs leading-relaxed text-foreground/65">
                        {it.description}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Right: visual panel */}
        <div className="relative isolate flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-line bg-card p-7 sm:p-9">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-80 rounded-full bg-accent-1/40 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 left-0 size-72 rounded-full bg-accent-2/30 blur-[90px]"
          />

          <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>
              Step{" "}
              <span className="text-foreground">
                {String(active + 1).padStart(2, "0")}
              </span>{" "}
              / {String(items.length).padStart(2, "0")}
            </span>
            <span className="text-accent-4">{item.kicker || "Live"}</span>
          </div>

          {/* Progress bar */}
          <div className="relative mt-3 h-0.5 w-full overflow-hidden rounded-full bg-line">
            <span
              key={active}
              className="absolute inset-0 origin-left bg-brand motion-safe:animate-[step-fill_var(--step)_linear_forwards]"
              style={{ "--step": `${STEP_MS}ms` }}
            />
          </div>

          <div
            key={active}
            className="relative mt-auto pt-8 motion-safe:animate-[step-in_0.6s_ease-out]"
          >
            <span
              aria-hidden="true"
              className="absolute -bottom-6 right-0 select-none font-display text-[clamp(6rem,14vw,11rem)] font-semibold leading-none text-transparent [-webkit-text-stroke:1.5px_var(--line)]"
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <p className="eyebrow mb-3">{item.kicker || "Tahap"}</p>
            <h3 className="relative max-w-[20ch] text-2xl font-semibold leading-tight">
              {item.heading || item.title}
            </h3>
            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
              {item.panelText || item.description}
            </p>
            {item.tags?.length ? (
              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/70 backdrop-blur"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
