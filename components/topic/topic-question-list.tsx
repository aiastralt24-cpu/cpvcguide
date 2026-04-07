import { QuestionChip } from "@/components/shared/question-chip";

export function TopicQuestionList({ items }: { items: { question: string; href: string }[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <QuestionChip key={item.href} href={item.href} label={item.question} />
      ))}
    </div>
  );
}
