import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePageShell } from "@/components/article/article-page-shell";
import { getPublishedContentItems } from "@/lib/content";
import { getArticleBySlug } from "@/features/articles/lib/get-article-by-slug";
import { buildArticleMetadata } from "@/features/seo/lib/build-metadata";

type ContentPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export async function generateStaticParams() {
  return getPublishedContentItems().map((item) => ({
    category: item.category,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: ContentPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const content = getArticleBySlug(category, slug);

  if (!content) {
    return {};
  }

  return buildArticleMetadata(content);
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { category, slug } = await params;
  const content = getArticleBySlug(category, slug);

  if (!content) {
    notFound();
  }

  return <ArticlePageShell article={content} />;
}
