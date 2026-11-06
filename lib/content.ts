import { rest } from "@/lib/supabase";

export type SiteContent = Record<string, string>;

type Row = { key: string; value: string; group_name: string; sort_order: number };

/**
 * All editable copy as a flat key → value map, with hard-coded fallbacks so the
 * site renders correctly even before the CMS is connected.
 */
export const contentDefaults: SiteContent = {
  "site.name": "Mike Interiors",
  "site.tagline": "Good design for good moments.",
  "site.phone": "+234 703 620 6407",
  "site.phone_link": "+2347036206407",
  "site.whatsapp": "2347036206407",
  "site.email": "",
  "site.address": "Abraka, Delta State, Nigeria",
  "site.instagram": "https://www.instagram.com/mike_interiors6/",
  "site.tiktok": "https://www.tiktok.com/@mikeswage",
  "home.gallery_heading": "Spaces, finishes and moments.",
  "home.gallery_intro":
    "Explore our interior designs and project walkthroughs — from considered feature walls to the details that make a space feel complete.",
  "home.intro_eyebrow": "The art of considered living",
  "home.intro_heading": "Spaces that feel personal. Details that stay with you.",
  "home.approach_eyebrow": "The Mike Interiors approach",
  "home.approach_heading": "A beautiful space should feel as good as it looks.",
  "home.approach_body":
    "Good interiors are more than decoration. They bring together comfort, function, texture and personality. We help you make thoughtful choices, from the first wall finish to the final detail.",
  "home.services_heading": "The details that bring a room together.",
  "home.cta_eyebrow": "Your next chapter starts here",
  "home.cta_heading": "Let's make space for something beautiful.",
  "about.intro": "We believe the best interiors balance beauty with the way people really live.",
  "about.heading": "Make it beautiful. Make it work.",
  "about.body_1":
    "Mike Interiors is an interior finishing and styling business based in Abraka, Delta State. Our work brings together colour, texture, architectural details and practical choices to help create spaces that feel considered and personal.",
  "about.body_2":
    "From painting and wallpaper to POP ceilings, wall panels, consoles, blinds and finishing touches, we focus on the details that make a room feel complete.",
  "seo.default_title": "Mike Interiors | Thoughtful Spaces, Beautiful Living",
  "seo.default_description":
    "Mike Interiors creates considered interior spaces in Abraka, Delta State. Explore painting, wall finishes, ceilings, blinds and interior styling.",
  "seo.site_url": "https://mike-interiors.vercel.app"
};

export async function getContent(): Promise<SiteContent> {
  const rows = await rest<Row[]>("site_content?select=key,value,group_name,sort_order");
  const content: SiteContent = { ...contentDefaults };
  if (rows) {
    for (const row of rows) {
      if (row.value?.trim()) content[row.key] = row.value;
    }
  }
  return content;
}

/** Convenience: fetch a single key with its fallback. */
export async function t(key: string): Promise<string> {
  const c = await getContent();
  return c[key] ?? contentDefaults[key] ?? "";
}

/** Turns a stored value into display lines, respecting manual line breaks. */
export function lines(value: string): string[] {
  return value.split(/\n|<br\s*\/?>/i).map((s) => s.trim()).filter(Boolean);
}
