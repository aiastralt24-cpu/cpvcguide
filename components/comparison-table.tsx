import type { ComparisonRow } from "@/lib/content-schema";

export function ComparisonTable({ rows }: { rows: ComparisonRow[] }) {
  if (rows.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 overflow-hidden rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="border-b border-[color:var(--border)] px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Comparison table</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px]">
          <thead>
            <tr>
              <th className="border-b border-[color:var(--border)] px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Attribute
              </th>
              <th className="border-b border-[color:var(--border)] px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                CPVC
              </th>
              <th className="border-b border-[color:var(--border)] px-6 py-4 text-left text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Comparison material
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.attribute}>
                <td className="border-b border-[color:var(--border)] px-6 py-4 font-medium">{row.attribute}</td>
                <td className="border-b border-[color:var(--border)] px-6 py-4 text-sm leading-7 text-[color:var(--muted)]">
                  {row.cpvc}
                </td>
                <td className="border-b border-[color:var(--border)] px-6 py-4 text-sm leading-7 text-[color:var(--muted)]">
                  {row.other}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
