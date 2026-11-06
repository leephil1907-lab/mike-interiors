import Link from "next/link";
import { ArrowUpRight, Phone, MapPin, Clock } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";
import { SocialLinks } from "@/components/social-links";
import { getContent, lines } from "@/lib/content";
import { getServices } from "@/lib/services";

export async function SiteFooter() {
  const [c, services] = await Promise.all([getContent(), getServices()]);
  const phone = c["site.phone"];
  const phoneLink = c["site.phone_link"];
  const whatsapp = c["site.whatsapp"];
  const tagline = lines(c["site.tagline"])[0] ?? "Good design for good moments.";

  const exploreLinks = [
    { href: "/work", label: "Portfolio" },
    { href: "/services", label: "Services" },
    { href: "/design-ideas", label: "Notebook" },
    { href: "/videos", label: "Videos" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-copy">
            <span className="eyebrow">Prefer to talk?</span>
            <a className="footer-cta-phone" href={`tel:${phoneLink}`}>
              <Phone size={17} aria-hidden /> {phone}
            </a>
          </div>
          <div className="footer-cta-actions">
            <a
              className="footer-cta-btn"
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp <ArrowUpRight size={15} />
            </a>
            <Link className="footer-whatsapp" href="/contact">
              Or send an enquiry
            </Link>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <BrandLogo />
            <p className="footer-blurb">
              Interior finishing and styling in Abraka, Delta State — feature walls, ceilings, wardrobes,
              window styling and the details that make a room feel complete.
            </p>
            <p className="footer-tagline">{tagline}</p>
            <SocialLinks className="footer-socials" instagram={c["site.instagram"]} tiktok={c["site.tiktok"]} />
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul className="footer-links">
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Get in touch</h4>
            <ul className="footer-links footer-contact">
              <li>
                <a href={`tel:${phoneLink}`}>
                  <Phone size={14} aria-hidden /> {phone}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight size={14} aria-hidden /> WhatsApp us
                </a>
              </li>
              <li>
                <span>
                  <MapPin size={14} aria-hidden /> Abraka, Delta State
                </span>
              </li>
              <li>
                <span>
                  <Clock size={14} aria-hidden /> Mon – Sat, 9am – 6pm
                </span>
              </li>
            </ul>
            <p className="footer-area">
              Serving Abraka and clients across Delta State, including Warri, Ughelli and Asaba.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Mike Interiors. All rights reserved.</span>
          <span className="footer-bottom-links">
            <Link href="/work">Portfolio</Link>
            <Link href="/contact">Book a consultation</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
