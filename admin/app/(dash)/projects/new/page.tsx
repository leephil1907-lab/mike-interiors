import { requireAdmin } from "@/lib/guard";
import { createProject } from "@/lib/actions";
import { ProjectForm } from "@/components/project-form";

export const metadata = { title: "New project · Mike Interiors Admin" };

export default async function NewProject() {
  await requireAdmin();

  async function action(_prev: { error?: string } | null, form: FormData) {
    "use server";
    return createProject(form);
  }

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 24 }}>New project</h1>
      <ProjectForm action={action} />
    </>
  );
}
