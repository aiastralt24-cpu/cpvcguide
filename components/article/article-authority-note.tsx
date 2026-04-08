import type { Article } from "@/features/articles/types";

export function ArticleAuthorityNote({ article }: { article: Article }) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Technical note</p>
      <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
        <p>Use this page to get the direct answer first, then check the limits before applying it to a real job.</p>
        <p>Reviewed by {article.publication.reviewer || "the technical review team"}.</p>
        <p>Last updated {article.updatedAtLabel}.</p>
      </div>
    </div>
  );
}
