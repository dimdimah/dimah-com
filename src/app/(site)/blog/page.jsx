import { Construction } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="leading-relaxed antialiased">
      <div className="flex flex-col items-center justify-center text-center h-[650px]">
        <Construction size={90} />
        <h1 className="text-4xl font-bold mb-6">Under Development</h1>
        <p className="text-foreground/70 mb-8">
          This page is under development. Please come back later!
        </p>
      </div>
    </div>
  );
}
