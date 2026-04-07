import { SearchRelatedQuestions } from "@/components/search/search-related-questions";
import type { Article } from "@/features/articles/types";

export function ArticleRelatedQuestions({ article }: { article: Article }) {
  return <SearchRelatedQuestions items={article.relatedQuestionsResolved} />;
}
