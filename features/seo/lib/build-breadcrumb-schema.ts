import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";

export function buildBreadcrumbSchema(content: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: content.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.href ?? `/${content.category}/${content.slug}`),
    })),
  };
}
