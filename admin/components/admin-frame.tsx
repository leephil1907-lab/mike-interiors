"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { SignOutButton } from "@/components/sign-out";
import { BrandLockup } from "@/components/brand";

const links = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/inbox", label: "Inbox" },
  { href: "/content", label: "Site copy" }
];

export function AdminFrame({ email, children }: { email: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <div className="dash-shell">
      <header className="dash-header">
        <div className="dash-header-inner">
          <BrandLockup />

          <nav className="dash-nav" aria-label="Studio sections">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="dash-header-actions">
            {siteUrl && (
              <a
                className="dash-view-site"
                href={siteUrl}
                target="_blank"
                rel="noreferrer"
                title="Open the public website"
              >
                View website <ExternalLink size={13} aria-hidden />
              </a>
            )}
            <SignOutButton />
          </div>

          <button
            type="button"
            className="dash-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="dash-mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <nav className="dash-mobile-nav" id="dash-mobile-nav" aria-label="Studio sections">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ))}
            {siteUrl && (
              <a href={siteUrl} target="_blank" rel="noreferrer">
                View website <ExternalLink size={14} aria-hidden />
              </a>
            )}
            <div className="dash-mobile-signout">
              <SignOutButton />
            </div>
          </nav>
        )}
      </header>

      <main className="dash-main">{children}</main>

      <footer className="dash-footer">
        <div className="dash-footer-inner">
          <span>Signed in as {email}</span>
          <span>Private studio · not indexed by search engines</span>
        </div>
      </footer>
    </div>
  );
}
