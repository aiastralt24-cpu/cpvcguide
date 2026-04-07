import { z } from "zod";
import { categories } from "@/lib/site-config";

const categoryValues = categories.map((category) => category.slug) as [string, ...string[]];

export const faqItemSchema = z.object({
  question: z.string().min(8),
  answer: z.string().min(20),
});

export const specSummaryItemSchema = z.object({
  label: z.string().min(2),
  value: z.string().min(1),
  note: z.string().optional(),
});

export const comparisonRowSchema = z.object({
  attribute: z.string().min(2),
  cpvc: z.string().min(2),
  other: z.string().min(2),
});

export const reviewReplySchema = z.object({
  author: z.string().min(2),
  role: z.string().min(2),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  message: z.string().min(20),
});

export const reviewThreadSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  rating: z.number().min(1).max(5),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  comment: z.string().min(20),
  topic: z.string().min(3),
  reply: reviewReplySchema.optional(),
});

export const ratingSummarySchema = z.object({
  average: z.number().min(1).max(5),
  scale: z.number().min(5).max(5).default(5),
  totalResponses: z.number().int().min(1),
  recommendationRate: z.number().int().min(1).max(100),
});

export const frontmatterSchema = z.object({
  title: z.string().min(10),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(40).max(200),
  primaryQuery: z.string().min(10),
  category: z.enum(categoryValues),
  pillar: z.string().min(3),
  pageType: z.enum(["article", "comparison", "faq", "glossary", "hub"]),
  intentType: z.enum(["definition", "comparison", "application", "troubleshooting"]),
  author: z.string().min(3),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  quickAnswer: z.string().min(40).max(220),
  relatedSlugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(2),
  faqItems: z.array(faqItemSchema).default([]),
  specSummary: z.array(specSummaryItemSchema).default([]),
  comparisonRows: z.array(comparisonRowSchema).default([]),
  astralReferenceMode: z.enum(["disallowed", "conditional"]).default("disallowed"),
  highlights: z.array(z.string()).default([]),
  ratingSummary: ratingSummarySchema.optional(),
  reviewThreads: z.array(reviewThreadSchema).default([]),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
export type FAQItem = z.infer<typeof faqItemSchema>;
export type SpecSummaryItem = z.infer<typeof specSummaryItemSchema>;
export type ComparisonRow = z.infer<typeof comparisonRowSchema>;
export type ReviewReply = z.infer<typeof reviewReplySchema>;
export type ReviewThread = z.infer<typeof reviewThreadSchema>;
export type RatingSummary = z.infer<typeof ratingSummarySchema>;
