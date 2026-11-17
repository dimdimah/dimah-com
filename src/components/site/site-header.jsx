"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeSwitcher from "@/components/theme-switcher";

const NAV_ITEMS = [
  { href: "/#keahlian", label: "Keahlian" },
  { href: "/#proyek", label: "Proyek" },
  { href: "/#pengalaman", label: "Pengalaman" },
  { href: "/blog", label: "Blog" },
];

export default function SiteHeader({ cvUrl }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`transition-[padding] duration-500 ${
          scrolled ? "px-3 pt-3 sm:px-5" : "px-0 pt-0"
        }`}
      >
        <div
          className={`mx-auto flex items-center justify-between gap-6 transition-all duration-500 ${
            scrolled
              ? "h-14 max-w-6xl rounded-lg border border-line bg-bg/75 px-4 backdrop-blur-xl sm:px-5"
              : "h-20 max-w-[1400px] border border-transparent bg-transparent px-[clamp(16px,4vw,40px)]"
          }`}
        >
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-4 inline-block animate-pulse" />
            <span>dimah luthfi</span>
          </Link>

          <nav
            aria-label="Main"
            className="hidden items-center gap-0.5 whitespace-nowrap lg:flex"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <span className="mx-2 hidden h-4 w-px bg-line sm:block" />
            <ThemeSwitcher />
            <Link
              href={cvUrl}
              download="CV-D-Luthfi-Aulia-Rohman.pdf"
              className="ml-1.5 rounded-full px-3.5 py-2 text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              CV
            </Link>
            <Link
              href="/contact"
              className="group ml-2 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_-10px_rgb(118_98_244/0.7)]"
            >
              <span>Kontak Saya</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </nav>

          {/* Compact mobile actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <ThemeSwitcher />
            <Link
              href={cvUrl}
              download="CV-D-Luthfi-Aulia-Rohman.pdf"
              className="rounded-full border border-line px-3 py-2 text-[12px] font-medium text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              CV
            </Link>
            <Link
              href="/contact"
              className="rounded-full bg-brand px-3.5 py-2 text-[12px] font-semibold text-white"
            >
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
