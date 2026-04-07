import { CardLink } from "@/components/shared/card-link";

export function HeroMostAsked({ items }: { items: { question: string; href: string; categoryLabel: string }[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <CardLink
          key={item.href}
          href={item.href}
          eyebrow={item.categoryLabel}
          title={item.question}
          description="Answer-first page with related guidance and the next practical question to ask."
        />
      ))}
    </div>
  );
}
