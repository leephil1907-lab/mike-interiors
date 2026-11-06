import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page could not be found. Explore Mike Interiors' projects, services and design ideas instead.",
  robots: { index: false, follow: true }
};

const SUGGESTIONS = [
  { href: "/work", label: "Portfolio", note: "Selected projects and finishes" },
  { href: "/services", label: "Services", note: "What we can do for your space" },
  { href: "/design-ideas", label: "Notebook", note: "Concepts and finishing references" },
  { href: "/contact", label: "Contact", note: "Discuss your project with us" }
];

export default function NotFound() {
  return (
    <main className="nf">
      <div className="nf-grid">
        <div className="nf-copy">
          <span className="nf-code" aria-hidden="true">404</span>

          <span className="eyebrow">Page not found</span>

          <h1 className="serif nf-heading">
            This room
            <br />
            doesn&rsquo;t exist.
          </h1>

          <p className="body-copy nf-body">
            The page you were looking for has been moved, renamed, or was never finished.
            Let&rsquo;s get you back to somewhere worth standing in.
          </p>

          <div className="nf-actions">
            <Link href="/" className="btn-dark">
              <ArrowLeft size={15} /> Back to homepage
            </Link>
            <Link href="/work" className="btn-line">
              Explore our work <ArrowUpRight size={15} />
            </Link>
          </div>

          <nav className="nf-links" aria-label="Suggested pages">
            {SUGGESTIONS.map((s) => (
              <Link key={s.href} href={s.href} className="nf-link">
                <span className="nf-link-label">
                  {s.label}
                  <ArrowUpRight size={13} aria-hidden />
                </span>
                <span className="nf-link-note">{s.note}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="nf-visual" aria-hidden="true">
          <div className="nf-frame">
            <Image
              src="/images/projects/thumb/wardrobe-glass-led.webp"
              alt=""
              fill
              sizes="(max-width:900px) 100vw, 45vw"
              className="image-cover nf-image"
              priority
            />
            <span className="nf-scrim" />
            <span className="nf-caption">Mike Interiors — Abraka, Delta State</span>
          </div>
        </div>
      </div>
    </main>
  );
}
