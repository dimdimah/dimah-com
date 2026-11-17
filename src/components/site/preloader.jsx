"use client";

import { useEffect, useState } from "react";

/**
 * easternboss-style preloader: counter 0→100, gradient fill, fade out.
 * Hidden automatically for prefers-reduced-motion (CSS) and unmounted after done.
 */
export default function Preloader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setGone(true);
      return;
    }
    const t = setTimeout(() => setGone(true), 2400);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader pointer-events-none fixed inset-0 z-[100] flex items-end justify-between bg-black p-5 sm:p-10"
    >
      <p className="select-none font-display text-[18vw] font-semibold leading-[0.8] tracking-tighter text-white/[0.05]">
        dimah
      </p>
      <div className="relative flex h-56 w-36 shrink-0 flex-col justify-between overflow-hidden rounded-xl border border-white/15 p-3 sm:h-72 sm:w-44">
        <div className="preloader-fill absolute inset-0 bg-gradient-to-t from-accent-1/80 via-accent-2/40 to-accent-4/10" />
        <span className="preloader-count relative font-display text-3xl font-semibold" />
        <span className="relative font-mono text-[10px] tracking-widest text-white/80">
          LOADING…
        </span>
      </div>
    </div>
  );
}
