import { SectionHeading } from "@/components/shared/section-heading";
import { TopicQuestionList } from "@/components/topic/topic-question-list";

export function PopularQuestions({ items }: { items: { question: string; href: string }[] }) {
  return (
    <section className="mt-16">
      <SectionHeading
        eyebrow="Most asked"
        title="Common CPVC questions people usually ask."
        description="Pick the question that matches what you need to know right now."
      />
      <div className="mt-8">
        <TopicQuestionList items={items} />
      </div>
    </section>
  );
}
