import { RelatedReading } from "@/components/related-reading";
import type { Article } from "@/features/articles/types";

export function ArticleRelatedGuides({ article }: { article: Article }) {
  return <RelatedReading items={article.relatedItems} />;
}
