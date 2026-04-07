import { SectionHeading } from "@/components/shared/section-heading";

export function SearchEmptyState() {
  return (
    <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8">
      <SectionHeading
        eyebrow="No exact match"
        title="Try a practical CPVC question instead."
        description="Search works best with direct plumbing questions such as temperature limits, joining, standards, comparisons, and troubleshooting symptoms."
      />
    </div>
  );
}
