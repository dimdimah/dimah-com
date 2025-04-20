import Link from "next/link";
import { FileX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container sm:w-[725px] leading-relaxed antialiased pb-20">
      <div className="flex flex-col items-center justify-center min-h-[675px] text-center">
        <FileX size={80} />
        <h1 className="text-4xl font-bold mb-6">Page Not Found</h1>
        <p className="text-foreground/70 mb-8">
          This page is not found. back to{" "}
          <Link href={"/"} className="hover:text-lime-700">
            Home
          </Link>
        </p>
      </div>
    </main>
  );
}
