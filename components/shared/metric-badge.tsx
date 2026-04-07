export function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--border)] bg-white/65 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-serif)] text-2xl">{value}</p>
    </div>
  );
}
