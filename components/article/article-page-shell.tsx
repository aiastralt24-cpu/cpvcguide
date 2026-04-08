import { FAQList } from "@/components/faq-list";
import { ComparisonTable } from "@/components/comparison-table";
import { ReviewComments } from "@/components/review-comments";
import { ReviewSummary } from "@/components/review-summary";
import { ArticleAnswerBox } from "@/components/article/article-answer-box";
import { ArticleAuthorityNote } from "@/components/article/article-authority-note";
import { ArticleBody } from "@/components/article/article-body";
import { ArticleHeader } from "@/components/article/article-header";
import { ArticleQuickData } from "@/components/article/article-quick-data";
import { ArticleReferenceBox } from "@/components/article/article-reference-box";
import { ArticleRelatedGuides } from "@/components/article/article-related-guides";
import { ArticleRelatedQuestions } from "@/components/article/article-related-questions";
import { ArticleSchema } from "@/components/article/article-schema";
import { ArticleToc } from "@/components/article/article-toc";
import type { Article } from "@/features/articles/types";

export function ArticlePageShell({ article }: { article: Article }) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <ArticleSchema article={article} />
      <div className="grid gap-10 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)] md:p-10">
            <ArticleHeader article={article} />
            <div className="mt-8">
              <ArticleAnswerBox article={article} />
            </div>
            <div className="mt-10">
              <ArticleQuickData article={article} />
            </div>
            <ComparisonTable rows={article.comparisonRows} />
            <div className="mt-10">
              <ArticleBody article={article} />
            </div>
            <FAQList items={article.faqItems} />
            <ArticleReferenceBox article={article} />
            <div className="mt-12 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Related questions</p>
                <div className="mt-4">
                  <ArticleRelatedQuestions article={article} />
                </div>
              </div>
            </div>
            <div className="mt-12">
              <ArticleRelatedGuides article={article} />
            </div>
            <div className="mt-10">
              <ReviewSummary summary={article.ratingSummaryResolved} />
            </div>
            <ReviewComments threads={article.reviewThreadsWithLabels} />
          </div>
        </article>

        <div className="space-y-6">
          <ArticleToc article={article} />
          <ArticleAuthorityNote article={article} />
        </div>
      </div>
    </div>
  );
}
