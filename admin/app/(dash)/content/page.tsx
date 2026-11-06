import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { saveContent } from "@/lib/actions";

export const metadata = { title: "Site copy · Mike Interiors Admin" };

const GROUPS: { id: string; title: string; blurb: string }[] = [
  { id: "brand", title: "Brand", blurb: "Business name and tagline." },
  { id: "contact", title: "Contact details", blurb: "Phone, address and social profiles." },
  { id: "home", title: "Homepage", blurb: "Headlines and paragraphs on the home page." },
  { id: "about", title: "About page", blurb: "The story and philosophy text." },
  { id: "seo", title: "Search engine listing", blurb: "Title and description shown on Google." }
];

export default async function ContentPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const { saved, error } = await searchParams;

  const db = getAdminClient();
  const { data: rows } = await db
    .from("site_content")
    .select("key,value,label,group_name,multiline,sort_order")
    .order("sort_order", { ascending: true });

  const missing = GROUPS.filter((g) => !rows?.some((r) => r.group_name === g.id));

  return (
    <>
      <div className="page-head" style={{ marginBottom: 20 }}>
        <div>
          <h1>Site copy</h1>
          <p className="page-sub">Edit the words on the website without touching code. Changes go live on save.</p>
        </div>
      </div>

      {saved && <div className="banner banner-ok">Copy updated and published.</div>}
      {error && <div className="banner banner-err">{decodeURIComponent(error)}</div>}

      <form action={saveContent}>
        {GROUPS.map((group) => {
          const items = rows?.filter((r) => r.group_name === group.id) ?? [];
          if (!items.length) return null;

          return (
            <section key={group.id} className="card" style={{ padding: 26, marginBottom: 18 }}>
              <h2 style={{ fontSize: 20 }}>{group.title}</h2>
              <p style={{ color: "var(--muted)", fontSize: 13.5, margin: "5px 0 20px" }}>{group.blurb}</p>

              {items.map((item) => (
                <label className="field" key={item.key}>
                  <span>{item.label || item.key}</span>
                  {item.multiline ? (
                    <textarea name={`content:${item.key}`} defaultValue={item.value} rows={3} />
                  ) : (
                    <input type="text" name={`content:${item.key}`} defaultValue={item.value} />
                  )}
                  <small>{item.key}</small>
                </label>
              ))}
            </section>
          );
        })}

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn">Save all changes</button>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>
            {rows?.length ?? 0} editable fields
          </span>
        </div>
      </form>

      {missing.length > 0 && (
        <p style={{ marginTop: 24, fontSize: 13, color: "var(--muted)" }}>
          No fields found for: {missing.map((m) => m.title).join(", ")}.
        </p>
      )}
    </>
  );
}
