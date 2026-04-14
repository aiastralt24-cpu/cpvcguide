import Link from "next/link";
import type { ContentItem } from "@/lib/content";

export function RelatedReading({ items }: { items: ContentItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Related reading</p>
        <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">Continue within the CPVC cluster.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Link
            key={`${item.category}-${item.slug}`}
            href={`/${item.category}/${item.slug}`}
            className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition hover:border-[color:var(--accent)]"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{item.pageTypeLabel}</p>
            <h3 className="mt-2 font-[family-name:var(--font-serif)] text-xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.answerSummaryResolved}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
