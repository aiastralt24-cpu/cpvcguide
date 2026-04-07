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
          <div key={item.label} className="rounded-2xl border border-[color:var(--border)] bg-white/55 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--muted)]">{item.label}</p>
            <p className="mt-3 font-[family-name:var(--font-serif)] text-2xl">{item.value}</p>
            {item.note ? <p className="mt-2 text-sm leading-6 text-[color:var(--muted)]">{item.note}</p> : null}
          </div>
        ))}
      </div>
    </section>
  );
}
