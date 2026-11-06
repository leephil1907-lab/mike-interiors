/**
 * Shared Open Graph helper.
 *
 * Every page inherits the root metadata, which means every shared link used to
 * show the same generic card. Each page now supplies its own title, blurb and
 * image so WhatsApp/Facebook previews describe the actual page.
 */
export function pageOg(opts: { title: string; description: string; image?: string; path: string }) {
  return {
    openGraph: {
      type: "website" as const,
      title: `${opts.title} | Mike Interiors`,
      description: opts.description,
      url: opts.path,
      images: [
        {
          url: opts.image || "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${opts.title} — Mike Interiors, Abraka, Delta State`
        }
      ]
    },
    twitter: {
      card: "summary_large_image" as const,
      title: `${opts.title} | Mike Interiors`,
      description: opts.description,
      images: [opts.image || "/og-image.png"]
    }
  };
}
