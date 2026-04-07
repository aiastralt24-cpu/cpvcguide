type HomeSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function HomeSection({ title, description, children }: HomeSectionProps) {
  return (
    <section className="mt-16">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="font-[family-name:var(--font-serif)] text-3xl md:text-4xl">{title}</h2>
        <p className="max-w-3xl text-base leading-7 text-[color:var(--muted)]">{description}</p>
      </div>
      {children}
    </section>
  );
}
