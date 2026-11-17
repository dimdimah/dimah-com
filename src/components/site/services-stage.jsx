"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";

/**
 * Pinned horizontal card stage (easternboss "stage-services"):
 * section is N*110svh tall, inner sticky h-100dvh, the <ol> translates
 * horizontally based on scroll progress through the section.
 */
export default function ServicesStage({ id, eyebrow, title, lead, items }) {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      setIndex(p * (items.length - 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  const activeIndex = Math.round(index);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative z-10"
      style={{ height: `${items.length * 110}svh` }}
    >
      <div className="sticky top-0 flex h-[100dvh] flex-col overflow-hidden pb-6 pt-24 lg:pb-8 lg:pt-28">
        <div className="container-x grid flex-1 lg:grid-cols-2">
          <div className="hidden lg:block" />
          <div className="flex min-w-0 flex-col">
            <p className="eyebrow mb-4">{eyebrow}</p>
            <h2 className="max-w-[18ch] text-[clamp(1.8rem,3.6vw,2.8rem)] leading-[1.08]">
              {title}
            </h2>
            <p className="mt-4 hidden max-w-md text-sm leading-relaxed text-foreground/70 sm:block">
              {lead}
            </p>

            <div className="min-h-[120px] flex-1 lg:hidden" />

            <div className="[--card:80vw] sm:[--card:320px] lg:mt-auto">
              <ol
                className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]"
                style={{
                  transform: `translateX(calc(${-index} * (var(--card) + 1rem)))`,
                }}
              >
                {items.map((item, i) => (
                  <li
                    key={item.title}
                    className="w-[var(--card)] shrink-0 transition-[opacity,transform] duration-700"
                    style={{
                      opacity: i === activeIndex ? 1 : 0.4,
                      transform:
                        i === activeIndex ? "translateY(0)" : "translateY(8px)",
                    }}
                  >
                    <TiltCard item={item} index={i} />
                  </li>
                ))}
              </ol>
            </div>

            {/* Step indicator */}
            <div className="mt-6 flex items-center gap-4">
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-line">
                <div
                  className="h-px origin-left bg-brand transition-transform duration-700"
                  style={{
                    transform: `scaleX(${
                      items.length > 1 ? index / (items.length - 1) : 1
                    })`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TiltCard({ item, index }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className="group relative isolate flex h-[clamp(245px,40dvh,410px)] flex-col overflow-hidden rounded-xl border border-line bg-card p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-foreground/25 sm:p-7"
      style={{ "--mx": "50%", "--my": "80%" }}
    >
      {/* Hover glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 -z-10 blur-xl transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 0% 70%, rgb(150 170 120 / .55), transparent 70%), radial-gradient(55% 55% at 45% 105%, rgb(190 120 200 / .6), transparent 70%), radial-gradient(45% 60% at 100% 95%, rgb(187 231 181 / .5), transparent 70%), radial-gradient(40% 50% at 100% 40%, rgb(91 123 251 / .45), transparent 70%)",
          opacity: "var(--card-blob-opacity)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--card)_22%,var(--card-fade)_50%,transparent_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx) var(--my), var(--card-hover-glow), transparent 60%)",
        }}
      />

      <span className="flex items-start justify-between">
        <Icon
          name={item.icon}
          className="size-12 text-foreground/70 transition-colors duration-500 group-hover:text-accent-4"
        />
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </span>

      <span className="mt-auto block text-2xl font-semibold leading-tight">
        {item.title}
      </span>
      <span className="mt-2 block text-xs leading-relaxed text-foreground/65">
        {item.description}
      </span>
    </div>
  );
}
