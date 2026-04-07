import type { Metadata } from "next";
import type { ContentItem } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export const defaultMetadata = {
  title: "CPVC Guide | Technical knowledge for CPVC plumbing systems",
  description: siteConfig.description,
};

export function buildAbsoluteUrl(path: string) {
  return new URL(path, siteConfig.siteUrl).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: buildAbsoluteUrl(path),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildContentMetadata(content: ContentItem): Metadata {
  return {
    title: `${content.title} | CPVC Guide`,
    description: content.description,
    alternates: {
      canonical: `/${content.category}/${content.slug}`,
    },
    robots: {
      index: content.publication.indexable,
      follow: true,
    },
    openGraph: {
      title: content.title,
      description: content.description,
      type: "article",
      url: buildAbsoluteUrl(`/${content.category}/${content.slug}`),
      publishedTime: content.publishedAt,
      modifiedTime: content.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.description,
    },
  };
}
