import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export function buildArticleSchema(content: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": buildAbsoluteUrl(`/${content.category}/${content.slug}#article`),
    headline: content.title,
    description: content.description,
    datePublished: content.publishedAt,
    dateModified: content.updatedAt,
    image: buildAbsoluteUrl(siteConfig.socialImagePath),
    author: {
      "@type": "Person",
      name: content.author,
    },
    publisher: {
      "@id": buildAbsoluteUrl("/#publisher"),
    },
    mainEntityOfPage: buildAbsoluteUrl(`/${content.category}/${content.slug}`),
  };
}
