import Link from "next/link";
import type { SearchResultItem } from "@/features/search/types";

export function SearchAnswerCard({ item }: { item: SearchResultItem }) {
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(239,224,198,0.8),rgba(253,249,242,0.9))] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Top answer</p>
      <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl">{item.title}</h2>
      <p className="mt-4 text-base leading-7">{item.shortAnswer}</p>
      {item.quickFacts.length > 0 ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {item.quickFacts.slice(0, 4).map((fact) => (
            <div key={fact.label} className="rounded-2xl border border-[color:var(--border)] bg-white/55 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{fact.label}</p>
              <p className="mt-2 font-medium">{fact.value}</p>
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-5">
        <Link href={item.href} className="text-sm font-semibold text-[color:var(--accent)]">
          Read the full guide
        </Link>
      </div>
    </div>
  );
}
