import type { Article } from "@/features/articles/types";

export function getTopicForArticle(article: Article) {
  return {
    label: article.categoryConfig.label,
    href: `/${article.category}`,
    description: article.categoryConfig.description,
  };
}
