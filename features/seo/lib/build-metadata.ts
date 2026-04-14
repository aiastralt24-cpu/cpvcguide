import type { Metadata } from "next";
import type { ContentItem } from "@/lib/content";
import { buildAbsoluteUrl, getDefaultSocialImage } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

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
    openGraph: {
      title,
      description,
      type: "website",
      url: buildAbsoluteUrl("/search"),
      siteName: siteConfig.title,
      images: getDefaultSocialImage(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: getDefaultSocialImage().map((image) => image.url),
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
      siteName: siteConfig.title,
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt,
      images: getDefaultSocialImage(),
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
      images: getDefaultSocialImage().map((image) => image.url),
    },
  };
}
