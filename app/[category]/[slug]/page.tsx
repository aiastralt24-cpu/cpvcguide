import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/components/article-page";
import { getAllContentItems, getContentBySlug } from "@/lib/content";
import { buildContentMetadata } from "@/lib/metadata";

type ContentPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getAllContentItems()
    .filter((item) => item.publication.published)
    .map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const content = getContentBySlug(category, slug);

  if (!content) {
    return {};
  }

  return buildContentMetadata(content);
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { category, slug } = await params;
  const content = getContentBySlug(category, slug);

  if (!content) {
    notFound();
  }

  return <ArticlePage content={content} />;
}
