"use client";

import { useState } from "react";

/**
 * Testimonial-slider structure (easternboss) repurposed for verified
 * career highlights — no invented quotes, only facts from data/home.js.
 */
export default function HighlightSlider({ items }) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  const item = items[index];

  return (
    <section className="container-x py-20 sm:py-28">
      <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
        <p className="eyebrow mb-4">Sorotan</p>
        <h2 className="text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
          Pencapaian yang bisa saya pertanggungjawabkan
        </h2>
      </div>

      <figure
        aria-live="polite"
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <span
          aria-hidden="true"
          className="font-display text-6xl leading-none text-accent-1"
        >
          “
        </span>
        <blockquote
          key={index}
          className="mt-2 text-lg leading-relaxed text-foreground/85 motion-safe:animate-[step-in_0.6s_ease-out]"
        >
          {item.quote}
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-white">
            {item.initials}
          </span>
          <span className="text-left">
            <span className="block text-sm font-semibold text-foreground">
              {item.author}
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              {item.role}
            </span>
          </span>
        </figcaption>
      </figure>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Sorotan sebelumnya"
          className="grid size-9 place-items-center rounded-full border border-line text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          ←
        </button>
        <div className="flex items-center gap-2">
          {items.map((it, i) => (
            <button
              key={it.author + i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${it.author}, ${i + 1} / ${items.length}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-accent-1" : "w-1.5 bg-line"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Sorotan berikutnya"
          className="grid size-9 place-items-center rounded-full border border-line text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          →
        </button>
      </div>
    </section>
  );
}
