import Link from "next/link";
import ThemeSwitcher from "@/components/theme-switcher";
import { getCmsData } from "@/app/actions/cms";

export default async function SiteLayout({ children }) {
  const { profile } = await getCmsData();
  const cvUrl =
    profile?.cv_url ||
    profile?.links?.find((l) => l.text === "CV")?.url ||
    "/admin.pdf";

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-foreground antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* Caveman-style Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-[#fafafa]/90 dark:bg-[#09090b]/90 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-[800px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>dimah luthfi</span>
            </Link>
            <span className="text-[11px] font-mono text-foreground/40 hidden sm:inline">
              / portfolio
            </span>
          </div>

          <nav className="flex items-center gap-2.5 sm:gap-4 text-xs font-medium">
            <Link
              href="/"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              overview
            </Link>
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              contact
            </Link>
            <Link
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              cv
            </Link>
            <div className="h-3 w-px bg-zinc-300 dark:bg-zinc-800" />
            <ThemeSwitcher />
          </nav>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="mx-auto max-w-[800px] px-4 sm:px-6 pb-28 pt-8 sm:pt-12">
        {children}
      </main>
    </div>
  );
}
