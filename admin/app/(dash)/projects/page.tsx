import Link from "next/link";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { toggleProjectPublished } from "@/lib/actions";
import { adminImageSrc } from "@/lib/images";

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
      <div className="page-head">
        <div>
          <h1>Projects</h1>
          <p className="page-sub">
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

        {projects?.map((p) => {
          const thumb = adminImageSrc(p.image_path);
          return (
            <div key={p.id} className="proj-row">
              <div className="proj-thumb">
                {thumb ? (
                  <img src={thumb} alt="" loading="lazy" />
                ) : (
                  <span
                    aria-hidden
                    style={{
                      position: "absolute", inset: 0, display: "grid", placeItems: "center",
                      fontFamily: "Georgia, serif", fontSize: 17, color: "#b3aa9c"
                    }}
                  >
                    MI
                  </span>
                )}
              </div>

              <div className="proj-body" style={{ minWidth: 0 }}>
                <Link href={`/projects/${p.id}`} className="proj-title">
                  {p.title}
                </Link>
                <div className="proj-meta">
                  {p.category} · /work/{p.slug}
                  {p.featured && " · ★ on homepage"}
                  {p.status === "progress" && " · in progress"}
                </div>
              </div>

              <div className="proj-actions">
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
          );
        })}
      </div>
    </>
  );
}
