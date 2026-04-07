import { SectionHeading } from "@/components/shared/section-heading";
import { SearchResultList } from "@/components/search/search-result-list";
import type { SearchResultItem } from "@/features/search/types";

export function FeaturedGuides({ items }: { items: SearchResultItem[] }) {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Featured guides"
        title="High-signal pages for launch"
        description="These pages combine direct answers, quick facts, and clean next-step linking."
      />
      <div className="mt-8">
        <SearchResultList items={items} />
      </div>
    </section>
  );
}
