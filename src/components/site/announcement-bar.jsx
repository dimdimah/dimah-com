import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-line bg-transparent">
      <div className="container-x flex h-9 items-center justify-center gap-3 font-mono text-[11px] text-muted-foreground sm:text-xs">
        <span className="hidden sm:inline">
          Terbuka untuk peluang IT Support / Programmer.
        </span>
        <Link
          href="/contact"
          className="text-foreground underline underline-offset-4 hover:text-accent-2 transition-colors"
        >
          Hubungi saya →
        </Link>
      </div>
    </div>
  );
}
