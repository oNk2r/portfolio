import { MetadataRoute } from "next";
import siteConfig from "@/config/site";
import { Project } from "@/lib/data/project";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: now,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = Project.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
    lastModified: now,
  }));

  return [...staticRoutes, ...projectRoutes];
}
