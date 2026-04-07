import { CardLink } from "@/components/shared/card-link";
import type { SearchResultItem } from "@/features/search/types";

export function SearchResultList({ items }: { items: SearchResultItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <CardLink key={item.href} href={item.href} eyebrow={item.categoryLabel} title={item.title} description={item.description} />
      ))}
    </div>
  );
}
