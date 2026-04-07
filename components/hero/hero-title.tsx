export function HeroTitle() {
  return (
    <div className="space-y-4">
      <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--card-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
        Search-first CPVC knowledge base
      </span>
      <h1 className="max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-tight md:text-6xl">
        Ask the plumbing question first. Browse the topic second.
      </h1>
      <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
        CPVC Guide is built for practical next steps: compare materials, validate hot-water decisions, diagnose failures, and understand standards without wading through promotional copy.
      </p>
    </div>
  );
}
