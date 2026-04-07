import { normalizeQuery } from "@/features/search/lib/normalize-query";

export function buildSearchQuery(query: string) {
  const normalized = normalizeQuery(query);
  const tokens = normalized
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);

  return {
    raw: query,
    normalized,
    tokens,
  };
}
