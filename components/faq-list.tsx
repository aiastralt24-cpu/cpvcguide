import type { FAQItem } from "@/lib/content-schema";

export function FAQList({ items }: { items: FAQItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">FAQ</p>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <details key={item.question} className="group rounded-2xl border border-[color:var(--border)] bg-white/50 p-5">
            <summary className="cursor-pointer list-none font-semibold">{item.question}</summary>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
