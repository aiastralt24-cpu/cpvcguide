type QuickAnswerProps = {
  eyebrow?: string;
  title?: string;
  summary: string;
};

export function QuickAnswer({ eyebrow = "Quick answer", title = "Direct answer", summary }: QuickAnswerProps) {
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(239,224,198,0.8),rgba(253,249,242,0.9))] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="mt-3 font-[family-name:var(--font-serif)] text-2xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[color:var(--foreground)]">{summary}</p>
    </div>
  );
}
