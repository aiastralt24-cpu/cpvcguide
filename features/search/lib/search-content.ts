import { getPublishedContentItems } from "@/lib/content";
import { rankResults } from "@/features/search/lib/rank-results";

export function searchContent(query: string) {
  return rankResults(query, getPublishedContentItems());
}
