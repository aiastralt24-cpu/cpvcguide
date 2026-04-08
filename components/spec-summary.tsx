import type { SpecSummaryItem } from "@/lib/content-schema";

export function SpecSummary({ items }: { items: SpecSummaryItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Spec summary</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex min-h-44 flex-col rounded-2xl border border-[color:var(--border)] bg-white/55 p-5 md:min-h-48"
          >
            <p className="max-w-[16ch] text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)] [overflow-wrap:anywhere] sm:text-xs">
              {item.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-serif)] text-[clamp(2rem,4vw,3.25rem)] leading-[0.95] [overflow-wrap:anywhere]">
              {item.value}
            </p>
            {item.note ? (
              <p className="mt-3 text-sm leading-6 text-[color:var(--muted)] [overflow-wrap:anywhere]">{item.note}</p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
