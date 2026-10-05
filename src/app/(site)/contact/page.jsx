"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/social";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleCopyClick = () => {
    const email = "dimaharohman@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success("Email berhasil disalin!", {
          description: `"${email}" telah disalin ke clipboard.`,
        });
      })
      .catch((error) => {
        console.error("Gagal menyalin teks:", error);
        toast.error("Gagal menyalin email.", {
          description: "Terjadi kesalahan saat menyalin teks.",
        });
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal mengirim pesan.");
        return;
      }

      toast.success("Pesan berhasil dikirim!", {
        description: "Terima kasih, saya akan menghubungi Anda segera.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Gagal mengirim pesan.", {
        description: "Terjadi kesalahan jaringan. Coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="leading-relaxed antialiased">
      {/* Social Media Section */}
      <p className="font-medium text-lg mb-4">Social Media</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            onClick={(e) => {
              if (item.label === "Email") {
                e.preventDefault();
                handleCopyClick();
              } else if (item.onClick) {
                item.onClick(e);
              }
            }}
            target={item.href ? "_blank" : undefined}
            className="p-4 hover:opacity-80 group border border-foreground/10 rounded-lg flex flex-row items-center justify-between transition-all duration-200 ease-in-out"
          >
            <div className="grow">
              <div className="text-sm text-muted-foreground truncate">
                {item.username}
              </div>
              <div>
                {item.label}
                {item.extra && (
                  <span className="group-hover:opacity-100 opacity-0 transition-opacity duration-200">
                    {item.extra}
                  </span>
                )}
              </div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-foreground"
              >
                {item.icon}
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Form Message */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-14 border-t pt-10 border-foreground/5"
      >
        <p className="mb-4 text-base">
          Hi 👋 If you need anything, send me a message.
        </p>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full h-10 px-4 bg-none border border-foreground/5 rounded-md"
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full h-10 px-4 bg-none border border-foreground/5 rounded-md"
        />
        <Textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 bg-none border border-foreground/5 rounded-md"
        />
        <Button
          type="submit"
          disabled={loading}
          className="text-sm font-semibold rounded-lg w-max bg-foreground hover:bg-foreground/80 text-background h-10 px-4 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}
