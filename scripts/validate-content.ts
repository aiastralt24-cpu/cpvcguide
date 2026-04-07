import { getAllContentItems } from "@/lib/content";

function ensureNoDuplicatePrimaryQuery() {
  const seen = new Map<string, string>();

  for (const item of getAllContentItems()) {
    const key = item.primaryQuery.toLowerCase();
    const existing = seen.get(key);

    if (existing) {
      throw new Error(`Duplicate primary query "${item.primaryQuery}" found in ${existing} and ${item.slug}`);
    }

    seen.set(key, item.slug);
  }
}

function ensureHubCoverage() {
  const hubs = getAllContentItems().filter((item) => item.pageType === "hub");
  const categories = new Set(hubs.map((hub) => hub.category));

  for (const expected of ["cpvc-basics", "technical-guides", "installation", "problems", "standards"]) {
    if (!categories.has(expected)) {
      throw new Error(`Missing required hub page for ${expected}`);
    }
  }
}

function ensureNoOrphans() {
  const items = getAllContentItems().filter((item) => item.pageType !== "hub");
  const inbound = new Map<string, number>();

  for (const item of items) {
    inbound.set(item.slug, 0);
  }

  for (const item of items) {
    for (const related of item.relatedItems) {
      inbound.set(related.slug, (inbound.get(related.slug) ?? 0) + 1);
    }
  }

  const orphans = [...inbound.entries()].filter(([, count]) => count === 0).map(([slug]) => slug);
  if (orphans.length > 0) {
    throw new Error(`Orphan content detected: ${orphans.join(", ")}`);
  }
}

function main() {
  const items = getAllContentItems();

  if (items.length < 30) {
    throw new Error(`Expected at least 30 content items in the representative launch pack. Found ${items.length}.`);
  }

  ensureNoDuplicatePrimaryQuery();
  ensureHubCoverage();
  ensureNoOrphans();

  console.log(`Validated ${items.length} content items successfully.`);
}

main();
