import Link from "next/link";
import { requireAdmin } from "@/lib/guard";
import { NavLink } from "@/components/nav-link";
import { SignOutButton } from "@/components/sign-out";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();

  return (
    <div style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
      <header
        style={{
          borderBottom: "1px solid var(--line)",
          background: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 20
        }}
      >
        <div
          style={{
            maxWidth: 1180, margin: "0 auto", padding: "0 22px", height: 62,
            display: "flex", alignItems: "center", gap: 26
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span
              style={{
                width: 30, height: 30, border: "1px solid var(--ink)", display: "grid",
                placeItems: "center", fontFamily: "Georgia, serif", fontSize: 15
              }}
              aria-hidden
            >
              M
            </span>
            <strong style={{ fontSize: 14, letterSpacing: ".02em" }}>Mike Interiors</strong>
          </Link>

          <nav style={{ display: "flex", gap: 4, flex: 1, fontSize: 14 }}>
            <NavLink href="/">Overview</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/services">Services</NavLink>
            <NavLink href="/inbox">Inbox</NavLink>
            <NavLink href="/content">Site copy</NavLink>
          </nav>

          <a
            href={process.env.NEXT_PUBLIC_SITE_URL}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none" }}
          >
            View website ↗
          </a>
          <SignOutButton />
        </div>
      </header>

      <main style={{ flex: 1, maxWidth: 1180, width: "100%", margin: "0 auto", padding: "34px 22px 80px" }}>
        {children}
      </main>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "16px 22px", fontSize: 12, color: "var(--muted)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <span>Signed in as {admin.email}</span>
          <span>Private content studio · not indexed by search engines</span>
        </div>
      </footer>
    </div>
  );
}
