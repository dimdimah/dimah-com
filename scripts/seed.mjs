import { createClient } from "@supabase/supabase-js";
import {
  profileData,
  educationData,
  experienceData,
  skillsData,
  projectDatas,
} from "../src/data/home.js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runSeed() {
  console.log("Seeding Supabase database with verified profile data...");

  // 1. Profiles
  const profileRow = {
    id: "00000000-0000-0000-0000-000000000001",
    name: profileData.name,
    position: profileData.position,
    description: profileData.description,
    cv_url: "/admin.pdf",
    links: profileData.links,
    updated_at: new Date().toISOString(),
  };

  const { error: profErr } = await supabase
    .from("profiles")
    .upsert(profileRow, { onConflict: "id" });
  if (profErr) console.error("Error seeding profiles:", profErr.message);
  else console.log("✓ profiles seeded successfully");

  // 2. Educations
  const educationRows = educationData.map((edu, idx) => ({
    institution: edu.institution,
    duration: edu.duration,
    description: `${edu.description}. ${edu.focus} ${edu.thesis}`,
    url: edu.url || "/",
    order_index: idx,
  }));
  const { error: eduErr } = await supabase.from("educations").upsert(educationRows);
  if (eduErr) console.error("Error seeding educations:", eduErr.message);
  else console.log("✓ educations seeded successfully");

  // 3. Skills
  const skillRows = skillsData.map((s, idx) => ({
    category: s.category,
    skills: s.skills,
    order_index: idx,
  }));
  const { error: skillErr } = await supabase.from("skills").upsert(skillRows);
  if (skillErr) console.error("Error seeding skills:", skillErr.message);
  else console.log("✓ skills seeded successfully");

  // 4. Experiences
  const experienceRows = experienceData.map((exp, idx) => ({
    id: exp.id,
    institution: exp.institution,
    position: exp.position,
    duration: exp.duration,
    type: exp.type || "Work",
    tags: exp.tags || [],
    responsibilities: exp.responsibilities || [],
    tools: exp.tools || [],
    achievements: exp.achievements || [],
    url: exp.url || `/experiences/${exp.id}`,
    order_index: idx,
  }));
  const { error: expErr } = await supabase
    .from("experiences")
    .upsert(experienceRows, { onConflict: "id" });
  if (expErr) console.error("Error seeding experiences:", expErr.message);
  else console.log("✓ experiences seeded successfully");

  // 5. Projects
  const projectRows = projectDatas.map((proj, idx) => ({
    id: proj.id,
    title: proj.nameProject,
    role_tag: proj.tags?.[0] || "Project",
    description: proj.tagline,
    metrics: proj.pub_year,
    tags: proj.techstack || [],
    links: [{ text: "Detail", url: proj.url }],
    is_featured: true,
    order_index: idx,
  }));
  const { error: projErr } = await supabase
    .from("projects")
    .upsert(projectRows, { onConflict: "id" });
  if (projErr) console.error("Error seeding projects:", projErr.message);
  else console.log("✓ projects seeded successfully");

  // 6. Sample Blog Post
  const samplePost = {
    slug: "membangun-portfolio-cms-framer",
    title: "Membangun Headless Visual CMS dengan Gaya Framer",
    excerpt: "Cara merancang admin studio 3-panel interaktif di Next.js App Router.",
    content: "Dokumentasi perjalanan arsitektur website dimah-com menjadi CMS...",
    is_published: true,
  };
  const { error: postErr } = await supabase
    .from("posts")
    .upsert([samplePost], { onConflict: "slug" });
  if (postErr) console.error("Error seeding posts:", postErr.message);
  else console.log("✓ posts seeded successfully");

  console.log("Database seed completed!");
}

runSeed().catch(console.error);
