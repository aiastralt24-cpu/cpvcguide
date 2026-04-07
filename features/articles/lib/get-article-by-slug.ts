import { getContentBySlug } from "@/lib/content";

export function getArticleBySlug(category: string, slug: string) {
  return getContentBySlug(category, slug);
}
