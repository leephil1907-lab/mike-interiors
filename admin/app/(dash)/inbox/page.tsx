import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { markEnquiryHandled, deleteEnquiry } from "@/lib/actions";

export const metadata = { title: "Enquiries · Mike Interiors Admin" };

export default async function Inbox({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  await requireAdmin();
  const { filter } = await searchParams;
  const db = getAdminClient();

  let query = db
    .from("enquiries")
    .select("id,name,email,phone,service,message,created_at,handled")
    .order("created_at", { ascending: false })
    .limit(200);
  if (filter === "new") query = query.eq("handled", false);

  const { data: enquiries } = await query;
  const unread = enquiries?.filter((e) => !e.handled).length ?? 0;

  return (
    <>
      <div className="page-head">
        <div>
          <h1>Enquiries</h1>
          <p className="page-sub">
            {enquiries?.length ?? 0} total · {unread} awaiting a reply
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a className="btn btn-ghost" style={{ padding: "7px 13px", fontSize: 13 }} href="/inbox">All</a>
          <a className="btn btn-ghost" style={{ padding: "7px 13px", fontSize: 13 }} href="/inbox?filter=new">Unhandled</a>
        </div>
      </div>

      {!enquiries?.length && (
        <div className="card" style={{ padding: 30 }}>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            No enquiries yet. Submissions from the website contact form appear here.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {enquiries?.map((e) => (
          <article key={e.id} className="card" style={{ padding: 20, borderLeft: e.handled ? "1px solid var(--line)" : "3px solid var(--brass)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 12 }}>
              <div>
                <strong style={{ fontSize: 15 }}>{e.name}</strong>
                {e.service && <span style={{ color: "var(--muted)", fontSize: 13 }}> · {e.service}</span>}
                <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>
                  {new Date(e.created_at).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                  {e.phone && <> · <span style={{ color: "var(--ink)" }}>{e.phone}</span></>}
                  {e.email && <> · {e.email}</>}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {e.phone && <a className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} href={`tel:${e.phone}`}>Call</a>}
                {e.phone && (
                  <a className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} href={`https://wa.me/${e.phone.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer">WhatsApp</a>
                )}
                {e.email && <a className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }} href={`mailto:${e.email}`}>Email</a>}
                <form action={markEnquiryHandled}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="next" value={String(!e.handled)} />
                  <button className="btn btn-ghost" style={{ padding: "6px 12px", fontSize: 12.5 }}>
                    {e.handled ? "Mark unread" : "Mark handled"}
                  </button>
                </form>
                <form action={deleteEnquiry}>
                  <input type="hidden" name="id" value={e.id} />
                  <button className="btn btn-danger" style={{ padding: "6px 12px", fontSize: 12.5 }}>Delete</button>
                </form>
              </div>
            </div>
            <p style={{ whiteSpace: "pre-wrap", margin: 0, fontSize: 14, lineHeight: 1.6 }}>{e.message}</p>
          </article>
        ))}
      </div>
    </>
  );
}
