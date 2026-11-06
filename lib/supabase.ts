/**
 * Public, read-only Supabase access for the website.
 * Uses the anon key, so Row Level Security guarantees only published rows
 * and public site copy are ever visible.
 */
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const cmsConfigured = Boolean(URL && ANON);

export async function rest<T>(path: string, revalidate = 300): Promise<T | null> {
  if (!cmsConfigured) return null;
  try {
    const res = await fetch(`${URL}/rest/v1/${path}`, {
      headers: { apikey: ANON!, Authorization: `Bearer ${ANON!}` },
      next: { revalidate, tags: ["cms"] }
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
