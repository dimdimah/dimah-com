"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Mail, ArrowLeft, Command, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();
  const isSupabaseConfigured = Boolean(supabase);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Mohon isi email dan kata sandi.");
      return;
    }

    setLoading(true);

    if (!isSupabaseConfigured) {
      setTimeout(() => {
        setLoading(false);
        toast.info("Masuk dalam mode Demo (Supabase env belum diatur).", {
          description: "Silakan isi .env.local untuk menghubungkan database asli.",
        });
        router.push("/admin");
      }, 600);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Gagal masuk", {
          description: error.message || "Email atau kata sandi salah.",
        });
        setLoading(false);
        return;
      }

      toast.success("Berhasil masuk ke Studio!");
      router.push("/admin");
    } catch (err) {
      toast.error("Terjadi kesalahan sistem", {
        description: err.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 relative overflow-hidden bg-[#0c0c0e] text-[#ededed]">
      {/* Subtle refined ambient light (no harsh neon) */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-zinc-800/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Back to Site button */}
      <div className="absolute top-8 left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors duration-150"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Portofolio</span>
        </Link>
      </div>

      <div className="w-full max-w-[380px] z-10">
        {/* Brand / Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#17171c] border border-[#26262e] shadow-inner mb-3.5 text-zinc-200">
            <Command className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Dimah Studio CMS
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Kelola konten portofolio secara visual
          </p>
        </div>

        {/* Demo status alert if Supabase is not yet connected */}
        {!isSupabaseConfigured && (
          <div className="mb-5 p-3 rounded-xl border border-zinc-700/60 bg-zinc-900/50 text-zinc-300 text-xs leading-relaxed">
            <span className="font-medium text-white block mb-0.5">ℹ️ Mode Pratinjau Lokal</span>
            Kredensial Supabase di <code className="bg-black/40 px-1 py-0.5 rounded text-zinc-200">.env.local</code> belum diisi. Anda dapat langsung mengklik tombol masuk untuk mencoba antarmuka Studio.
          </div>
        )}

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="p-6 rounded-2xl bg-[#141418] border border-[#22222a] shadow-xl flex flex-col gap-4 backdrop-blur-xl"
        >
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Email Admin
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dimah.com"
                className="w-full bg-[#1a1a20] border border-[#282832] rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-150"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1a20] border border-[#282832] rounded-xl py-2 pl-9 pr-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all duration-150"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs transition-all duration-150 shadow-sm active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Masuk ke Studio</span>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-zinc-600 mt-6">
          Dimah Studio CMS • Built with Next.js 15
        </p>
      </div>
    </div>
  );
}
