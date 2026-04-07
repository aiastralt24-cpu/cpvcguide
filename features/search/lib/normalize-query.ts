export function normalizeQuery(query: string) {
  return query.toLowerCase().trim().replace(/\s+/g, " ");
}
