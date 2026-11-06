"use client";

import { useState, useRef } from "react";
import { createBrowserClient } from "@supabase/ssr";

const MAX_MB = 10;

/**
 * Uploads straight to Supabase Storage and stores the resulting public URL in
 * a hidden input, so the parent form just submits a string.
 */
export function ImageField({
  name = "image_path",
  initial
}: {
  name?: string;
  initial?: string | null;
}) {
  const [value, setValue] = useState(initial ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    setError(null);

    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`That file is ${(file.size / 1024 / 1024).toFixed(1)}MB. Please keep images under ${MAX_MB}MB.`);
      return;
    }

    setBusy(true);
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safe = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 50);
    const path = `${Date.now()}-${safe || "image"}.${ext}`;

    const { error: upErr } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: file.type
    });

    if (upErr) {
      setError(`Upload failed: ${upErr.message}`);
      setBusy(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setValue(data.publicUrl);
    setBusy(false);
  }

  return (
    <div>
      <input type="hidden" name={name} value={value} />

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div
          style={{
            width: 168, height: 126, borderRadius: 8, overflow: "hidden",
            background: "#eee9e1", border: "1px solid var(--line)", flexShrink: 0,
            display: "grid", placeItems: "center", fontSize: 12, color: "var(--muted)"
          }}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Selected image preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            "No image yet"
          )}
        </div>

        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
            </button>
            {value && (
              <button type="button" className="btn btn-danger" onClick={() => setValue("")}>
                Remove
              </button>
            )}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 12.5, margin: "10px 0 0" }}>
            JPG, PNG, WebP or AVIF up to {MAX_MB}MB. Landscape photos around 1600px wide look best.
          </p>
          {error && <p style={{ color: "var(--danger)", fontSize: 13, margin: "8px 0 0" }}>{error}</p>}

          <label className="field" style={{ marginTop: 14, marginBottom: 0 }}>
            <span>Or paste an image URL</span>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="https://… or /images/projects/thumb/example.webp"
            />
          </label>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) upload(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
