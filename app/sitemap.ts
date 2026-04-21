import type { MetadataRoute } from "next";
import { getAllContentItems, getCategoryArchive } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { getAllProgrammaticPages } from "@/lib/programmatic-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/editorial-policy", "/india-cpvc-pipes"];
  const contentItems = getAllContentItems();
  const categoryRoutes = getCategoryArchive().map((category) => {
    const categoryItems = contentItems.filter((item) => item.category === category.slug && item.publication.published);
    const lastModified = categoryItems.reduce(
      (latest, item) => (new Date(item.updatedAt) > latest ? new Date(item.updatedAt) : latest),
      new Date("2026-04-01"),
    );

    return { route: `/${category.slug}`, lastModified };
  });
  const contentRoutes = contentItems
    .filter((item) => item.publication.published && item.publication.indexable)
    .map((item) => ({
      route: `/${item.category}/${item.slug}`,
      lastModified: new Date(item.updatedAt),
    }));
  const programmaticRoutes = getAllProgrammaticPages()
    .filter((page) => page.indexable && page.qualityState === "indexable-ready")
    .map((page) => ({
      route: page.path,
      lastModified: new Date(page.updatedAt),
    }));

  const staticEntries = staticRoutes.map((route) => ({
    route,
    lastModified: route === "/india-cpvc-pipes" ? new Date("2026-04-21") : new Date("2026-04-01"),
  }));

  return [...staticEntries, ...categoryRoutes, ...contentRoutes, ...programmaticRoutes].map((entry) => ({
    url: buildAbsoluteUrl(entry.route || "/"),
    lastModified: entry.lastModified,
  }));
}
