import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = {
  metadataBase: new URL("https://mike-interiors.netlify.app"),
  title: { default: "Mike Interiors | Thoughtful Spaces, Beautiful Living", template: "%s | Mike Interiors" },
  description: "Mike Interiors creates considered interior spaces in Abraka, Delta State. Explore painting, wall finishes, ceilings, blinds and interior styling.",
  openGraph: { title: "Mike Interiors", description: "Good design for good moments.", type: "website", images: ["/icon.svg"] },
  robots: { index: true, follow: true }
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
