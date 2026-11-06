import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getContent } from "@/lib/content";

const FALLBACK_URL = "https://mike-interiors.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getContent();
  const siteUrl = (c["seo.site_url"] || FALLBACK_URL).replace(/\/$/, "");
  const title = c["seo.default_title"];
  const description = c["seo.default_description"];

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: "%s | Mike Interiors" },
    description,
    applicationName: c["site.name"],
    keywords: [
      "interior design Abraka",
      "interior finishing Delta State",
      "POP ceilings Nigeria",
      "TV feature walls",
      "wardrobes and storage",
      "wall panels and wallpaper",
      "Mike Interiors"
    ],
    authors: [{ name: c["site.name"] }],
    creator: c["site.name"],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: siteUrl,
      siteName: c["site.name"],
      title,
      description,
      images: [
        {
          url: `${siteUrl}/og-image.png`,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${c["site.name"]} — ${c["site.tagline"]}`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
      ],
      apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      shortcut: ["/favicon.ico"]
    },
    manifest: "/manifest.webmanifest",
    formatDetection: { telephone: true, address: true, email: true }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#24231f"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const c = await getContent();

  // Structured data helps Google show the business correctly for local searches.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${(c["seo.site_url"] || FALLBACK_URL).replace(/\/$/, "")}/#business`,
    name: c["site.name"],
    description: c["seo.default_description"],
    url: c["seo.site_url"] || FALLBACK_URL,
    telephone: c["site.phone"],
    image: `${(c["seo.site_url"] || FALLBACK_URL).replace(/\/$/, "")}/og-image.png`,
    priceRange: "₦₦",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abraka",
      addressRegion: "Delta State",
      addressCountry: "NG"
    },
    areaServed: [
      { "@type": "City", name: "Abraka" },
      { "@type": "State", name: "Delta State" },
      { "@type": "Country", name: "Nigeria" }
    ],
    sameAs: [c["site.instagram"], c["site.tiktok"]].filter(Boolean),
    knowsAbout: [
      "Interior finishing",
      "POP ceilings",
      "TV feature walls",
      "Wardrobes",
      "Wall panels",
      "Window styling"
    ]
  };

  return (
    <html lang="en-NG">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
