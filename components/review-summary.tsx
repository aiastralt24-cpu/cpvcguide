import type { RatingSummary } from "@/lib/content-schema";

function StarRow({ average, scale }: { average: number; scale: number }) {
  const fullStars = Math.round(average);
  return (
    <div aria-hidden className="flex gap-1 text-[color:var(--accent)]">
      {Array.from({ length: scale }).map((_, index) => (
        <span key={index} className={index < fullStars ? "opacity-100" : "opacity-30"}>
          ★
        </span>
      ))}
    </div>
  );
}

export function ReviewSummary({ summary }: { summary: RatingSummary }) {
  return (
    <section className="rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(253,249,242,0.95),rgba(239,224,198,0.68))] p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Reader feedback</p>
          <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">Average rating: {summary.average.toFixed(1)}/{summary.scale}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[color:var(--muted)]">
            This reflects the overall launch-content experience across clarity, usefulness, and confidence in the next step.
          </p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-white/65 px-5 py-4">
          <StarRow average={summary.average} scale={summary.scale} />
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {summary.totalResponses} responses • {summary.recommendationRate}% would recommend this content
          </p>
        </div>
      </div>
    </section>
  );
}
