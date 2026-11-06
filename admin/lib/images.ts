/**
 * Resolves a stored project/service image_path for the studio.
 *
 * Projects saved from this studio store paths relative to the PUBLIC SITE
 * (e.g. "/images/projects/thumb/wall.webp"), because that is what the website
 * needs. Those paths do not exist inside the admin app, which is why the
 * thumbnails rendered as broken-image placeholders.
 *
 * Absolute URLs (Supabase Storage uploads) are returned untouched.
 */
export function adminImageSrc(
  path: string | null | undefined,
  opts: { hasFile?: boolean } = {}
): string | null {
  if (!path || !path.trim()) return null;
  const value = path.trim();
  if (/^https?:\/\//i.test(value) || value.startsWith("data:")) return value;

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "");

  // A relative site path is only usable when we know the public site's origin.
  if (siteUrl) return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;

  // No site URL configured: fall back to a local copy if one exists,
  // otherwise let the caller render the neutral placeholder.
  return opts.hasFile ? value : null;
}
