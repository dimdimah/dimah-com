import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Load .env or .env.local if present locally
const envFiles = [".env.local", ".env"];
for (const file of envFiles) {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          const val = vals.join("=").replace(/^["']|["']$/g, "").trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    } catch {
      // ignore
    }
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  console.log("Pastikan environment variables sudah diatur di .env atau GitHub Secrets.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

async function pingSupabase() {
  const startTime = Date.now();
  console.log(`[Keep-Alive] 📡 Sending ping query to Supabase: ${supabaseUrl}`);

  try {
    const { data, error } = await supabase.from("profiles").select("id").limit(1);
    const duration = Date.now() - startTime;

    if (error) {
      console.warn(`⚠️ Supabase responded in ${duration}ms with notice:`, error.message);
      console.log("✅ Supabase REST gateway is alive and received the request!");
    } else {
      console.log(`✅ Supabase ping SUCCESSFUL (${duration}ms)! Database is ACTIVE and awake.`);
      console.log(`   Inactivity counter reset. Found ${data?.length ?? 0} record(s).`);
    }
  } catch (err) {
    console.error("❌ Failed to ping Supabase:", err.message);
    process.exit(1);
  }
}

pingSupabase();
