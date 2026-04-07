import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Article } from "@/features/articles/types";

export function ArticleHeader({ article }: { article: Article }) {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={article.breadcrumbs} />
      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
        <span>{article.pageTypeLabel}</span>
        <span>•</span>
        <span>{article.intentTypeLabel}</span>
        <span>•</span>
        <span>{article.readingTime}</span>
      </div>
      <div>
        <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">{article.description}</p>
      </div>
    </div>
  );
}
