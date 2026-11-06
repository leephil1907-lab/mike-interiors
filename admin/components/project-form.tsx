"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ImageField } from "@/components/image-field";

type Action = (state: { error?: string } | null, form: FormData) => Promise<{ error?: string } | void>;

export function ProjectForm({
  action,
  project
}: {
  action: Action;
  project?: {
    id: string;
    slug: string;
    title: string;
    category: string;
    description: string;
    alt: string;
    status: string;
    image_path: string | null;
    featured: boolean;
    published: boolean;
    sort_order: number;
  };
}) {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, form: FormData) => {
      const res = await action(_prev, form);
      return (res as { error?: string }) ?? null;
    },
    null
  );

  return (
    <form action={formAction}>
      {state?.error && <div className="banner banner-err">{state.error}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 300px", gap: 22, alignItems: "start" }}>
        {/* Main column */}
        <div className="card" style={{ padding: 26 }}>
          <label className="field">
            <span>Project title *</span>
            <input type="text" name="title" defaultValue={project?.title} required maxLength={160} />
            <small>Shown as the main caption under the photo.</small>
          </label>

          <label className="field">
            <span>Category *</span>
            <input
              type="text"
              name="category"
              defaultValue={project?.category}
              required
              maxLength={80}
              list="categories"
            />
            <datalist id="categories">
              <option value="Living & TV walls" />
              <option value="Wardrobes & storage" />
              <option value="Bedrooms" />
              <option value="Finishes & details" />
            </datalist>
          </label>

          <label className="field">
            <span>Short description</span>
            <textarea name="description" defaultValue={project?.description} maxLength={2000} rows={3} />
          </label>

          <label className="field">
            <span>Image alt text</span>
            <input type="text" name="alt" defaultValue={project?.alt} maxLength={400} />
            <small>
              Describe the photo for screen readers and Google Images, e.g. “Tan gloss TV wall with floating
              console and amber-lit niche”.
            </small>
          </label>

          <div className="field">
            <span style={{ display: "block", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 7 }}>
              Photo
            </span>
            <ImageField initial={project?.image_path} />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "grid", gap: 16 }}>
          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>Publishing</h2>

            <label style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 12, fontSize: 14 }}>
              <input type="checkbox" name="published" defaultChecked={project?.published ?? true} />
              Visible on the website
            </label>

            <label style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 16, fontSize: 14 }}>
              <input type="checkbox" name="featured" defaultChecked={project?.featured ?? false} />
              Feature on the homepage
            </label>

            <label className="field" style={{ marginBottom: 0 }}>
              <span>Display order</span>
              <input type="number" name="sort_order" defaultValue={project?.sort_order ?? 0} />
              <small>Lower numbers appear first.</small>
            </label>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <label className="field" style={{ marginBottom: 10 }}>
              <span>URL slug</span>
              <input type="text" name="slug" defaultValue={project?.slug} placeholder="auto-from-title" maxLength={160} />
              <small>Leave blank to generate from the title.</small>
            </label>
            {project && (
              <a
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/work/${project.slug}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, color: "var(--brass)" }}
              >
                View on website ↗
              </a>
            )}
          </div>

          <button className="btn" style={{ justifyContent: "center" }} disabled={pending}>
            {pending ? "Saving…" : project ? "Save changes" : "Create project"}
          </button>
          <Link className="btn btn-ghost" href="/projects" style={{ justifyContent: "center" }}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
