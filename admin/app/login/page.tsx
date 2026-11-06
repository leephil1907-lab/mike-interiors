import { LoginForm } from "./login-form";

export const metadata = { title: "Sign in · Mike Interiors Admin" };

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "linear-gradient(160deg,#f7f5f1 0%,#efeae2 100%)"
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 46, height: 46, margin: "0 auto 16px", border: "1px solid var(--ink)",
              display: "grid", placeItems: "center", fontFamily: "Georgia, serif", fontSize: 22
            }}
            aria-hidden
          >
            M
          </div>
          <h1 style={{ fontSize: 27 }}>Mike Interiors</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "6px 0 0" }}>
            Content studio — authorised staff only
          </p>
        </div>

        <div className="card" style={{ padding: 26 }}>
          {error === "not_allowed" && (
            <div className="banner banner-err">
              That account is not on the admin allowlist. Ask the site owner to add you.
            </div>
          )}
          <LoginForm />
        </div>

        <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, marginTop: 22 }}>
          This area is private. Sign-in attempts are rate limited by Supabase.
        </p>
      </div>
    </main>
  );
}
