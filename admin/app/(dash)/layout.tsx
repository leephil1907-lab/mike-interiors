import { requireAdmin } from "@/lib/guard";
import { AdminFrame } from "@/components/admin-frame";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  return <AdminFrame email={admin.email}>{children}</AdminFrame>;
}
