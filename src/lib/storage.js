import { getAdminClient } from "@/lib/supabase/admin";
import { writeFile, mkdir, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Memastikan bucket Supabase Storage ada. Jika belum ada, otomatis dibuatkan.
 */
async function ensureBucket(supabase, bucketName) {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const found = buckets?.some((b) => b.name === bucketName || b.id === bucketName);
    if (!found) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: true,
      });
      if (error && !error.message?.includes("already exists")) {
        console.warn(`[Storage] Gagal createBucket ${bucketName}:`, error.message);
      } else {
        console.log(`[Storage] Bucket '${bucketName}' berhasil dibuat otomatis.`);
      }
    }
  } catch (err) {
    console.warn(`[Storage] Exception saat cek bucket ${bucketName}:`, err.message);
  }
}

/**
 * Menghapus file dari Supabase Storage atau penyimpanan lokal.
 * Mencegah penumpukan file lama (Zero-Waste Storage).
 */
export async function deleteFromStorage(fileUrl, bucketName = "portfolio-media") {
  if (!fileUrl || typeof fileUrl !== "string") return false;

  // 1. Jika file berada di Supabase Storage
  const supabase = getAdminClient();
  const searchPattern = `/storage/v1/object/public/${bucketName}/`;
  if (supabase && fileUrl.includes(searchPattern)) {
    try {
      const filePathInBucket = decodeURIComponent(fileUrl.split(searchPattern)[1]);
      if (filePathInBucket) {
        const { error } = await supabase.storage.from(bucketName).remove([filePathInBucket]);
        if (error) {
          console.warn(`[Storage Cleanup] Gagal hapus di Supabase: ${filePathInBucket}`, error.message);
        } else {
          console.log(`[Storage Cleanup] Berhasil hapus di Supabase: ${filePathInBucket}`);
          return true;
        }
      }
    } catch (err) {
      console.warn(`[Storage Cleanup Error]`, err);
    }
  }

  // 2. Jika file berada di penyimpanan lokal /public/uploads/
  if (fileUrl.startsWith("/uploads/")) {
    try {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      const fileName = path.basename(fileUrl);
      const fullPath = path.join(uploadsDir, fileName);

      if (fullPath.startsWith(uploadsDir) && existsSync(fullPath)) {
        await unlink(fullPath);
        console.log(`[Storage Cleanup] Berhasil hapus lokal: ${fileName}`);
        return true;
      }
    } catch (err) {
      console.warn(`[Storage Cleanup Error Lokal]`, err);
    }
  }

  return false;
}

/**
 * Upload file dengan prioritas: Supabase Storage -> Fallback Local Storage.
 * Otomatis menghapus berkas lama (oldUrl) agar storage tidak penuh.
 */
export async function uploadToStorage({
  buffer,
  fileName,
  mimeType,
  bucketName = "portfolio-media",
  folder = "",
  oldUrl = "",
}) {
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const uniqueName = `${Date.now()}-${cleanFileName}`;
  const relativePath = folder ? `${folder}/${uniqueName}` : uniqueName;

  const supabase = getAdminClient();

  // Opsi 1: Coba simpan ke Supabase Storage jika kredensial aktif
  if (supabase) {
    try {
      await ensureBucket(supabase, bucketName);

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(relativePath, buffer, {
          contentType: mimeType,
          upsert: true,
        });

      if (error) {
        console.warn(`[Storage Warning] Supabase upload gagal, fallback ke lokal:`, error.message);
      } else {
        const {
          data: { publicUrl },
        } = supabase.storage.from(bucketName).getPublicUrl(relativePath);

        // Hapus file lama jika ada
        if (oldUrl && oldUrl !== publicUrl) {
          await deleteFromStorage(oldUrl, bucketName);
        }

        return {
          success: true,
          url: publicUrl,
          fileName: uniqueName,
          storage: "supabase",
        };
      }
    } catch (err) {
      console.warn(`[Storage Error] Supabase upload exception, fallback ke lokal:`, err.message);
    }
  }

  // Opsi 2: Fallback ke penyimpanan lokal /public/uploads/
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const localFileName = folder ? `${folder}-${uniqueName}` : uniqueName;
    const localFilePath = path.join(uploadsDir, localFileName);

    await writeFile(localFilePath, buffer);
    const localPublicUrl = `/uploads/${localFileName}`;

    // Hapus file lama lokal jika ada
    if (oldUrl && oldUrl !== localPublicUrl) {
      await deleteFromStorage(oldUrl, bucketName);
    }

    return {
      success: true,
      url: localPublicUrl,
      fileName: localFileName,
      storage: "local",
    };
  } catch (err) {
    console.error(`[Storage Fatal Error] Gagal simpan file di lokal:`, err);
    throw new Error("Gagal menyimpan berkas ke storage maupun lokal.");
  }
}
