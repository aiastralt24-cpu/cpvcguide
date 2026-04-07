import type { ContentItem } from "@/lib/content";
import type { SearchResultItem } from "@/features/search/types";
import { buildSearchQuery } from "@/features/search/lib/build-search-query";

export function rankResults(query: string, documents: ContentItem[]): SearchResultItem[] {
  const search = buildSearchQuery(query);
  if (!search.normalized) {
    return [];
  }

  const results = documents
    .map((doc) => {
      let score = 0;
      let matchType: SearchResultItem["matchType"] = "body";
      const title = doc.title.toLowerCase();
      const question = doc.questionResolved.toLowerCase();
      const summary = doc.answerSummaryResolved.toLowerCase();
      const relatedQuestions = doc.relatedQuestionsResolved.map((item) => item.toLowerCase());
      const body = doc.body.toLowerCase();

      if (question === search.normalized) {
        score += 120;
        matchType = "exact-question";
      }

      if (title === search.normalized) {
        score += 110;
        matchType = matchType === "exact-question" ? matchType : "exact-title";
      }

      if (title.includes(search.normalized)) {
        score += 45;
        if (matchType === "body") matchType = "exact-title";
      }

      if (question.includes(search.normalized)) {
        score += 55;
        if (matchType === "body") matchType = "exact-question";
      }

      if (summary.includes(search.normalized)) {
        score += 38;
        if (matchType === "body") matchType = "summary";
      }

      if (relatedQuestions.some((item) => item.includes(search.normalized))) {
        score += 28;
        if (matchType === "body") matchType = "related-question";
      }

      for (const token of search.tokens) {
        if (title.includes(token)) score += 10;
        if (question.includes(token)) score += 12;
        if (summary.includes(token)) score += 8;
        if (body.includes(token)) score += 3;
      }

      if (score === 0) {
        return null;
      }

      return {
        slug: doc.slug,
        category: doc.category,
        title: doc.title,
        href: `/${doc.category}/${doc.slug}`,
        description: doc.description,
        shortAnswer: doc.answerSummaryResolved,
        quickFacts: doc.quickFactsResolved,
        relatedQuestions: doc.relatedQuestionsResolved,
        matchType,
        score,
        categoryLabel: doc.categoryConfig.label,
      } satisfies SearchResultItem;
    })
    .filter((item): item is SearchResultItem => item !== null)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  return results;
}
