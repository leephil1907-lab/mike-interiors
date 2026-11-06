import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Serves /favicon.ico as a stable, unhashed URL with a long cache lifetime.
 *
 * Next's metadata `icons` array emits query-string versions for some crawlers,
 * and several social/link-preview bots drop icons that carry a query string.
 * A fixed route removes that class of failure entirely.
 */
export const dynamic = "force-static";

export async function GET() {
  const file = await readFile(path.join(process.cwd(), "public", "favicon.ico"));
  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "image/x-icon",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
