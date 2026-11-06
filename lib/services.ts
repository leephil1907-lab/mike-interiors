import { rest } from "@/lib/supabase";
import { imageSrc, projectImageBase } from "@/lib/projects";

export type InteriorService = {
  number: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image: string;
  alt: string;
  scope: string[];
  note: string;
};

export const serviceImageBase = projectImageBase;

type ServiceRow = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  alt: string;
  image_path: string | null;
};

export const fallbackServices: InteriorService[] = [
  { number: "01", title: "Painting & finishes", slug: "painting-finishes", summary: "Colour, texture and finish choices that give a room its character.", description: "From refreshing a room to bringing a new palette together, thoughtful painting and finishing choices help create a space that feels cohesive, welcoming and personal.", image: "living-ring-chandelier.webp", alt: "Finished living room with coordinated wall finishes and a ring chandelier", scope: ["Interior and exterior painting", "Colour direction and sample boards", "Surface preparation and repair", "Decorative and specialist finishes"], note: "The right finish starts with the room, the light and how you use the space." },
  { number: "02", title: "Wallpaper & wall panels", slug: "wallpaper-wall-panels", summary: "Feature walls and textured surfaces that add depth and definition.", description: "Wallpaper and wall panels can bring structure, texture and a distinctive focal point to a room. We help shape a direction that works with the surrounding furniture, lighting and finishes.", image: "living-slat-wall.webp", alt: "Dark slatted feature wall with warm wood TV panel and floating console", scope: ["Feature wallpaper installation", "Fluted and slatted panels", "Wall mouldings and trims", "Marble-look and specialist surfaces"], note: "A feature wall should belong to the room—not compete with everything around it." },
  { number: "03", title: "POP ceilings", slug: "pop-ceilings", summary: "Ceiling details that frame a room and work with its lighting.", description: "A well-considered POP ceiling can define zones, introduce architectural detail and complement the lighting plan. We focus on how the ceiling relates to the proportions and atmosphere of the room.", image: "pop-ceiling-in-progress.webp", alt: "POP ceiling installation in progress showing stepped plasterwork and framing", scope: ["Cove and step ceilings", "Concealed LED lighting detail", "Ceiling roses and cornices", "Repairs to existing plasterwork"], note: "Ceiling details are planned as part of the whole interior, not as an afterthought." },
  { number: "04", title: "TV consoles & feature walls", slug: "tv-consoles-feature-walls", summary: "Functional focal points shaped around your room and everyday living.", description: "A TV wall can combine display, storage, surface finishes and lighting in one carefully composed feature. We consider the available wall, the room layout and the balance between practical use and visual impact.", image: "tv-wall-tan-gloss.webp", alt: "Tan gloss TV feature wall with floating console and illuminated display niche", scope: ["Floating consoles and plinths", "Panel and slat feature walls", "Integrated LED lighting", "Display niches and shelving"], note: "The best focal points feel integrated with the room and useful every day." },
  { number: "05", title: "Blinds & window styling", slug: "blinds-window-styling", summary: "Window treatments that balance privacy, light and softness.", description: "Window styling changes the feel of a room. From blinds to layered curtains and sheers, the aim is to balance privacy, daylight, proportion and the wider interior palette.", image: "curtains-grey-sheer.webp", alt: "Grey curtains layered over cream sheers with decorative tie-backs", scope: ["Curtains and sheers", "Blinds and shading", "Pelmets and tie-backs", "Fabric and colour advice"], note: "Light control and privacy matter just as much as the look of the fabric." },
  { number: "06", title: "Interior styling", slug: "interior-styling", summary: "Finishing touches and considered details that help a space feel complete.", description: "Interior styling brings the elements of a room together. We consider the relationship between furniture, accessories, mirrors, flowers, textures and the details that make a space feel lived in.", image: "bed-green-boucle.webp", alt: "Sage upholstered bed styled against a wall with moulded panel detailing", scope: ["Furniture and layout guidance", "Mirrors, art and accessories", "Soft furnishings", "Final styling and finishing"], note: "Small details can make a room feel intentional, personal and complete." }
];

export async function getServices(): Promise<InteriorService[]> {
  const rows = await rest<ServiceRow[]>(
    "services?select=slug,number,title,summary,description,alt,image_path&published=eq.true&order=sort_order.asc"
  );
  if (!rows?.length) return fallbackServices;

  return rows.map((row) => {
    const fallback = fallbackServices.find((s) => s.slug === row.slug);
    const paragraphs = (row.description || "").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    return {
      number: row.number || fallback?.number || "",
      title: row.title,
      slug: row.slug,
      summary: row.summary,
      description: paragraphs[0] ?? "",
      note: paragraphs.slice(1).join(" ") || fallback?.note || "",
      image: imageSrc(row.image_path, fallback?.image ?? ""),
      alt: row.alt,
      scope: fallback?.scope ?? []
    };
  });
}

export async function getService(slug: string): Promise<InteriorService | undefined> {
  const all = await getServices();
  return all.find((s) => s.slug === slug);
}
