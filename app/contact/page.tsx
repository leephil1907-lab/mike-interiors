import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { getContent } from "@/lib/content";
import { pageOg } from "@/lib/social";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Book a consultation with Mike Interiors in Abraka, Delta State. Tell us about your space and we'll discuss finishes, ceilings, feature walls and styling.",
  alternates: { canonical: "/contact" },
  ...pageOg({
    title: "Contact & Enquiries",
    description:
      "Book a consultation with Mike Interiors in Abraka, Delta State. Tell us about your space and we'll discuss finishes, ceilings, feature walls and styling.",
    path: "/contact"
  })
};

export default async function Contact() {
  const c = await getContent();
  return (
    <ContactForm
      phone={c["site.phone"]}
      phoneLink={c["site.phone_link"]}
      whatsapp={c["site.whatsapp"]}
    />
  );
}
