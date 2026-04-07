import type { Article } from "@/features/articles/types";

export function ArticleAuthorityNote({ article }: { article: Article }) {
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-white/55 p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Publishing data</p>
      <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
        <p>Primary query: {article.primaryQuery}</p>
        <p>Reviewed by: {article.publication.reviewer}</p>
        <p>Published: {article.publishedAtLabel}</p>
        <p>Reviewed: {article.reviewedAtLabel}</p>
      </div>
    </div>
  );
}
