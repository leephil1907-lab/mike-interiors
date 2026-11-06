"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ImageField } from "@/components/image-field";

type Action = (state: { error?: string } | null, form: FormData) => Promise<{ error?: string } | void>;

export function ServiceForm({
  action,
  service
}: {
  action: Action;
  service?: {
    id: string;
    slug: string;
    number: string;
    title: string;
    summary: string;
    description: string;
    alt: string;
    image_path: string | null;
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
        <div className="card" style={{ padding: 26 }}>
          <label className="field">
            <span>Service title *</span>
            <input type="text" name="title" defaultValue={service?.title} required maxLength={160} />
          </label>

          <label className="field">
            <span>One-line summary</span>
            <textarea name="summary" defaultValue={service?.summary} maxLength={600} rows={2} />
            <small>Appears on the homepage grid under the service name.</small>
          </label>

          <label className="field">
            <span>Full description</span>
            <textarea name="description" defaultValue={service?.description} maxLength={6000} rows={8} />
            <small>Leave a blank line between paragraphs.</small>
          </label>

          <label className="field">
            <span>Image alt text</span>
            <input type="text" name="alt" defaultValue={service?.alt} maxLength={400} />
          </label>

          <div className="field">
            <span style={{ display: "block", fontSize: 12, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 7 }}>
              Photo
            </span>
            <ImageField initial={service?.image_path} />
          </div>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div className="card" style={{ padding: 22 }}>
            <h2 style={{ fontSize: 16, marginBottom: 16 }}>Publishing</h2>

            <label style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 16, fontSize: 14 }}>
              <input type="checkbox" name="published" defaultChecked={service?.published ?? true} />
              Visible on the website
            </label>

            <label className="field" style={{ marginBottom: 14 }}>
              <span>Display number</span>
              <input type="text" name="number" defaultValue={service?.number} maxLength={10} placeholder="01" />
            </label>

            <label className="field" style={{ marginBottom: 0 }}>
              <span>Display order</span>
              <input type="number" name="sort_order" defaultValue={service?.sort_order ?? 0} />
            </label>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <label className="field" style={{ marginBottom: 10 }}>
              <span>URL slug</span>
              <input type="text" name="slug" defaultValue={service?.slug} placeholder="auto-from-title" maxLength={160} />
            </label>
            {service && (
              <a
                href={`${process.env.NEXT_PUBLIC_SITE_URL}/services/${service.slug}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, color: "var(--brass)" }}
              >
                View on website ↗
              </a>
            )}
          </div>

          <button className="btn" style={{ justifyContent: "center" }} disabled={pending}>
            {pending ? "Saving…" : service ? "Save changes" : "Create service"}
          </button>
          <Link className="btn btn-ghost" href="/services" style={{ justifyContent: "center" }}>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
