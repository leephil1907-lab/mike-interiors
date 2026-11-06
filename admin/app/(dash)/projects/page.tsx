import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { toggleProjectPublished } from "@/lib/actions";

export const metadata = { title: "Projects · Mike Interiors Admin" };

export default async function ProjectsPage({
  searchParams
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  await requireAdmin();
  const { deleted } = await searchParams;
  const db = getAdminClient();
  const { data: projects } = await db
    .from("projects")
    .select("id,slug,title,category,status,image_path,featured,published,sort_order")
    .order("sort_order", { ascending: true });

  return (
    <>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 26 }}>
        <div>
          <h1 style={{ fontSize: 32 }}>Projects</h1>
          <p style={{ color: "var(--muted)", margin: "6px 0 0", fontSize: 14 }}>
            {projects?.length ?? 0} projects · drag-free ordering via the “Order” field
          </p>
        </div>
        <Link className="btn" href="/projects/new">New project</Link>
      </div>

      {deleted && <div className="banner banner-ok">Project deleted.</div>}

      <div className="card" style={{ overflow: "hidden" }}>
        {!projects?.length && (
          <p style={{ padding: 26, color: "var(--muted)" }}>No projects yet. Create your first one.</p>
        )}

        {projects?.map((p) => (
          <div
            key={p.id}
            style={{
              display: "grid",
              gridTemplateColumns: "74px 1fr auto",
              gap: 16,
              alignItems: "center",
              padding: "13px 18px",
              borderBottom: "1px solid var(--line)"
            }}
          >
            <div
              style={{
                width: 74, height: 56, borderRadius: 7, overflow: "hidden",
                background: "#eee9e1", position: "relative", flexShrink: 0
              }}
            >
              {p.image_path && (
                <Image src={p.image_path} alt="" fill sizes="74px" style={{ objectFit: "cover" }} />
              )}
            </div>

            <div style={{ minWidth: 0 }}>
              <Link
                href={`/projects/${p.id}`}
                style={{ textDecoration: "none", fontWeight: 600, fontSize: 15 }}
              >
                {p.title}
              </Link>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
                {p.category} · /work/{p.slug}
                {p.featured && " · ★ on homepage"}
                {p.status === "progress" && " · in progress"}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <form action={toggleProjectPublished}>
                <input type="hidden" name="id" value={p.id} />
                <input type="hidden" name="next" value={String(!p.published)} />
                <button
                  className="btn btn-ghost"
                  style={{ padding: "6px 12px", fontSize: 12.5 }}
                  title={p.published ? "Hide from the website" : "Publish to the website"}
                >
                  <span
                    style={{
                      width: 7, height: 7, borderRadius: 99,
                      background: p.published ? "var(--ok)" : "#bbb", display: "inline-block"
                    }}
                  />
                  {p.published ? "Live" : "Hidden"}
                </button>
              </form>
              <Link className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} href={`/projects/${p.id}`}>
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
