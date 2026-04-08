import { HeroMostAsked } from "@/components/hero/hero-most-asked";
import { HeroSearch } from "@/components/hero/hero-search";
import { HeroSuggestedQueries } from "@/components/hero/hero-suggested-queries";
import { HeroTitle } from "@/components/hero/hero-title";

type HeroShellProps = {
  suggestedQueries: { question: string; href: string }[];
  mostAsked: { question: string; href: string; categoryLabel: string }[];
};

export function HeroShell({ suggestedQueries, mostAsked }: HeroShellProps) {
  return (
    <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)]/90 p-8 shadow-[var(--shadow)] md:p-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <HeroTitle />
          <HeroSearch suggestionTarget="article" />
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Suggested searches</p>
            <HeroSuggestedQueries items={suggestedQueries} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-[color:var(--border)] bg-white/65 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">How to use this site</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              Start with the exact question, open the strongest answer, then follow the related guides only if you need more detail.
            </p>
          </div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-white/65 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">What to expect</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              Direct answers first, practical limits second, and technical context after that.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <HeroMostAsked items={mostAsked.slice(0, 4)} />
      </div>
    </section>
  );
}
