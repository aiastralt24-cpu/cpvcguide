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
    description: item.answerSummaryResolved,
    shortAnswer: item.answerSummaryResolved,
    quickFacts: item.quickFactsResolved,
    relatedQuestions: item.relatedQuestionsResolved,
    matchType: "summary" as const,
    score: 1,
    categoryLabel: item.categoryConfig.label,
  }));
  const hubs = getHubSummaries();
  const popularQuestions = getPopularQuestions(10);
  const heroQuestions = popularQuestions.slice(0, 4);
  const questionFeed = popularQuestions.slice(4, 10);
  const suggestedQueries = [
    { question: "Can CPVC handle hot water safely?", href: "/search?q=Can%20CPVC%20handle%20hot%20water%20safely%3F" },
    { question: "What causes CPVC pipes to crack?", href: "/search?q=What%20causes%20CPVC%20pipes%20to%20crack%3F" },
    { question: "How do you size CPVC for a house?", href: "/search?q=How%20do%20you%20size%20CPVC%20for%20a%20house%3F" },
    { question: "CPVC vs uPVC: which one fits hot water lines?", href: "/search?q=CPVC%20vs%20uPVC%3A%20which%20one%20fits%20hot%20water%20lines%3F" },
    { question: "What does IS 15778 mean for CPVC pipe?", href: "/search?q=What%20does%20IS%2015778%20mean%20for%20CPVC%20pipe%3F" },
  ];
  const taskBuckets = getTaskBuckets();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10">
      <HeroShell suggestedQueries={suggestedQueries} mostAsked={heroQuestions} />

      <StartWithNeed items={taskBuckets} />

      <PopularQuestions items={questionFeed} />

      <section className="mt-16">
        <SectionHeading
          eyebrow="Topic hubs"
          title="Browse by topic when you know the area but not yet the exact answer."
          description="These hubs collect the strongest definitions, guides, and troubleshooting pages for each CPVC topic cluster."
        />
        <div className="mt-8">
          <TopicCardGrid hubs={hubs} />
        </div>
      </section>

      <FeaturedGuides items={featured} />

      <section className="mt-16">
        <SectionHeading
          eyebrow="Trusted by readers"
          title="Readers come here for direct answers they can actually use."
          description="The strongest pages combine a clear first answer, practical limits, and the next question to ask when the decision gets more technical."
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
    </div>
  );
}
