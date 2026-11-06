"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      style={{
        padding: "8px 12px",
        borderRadius: 7,
        textDecoration: "none",
        background: active ? "#f1ece4" : "transparent",
        color: active ? "var(--ink)" : "var(--muted)",
        fontWeight: active ? 600 : 400
      }}
    >
      {children}
    </Link>
  );
}
