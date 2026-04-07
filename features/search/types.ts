import type { QuickFact } from "@/lib/content-schema";

export type SearchSuggestionItem = {
  question: string;
  href: string;
};

export type SearchResultItem = {
  slug: string;
  category: string;
  title: string;
  href: string;
  description: string;
  shortAnswer: string;
  quickFacts: QuickFact[];
  relatedQuestions: string[];
  matchType: "exact-question" | "exact-title" | "summary" | "related-question" | "body";
  score: number;
  categoryLabel: string;
};
