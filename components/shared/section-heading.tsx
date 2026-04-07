type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{eyebrow}</p>
      ) : null}
      <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl">{title}</h2>
      {description ? <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">{description}</p> : null}
    </div>
  );
}
