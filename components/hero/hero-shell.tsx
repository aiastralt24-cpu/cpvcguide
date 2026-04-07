import { HeroMostAsked } from "@/components/hero/hero-most-asked";
import { HeroSearch } from "@/components/hero/hero-search";
import { HeroSuggestedQueries } from "@/components/hero/hero-suggested-queries";
import { HeroTitle } from "@/components/hero/hero-title";
import { MetricBadge } from "@/components/shared/metric-badge";

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
          <HeroSearch />
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--muted)]">Suggested searches</p>
            <HeroSuggestedQueries items={suggestedQueries} />
          </div>
        </div>
        <div className="space-y-4">
          <MetricBadge label="Average content rating" value="4.8 / 5" />
          <MetricBadge label="Published launch pack" value="30 pages" />
          <MetricBadge label="Planned scale target" value="50 articles" />
        </div>
      </div>
      <div className="mt-10">
        <HeroMostAsked items={mostAsked.slice(0, 4)} />
      </div>
    </section>
  );
}
