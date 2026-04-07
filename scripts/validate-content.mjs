import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const requiredHubCategories = new Set([
  "cpvc-basics",
  "technical-guides",
  "installation",
  "problems",
  "standards",
]);
const publicationManifestSource = fs.readFileSync(path.join(root, "lib", "publication-manifest.ts"), "utf8");
const publicationManifest = [...publicationManifestSource.matchAll(/slug:\s+"([^"]+)"/g)].map((match) => ({
  slug: match[1],
}));

function getFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function loadItems() {
  const directories = ["articles", "comparisons", "faqs", "glossary", "hubs"];
  const files = directories.flatMap((directory) => getFiles(path.join(contentRoot, directory)));

  return files.map((file) => {
    const { data } = matter(fs.readFileSync(file, "utf8"));
    return {
      ...data,
      file,
    };
  });
}

function ensureShape(items) {
  for (const item of items) {
    const required = [
      "title",
      "slug",
      "description",
      "primaryQuery",
      "category",
      "pillar",
      "pageType",
      "intentType",
      "author",
      "publishedAt",
      "updatedAt",
      "quickAnswer",
      "relatedSlugs",
    ];

    for (const key of required) {
      if (!(key in item)) {
        throw new Error(`Missing required frontmatter key "${key}" in ${item.file}`);
      }
    }

    if (!Array.isArray(item.relatedSlugs) || item.relatedSlugs.length < 2) {
      throw new Error(`relatedSlugs must contain at least 2 slugs in ${item.file}`);
    }
  }
}

function ensureNoDuplicatePrimaryQuery(items) {
  const seen = new Map();
  for (const item of items) {
    const key = String(item.primaryQuery).toLowerCase();
    const existing = seen.get(key);
    if (existing) {
      throw new Error(`Duplicate primary query "${item.primaryQuery}" found in ${existing} and ${item.slug}`);
    }
    seen.set(key, item.slug);
  }
}

function ensureHubCoverage(items) {
  const present = new Set(items.filter((item) => item.pageType === "hub").map((item) => item.category));
  for (const category of requiredHubCategories) {
    if (!present.has(category)) {
      throw new Error(`Missing required hub page for ${category}`);
    }
  }
}

function ensureRelations(items) {
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  const inbound = new Map();

  for (const item of items) {
    if (item.pageType !== "hub") {
      inbound.set(item.slug, 0);
    }
  }

  for (const item of items) {
    for (const slug of item.relatedSlugs) {
      if (!bySlug.has(slug)) {
        throw new Error(`Unknown related slug "${slug}" referenced from ${item.slug}`);
      }

      if (inbound.has(slug)) {
        inbound.set(slug, inbound.get(slug) + 1);
      }
    }
  }

  const orphans = [...inbound.entries()].filter(([, count]) => count === 0).map(([slug]) => slug);
  if (orphans.length > 0) {
    throw new Error(`Orphan content detected: ${orphans.join(", ")}`);
  }
}

function ensurePublicationManifest(items) {
  const contentSlugs = new Set(items.map((item) => item.slug));
  const manifestSlugs = new Set(publicationManifest.map((item) => item.slug));

  for (const slug of contentSlugs) {
    if (!manifestSlugs.has(slug)) {
      throw new Error(`Missing publication manifest entry for ${slug}`);
    }
  }

  for (const slug of manifestSlugs) {
    if (!contentSlugs.has(slug)) {
      throw new Error(`Manifest entry found for missing content slug ${slug}`);
    }
  }
}

const items = loadItems();

if (items.length < 30) {
  throw new Error(`Expected at least 30 content items. Found ${items.length}.`);
}

ensureShape(items);
ensureNoDuplicatePrimaryQuery(items);
ensureHubCoverage(items);
ensureRelations(items);
ensurePublicationManifest(items);

console.log(`Validated ${items.length} content items successfully.`);
