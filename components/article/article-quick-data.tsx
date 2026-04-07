import { SpecSummary } from "@/components/spec-summary";
import type { Article } from "@/features/articles/types";

export function ArticleQuickData({ article }: { article: Article }) {
  return (
    <SpecSummary
      items={article.quickFactsResolved.map((item) => ({
        label: item.label,
        value: item.value,
      }))}
    />
  );
}
