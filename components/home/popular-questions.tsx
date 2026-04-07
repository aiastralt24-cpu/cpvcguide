import { SectionHeading } from "@/components/shared/section-heading";
import { TopicQuestionList } from "@/components/topic/topic-question-list";

export function PopularQuestions({ items }: { items: { question: string; href: string }[] }) {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Most asked"
        title="Common CPVC questions from the current launch pack"
        description="Use these when the user knows the question but not yet the right category."
      />
      <div className="mt-8">
        <TopicQuestionList items={items} />
      </div>
    </section>
  );
}
