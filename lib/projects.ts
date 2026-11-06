import { rest } from "@/lib/supabase";

export type InteriorProject = {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  status: "completed" | "progress";
  slug: string;
  featured: boolean;
};

export const projectImageBase = "/images/projects/thumb/";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  status: "completed" | "progress";
  image_path: string | null;
  featured: boolean;
  sort_order: number;
};

/**
 * Content is managed in the Mike Interiors admin studio (a separate app).
 * These are the last-known-good fallbacks used if the CMS is unreachable, so
 * the site never renders an empty portfolio.
 */
export const fallbackProjects: InteriorProject[] = [
  { id: "01", title: "Tan gloss TV feature wall", category: "Living & TV walls", image: "tv-wall-tan-gloss.webp", alt: "Tan high-gloss TV wall with black framing lines, a floating grey console and an amber-lit display column", description: "A warm, high-gloss focal wall with a floating console and illuminated display niche.", status: "completed", slug: "tan-gloss-tv-feature-wall", featured: true },
  { id: "02", title: "Living room with ring chandelier", category: "Living & TV walls", image: "living-ring-chandelier.webp", alt: "Living room with a multi-ring LED chandelier in a POP ceiling, a marble-look TV panel with backlight and tan eyelet curtains", description: "A layered living space bringing ceiling detail, feature wall and window dressing together.", status: "completed", slug: "living-room-ring-chandelier", featured: true },
  { id: "03", title: "Cream wardrobe with glass centre", category: "Wardrobes & storage", image: "wardrobe-glass-centre.webp", alt: "Cream matt wardrobe with long black handles and a pair of glass doors in the centre showing a lit interior", description: "A clean wardrobe composition with a softly illuminated glass display centre.", status: "completed", slug: "cream-wardrobe-glass-centre", featured: true },
  { id: "04", title: "White gloss TV wall", category: "Living & TV walls", image: "tv-wall-white-gloss.webp", alt: "White high-gloss panelled wall with a recessed TV frame lit by a yellow LED halo above a long black floating console", description: "A crisp white feature wall balanced by a long dark floating console.", status: "completed", slug: "white-gloss-tv-wall", featured: true },
  { id: "05", title: "Slatted feature wall", category: "Living & TV walls", image: "living-slat-wall.webp", alt: "Dark slatted wall with a wood-finish TV panel and a long floating wood console", description: "A mix of slatted texture and warm wood tones around the entertainment wall.", status: "completed", slug: "slatted-feature-wall", featured: true },
  { id: "06", title: "Wardrobe with open shelving", category: "Wardrobes & storage", image: "wardrobe-open-shelves.webp", alt: "White gloss wardrobe doors with long black handles, a column of open wood shelves and two drawers", description: "Storage that combines concealed wardrobe space with accessible display shelving.", status: "completed", slug: "wardrobe-open-shelving", featured: true },
  { id: "07", title: "Glass-front LED wardrobe", category: "Wardrobes & storage", image: "wardrobe-glass-led.webp", alt: "Black-framed glass wardrobe doors with warm LED strips inside and a shoe-shelf column on the left", description: "Dark-framed glass and warm interior lighting bring a boutique feel to storage.", status: "completed", slug: "glass-front-led-wardrobe", featured: true },
  { id: "08", title: "Sage upholstered bedroom", category: "Bedrooms", image: "bed-green-boucle.webp", alt: "Sage-green bouclé bed with a two-part headboard in front of white moulded wall panels", description: "A soft green bed set against crisp moulded wall detailing.", status: "completed", slug: "sage-upholstered-bedroom", featured: true },
  { id: "09", title: "Amber-lit display cabinet", category: "Finishes & details", image: "glass-cabinet-amber.webp", alt: "Tall glass-door cabinet with amber lighting beside a fluted wall panel", description: "A tall display cabinet with warm internal lighting and a textured backdrop.", status: "completed", slug: "amber-lit-display-cabinet", featured: false },
  { id: "10", title: "Marble-look TV panel", category: "Living & TV walls", image: "tv-wall-marble-led.webp", alt: "Marble-look TV panel with warm LED backlight above a black floating console", description: "Marble-look surfaces and concealed light create a composed entertainment wall.", status: "completed", slug: "marble-look-tv-panel", featured: false },
  { id: "11", title: "Bedroom with slatted detail", category: "Bedrooms", image: "bedroom-led-slat.webp", alt: "Bedroom with a blue LED cove, an upholstered bed and a gold-edged slatted wall panel", description: "A bedroom feature wall with layered materials and accent lighting.", status: "completed", slug: "bedroom-slatted-detail", featured: false },
  { id: "12", title: "Grey curtains and sheers", category: "Finishes & details", image: "curtains-grey-sheer.webp", alt: "Floor-length grey pinch-pleat curtains over cream sheers with crystal tie-backs under a coloured LED ceiling", description: "Soft window layers with tailored pleats and decorative tie-backs.", status: "completed", slug: "grey-curtains-sheers", featured: false },
  { id: "13", title: "Framed mirror grid", category: "Finishes & details", image: "mirror-grid.webp", alt: "Nine square black-framed mirrors fixed in a grid on a white wall", description: "A geometric mirror installation that adds rhythm and reflected light.", status: "completed", slug: "framed-mirror-grid", featured: false },
  { id: "14", title: "Diamond mirror wall", category: "Finishes & details", image: "mirror-diamond.webp", alt: "Wall of bevelled diamond-pattern mirror panels reflecting a living room with a slatted TV wall", description: "Bevelled mirror panels create a reflective feature with a sense of depth.", status: "completed", slug: "diamond-mirror-wall", featured: false },
  { id: "15", title: "POP ceiling installation", category: "Finishes & details", image: "pop-ceiling-in-progress.webp", alt: "Plastered POP ceiling steps and a timber frame ready for panelling, with a ladder in the room", description: "An installation-stage view showing the ceiling work in progress.", status: "progress", slug: "pop-ceiling-installation", featured: false },
  { id: "16", title: "Tan gloss panel grid", category: "Living & TV walls", image: "tv-wall-tan-grid.webp", alt: "Wide tan high-gloss panel wall in a grid with black shelving on the left and a long black plinth, in a living room with a grey sofa", description: "A wide grid of tan panels paired with dark shelving and a grounded plinth.", status: "completed", slug: "tan-gloss-panel-grid", featured: false },
  { id: "17", title: "Tan gloss wall detail", category: "Living & TV walls", image: "tv-wall-tan-grid-close.webp", alt: "Close view of the tan high-gloss panel grid wall with a five-shelf black unit and a black plinth on a marble-look floor", description: "A closer look at the reflective finish and contrasting shelving.", status: "completed", slug: "tan-gloss-wall-detail", featured: false }
];

/** Resolves a stored image path to something next/image can render. */
export function imageSrc(path: string | null, fallbackFile: string): string {
  if (!path) return projectImageBase + fallbackFile;
  if (path.startsWith("http") || path.startsWith("/")) return path;
  return projectImageBase + path;
}

export async function getProjects(): Promise<InteriorProject[]> {
  const rows = await rest<ProjectRow[]>(
    "projects?select=id,slug,title,category,description,alt,status,image_path,featured,sort_order&published=eq.true&order=sort_order.asc"
  );

  if (!rows?.length) return fallbackProjects;

  return rows.map((row, i) => ({
    id: String(i + 1).padStart(2, "0"),
    title: row.title,
    category: row.category,
    image: row.image_path ?? "",
    alt: row.alt,
    description: row.description,
    status: row.status,
    slug: row.slug,
    featured: row.featured
  }));
}

export async function getProject(slug: string): Promise<InteriorProject | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}
