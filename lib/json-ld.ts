import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export function buildArticleJsonLd(content: ContentItem) {
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

export function buildFaqJsonLd(content: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(content: ContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: content.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? buildAbsoluteUrl(item.href) : buildAbsoluteUrl(`/${content.category}/${content.slug}`),
    })),
  };
}
