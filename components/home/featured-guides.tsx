import { SectionHeading } from "@/components/shared/section-heading";
import { SearchResultList } from "@/components/search/search-result-list";
import type { SearchResultItem } from "@/features/search/types";

export function FeaturedGuides({ items }: { items: SearchResultItem[] }) {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Featured guides"
        title="Start with the strongest evergreen guides."
        description="These pages are the best entry points when you need a confident answer before going deeper into specs, comparisons, or troubleshooting."
      />
      <div className="mt-8">
        <SearchResultList items={items} />
      </div>
    </section>
  );
}
