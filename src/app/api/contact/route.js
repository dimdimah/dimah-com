import { NextResponse } from "next/server";

const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60000;
const RATE_LIMIT_MAX = 5;

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/<[^>]*>/g, "").slice(0, 1000);
}

function isString(value) {
  return typeof value === "string";
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

    if (!isString(name) || !isString(email) || !isString(message)) {
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

    // TODO: Integrate with email service (e.g. Formspree, Nodemailer, or
    // Supabase) to actually deliver the message. Until then, respond with
    // 501 so the client knows the message was NOT sent.
    return NextResponse.json(
      { error: "Layanan pengiriman pesan belum tersedia" },
      { status: 501 }
    );
  } catch (error) {
    console.error("Error contact form:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
