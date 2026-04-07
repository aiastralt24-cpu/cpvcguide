import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";

export function buildArticleSchema(content: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.description,
    datePublished: content.publishedAt,
    dateModified: content.updatedAt,
    author: {
      "@type": "Person",
      name: content.author,
    },
    mainEntityOfPage: buildAbsoluteUrl(`/${content.category}/${content.slug}`),
  };
}
