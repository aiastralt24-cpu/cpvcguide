import type { Metadata } from "next";
import { HeroSearch } from "@/components/hero/hero-search";
import { SearchAnswerCard } from "@/components/search/search-answer-card";
import { SearchEmptyState } from "@/components/search/search-empty-state";
import { SearchRelatedQuestions } from "@/components/search/search-related-questions";
import { SearchResultList } from "@/components/search/search-result-list";
import { SectionHeading } from "@/components/shared/section-heading";
import { buildSearchMetadata } from "@/features/seo/lib/build-metadata";
import { searchContent } from "@/features/search/lib/search-content";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return buildSearchMetadata(q);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchContent(query) : [];
  const [topResult, ...rest] = results;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <SectionHeading
        eyebrow="Search"
        title={query ? `Results for "${query}"` : "Search the CPVC guide"}
        description={
          query
            ? "The page is structured answer-first: best match, quick facts, then deeper guides and related questions."
            : "Use direct technical questions for best results: temperature limits, joining, sizing, standards, and failure symptoms."
        }
      />

      <div className="mt-8 rounded-[2rem] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(253,249,242,0.95),rgba(255,255,255,0.9))] p-6 md:p-8">
        <HeroSearch initialQuery={query} autoFocus={!query} />
      </div>

      <div className="mt-10 space-y-10">
        {topResult ? (
          <>
            <SearchAnswerCard item={topResult} />
            <section>
              <SectionHeading
                eyebrow="Related guides"
                title="Best matching pages"
                description="These pages are ranked for usefulness first, then relevance."
              />
              <div className="mt-8">
                <SearchResultList items={rest.length > 0 ? rest : [topResult]} />
              </div>
            </section>
            <section>
              <SectionHeading
                eyebrow="Related questions"
                title="Keep following the question chain"
                description="The strongest next step is usually another specific question."
              />
              <div className="mt-6">
                <SearchRelatedQuestions items={topResult.relatedQuestions} />
              </div>
            </section>
          </>
        ) : (
          <SearchEmptyState />
        )}
      </div>
    </div>
  );
}
