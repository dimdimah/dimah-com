"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/social";

export default function ContactPage() {
  const [copiedUrl, setCopiedUrl] = useState("");

  const handleCopyClick = () => {
    const email = "dimaharrohman@gmail.com";
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopiedUrl(email);
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

  return (
    <main className="container sm:w-[725px] leading-relaxed antialiased">
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
      <form className="flex flex-col gap-4 mt-14 border-t pt-10 border-foreground/5">
        <p className="mb-4 text-base">
          Hi 👋 If you need anything, send me a message.
        </p>
        <Input
          disabled
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full h-10 px-4 bg-none border border-foreground/5 rounded-md"
        />
        <Textarea
          disabled
          name="message"
          placeholder="Your message"
          required
          className="w-full px-4 bg-none border border-foreground/5 rounded-md"
        />
        <Button
          disabled
          type="submit"
          className="text-sm font-semibold rounded-lg w-max bg-foreground hover:bg-foreground/80 text-background h-10 px-4 disabled:opacity-50"
        >
          Send Message
        </Button>
      </form>
    </main>
  );
}
