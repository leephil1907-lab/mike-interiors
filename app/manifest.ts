import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mike Interiors",
    short_name: "Mike Interiors",
    description: "Interior finishing and styling in Abraka, Delta State, Nigeria.",
    start_url: "/",
    display: "standalone",
    background_color: "#141312",
    theme_color: "#141312",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
