import { FeaturedGuides } from "@/components/home/featured-guides";
import { PopularQuestions } from "@/components/home/popular-questions";
import { StartWithNeed } from "@/components/home/start-with-need";
import { HeroShell } from "@/components/hero/hero-shell";
import { ReviewSummary } from "@/components/review-summary";
import { TopicCardGrid } from "@/components/topic/topic-card-grid";
import { SectionHeading } from "@/components/shared/section-heading";
import { getFeaturedGuides, getHubSummaries, getPopularQuestions, getTaskBuckets } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const featured = getFeaturedGuides(6).map((item) => ({
    slug: item.slug,
    category: item.category,
    title: item.title,
    href: `/${item.category}/${item.slug}`,
    description: item.description,
    shortAnswer: item.answerSummaryResolved,
    quickFacts: item.quickFactsResolved,
    relatedQuestions: item.relatedQuestionsResolved,
    matchType: "summary" as const,
    score: 1,
    categoryLabel: item.categoryConfig.label,
  }));
  const hubs = getHubSummaries();
  const popularQuestions = getPopularQuestions(8);
  const suggestedQueries = popularQuestions.slice(0, 6).map(({ question, href }) => ({ question, href }));
  const taskBuckets = getTaskBuckets();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10">
      <HeroShell suggestedQueries={suggestedQueries} mostAsked={popularQuestions} />

      <StartWithNeed items={taskBuckets} />

      <PopularQuestions items={popularQuestions} />

      <section className="mt-16">
        <SectionHeading
          eyebrow="Topic hubs"
          title="Browse the cluster when you know the area, not the exact question."
          description="Hubs still matter for depth and internal linking, but they should support user tasks instead of replacing them."
        />
        <div className="mt-8">
          <TopicCardGrid hubs={hubs} />
        </div>
      </section>

      <FeaturedGuides items={featured} />

      <section className="mt-16">
        <SectionHeading
          eyebrow="Trusted by readers"
          title="Useful is not the same as polished. The site has to be both."
          description="The launch pack carries an overall average of 4.8/5 because the articles are structured for action, not just presentation."
        />
        <div className="mt-8">
        <ReviewSummary
          summary={{
            average: siteConfig.feedback.averageRating,
            scale: siteConfig.feedback.scale,
            totalResponses: siteConfig.feedback.totalResponses,
            recommendationRate: siteConfig.feedback.recommendationRate,
          }}
        />
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Editorial operating model"
          title="The scaled system is built around control, not volume."
          description="Publishing, indexing, and trust are handled as separate decisions so the site can safely grow toward 50 articles."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {siteConfig.workflow.map((step, index) => (
            <div
              key={step}
              className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--accent)]">Step {index + 1}</p>
              <p className="mt-3 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
