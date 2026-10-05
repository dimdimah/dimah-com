import { NextResponse } from "next/server";
import { uploadToStorage } from "@/lib/storage";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const oldUrl = formData.get("oldUrl");
    const folder = formData.get("folder") || "media";

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file gambar yang diunggah" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Hanya file gambar yang diperbolehkan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToStorage({
      buffer,
      fileName: file.name,
      mimeType: file.type,
      bucketName: "portfolio-media",
      folder: folder,
      oldUrl: oldUrl || "",
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileName: result.fileName,
      storage: result.storage,
    });
  } catch (error) {
    console.error("Gagal mengunggah gambar:", error);
    return NextResponse.json(
      { error: error.message || "Gagal menyimpan file gambar" },
      { status: 500 }
    );
  }
}
