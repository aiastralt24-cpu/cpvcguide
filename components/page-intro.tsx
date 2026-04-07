type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">{eyebrow}</p>
      <h1 className="max-w-3xl font-[family-name:var(--font-serif)] text-4xl leading-tight md:text-6xl">{title}</h1>
      <p className="max-w-3xl text-lg leading-8 text-[color:var(--muted)]">{description}</p>
    </div>
  );
}
