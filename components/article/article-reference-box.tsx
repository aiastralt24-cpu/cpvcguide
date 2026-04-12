import Link from "next/link";
import type { Article } from "@/features/articles/types";

export function ArticleReferenceBox({ article }: { article: Article }) {
  if (article.subtleReferencesResolved.length === 0) return null;

  return (
    <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-[rgba(239,224,198,0.4)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Context note</p>
      <div className="mt-4 space-y-4">
        {article.subtleReferencesResolved.map((reference) => (
          <div key={reference.label}>
            <p className="font-semibold">{reference.label}</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">{reference.body}</p>
            {reference.href ? (
              <Link
                href={reference.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-semibold text-[color:var(--accent)]"
              >
                Review Astral CPVC Pro
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
