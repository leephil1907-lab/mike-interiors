import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { updateService, deleteService } from "@/lib/actions";
import { ServiceForm } from "@/components/service-form";

export const metadata = { title: "Edit service · Mike Interiors Admin" };

export default async function EditService({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const { saved } = await searchParams;

  const db = getAdminClient();
  const { data: service } = await db.from("services").select("*").eq("id", id).maybeSingle();
  if (!service) notFound();

  async function action(_prev: { error?: string } | null, form: FormData) {
    "use server";
    return updateService(id, form);
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 30 }}>Edit service</h1>
        <form action={deleteService}>
          <input type="hidden" name="id" value={service.id} />
          <button className="btn btn-danger" style={{ padding: "8px 14px", fontSize: 13 }} formNoValidate>
            Delete service
          </button>
        </form>
      </div>

      {saved && <div className="banner banner-ok">Changes saved and published.</div>}

      <ServiceForm action={action} service={service} />
    </>
  );
}
