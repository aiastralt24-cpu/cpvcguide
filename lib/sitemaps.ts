import { getAllContentItems, getCategoryArchive } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { getAllProgrammaticPages } from "@/lib/programmatic-seo";

export type SitemapEntry = {
  route: string;
  lastModified: Date;
};

export type SitemapGroup = {
  key: "core" | "content" | "products" | "states" | "cities";
  path: string;
  entries: SitemapEntry[];
};

function uniqueEntries(entries: SitemapEntry[]) {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.route)) return false;
    seen.add(entry.route);
    return true;
  });
}

export function getSitemapGroups(): SitemapGroup[] {
  const contentItems = getAllContentItems();
  const programmaticPages = getAllProgrammaticPages().filter((page) => page.indexable && page.qualityState === "indexable-ready");

  const coreEntries = uniqueEntries([
    { route: "/", lastModified: new Date("2026-04-01") },
    { route: "/about", lastModified: new Date("2026-04-01") },
    { route: "/editorial-policy", lastModified: new Date("2026-04-01") },
    { route: "/india-cpvc-pipes", lastModified: new Date("2026-04-21") },
    ...getCategoryArchive().map((category) => {
      const categoryItems = contentItems.filter((item) => item.category === category.slug && item.publication.published);
      const lastModified = categoryItems.reduce(
        (latest, item) => (new Date(item.updatedAt) > latest ? new Date(item.updatedAt) : latest),
        new Date("2026-04-01"),
      );

      return {
        route: `/${category.slug}`,
        lastModified,
      };
    }),
  ]);

  const contentEntries = uniqueEntries(
    contentItems
      .filter((item) => item.publication.published && item.publication.indexable)
      .map((item) => ({
        route: `/${item.category}/${item.slug}`,
        lastModified: new Date(item.updatedAt),
      })),
  );

  const products = uniqueEntries(
    programmaticPages
      .filter((page) => page.type === "product")
      .map((page) => ({ route: page.path, lastModified: new Date(page.updatedAt) })),
  );

  const states = uniqueEntries(
    programmaticPages
      .filter((page) => page.type === "state")
      .map((page) => ({ route: page.path, lastModified: new Date(page.updatedAt) })),
  );

  const cities = uniqueEntries(
    programmaticPages
      .filter((page) => page.type === "city")
      .map((page) => ({ route: page.path, lastModified: new Date(page.updatedAt) })),
  );

  return [
    { key: "core", path: "/sitemaps/core.xml", entries: coreEntries },
    { key: "content", path: "/sitemaps/content.xml", entries: contentEntries },
    { key: "products", path: "/sitemaps/products.xml", entries: products },
    { key: "states", path: "/sitemaps/states.xml", entries: states },
    { key: "cities", path: "/sitemaps/cities.xml", entries: cities },
  ];
}

export function getSitemapGroupByKey(key: SitemapGroup["key"]) {
  return getSitemapGroups().find((group) => group.key === key);
}

export function getSitemapIndexEntries() {
  return getSitemapGroups().map((group) => ({
    url: buildAbsoluteUrl(group.path),
    lastModified: group.entries.reduce(
      (latest, entry) => (entry.lastModified > latest ? entry.lastModified : latest),
      new Date("2026-04-01"),
    ),
  }));
}

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((entry) => {
      return `<url><loc>${xmlEscape(buildAbsoluteUrl(entry.route))}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndexXml(entries: { url: string; lastModified: Date }[]) {
  const body = entries
    .map((entry) => {
      return `<sitemap><loc>${xmlEscape(entry.url)}</loc><lastmod>${entry.lastModified.toISOString()}</lastmod></sitemap>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
