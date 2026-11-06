import Link from "next/link";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";

export default async function Overview() {
  const admin = await requireAdmin();
  const db = getAdminClient();

  const [{ count: projectCount }, { count: publishedProjects }, { data: services }, { count: enquiryCount }] =
    await Promise.all([
      db.from("projects").select("*", { count: "exact", head: true }),
      db.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
      db.from("services").select("id,title,number,published").order("sort_order"),
      db.from("enquiries").select("*", { count: "exact", head: true }).eq("handled", false)
    ]);

  const stats = [
    { label: "Projects", value: projectCount ?? 0, sub: `${publishedProjects ?? 0} live on the site`, href: "/projects" },
    { label: "Services", value: services?.length ?? 0, sub: `${services?.filter((s) => s.published).length ?? 0} live`, href: "/services" },
    { label: "New enquiries", value: enquiryCount ?? 0, sub: "awaiting a reply", href: "/inbox" }
  ];

  return (
    <>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 34 }}>Good morning, {admin.email.split("@")[0]}</h1>
        <p style={{ color: "var(--muted)", margin: "8px 0 0" }}>
          Everything you publish here appears on the live website straight away.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 34 }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card" style={{ padding: 22, textDecoration: "none" }}>
            <div style={{ fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)" }}>
              {s.label}
            </div>
            <div style={{ fontSize: 40, fontFamily: "Georgia, serif", lineHeight: 1.2, marginTop: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>{s.sub}</div>
          </Link>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 19, marginBottom: 4 }}>Add new work</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 0 }}>
            Upload a photo, write a caption, publish. It appears in the portfolio immediately.
          </p>
          <Link className="btn" href="/projects/new">New project</Link>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 19, marginBottom: 4 }}>Edit site wording</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 0 }}>
            Headlines, the about text, phone number and social links — no code needed.
          </p>
          <Link className="btn btn-ghost" href="/content">Open site copy</Link>
        </div>
      </div>
    </>
  );
}
