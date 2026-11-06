"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const projectSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  slug: z.string().max(160).optional(),
  category: z.string().min(1, "Category is required").max(80),
  description: z.string().max(2000).default(""),
  alt: z.string().max(400).default(""),
  status: z.enum(["completed", "progress"]).default("completed"),
  image_path: z.string().max(500).optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0)
});

const serviceSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  slug: z.string().max(160).optional(),
  number: z.string().max(10).default(""),
  summary: z.string().max(600).default(""),
  description: z.string().max(6000).default(""),
  alt: z.string().max(400).default(""),
  image_path: z.string().max(500).optional().nullable(),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0)
});

/**
 * Ask the public website to rebuild the affected pages so an edit is visible
 * immediately rather than after the ISR window.
 */
async function pingWebsite(path: string) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return;
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/revalidate?path=${encodeURIComponent(path)}`,
      { method: "POST", headers: { "x-revalidate-secret": secret }, cache: "no-store" }
    );
  } catch {
    // The site will pick the change up on its own next revalidation.
  }
}

function formToObject(form: FormData) {
  const obj: Record<string, unknown> = {};
  for (const [k, v] of form.entries()) {
    if (typeof v !== "string") continue;
    if (k === "featured" || k === "published") obj[k] = v === "on" || v === "true";
    else if (k === "sort_order") obj[k] = v === "" ? 0 : Number(v);
    else obj[k] = v;
  }
  // Unchecked checkboxes are absent from FormData entirely.
  obj.featured = form.has("featured");
  obj.published = form.has("published");
  return obj;
}

async function saveProject(id: string | null, raw: Record<string, unknown>) {
  await requireAdmin();
  const parsed = projectSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;
  const payload = {
    ...d,
    slug: d.slug?.trim() ? slugify(d.slug) : slugify(d.title)
  };
  const db = getAdminClient();
  const { data, error } = id
    ? await db.from("projects").update(payload).eq("id", id).select("id").single()
    : await db.from("projects").insert(payload).select("id").single();

  if (error) {
    const msg = error.code === "23505" ? "That slug is already used by another project." : error.message;
    return { ok: false as const, error: msg };
  }

  revalidatePath("/projects");
  await pingWebsite(`/work/${payload.slug}`);
  return { ok: true as const, id: data.id };
}

export async function createProject(form: FormData) {
  const res = await saveProject(null, formToObject(form));
  if (!res.ok) return res;
  redirect(`/projects/${res.id}?saved=1`);
}

export async function updateProject(id: string, form: FormData) {
  const res = await saveProject(id, formToObject(form));
  if (!res.ok) return res;
  redirect(`/projects/${id}?saved=1`);
}

export async function deleteProject(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!id) return;
  await getAdminClient().from("projects").delete().eq("id", id);
  revalidatePath("/projects");
  await pingWebsite("/work");
  redirect("/projects?deleted=1");
}

export async function toggleProjectPublished(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const next = form.get("next") === "true";
  if (!id) return;
  await getAdminClient().from("projects").update({ published: next }).eq("id", id);
  revalidatePath("/projects");
  await pingWebsite("/work");
}

export async function createService(form: FormData) {
  const res = await saveService(null, formToObject(form));
  if (!res.ok) return res;
  redirect(`/services/${res.id}?saved=1`);
}

export async function updateService(id: string, form: FormData) {
  const res = await saveService(id, formToObject(form));
  if (!res.ok) return res;
  redirect(`/services/${id}?saved=1`);
}

async function saveService(id: string | null, raw: Record<string, unknown>) {
  await requireAdmin();
  const parsed = serviceSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const d = parsed.data;
  const payload = {
    ...d,
    slug: d.slug?.trim() ? slugify(d.slug) : slugify(d.title)
  };
  const db = getAdminClient();
  const { data, error } = id
    ? await db.from("services").update(payload).eq("id", id).select("id").single()
    : await db.from("services").insert(payload).select("id").single();

  if (error) {
    const msg = error.code === "23505" ? "That slug is already used by another service." : error.message;
    return { ok: false as const, error: msg };
  }
  revalidatePath("/services");
  await pingWebsite(`/services/${payload.slug}`);
  return { ok: true as const, id: data.id };
}

export async function deleteService(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!id) return;
  await getAdminClient().from("services").delete().eq("id", id);
  revalidatePath("/services");
  await pingWebsite("/services");
  redirect("/services?deleted=1");
}

export async function saveContent(form: FormData) {
  await requireAdmin();
  const db = getAdminClient();
  const updates: { key: string; value: string }[] = [];
  for (const [k, v] of form.entries()) {
    if (k.startsWith("content:") && typeof v === "string") {
      updates.push({ key: k.slice("content:".length), value: v });
    }
  }
  if (!updates.length) return;

  const results = await Promise.all(
    updates.map((u) => db.from("site_content").update({ value: u.value }).eq("key", u.key))
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) {
    redirect("/content?error=" + encodeURIComponent(failed.error.message));
  }
  revalidatePath("/content");
  await pingWebsite("/");
  redirect("/content?saved=1");
}

export async function markEnquiryHandled(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  const next = form.get("next") === "true";
  if (!id) return;
  await getAdminClient().from("enquiries").update({ handled: next }).eq("id", id);
  revalidatePath("/inbox");
}

export async function deleteEnquiry(form: FormData) {
  await requireAdmin();
  const id = String(form.get("id") ?? "");
  if (!id) return;
  await getAdminClient().from("enquiries").delete().eq("id", id);
  revalidatePath("/inbox");
}
