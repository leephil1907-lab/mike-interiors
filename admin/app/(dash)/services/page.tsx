import Link from "next/link";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";

export const metadata = { title: "Services · Mike Interiors Admin" };

export default async function ServicesPage({
  searchParams
}: {
  searchParams: Promise<{ deleted?: string }>;
}) {
  await requireAdmin();
  const { deleted } = await searchParams;
  const db = getAdminClient();
  const { data: services } = await db
    .from("services")
    .select("id,slug,number,title,summary,published,sort_order")
    .order("sort_order", { ascending: true });

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Services</h1>
          <p className="page-sub">These power the homepage grid and each service page.</p>
        </div>
        <Link className="btn" href="/services/new">New service</Link>
      </div>

      {deleted && <div className="banner banner-ok">Service deleted.</div>}

      <div className="card">
        {!services?.length && <p style={{ padding: 26, color: "var(--muted)" }}>No services yet.</p>}
        {services?.map((s) => (
          <div
            key={s.id}
            style={{
              display: "grid", gridTemplateColumns: "1fr auto", gap: 16,
              alignItems: "center", padding: "15px 18px", borderBottom: "1px solid var(--line)"
            }}
          >
            <div style={{ minWidth: 0 }}>
              <Link href={`/services/${s.id}`} style={{ textDecoration: "none", fontWeight: 600, fontSize: 15 }}>
                <span style={{ color: "var(--brass)", marginRight: 9, fontFamily: "Georgia, serif" }}>{s.number}</span>
                {s.title}
              </Link>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>
                /services/{s.slug} · {s.published ? "live" : "hidden"}
              </div>
            </div>
            <Link className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} href={`/services/${s.id}`}>
              Edit
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
