import { NextResponse } from "next/server";
import { uploadToStorage } from "@/lib/storage";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const oldUrl = formData.get("oldUrl");

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      return NextResponse.json({ error: "Hanya file PDF yang diperbolehkan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToStorage({
      buffer,
      fileName: file.name,
      mimeType: file.type || "application/pdf",
      bucketName: "portfolio-docs",
      folder: "cv",
      oldUrl: oldUrl || "",
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      fileName: result.fileName,
      storage: result.storage,
    });
  } catch (error) {
    console.error("Gagal mengunggah CV:", error);
    return NextResponse.json(
      { error: error.message || "Gagal menyimpan file CV" },
      { status: 500 }
    );
  }
}


