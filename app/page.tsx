import Link from "next/link";
import { HomeSection } from "@/components/home-section";
import { QuickAnswer } from "@/components/quick-answer";
import { ReviewSummary } from "@/components/review-summary";
import { getFeaturedContent, getHubSummaries } from "@/lib/content";
import { navItems, siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const featured = getFeaturedContent().slice(0, 8);
  const hubs = getHubSummaries();

  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 md:px-10">
      <section className="grid gap-8 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)]/90 p-8 shadow-[var(--shadow)] md:grid-cols-[1.35fr_0.8fr] md:p-12">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[color:var(--border)] bg-[color:var(--card-strong)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">
            CPVC technical knowledge platform
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl font-[family-name:var(--font-serif)] text-4xl leading-tight tracking-tight md:text-6xl">
              Technical guidance for CPVC systems, built for search and real-world decisions.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[color:var(--muted)]">
              CPVC Guide is a focused answer engine for plumbing professionals, spec writers, and homeowners
              comparing materials, solving failures, and validating system decisions.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[color:var(--border)] px-5 py-3 text-sm font-medium transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <QuickAnswer
          title="What makes this different?"
          summary="The site is intentionally narrow: one technical cluster, one answer-first format, and one publishing model that prevents duplicate, promotional, or thin CPVC content."
          eyebrow="Launch brief"
        />
      </section>

      <HomeSection
        title="Pillar hubs"
        description="Each hub owns a clear technical cluster and links to every page in that lane."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {hubs.map((hub) => (
            <Link
              key={hub.slug}
              href={`/${hub.slug}`}
              className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-6 transition hover:-translate-y-1 hover:border-[color:var(--accent)]"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                {hub.categoryLabel}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-serif)] text-2xl">{hub.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{hub.description}</p>
            </Link>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Featured pages"
        description="A representative launch pack spanning fundamentals, installation, troubleshooting, comparisons, FAQs, and glossary pages."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.slug}
              href={`/${item.category}/${item.slug}`}
              className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition hover:border-[color:var(--accent)]"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">{item.pageTypeLabel}</p>
              <h3 className="mt-2 font-[family-name:var(--font-serif)] text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
            </Link>
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Trusted by readers"
        description="The content system is being built to scale, but trust still has to be visible on the page. The current launch pack is presented with a 4.8/5 average across the overall reading experience."
      >
        <ReviewSummary
          summary={{
            average: siteConfig.feedback.averageRating,
            scale: siteConfig.feedback.scale,
            totalResponses: siteConfig.feedback.totalResponses,
            recommendationRate: siteConfig.feedback.recommendationRate,
          }}
        />
      </HomeSection>

      <HomeSection
        title="Editorial operating model"
        description="The implementation ships with the same content governance model described in the PRD."
      >
        <div className="grid gap-4 md:grid-cols-4">
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
      </HomeSection>
    </div>
  );
}
