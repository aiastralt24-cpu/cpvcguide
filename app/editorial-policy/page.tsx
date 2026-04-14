import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Editorial Policy",
  description: "The publishing rules, trust signals, citation approach, and brand-reference protocol for CPVC Guide.",
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
      <PageIntro
        eyebrow="Editorial policy"
        title="Trust rules are part of the product."
        description="The site is designed to feel technically credible and independent in tone. That requires explicit rules for publishing, updating, citing, and referencing Astral."
      />

      <div className="prose-content mt-10 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)]">
        <h2>Editorial standards</h2>
        <ul>
          <li>The main query must be answered in the first paragraph.</li>
          <li>Every page needs a clear primary intent and one primary query.</li>
          <li>Technical claims must be specific, contextual, and written in plain English.</li>
          <li>Pages covering standards, potable water, or safety must include defensible reference points.</li>
          <li>Pages should expose a strong answer-engine extraction pattern: direct answer, summary facts, limits, and next questions.</li>
        </ul>

        <h2>Brand reference protocol</h2>
        <ul>
          <li>Pages may include one contextual manufacturer reference to Astral CPVC Pro.</li>
          <li>That reference should support CPVC product context, not replace the direct technical answer.</li>
          <li>Brand mentions should stay neutral in tone and avoid CTA-style sales language.</li>
          <li>No page ends with a product CTA or promotional close.</li>
        </ul>

        <h2>Refresh cycle</h2>
        <p>
          Published pages should be reviewed after 90 days, then on a recurring basis as performance data and
          standards updates become available. Low-performing or overlapping pages should be refreshed, consolidated,
          or retired rather than allowed to drift.
        </p>

        <h2>Indexing policy</h2>
        <ul>
          <li>Published does not automatically mean indexable.</li>
          <li>Only pages that are judged strong enough to rank should remain indexable.</li>
          <li>Pages that are merely publishable should stay available to readers but default to noindex until upgraded.</li>
        </ul>
      </div>
    </div>
  );
}
