"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle, RefreshCw } from "lucide-react";
import { compressImageToWebp } from "@/lib/imageCompress";

export default function ImageUploader({
  currentImage,
  onImageReady,
  label = "Cover Image (WebP Auto-compressed)",
}) {
  const [compressing, setCompressing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage || "");
  const [stats, setStats] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    try {
      setCompressing(true);
      const result = await compressImageToWebp(file, {
        maxWidth: 1200,
        quality: 0.85,
      });

      const blobUrl = URL.createObjectURL(result.file);
      setPreviewUrl(blobUrl);

      const originalKB = (result.originalSize / 1024).toFixed(1);
      const compressedKB = (result.compressedSize / 1024).toFixed(1);
      const savings = Math.max(
        0,
        Math.round(((result.originalSize - result.compressedSize) / result.originalSize) * 100)
      );

      setStats({
        originalKB,
        compressedKB,
        savings,
        fileName: result.file.name,
      });

      if (onImageReady) {
        onImageReady(result.file, blobUrl);
      }
    } catch (err) {
      console.error("Gagal kompres gambar:", err);
    } finally {
      setCompressing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const formatSize = (kb) => {
    if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
    return `${kb} KB`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-medium text-zinc-400">{label}</label>
        {stats && (
          <span className="text-[10px] text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Hemat {stats.savings}%
          </span>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 overflow-hidden ${
          dragActive
            ? "border-zinc-400 bg-zinc-800/30"
            : "border-[#262732] hover:border-[#383a48] bg-[#14151a]"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />

        {previewUrl ? (
          <div className="w-full flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg bg-[#1e1f27] border border-[#2b2c37] overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-200 truncate">
                {stats?.fileName || "Gambar Terpilih"}
              </p>
              {stats ? (
                <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                  <span className="line-through text-zinc-500">
                    {formatSize(stats.originalKB)}
                  </span>{" "}
                  → <span className="text-emerald-400 font-medium">{formatSize(stats.compressedKB)} (WebP)</span>
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  Klik untuk mengganti gambar
                </p>
              )}
            </div>
            <div className="shrink-0 p-1.5 rounded-lg bg-[#1f2029] text-zinc-400 hover:text-white">
              <RefreshCw className="w-3.5 h-3.5" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-2 text-center">
            <div className="w-8 h-8 rounded-full bg-[#1e1f27] border border-[#2b2c37] flex items-center justify-center text-zinc-400 mb-2">
              {compressing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-zinc-300" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </div>
            <p className="text-xs font-medium text-zinc-300">
              {compressing ? "Mengompres ke WebP..." : "Tarik gambar ke sini atau klik"}
            </p>
            <p className="text-[10px] text-zinc-500 mt-1 font-mono">
              JPG, PNG, atau WebP • Auto-resize max 1200px
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
