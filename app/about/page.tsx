import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About CPVC Guide",
  description: "Why CPVC Guide exists, who it serves, and how the site approaches technical editorial work.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
      <PageIntro
        eyebrow="About"
        title="A technical CPVC resource, not a generic plumbing blog."
        description="CPVC Guide exists to answer practical, engineering, installation, and standards questions about CPVC plumbing systems in a format that is readable for humans and extractable for answer engines."
      />

      <div className="prose-content mt-10 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)]">
        <h2>What the site is for</h2>
        <p>
          The site focuses on one topic cluster: CPVC and its technical ecosystem. That includes fundamentals,
          temperature and pressure behavior, installation methods, standards, comparisons, failure causes,
          maintenance, and practical decision support for plumbing systems.
        </p>
        <h2>Who it is built for</h2>
        <p>
          The primary audience includes plumbers, contractors, supervisors, MEP professionals, and builders.
          Secondary readers include homeowners, architects, procurement teams, and trainees who need plain-English
          explanations without losing technical accuracy.
        </p>
        <h2>How the editorial model works</h2>
        <p>
          Each page begins with a query-first brief. The brief sets the primary query, audience, unique angle,
          pillar, and anchor example. Pages are then reviewed for clarity, technical defensibility, internal linking,
          schema readiness, and promotional tone before publication.
        </p>
      </div>
    </div>
  );
}
