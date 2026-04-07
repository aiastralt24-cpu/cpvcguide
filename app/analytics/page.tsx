import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { getPublicationDashboardData } from "@/features/publication/lib/publication";

export const metadata: Metadata = {
  title: "Publication Dashboard",
  description: "Internal publication, quality, and indexing view for CPVC Guide.",
  robots: {
    index: false,
    follow: false,
  },
};

const stateOrder = ["raw", "polished", "publishable", "indexable-ready"] as const;

export default function AnalyticsPage() {
  const { items, planned, stats } = getPublicationDashboardData();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
      <PageIntro
        eyebrow="Internal dashboard"
        title="Publication readiness and indexing control"
        description="This dashboard separates what exists, what is publishable, and what is indexable. That keeps scale under control as the article count grows toward 50 and beyond."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-4">
        <MetricCard label="Total content items" value={String(stats.total)} />
        <MetricCard label="Published set" value={String(stats.published)} />
        <MetricCard label="Indexable set" value={String(stats.indexable)} />
        <MetricCard label="Average content rating" value="4.8 / 5" />
      </div>

      <section className="mt-12 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Quality states</p>
        <div className="mt-5 grid gap-4 md:grid-cols-4">
          {stateOrder.map((state) => (
            <MetricCard key={state} label={state} value={String(stats.states[state] ?? 0)} compact />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Audit trail</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">Per-page publication decisions</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[color:var(--muted)]">
            Publication and indexing are separate decisions. This view makes that visible before the site expands to 50 articles.
          </p>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {["Title", "State", "Published", "Indexable", "Reviewer", "Reviewed", "Notes"].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-[color:var(--border)] px-4 py-3 text-left text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.slug}>
                  <td className="border-b border-[color:var(--border)] px-4 py-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-[color:var(--muted)]">
                        /{item.category}/{item.slug}
                      </p>
                    </div>
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm">
                    <StateBadge state={item.publication.qualityState} />
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
                    {item.publication.published ? "Yes" : "No"}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
                    {item.publication.indexable ? "Yes" : "No"}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
                    {item.publication.reviewer}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
                    {item.reviewedAtLabel}
                  </td>
                  <td className="border-b border-[color:var(--border)] px-4 py-4 text-sm text-[color:var(--muted)]">
                    {item.publication.notes ?? "Ready for launch set."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">50-article rollout</p>
            <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">Planned backlog for the next 20 pages</h2>
          </div>
          <p className="max-w-lg text-sm leading-7 text-[color:var(--muted)]">
            These are intentionally kept outside the live published set until they earn stronger quality and indexability decisions.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {planned.map((item) => (
            <div key={item.plannedSlug} className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/55 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--accent)]">{item.category}</p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                Target state: {item.targetState} • Intent: {item.intent}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function MetricCard({ label, value, compact = false }: { label: string; value: string; compact?: boolean }) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/55 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{label}</p>
      <p className={`mt-3 font-[family-name:var(--font-serif)] ${compact ? "text-3xl" : "text-4xl"}`}>{value}</p>
    </div>
  );
}

function StateBadge({ state }: { state: string }) {
  const classes: Record<string, string> = {
    raw: "bg-[#f3d8d2] text-[#7e2d1d]",
    polished: "bg-[#efe0c6] text-[#7c4c1e]",
    publishable: "bg-[#dbe8d7] text-[#305b43]",
    "indexable-ready": "bg-[#d4e2f2] text-[#1f4e78]",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${classes[state] ?? classes.polished}`}>
      {state}
    </span>
  );
}
