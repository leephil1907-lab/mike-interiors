import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getContent } from "@/lib/content";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const base = (content["seo.site_url"] || "https://mike-interiors.vercel.app").replace(/\/$/, "");

  const [projects, services] = await Promise.all([getProjects(), getServices()]);
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { path: "/", changeFrequency: "weekly", priority: 1 },
      { path: "/work", changeFrequency: "weekly", priority: 0.9 },
      { path: "/services", changeFrequency: "monthly", priority: 0.9 },
      { path: "/about", changeFrequency: "yearly", priority: 0.6 },
      { path: "/design-ideas", changeFrequency: "monthly", priority: 0.6 },
      { path: "/videos", changeFrequency: "monthly", priority: 0.5 },
      { path: "/contact", changeFrequency: "yearly", priority: 0.7 }
    ] as const
  ).map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7
  }));

  return [...staticPages, ...servicePages, ...projectPages];
}
