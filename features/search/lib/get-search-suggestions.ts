import { getPublishedContentItems } from "@/lib/content";
import { normalizeQuery } from "@/features/search/lib/normalize-query";
import type { SearchSuggestionItem } from "@/features/search/types";

export function getSearchSuggestions(query: string, limit = 6): SearchSuggestionItem[] {
  const normalized = normalizeQuery(query);
  const docs = getPublishedContentItems();

  const suggestions = docs
    .map((doc) => ({
      question: doc.questionResolved,
      href: `/${doc.category}/${doc.slug}`,
    }))
    .filter((item) => normalizeQuery(item.question).includes(normalized))
    .slice(0, limit);

  return normalized ? suggestions : docs.slice(0, limit).map((doc) => ({
    question: doc.questionResolved,
    href: `/${doc.category}/${doc.slug}`,
  }));
}
