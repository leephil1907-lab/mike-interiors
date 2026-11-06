import { redirect } from "next/navigation";
import { getSupabaseSessionClient, getAdminClient } from "@/lib/supabase-server";

export type AdminUser = { id: string; email: string };

/**
 * The single gate for every private page and server action.
 * 1. There must be a valid Supabase session.
 * 2. That user's email must be present in public.admin_users.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const supabase = await getSupabaseSessionClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) redirect("/login");

  const admin = getAdminClient();
  const { data } = await admin
    .from("admin_users")
    .select("email")
    .ilike("email", user.email)
    .maybeSingle();

  if (!data) {
    await supabase.auth.signOut();
    redirect("/login?error=not_allowed");
  }

  return { id: user.id, email: user.email };
}
