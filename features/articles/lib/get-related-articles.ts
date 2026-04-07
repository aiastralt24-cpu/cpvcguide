import type { Article, ArticleCardItem } from "@/features/articles/types";

export function getRelatedArticles(article: Article): ArticleCardItem[] {
  return article.relatedItems.map((item) => ({
    slug: item.slug,
    category: item.category,
    title: item.title,
    description: item.description,
    pageTypeLabel: item.pageTypeLabel,
    href: `/${item.category}/${item.slug}`,
  }));
}
