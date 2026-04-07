import type { ContentItem } from "@/lib/content";
import type { ProductReference, QuickFact } from "@/lib/content-schema";

export type Article = ContentItem;

export type AnswerSnippet = {
  question: string;
  shortAnswer: string;
  quickFacts: QuickFact[];
  relatedQuestions: string[];
  relatedArticles: string[];
};

export type ArticleCardItem = {
  slug: string;
  category: string;
  title: string;
  description: string;
  pageTypeLabel: string;
  href: string;
};

export type ProductReferenceItem = ProductReference;
