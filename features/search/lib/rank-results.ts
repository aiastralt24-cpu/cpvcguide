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
      let structuredSignal = 0;
      let bodySignal = 0;
      const title = doc.title.toLowerCase();
      const question = doc.questionResolved.toLowerCase();
      const summary = doc.answerSummaryResolved.toLowerCase();
      const relatedQuestions = doc.relatedQuestionsResolved.map((item) => item.toLowerCase());
      const body = doc.body.toLowerCase();

      const pageTypeWeights: Record<ContentItem["pageType"], number> = {
        article: 20,
        comparison: 16,
        faq: 14,
        glossary: 8,
        hub: 4,
      };

      if (question === search.normalized) {
        score += 120;
        structuredSignal += 4;
        matchType = "exact-question";
      }

      if (title === search.normalized) {
        score += 110;
        structuredSignal += 4;
        matchType = matchType === "exact-question" ? matchType : "exact-title";
      }

      if (title.includes(search.normalized)) {
        score += 45;
        structuredSignal += 2;
        if (matchType === "body") matchType = "exact-title";
      }

      if (question.includes(search.normalized)) {
        score += 55;
        structuredSignal += 3;
        if (matchType === "body") matchType = "exact-question";
      }

      if (summary.includes(search.normalized)) {
        score += 38;
        structuredSignal += 3;
        if (matchType === "body") matchType = "summary";
      }

      if (relatedQuestions.some((item) => item.includes(search.normalized))) {
        score += 28;
        structuredSignal += 2;
        if (matchType === "body") matchType = "related-question";
      }

      for (const token of search.tokens) {
        if (title.includes(token)) {
          score += 10;
          structuredSignal += 1;
        }
        if (question.includes(token)) {
          score += 12;
          structuredSignal += 1;
        }
        if (summary.includes(token)) {
          score += 8;
          structuredSignal += 1;
        }
        if (body.includes(token)) {
          bodySignal += 1;
        }
      }

      if (bodySignal > 0) {
        const bodyContribution = structuredSignal > 0 ? Math.min(bodySignal * 2, 8) : Math.min(bodySignal, 3);
        score += bodyContribution;
      }

      score += pageTypeWeights[doc.pageType];

      if (structuredSignal === 0 && bodySignal < 2) {
        return null;
      }

      if (structuredSignal === 0) {
        score -= 18;
      }

      if (matchType === "body" && structuredSignal > 0) {
        matchType = structuredSignal >= 3 ? "summary" : "related-question";
      }

      if (score <= 0) {
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
