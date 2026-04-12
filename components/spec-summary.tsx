import type { SpecSummaryItem } from "@/lib/content-schema";

export function SpecSummary({ items }: { items: SpecSummaryItem[] }) {
  if (items.length === 0) {
    return null;
  }

  const layoutClass =
    items.length === 1
      ? "w-full max-w-2xl grid-cols-1"
      : items.length === 2
        ? "w-full max-w-5xl grid-cols-1 md:grid-cols-2"
        : "w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4";

  return (
    <section className="mt-10 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Spec summary</p>
      <div className={`mt-5 grid justify-start gap-4 ${layoutClass}`}>
        {items.map((item) => (
          <article
            key={item.label}
            className="flex min-h-44 min-w-0 max-w-full flex-col rounded-2xl border border-[color:var(--border)] bg-white/55 p-5 md:min-h-48 md:p-6"
          >
            <p className="max-w-[24ch] text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)] break-words sm:text-xs">
              {item.label}
            </p>
            <p
              className={`mt-3 max-w-[14ch] font-[family-name:var(--font-serif)] break-words text-balance ${
                item.value.length > 18
                  ? "text-[clamp(2rem,4vw,2.8rem)] leading-[1.04]"
                  : "text-[clamp(2.4rem,4.8vw,3.5rem)] leading-[0.96]"
              }`}
            >
              {item.value}
            </p>
            {item.note ? (
              <p className="mt-3 max-w-[34ch] text-sm leading-6 text-[color:var(--muted)] break-words">{item.note}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
