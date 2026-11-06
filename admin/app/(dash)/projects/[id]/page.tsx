import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/guard";
import { getAdminClient } from "@/lib/supabase-server";
import { updateProject, deleteProject } from "@/lib/actions";
import { ProjectForm } from "@/components/project-form";

export const metadata = { title: "Edit project · Mike Interiors Admin" };

export default async function EditProject({
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
  const { data: project } = await db.from("projects").select("*").eq("id", id).maybeSingle();
  if (!project) notFound();

  async function action(_prev: { error?: string } | null, form: FormData) {
    "use server";
    return updateProject(id, form);
  }

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <h1 style={{ fontSize: 30 }}>Edit project</h1>
        <form action={deleteProject}>
          <input type="hidden" name="id" value={project.id} />
          <button
            className="btn btn-danger"
            style={{ padding: "8px 14px", fontSize: 13 }}
            formNoValidate
          >
            Delete project
          </button>
        </form>
      </div>

      {saved && <div className="banner banner-ok">Changes saved and published.</div>}

      <ProjectForm action={action} project={project} />
    </>
  );
}
