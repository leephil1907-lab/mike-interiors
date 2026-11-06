import { requireAdmin } from "@/lib/guard";
import { createService } from "@/lib/actions";
import { ServiceForm } from "@/components/service-form";

export const metadata = { title: "New service · Mike Interiors Admin" };

export default async function NewService() {
  await requireAdmin();

  async function action(_prev: { error?: string } | null, form: FormData) {
    "use server";
    return createService(form);
  }

  return (
    <>
      <h1 style={{ fontSize: 30, marginBottom: 24 }}>New service</h1>
      <ServiceForm action={action} />
    </>
  );
}
