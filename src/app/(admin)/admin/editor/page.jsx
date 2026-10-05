"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ExternalLink,
  GitBranch,
  Globe,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  User,
  Briefcase,
  FolderGit2,
  GraduationCap,
  FileText,
  Mail,
  Sliders,
  Monitor,
  Tablet,
  Smartphone,
  Info,
  CheckCircle2,
  ChevronDown,
  ArrowUpRight,
  Maximize2,
  Upload,
  Check,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { getCmsData, saveCmsData } from "@/app/actions/cms";
import { createClient } from "@/lib/supabase/client";

import {
  profileData as initialProfile,
  educationData as initialEducation,
  experienceData as initialExperience,
  projectDatas as initialProjects,
  skillsData as initialSkills,
} from "@/data/home";

function VercelSplitEditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get("section");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Sections on the Right Editor: general | experiences | projects | education | blog | inbox
  const [activeSection, setActiveSection] = useState(sectionParam || "general");
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const sectionDropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sectionDropdownRef.current && !sectionDropdownRef.current.contains(event.target)) {
        setIsSectionMenuOpen(false);
      }
    }
    if (isSectionMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSectionMenuOpen]);

  const [isSaved, setIsSaved] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Left Canvas Controls
  const [viewport, setViewport] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);
  const cvFileInputRef = useRef(null);
  const [isUploadingCv, setIsUploadingCv] = useState(false);

  // Live Editable CMS States
  const [profile, setProfile] = useState(initialProfile);
  const [educations, setEducations] = useState(initialEducation);
  const [experiences, setExperiences] = useState(initialExperience);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [posts, setPosts] = useState([
    {
      id: "1",
      slug: "membangun-portfolio-cms-framer",
      title: "Membangun Headless Visual CMS dengan Gaya Framer",
      excerpt: "Cara merancang admin studio 3-panel interaktif di Next.js App Router.",
      content: "Dokumentasi perjalanan arsitektur website dimah-com menjadi CMS...",
      is_published: true,
      published_at: "2026-10-01",
    },
  ]);
  const [inbox, setInbox] = useState([
    {
      id: "1",
      name: "HR Recruiter",
      email: "recruiter@techcorp.id",
      message: "Halo Dimah, kami tertarik dengan portofolio IT Support Anda. Boleh jadwalkan interview?",
      created_at: "1 jam lalu",
      is_read: false,
    },
  ]);

  // Load real data from Supabase
  useEffect(() => {
    getCmsData()
      .then((data) => {
        if (data) {
          if (data.profile) setProfile(data.profile);
          if (data.educations?.length) setEducations(data.educations);
          if (data.experiences?.length) setExperiences(data.experiences);
          if (data.projects?.length) setProjects(data.projects);
          if (data.skills?.length) setSkills(data.skills);
          if (data.posts?.length) setPosts(data.posts);
          if (data.inbox?.length) setInbox(data.inbox);
        }
      })
      .catch((err) => {
        console.error("Gagal memuat data dari Supabase:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const markUnsaved = () => {
    setIsSaved(false);
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    try {
      setIsUploadingCv(true);
      const currentCvUrl =
        profile.cv_url ||
        profile.links?.find((l) => l.text === "CV")?.url ||
        "";
      const formData = new FormData();
      formData.append("file", file);
      if (currentCvUrl) {
        formData.append("oldUrl", currentCvUrl);
      }

      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Gagal mengunggah berkas");
      }

      const newUrl = data.url;
      const links = profile.links || [];
      const hasCv = links.some((l) => l.text === "CV");
      const updatedLinks = hasCv
        ? links.map((l) => (l.text === "CV" ? { ...l, url: newUrl } : l))
        : [...links, { text: "CV", url: newUrl }];

      setProfile({
        ...profile,
        cv_url: newUrl,
        links: updatedLinks,
      });
      markUnsaved();
      toast.success(`CV berhasil diunggah (${data.fileName})`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Gagal mengunggah file CV");
    } finally {
      setIsUploadingCv(false);
      if (cvFileInputRef.current) cvFileInputRef.current.value = "";
    }
  };

  // Keyboard shortcut Ctrl+S (Save) & Ctrl+Enter (Publish)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSave();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handlePublish();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [profile, educations, skills, experiences, projects, posts]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveCmsData({ profile, educations, skills, experiences, projects, posts });
      setIsSaved(true);
      // Reload iframe preview to reflect updated server data
      setIframeKey((prev) => prev + 1);
      toast.success("Tersimpan ke Supabase Database", {
        description: "Data tabel telah diperbarui.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal menyimpan ke database", {
        description: err.message || "Periksa koneksi Supabase Anda.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsSaving(true);
    try {
      await saveCmsData({ profile, educations, skills, experiences, projects, posts });
      setIsSaved(true);
      setIframeKey((prev) => prev + 1);
      toast.success("Berhasil mempublikasikan ke Live!", {
        description: "Halaman publik website telah disinkronkan.",
      });
    } catch (err) {
      console.error(err);
      toast.error("Gagal mempublikasikan", {
        description: err.message || "Periksa koneksi Supabase Anda.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
      toast.success("Berhasil keluar dari Studio");
      router.push("/admin/login");
    } catch (err) {
      console.error("Gagal logout:", err);
      router.push("/admin/login");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      institution: "Institusi Baru",
      position: "IT Support Specialist",
      duration: "Present",
      type: "Work",
      tags: ["it-support"],
      responsibilities: ["Melakukan pemeliharaan sistem dan troubleshooting pengguna."],
      tools: ["Hardware PC", "Windows"],
      achievements: ["Menyelesaikan tugas operasional tepat waktu."],
      url: "/",
    };
    setExperiences([newExp, ...experiences]);
    markUnsaved();
    toast.success("Pengalaman kerja ditambahkan");
  };

  const handleAddProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: "Implementasi Sistem Baru",
      role_tag: "Full-Stack Dev",
      description: "Deskripsi singkat dan metrik pencapaian sistem.",
      metrics: "2026",
      tags: ["Next.js", "Tailwind CSS"],
      links: [{ text: "Detail", url: "/" }],
    };
    setProjects([newProj, ...projects]);
    markUnsaved();
    toast.success("Proyek baru ditambahkan");
  };

  const sections = [
    {
      id: "general",
      label: "General",
      description: "Profil, bio, domisili & kontak",
      icon: User,
    },
    {
      id: "experiences",
      label: "Experiences",
      description: "Riwayat pekerjaan & magang",
      icon: Briefcase,
      count: experiences.length,
    },
    {
      id: "projects",
      label: "Projects",
      description: "Portofolio & karya sistem",
      icon: FolderGit2,
      count: projects.length,
    },
    {
      id: "education",
      label: "Education",
      description: "Pendidikan formal, gelar & IPK",
      icon: GraduationCap,
      count: educations.length,
    },
    {
      id: "blog",
      label: "Blog",
      description: "Artikel & publikasi teknis",
      icon: FileText,
      count: posts.length,
    },
    {
      id: "inbox",
      label: "Inbox",
      description: "Pesan kontak dari rekruter",
      icon: Mail,
      count: inbox.length,
    },
  ];

  const currentSection = sections.find((s) => s.id === activeSection) || sections[0];
  const CurrentSectionIcon = currentSection.icon;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#000000] text-[#ededed] font-sans antialiased selection:bg-white selection:text-black">
      {/* 1. TOP GLOBAL BAR (Vercel-inspired Dimah Studio) */}
      <header className="h-12 border-b border-[#1f1f1f] bg-[#000000] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity text-white group"
            title="Buka Website Publik (Live)"
          >
            {/* Vercel Triangle */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 76 65"
              fill="none"
              className="text-white group-hover:scale-105 transition-transform"
            >
              <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="currentColor" />
            </svg>
            <span className="text-xs text-[#555555]">/</span>
            <span className="text-xs text-[#888888] font-mono">dimdimah</span>
            <span className="text-xs text-[#555555]">/</span>
            <span className="text-xs font-semibold text-white">Studio Editor</span>
          </Link>

          {/* Vercel Green Status Indicator */}
          <div className="ml-3 hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[#222222] bg-[#0c0c0c] text-[11px] text-[#888888]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSaved ? "bg-[#00e599]" : "bg-amber-400 animate-pulse"
              }`}
            />
            <span className="font-mono text-[10px]">
              {isSaved ? "Production (Synced)" : "Draft Belum Terbit"}
            </span>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#262626] bg-[#0a0a0a] hover:bg-[#141414] hover:border-[#383838] text-xs text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#888888]" />
            <span className="hidden sm:inline">Visit Live</span>
          </Link>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#262626] bg-[#0f0f0f] hover:bg-[#181818] text-xs text-[#cccccc] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
            title="Simpan perubahan ke Supabase (Ctrl+S)"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            <span>Save Draft</span>
            <kbd className="hidden md:inline-block text-[9px] font-mono text-[#666666]">Ctrl+S</kbd>
          </button>

          {/* Vercel Pure White Publish Button */}
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-medium transition-colors shadow-sm cursor-pointer disabled:opacity-60 active:scale-95"
            title="Publish ke website publik (Ctrl+Enter)"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 text-black" />
            )}
            <span>{isSaving ? "Publishing..." : "Publish to Live"}</span>
            <kbd className="hidden lg:inline-block text-[9px] bg-black/10 text-black px-1 py-0.2 rounded font-mono">
              Ctrl+↵
            </kbd>
          </button>

          {/* Subtle Divider */}
          <div className="h-4 w-px bg-[#262626] mx-0.5" />

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#262626] bg-[#0a0a0a] hover:bg-red-950/30 hover:border-red-800/40 text-xs text-[#888888] hover:text-red-400 transition-colors cursor-pointer disabled:opacity-50"
            title="Keluar dari Admin Studio"
          >
            {isLoggingOut ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <LogOut className="w-3.5 h-3.5" />
            )}
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN SPLIT-SCREEN WORKSPACE */}
      <div className="flex flex-1 overflow-hidden">
        {/* ========================================================= */}
        {/* LEFT PANE: LIVE CANVAS SIMULATION (Vercel Style) */}
        {/* ========================================================= */}
        <section className="flex-1 bg-[#050505] flex flex-col border-r border-[#1f1f1f] overflow-hidden min-w-0">
          {/* Canvas Browser Header Bar */}
          <div className="h-10 border-b border-[#1f1f1f] bg-[#0a0a0a] px-3 flex items-center justify-between shrink-0">
            {/* Left: Simulated URL Bar */}
            <div className="flex items-center gap-2 max-w-[280px] sm:max-w-md w-full">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#000000] border border-[#222222] text-xs font-mono text-[#888888] w-full truncate">
                <Globe className="w-3 h-3 text-[#00e599] shrink-0" />
                <span className="text-white text-[11px] truncate">https://dimah.vercel.app</span>
              </div>
              <button
                onClick={() => setIframeKey((prev) => prev + 1)}
                className="p-1.5 rounded hover:bg-[#1a1a1a] text-[#737373] hover:text-white transition-colors cursor-pointer shrink-0"
                title="Reload preview"
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            </div>

            {/* Right: Viewport Device Switcher */}
            <div className="flex items-center gap-1 bg-[#121212] border border-[#222222] p-0.5 rounded-md shrink-0">
              <button
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  viewport === "desktop"
                    ? "bg-[#222222] text-white font-medium shadow-sm"
                    : "text-[#737373] hover:text-white"
                }`}
                title="Desktop 1200px"
              >
                <Monitor className="w-3 h-3" />
                <span className="hidden md:inline">Desktop</span>
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  viewport === "tablet"
                    ? "bg-[#222222] text-white font-medium shadow-sm"
                    : "text-[#737373] hover:text-white"
                }`}
                title="Tablet 768px"
              >
                <Tablet className="w-3 h-3" />
                <span className="hidden md:inline">Tablet</span>
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                  viewport === "mobile"
                    ? "bg-[#222222] text-white font-medium shadow-sm"
                    : "text-[#737373] hover:text-white"
                }`}
                title="Mobile 390px"
              >
                <Smartphone className="w-3 h-3" />
                <span className="hidden md:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Canvas Preview Area */}
          <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-[#070707] relative">
            <div
              className={`transition-all duration-200 border border-[#222222] rounded-xl overflow-hidden shadow-2xl bg-[#0c0c0e] h-full ${
                viewport === "desktop"
                  ? "w-full max-w-5xl"
                  : viewport === "tablet"
                  ? "w-[768px]"
                  : "w-[390px]"
              }`}
            >
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src="/"
                title="Live Website Canvas Preview"
                className="w-full h-full border-none bg-background"
              />
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* RIGHT PANE: VERCEL EDITOR & SETTINGS (Fixed Width) */}
        {/* ========================================================= */}
        <aside className="w-[460px] lg:w-[520px] bg-[#000000] flex flex-col h-full overflow-hidden shrink-0">
          {/* Section Navigation Dropdown Switcher (Option 2 - Minimalist & Zero-Slide) */}
          <div className="border-b border-[#1f1f1f] bg-[#0a0a0a] px-3.5 py-2.5 shrink-0 flex items-center justify-between relative z-20">
            {/* Dropdown Button & Popover */}
            <div className="relative" ref={sectionDropdownRef}>
              <button
                type="button"
                onClick={() => setIsSectionMenuOpen((prev) => !prev)}
                className="w-[230px] flex items-center justify-between px-3 py-1.5 rounded-lg border border-[#2b2b2b] bg-[#121212] hover:bg-[#191919] hover:border-[#3a3a3a] text-white text-xs font-medium transition-colors shadow-xs cursor-pointer group select-none"
                aria-expanded={isSectionMenuOpen}
                aria-haspopup="true"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-md bg-[#1e1e1e] group-hover:bg-[#282828] flex items-center justify-center text-[#aaaaaa] group-hover:text-white transition-colors shrink-0">
                    <CurrentSectionIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[#737373] text-[11px] font-normal shrink-0">Section:</span>
                    <span className="font-semibold text-white tracking-tight truncate">{currentSection.label}</span>
                    {currentSection.count !== undefined && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-[#1c1c1c] text-[#8e8e93] border border-[#2e2e2e] shrink-0">
                        {currentSection.count}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#737373] group-hover:text-white transition-transform duration-200 shrink-0 ml-1.5 ${
                    isSectionMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Popover Dropdown Menu */}
              {isSectionMenuOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-[#282828] bg-[#0c0c0e] shadow-2xl p-1.5 z-50 backdrop-blur-md animate-in fade-in-0 zoom-in-95 duration-100">
                  <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#666666] border-b border-[#1c1c1e] mb-1">
                    Select Section to Edit
                  </div>
                  <div className="space-y-0.5">
                    {sections.map((sec) => {
                      const Icon = sec.icon;
                      const isSelected = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          type="button"
                          onClick={() => {
                            setActiveSection(sec.id);
                            setIsSectionMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#1f1f23] text-white border border-[#333338]"
                              : "text-[#a1a1aa] hover:text-white hover:bg-[#151518] border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                                isSelected
                                  ? "bg-white text-black"
                                  : "bg-[#18181b] text-[#888888]"
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-medium leading-none truncate text-white">
                                {sec.label}
                              </p>
                              <p className="text-[10px] text-[#71717a] truncate mt-0.5">
                                {sec.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            {sec.count !== undefined && (
                              <span className="text-[10px] font-mono text-[#777777] bg-[#18181b] px-1.5 py-0.5 rounded">
                                {sec.count}
                              </span>
                            )}
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Status Hint */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#666666] hidden sm:inline">
                {currentSection.description}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e599]" title="Live Sync Active" />
            </div>
          </div>

          {/* Scrollable Form Cards Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* SECTION 1: GENERAL (PROFILE & BIO) */}
            {activeSection === "general" && (
              <>
                {/* Card 1: Personal Info */}
                <div className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-xs font-semibold text-white tracking-tight">
                        Personal Information
                      </h3>
                      <p className="text-[11px] text-[#737373]">
                        Nama lengkap, posisi spesialisasi, dan domisili.
                      </p>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-medium text-[#888888] mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => {
                            setProfile({ ...profile, name: e.target.value });
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-[#888888] mb-1">
                          Posisi / Tagline
                        </label>
                        <input
                          type="text"
                          value={profile.position}
                          onChange={(e) => {
                            setProfile({ ...profile, position: e.target.value });
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-medium text-[#888888] mb-1">
                            Domisili
                          </label>
                          <input
                            type="text"
                            value={profile.location || "Jatinom, Klaten, Indonesia"}
                            onChange={(e) => {
                              setProfile({ ...profile, location: e.target.value });
                              markUnsaved();
                            }}
                            className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-medium text-[#888888] mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profile.email || "dimaharohman@gmail.com"}
                            onChange={(e) => {
                              setProfile({ ...profile, email: e.target.value });
                              markUnsaved();
                            }}
                            className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none transition-colors font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                    <span className="text-[10px]">Tampil di hero profil website</span>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-white hover:bg-neutral-200 text-black font-medium px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Card 2: Bio */}
                <div className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-xs font-semibold text-white tracking-tight">
                        Deskripsi Bio
                      </h3>
                      <p className="text-[11px] text-[#737373]">
                        Ringkasan kualifikasi teknis IT Rumah Sakit & programming.
                      </p>
                    </div>

                    <div>
                      <textarea
                        rows={6}
                        value={profile.description}
                        onChange={(e) => {
                          setProfile({ ...profile, description: e.target.value });
                          markUnsaved();
                        }}
                        className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md p-2.5 text-xs text-white focus:outline-none transition-colors leading-relaxed"
                      />
                      <div className="text-right text-[10px] text-[#666666] font-mono mt-1">
                        {profile.description?.length || 0} karakter
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                    <span className="text-[10px]">Paragraf utama ringkasan CV</span>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-white hover:bg-neutral-200 text-black font-medium px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Card 3: CV Link & Upload */}
                <div className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden">
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-semibold text-white tracking-tight">
                          Berkas CV PDF
                        </h3>
                        <p className="text-[11px] text-[#737373]">
                          Tautan atau file unduh CV dinamis untuk rekruter.
                        </p>
                      </div>
                      <input
                        ref={cvFileInputRef}
                        type="file"
                        accept="application/pdf"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => cvFileInputRef.current?.click()}
                        disabled={isUploadingCv}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[#262626] bg-[#141414] hover:bg-[#1f1f1f] text-xs text-white transition-colors cursor-pointer shrink-0"
                      >
                        {isUploadingCv ? (
                          <Loader2 className="w-3 h-3 animate-spin text-[#00e599]" />
                        ) : (
                          <Upload className="w-3 h-3 text-[#00e599]" />
                        )}
                        <span>{isUploadingCv ? "Uploading..." : "Upload PDF"}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="https://drive.google.com/... atau /admin.pdf"
                        value={profile.cv_url || profile.links?.find((l) => l.text === "CV")?.url || "/admin.pdf"}
                        onChange={(e) => {
                          const newUrl = e.target.value;
                          const links = profile.links || [];
                          const hasCv = links.some((l) => l.text === "CV");
                          const updatedLinks = hasCv
                            ? links.map((l) => (l.text === "CV" ? { ...l, url: newUrl } : l))
                            : [...links, { text: "CV", url: newUrl }];
                          setProfile({
                            ...profile,
                            cv_url: newUrl,
                            links: updatedLinks,
                          });
                          markUnsaved();
                        }}
                        className="flex-1 bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-3 py-1.5 text-xs text-white font-mono focus:outline-none"
                      />
                      <a
                        href={profile.cv_url || profile.links?.find((l) => l.text === "CV")?.url || "/admin.pdf"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-md border border-[#262626] bg-[#121212] hover:bg-[#1a1a1a] text-xs text-white transition-colors flex items-center gap-1 shrink-0"
                      >
                        <ExternalLink className="w-3 h-3 text-[#888888]" />
                        <span>View</span>
                      </a>
                    </div>
                  </div>

                  <div className="px-4 py-2.5 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                    <span className="text-[10px] truncate max-w-[240px]">
                      Aktif: {profile.cv_url || profile.links?.find((l) => l.text === "CV")?.url || "/admin.pdf"}
                    </span>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="bg-white hover:bg-neutral-200 text-black font-medium px-2.5 py-1 rounded text-xs transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* SECTION 2: EXPERIENCES */}
            {activeSection === "experiences" && (
              <>
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h3 className="text-xs font-semibold text-white">Work Experiences</h3>
                    <p className="text-[10px] text-[#737373]">
                      Pengalaman magang IT RS & pengembangan sistem.
                    </p>
                  </div>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-medium cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>

                {experiences.map((exp, idx) => (
                  <div
                    key={exp.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-2">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                              Institusi
                            </label>
                            <input
                              type="text"
                              value={exp.institution}
                              onChange={(e) => {
                                const updated = [...experiences];
                                updated[idx].institution = e.target.value;
                                setExperiences(updated);
                                markUnsaved();
                              }}
                              className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                                Posisi
                              </label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[idx].position = e.target.value;
                                  setExperiences(updated);
                                  markUnsaved();
                                }}
                                className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                                Durasi
                              </label>
                              <input
                                type="text"
                                value={exp.duration}
                                onChange={(e) => {
                                  const updated = [...experiences];
                                  updated[idx].duration = e.target.value;
                                  setExperiences(updated);
                                  markUnsaved();
                                }}
                                className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                              Tanggung Jawab (Pisahkan baris)
                            </label>
                            <textarea
                              rows={3}
                              value={(exp.responsibilities || []).join("\n")}
                              onChange={(e) => {
                                const updated = [...experiences];
                                updated[idx].responsibilities = e.target.value.split("\n");
                                setExperiences(updated);
                                markUnsaved();
                              }}
                              className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md p-2 text-xs text-white focus:outline-none leading-relaxed"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = experiences.filter((_, i) => i !== idx);
                            setExperiences(updated);
                            markUnsaved();
                            toast.info("Experience removed");
                          }}
                          className="text-[#666666] hover:text-red-400 p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                      <span className="font-mono text-[10px]">/{exp.id}</span>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white hover:bg-neutral-200 text-black font-medium px-2 py-0.5 rounded text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SECTION 3: PROJECTS */}
            {activeSection === "projects" && (
              <>
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h3 className="text-xs font-semibold text-white">Featured Projects</h3>
                    <p className="text-[10px] text-[#737373]">
                      Aplikasi web & proyek inovasi terverifikasi.
                    </p>
                  </div>
                  <button
                    onClick={handleAddProject}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-medium cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add</span>
                  </button>
                </div>

                {projects.map((proj, idx) => (
                  <div
                    key={proj.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="p-4 space-y-2.5">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-2">
                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                              Judul Proyek
                            </label>
                            <input
                              type="text"
                              value={proj.title || proj.nameProject || ""}
                              onChange={(e) => {
                                const updated = [...projects];
                                updated[idx].title = e.target.value;
                                updated[idx].nameProject = e.target.value;
                                setProjects(updated);
                                markUnsaved();
                              }}
                              className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                              Deskripsi / Tagline
                            </label>
                            <textarea
                              rows={2}
                              value={proj.description || proj.tagline || ""}
                              onChange={(e) => {
                                const updated = [...projects];
                                updated[idx].description = e.target.value;
                                updated[idx].tagline = e.target.value;
                                setProjects(updated);
                                markUnsaved();
                              }}
                              className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md p-2 text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                                Role Tag
                              </label>
                              <input
                                type="text"
                                value={proj.role_tag || proj.tags?.[0] || ""}
                                onChange={(e) => {
                                  const updated = [...projects];
                                  updated[idx].role_tag = e.target.value;
                                  setProjects(updated);
                                  markUnsaved();
                                }}
                                className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                                Tahun / Metrik
                              </label>
                              <input
                                type="text"
                                value={proj.metrics || proj.pub_year || ""}
                                onChange={(e) => {
                                  const updated = [...projects];
                                  updated[idx].metrics = e.target.value;
                                  updated[idx].pub_year = e.target.value;
                                  setProjects(updated);
                                  markUnsaved();
                                }}
                                className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            const updated = projects.filter((_, i) => i !== idx);
                            setProjects(updated);
                            markUnsaved();
                            toast.info("Project removed");
                          }}
                          className="text-[#666666] hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                      <span className="font-mono text-[10px]">ID: {proj.id}</span>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white hover:bg-neutral-200 text-black font-medium px-2 py-0.5 rounded text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SECTION 4: SKILLS */}
            {activeSection === "skills" && (
              <>
                <div className="pb-1">
                  <h3 className="text-xs font-semibold text-white">Technical Competencies</h3>
                  <p className="text-[10px] text-[#737373]">
                    Keahlian Hardware, Jaringan, Web Programming, & Analisis Produk.
                  </p>
                </div>

                {skills.map((group, idx) => (
                  <div
                    key={group.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="p-4 space-y-2.5">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Kategori
                        </label>
                        <input
                          type="text"
                          value={group.category}
                          onChange={(e) => {
                            const updated = [...skills];
                            updated[idx].category = e.target.value;
                            setSkills(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Daftar Keahlian (Pisahkan dengan koma)
                        </label>
                        <textarea
                          rows={2}
                          value={(group.skills || []).join(", ")}
                          onChange={(e) => {
                            const updated = [...skills];
                            updated[idx].skills = e.target.value
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean);
                            setSkills(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                      <span className="text-[10px]">{group.skills?.length || 0} skills</span>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white hover:bg-neutral-200 text-black font-medium px-2 py-0.5 rounded text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SECTION 5: EDUCATION */}
            {activeSection === "education" && (
              <>
                <div className="pb-1">
                  <h3 className="text-xs font-semibold text-white">Academic Credentials</h3>
                  <p className="text-[10px] text-[#737373]">
                    Pendidikan formal S1 Informatika STMIK Amikom Surakarta.
                  </p>
                </div>

                {educations.map((edu, idx) => (
                  <div
                    key={edu.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="p-4 space-y-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Institusi
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[idx].institution = e.target.value;
                            setEducations(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Periode Studi
                        </label>
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[idx].duration = e.target.value;
                            setEducations(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Gelar & Keterangan Akademik
                        </label>
                        <textarea
                          rows={3}
                          value={edu.description}
                          onChange={(e) => {
                            const updated = [...educations];
                            updated[idx].description = e.target.value;
                            setEducations(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md p-2 text-xs text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                      <span className="text-[10px]">Terverifikasi Ijazah Cumlaude</span>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white hover:bg-neutral-200 text-black font-medium px-2 py-0.5 rounded text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SECTION 6: BLOG */}
            {activeSection === "blog" && (
              <>
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h3 className="text-xs font-semibold text-white">Blog Articles</h3>
                    <p className="text-[10px] text-[#737373]">Artikel & panduan teknis.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newPost = {
                        id: `post-${Date.now()}`,
                        slug: `post-${Date.now()}`,
                        title: "New Technical Post",
                        excerpt: "Ringkasan singkat artikel...",
                        content: "# Judul\n\nIsi artikel...",
                        is_published: true,
                        published_at: new Date().toISOString().split("T")[0],
                      };
                      setPosts([newPost, ...posts]);
                      markUnsaved();
                      toast.success("Draft artikel baru dibuat");
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-medium cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Create</span>
                  </button>
                </div>

                {posts.map((post, idx) => (
                  <div
                    key={post.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] overflow-hidden"
                  >
                    <div className="p-4 space-y-2">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Judul
                        </label>
                        <input
                          type="text"
                          value={post.title}
                          onChange={(e) => {
                            const updated = [...posts];
                            updated[idx].title = e.target.value;
                            setPosts(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-[#666666] mb-1">
                          Slug
                        </label>
                        <input
                          type="text"
                          value={post.slug}
                          onChange={(e) => {
                            const updated = [...posts];
                            updated[idx].slug = e.target.value;
                            setPosts(updated);
                            markUnsaved();
                          }}
                          className="w-full bg-[#000000] border border-[#222222] focus:border-[#555555] rounded-md px-2.5 py-1 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    <div className="px-4 py-2 bg-[#0d0d0d] border-t border-[#1f1f1f] flex items-center justify-between text-xs text-[#666666]">
                      <span className="font-mono text-[10px]">Published: Active</span>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-white hover:bg-neutral-200 text-black font-medium px-2 py-0.5 rounded text-[11px] cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* SECTION 7: INBOX */}
            {activeSection === "inbox" && (
              <>
                <div className="pb-1">
                  <h3 className="text-xs font-semibold text-white">Inbox Messages</h3>
                  <p className="text-[10px] text-[#737373]">Pesan kontak dari rekruter.</p>
                </div>

                {inbox.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className="rounded-xl border border-[#1f1f1f] bg-[#0a0a0a] p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-xs">{msg.name}</span>
                      <span className="text-[10px] text-[#666666] font-mono">{msg.created_at}</span>
                    </div>
                    <p className="text-[11px] text-[#00e599] font-mono">{msg.email}</p>
                    <p className="text-xs text-[#cccccc] bg-[#000000] p-2.5 rounded border border-[#1f1f1f] leading-relaxed">
                      "{msg.message}"
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function VercelStudioEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen bg-[#000000] flex items-center justify-center text-xs text-[#737373] font-mono">
          Loading Vercel Split Studio...
        </div>
      }
    >
      <VercelSplitEditorContent />
    </Suspense>
  );
}
