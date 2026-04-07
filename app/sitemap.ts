import type { MetadataRoute } from "next";
import { getAllContentItems, getCategoryArchive } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/editorial-policy"];
  const categoryRoutes = getCategoryArchive().map((category) => `/${category.slug}`);
  const contentRoutes = getAllContentItems()
    .filter((item) => item.publication.published && item.publication.indexable)
    .map((item) => `/${item.category}/${item.slug}`);

  return [...staticRoutes, ...categoryRoutes, ...contentRoutes].map((route) => ({
    url: buildAbsoluteUrl(route || "/"),
    lastModified: new Date(),
  }));
}
