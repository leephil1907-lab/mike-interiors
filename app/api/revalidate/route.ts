import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Called by the admin studio after an edit so the public site refreshes
 * immediately instead of waiting for the ISR window.
 * Protected by a shared secret so it can't be used to hammer the cache.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get("x-revalidate-secret");

  if (!secret) {
    return NextResponse.json({ ok: false, error: "Not configured" }, { status: 503 });
  }
  if (provided !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const path = url.searchParams.get("path");

  revalidateTag("cms");
  if (path) revalidatePath(path);
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/services");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true, revalidated: path ?? "all" });
}
