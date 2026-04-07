import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description: "The publishing rules, trust signals, citation approach, and brand-reference protocol for CPVC Guide.",
  alternates: {
    canonical: "/editorial-policy",
  },
};

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
        </ul>

        <h2>Brand reference protocol</h2>
        <ul>
          <li>Astral references are disallowed by default.</li>
          <li>Where technically justified, a page may contain one contextual manufacturer reference.</li>
          <li>Failure and troubleshooting pages do not mention Astral.</li>
          <li>No page ends with a product CTA or promotional close.</li>
        </ul>

        <h2>Refresh cycle</h2>
        <p>
          Published pages should be reviewed after 90 days, then on a recurring basis as performance data and
          standards updates become available. Low-performing or overlapping pages should be refreshed, consolidated,
          or retired rather than allowed to drift.
        </p>
      </div>
    </div>
  );
}
