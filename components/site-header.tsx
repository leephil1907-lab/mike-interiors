"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const serviceLinks = [
  ["Painting & finishes", "/services/painting-finishes"],
  ["Wallpaper & wall panels", "/services/wallpaper-wall-panels"],
  ["POP ceilings", "/services/pop-ceilings"],
  ["TV consoles & feature walls", "/services/tv-consoles-feature-walls"],
  ["Blinds & window styling", "/services/blinds-window-styling"],
  ["Interior styling", "/services/interior-styling"],
] as const;

const exploreLinks = [
  ["About Mike Interiors", "/about"],
  ["How we work", "/#approach"],
  ["Design notebook", "/design-ideas"],
  ["Project videos", "/videos"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<"services" | "explore" | null>(null);
  const [dropdown, setDropdown] = useState<"services" | "explore" | null>(null);
  const pathname = usePathname();
  const home = pathname === "/";

  useEffect(() => {
    setOpen(false);
    setMobileGroup(null);
    setDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (!open && !dropdown) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDropdown(null);
        setMobileGroup(null);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open, dropdown]);

  const toggleDropdown = (name: "services" | "explore") => {
    setDropdown((current) => current === name ? null : name);
  };

  return (
    <header className={`site-header ${home ? "site-header-overlay" : "site-header-solid"}`}>
      <BrandLogo light={home} />
      <nav className="nav-links" aria-label="Main navigation">
        <Link href="/work" aria-current={pathname.startsWith("/work") ? "page" : undefined}>Portfolio</Link>
        <div className={`nav-dropdown ${dropdown === "services" ? "is-open" : ""}`}>
          <button type="button" className="nav-dropdown-trigger" aria-expanded={dropdown === "services"} aria-controls="services-dropdown" onClick={() => toggleDropdown("services")}>
            Services <ChevronDown size={14} aria-hidden="true" />
          </button>
          {dropdown === "services" && (
            <div className="nav-dropdown-panel services-dropdown" id="services-dropdown">
              <div className="dropdown-intro"><span>WHAT WE DO</span><strong>Considered details.<br />Beautifully finished spaces.</strong><Link href="/services" onClick={() => setDropdown(null)}>Explore all services <ArrowUpRight size={14} /></Link></div>
              <div className="dropdown-link-grid">{serviceLinks.map(([label, href], index) => <Link key={href} href={href} onClick={() => setDropdown(null)}><small>0{index + 1}</small>{label}<ArrowUpRight size={13} /></Link>)}</div>
            </div>
          )}
        </div>
        <div className={`nav-dropdown ${dropdown === "explore" ? "is-open" : ""}`}>
          <button type="button" className="nav-dropdown-trigger" aria-expanded={dropdown === "explore"} aria-controls="explore-dropdown" onClick={() => toggleDropdown("explore")}>
            Discover <ChevronDown size={14} aria-hidden="true" />
          </button>
          {dropdown === "explore" && <div className="nav-dropdown-panel explore-dropdown" id="explore-dropdown">{exploreLinks.map(([label, href]) => <Link key={href} href={href} onClick={() => setDropdown(null)}>{label}<ArrowUpRight size={14} /></Link>)}</div>}
        </div>
        <Link href="/contact" className="nav-enquire" aria-current={pathname === "/contact" ? "page" : undefined}>Discuss your project <ArrowUpRight size={13} /></Link>
      </nav>

      <button className="mobile-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-site-navigation">{open ? <X /> : <Menu />}</button>

      {open && (
        <nav className="mobile-nav" id="mobile-site-navigation" aria-label="Mobile navigation">
          <Link href="/work">Portfolio <ArrowUpRight size={15} /></Link>
          <section className="mobile-nav-group">
            <button type="button" onClick={() => setMobileGroup(mobileGroup === "services" ? null : "services")} aria-expanded={mobileGroup === "services"}>Services <ChevronDown size={16} /></button>
            {mobileGroup === "services" && <div className="mobile-nav-submenu"><Link href="/services">All services</Link>{serviceLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>}
          </section>
          <section className="mobile-nav-group">
            <button type="button" onClick={() => setMobileGroup(mobileGroup === "explore" ? null : "explore")} aria-expanded={mobileGroup === "explore"}>Discover <ChevronDown size={16} /></button>
            {mobileGroup === "explore" && <div className="mobile-nav-submenu">{exploreLinks.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>}
          </section>
          <Link href="/contact" className="mobile-nav-contact">Start a conversation <ArrowUpRight size={16} /></Link>
        </nav>
      )}
      {dropdown && <button className="nav-dropdown-dismiss" aria-label="Close navigation dropdown" onClick={() => setDropdown(null)} />}
    </header>
  );
}
