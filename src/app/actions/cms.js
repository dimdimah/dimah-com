"use server";

import { getAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";
import { deleteFromStorage } from "@/lib/storage";
import {
  profileData as fallbackProfile,
  educationData as fallbackEducation,
  experienceData as fallbackExperience,
  projectDatas as fallbackProjects,
  skillsData as fallbackSkills,
} from "@/data/home";

export async function getCmsData() {
  const supabase = getAdminClient();
  if (!supabase) {
    return {
      profile: fallbackProfile,
      educations: fallbackEducation,
      experiences: fallbackExperience,
      projects: fallbackProjects,
      skills: fallbackSkills,
      posts: [],
      inbox: [],
    };
  }

  try {
    const [
      { data: profiles },
      { data: educations },
      { data: skills },
      { data: experiences },
      { data: projects },
      { data: posts },
      { data: inbox },
    ] = await Promise.all([
      supabase.from("profiles").select("*").limit(1),
      supabase.from("educations").select("*").order("order_index", { ascending: true }),
      supabase.from("skills").select("*").order("order_index", { ascending: true }),
      supabase.from("experiences").select("*").order("order_index", { ascending: true }),
      supabase.from("projects").select("*").order("order_index", { ascending: true }),
      supabase.from("posts").select("*").order("created_at", { ascending: false }),
      supabase.from("inbox_messages").select("*").order("created_at", { ascending: false }),
    ]);

    const profile = profiles?.[0]
      ? {
          ...fallbackProfile,
          ...profiles[0],
          ipk: profiles[0].ipk || fallbackProfile.ipk,
          location: profiles[0].location || fallbackProfile.location,
          cv_url:
            profiles[0].cv_url ||
            profiles[0].links?.find((l) => l.text === "CV")?.url ||
            fallbackProfile.cv_url ||
            "/admin.pdf",
          links: profiles[0].links || fallbackProfile.links,
        }
      : {
          ...fallbackProfile,
          cv_url:
            fallbackProfile.cv_url ||
            fallbackProfile.links?.find((l) => l.text === "CV")?.url ||
            "/admin.pdf",
        };

    return {
      profile,
      educations: educations?.length ? educations : fallbackEducation,
      skills: skills?.length ? skills : fallbackSkills,
      experiences: experiences?.length ? experiences : fallbackExperience,
      projects: projects?.length ? projects : fallbackProjects,
      posts: posts || [],
      inbox: inbox || [],
    };
  } catch (error) {
    console.error("Error fetching CMS data:", error);
    return {
      profile: {
        ...fallbackProfile,
        cv_url:
          fallbackProfile.cv_url ||
          fallbackProfile.links?.find((l) => l.text === "CV")?.url ||
          "/admin.pdf",
      },
      educations: fallbackEducation,
      experiences: fallbackExperience,
      projects: fallbackProjects,
      skills: fallbackSkills,
      posts: [],
      inbox: [],
    };
  }
}

export async function saveCmsData(payload) {
  const supabase = getAdminClient();
  if (!supabase) {
    throw new Error("Supabase credentials not configured in environment.");
  }

  const { profile, educations, skills, experiences, projects, posts } = payload;

  try {
    // 1. Profile
    if (profile) {
      const cvUrl =
        profile.cv_url ||
        profile.links?.find((l) => l.text === "CV")?.url ||
        "/admin.pdf";
      const links = profile.links || [];
      const hasCvLink = links.some((l) => l.text === "CV");
      const updatedLinks = hasCvLink
        ? links.map((l) => (l.text === "CV" ? { ...l, url: cvUrl } : l))
        : [...links, { text: "CV", url: cvUrl }];

      // Cek apakah ada file CV lama yang perlu dibersihkan jika URL berubah
      try {
        const { data: existingProfiles } = await supabase
          .from("profiles")
          .select("cv_url")
          .limit(1);
        const existingCvUrl = existingProfiles?.[0]?.cv_url;

        if (existingCvUrl && existingCvUrl !== cvUrl) {
          await deleteFromStorage(existingCvUrl, "portfolio-docs");
        }
      } catch (cleanupErr) {
        console.warn("[Save Cleanup Warning]", cleanupErr);
      }

      await supabase.from("profiles").upsert(
        {
          id: "00000000-0000-0000-0000-000000000001",
          name: profile.name,
          position: profile.position,
          description: profile.description,
          cv_url: cvUrl,
          links: updatedLinks,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );
    }

    // 2. Experiences
    if (experiences?.length) {
      const expRows = experiences.map((exp, idx) => ({
        id: exp.id || `exp-${idx}`,
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
      await supabase.from("experiences").upsert(expRows, { onConflict: "id" });
    }

    // 3. Projects
    if (projects?.length) {
      // Cek pembersihan gambar lama proyek di storage jika diganti
      try {
        const { data: existingProjects } = await supabase
          .from("projects")
          .select("id, image");

        if (existingProjects?.length) {
          for (const cur of existingProjects) {
            const updated = projects.find((p) => p.id === cur.id);
            if (updated && cur.image && updated.image && cur.image !== updated.image) {
              await deleteFromStorage(cur.image, "portfolio-media");
            }
          }
        }
      } catch (err) {
        console.warn("[Project Image Cleanup Warning]", err);
      }

      const projRows = projects.map((proj, idx) => ({
        id: proj.id || `proj-${idx}`,
        title: proj.title || proj.nameProject,
        role_tag: proj.role_tag || proj.tags?.[0] || "Project",
        description: proj.description || proj.tagline,
        metrics: proj.metrics || proj.pub_year,
        tags: proj.tags || proj.techstack || [],
        links: proj.links || [{ text: "Detail", url: proj.url || "/" }],
        is_featured: true,
        order_index: idx,
      }));
      await supabase.from("projects").upsert(projRows, { onConflict: "id" });
    }

    // 4. Skills
    if (skills?.length) {
      const skillRows = skills.map((s, idx) => ({
        category: s.category,
        skills: s.skills,
        order_index: idx,
      }));
      await supabase.from("skills").delete().neq("order_index", -999);
      await supabase.from("skills").insert(skillRows);
    }

    // 5. Educations
    if (educations?.length) {
      const eduRows = educations.map((edu, idx) => ({
        institution: edu.institution,
        duration: edu.duration,
        description: edu.description,
        url: edu.url || "/",
        order_index: idx,
      }));
      await supabase.from("educations").delete().neq("order_index", -999);
      await supabase.from("educations").insert(eduRows);
    }

    // 6. Posts
    if (posts?.length) {
      for (const p of posts) {
        if (p.slug && p.title) {
          await supabase.from("posts").upsert(
            {
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              content: p.content,
              is_published: p.is_published ?? true,
              published_at: p.published_at || new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            { onConflict: "slug" }
          );
        }
      }
    }

    // Purge / Revalidate caches
    revalidatePath("/");
    revalidatePath("/(site)", "layout");
    revalidatePath("/admin/editor");

    return { success: true };
  } catch (err) {
    console.error("Save error in saveCmsData:", err);
    throw err;
  }
}
