import type { Metadata } from "next";
import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl } from "@/lib/metadata";

export function buildSearchMetadata(query?: string): Metadata {
  const title = query ? `Search results for "${query}" | CPVC Guide` : "Search CPVC Guide";
  const description = query
    ? `Search results for ${query} across CPVC Guide's technical knowledge base.`
    : "Search CPVC Guide for technical answers, comparisons, and installation guidance.";

  return {
    title,
    description,
    alternates: {
      canonical: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export function buildArticleMetadata(content: ContentItem): Metadata {
  return {
    title: `${content.title} | CPVC Guide`,
    description: content.description,
    alternates: { canonical: `/${content.category}/${content.slug}` },
    robots: {
      index: content.publication.indexable,
      follow: true,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      url: buildAbsoluteUrl(`/${content.category}/${content.slug}`),
    },
  };
}
