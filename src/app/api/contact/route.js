import { NextResponse } from "next/server";

const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 5;

function sanitize(str) {
  return str.replace(/<[^>]*>/g, "").slice(0, 1000);
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW;

    if (rateLimit.has(ip)) {
      const timestamps = rateLimit.get(ip).filter((t) => t > windowStart);
      if (timestamps.length >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: "Terlalu banyak permintaan. Coba lagi nanti." },
          { status: 429 }
        );
      }
      timestamps.push(now);
      rateLimit.set(ip, timestamps);
    } else {
      rateLimit.set(ip, [now]);
    }

    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json(
        { error: "Input terlalu panjang" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format email tidak valid" },
        { status: 400 }
      );
    }

    const cleanName = sanitize(name);
    const cleanMessage = sanitize(message);

    console.log("Contact form submission:", { name: cleanName, email, message: cleanMessage });

    return NextResponse.json(
      { message: "Pesan berhasil dikirim" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error contact form:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
