import { QuestionChip } from "@/components/shared/question-chip";

export function SearchRelatedQuestions({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {items.map((item) => (
        <QuestionChip key={item} href={`/search?q=${encodeURIComponent(item)}`} label={item} />
      ))}
    </div>
  );
}
