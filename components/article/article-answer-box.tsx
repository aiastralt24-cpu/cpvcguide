import { QuickAnswer } from "@/components/quick-answer";
import type { Article } from "@/features/articles/types";

export function ArticleAnswerBox({ article }: { article: Article }) {
  return <QuickAnswer eyebrow="Direct answer" title={article.questionResolved} summary={article.answerSummaryResolved} />;
}
