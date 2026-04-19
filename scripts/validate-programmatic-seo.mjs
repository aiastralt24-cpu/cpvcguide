import fs from "node:fs";
import path from "node:path";

const sourcePath = path.join(process.cwd(), "lib", "programmatic-seo.ts");
const source = fs.readFileSync(sourcePath, "utf8");

function extractBetween(start, end) {
  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Could not find programmatic SEO block between ${start} and ${end}`);
  }

  return source.slice(startIndex + start.length, endIndex);
}

function ensureUnique(values, label) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }

  if (duplicates.size > 0) {
    throw new Error(`Duplicate ${label}: ${[...duplicates].join(", ")}`);
  }
}

const productBlock = extractBetween("export const productSeeds", "export const stateSeeds");
const stateBlock = extractBetween("export const stateSeeds", "const citySource");
const cityBlock = extractBetween("const citySource = `", "`;\n\nexport const citySeeds");
const localityBlock = extractBetween("export const localitySeeds", "function pageSlug");

const productSlugs = [...productBlock.matchAll(/slug:\s+"([^"]+)"/g)].map((match) => match[1]);
const stateSlugs = [...stateBlock.matchAll(/\[\s*"([^"]+)"/g)].map((match) => match[1]);
const cityRows = cityBlock.split("\n").map((row) => row.trim()).filter(Boolean);
const citySlugs = cityRows.map((row) => row.split("|")[0]);
const localityRows = [...localityBlock.matchAll(/\[\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g)].map((match) => ({
  citySlug: match[1],
  slug: match[4],
}));

ensureUnique(productSlugs, "product slugs");
ensureUnique(stateSlugs, "state slugs");
ensureUnique(citySlugs, "city slugs");
ensureUnique(localityRows.map((item) => `${item.citySlug}/${item.slug}`), "locality routes");

if (productSlugs.length < 25) {
  throw new Error(`Expected at least 25 product pages. Found ${productSlugs.length}.`);
}

if (stateSlugs.length < 35) {
  throw new Error(`Expected at least 35 state/region pages. Found ${stateSlugs.length}.`);
}

if (cityRows.length < 100) {
  throw new Error(`Expected at least 100 city pages in the first controlled batch. Found ${cityRows.length}.`);
}

if (localityRows.length < 25) {
  throw new Error(`Expected at least 25 explicit locality pages in the first controlled batch. Found ${localityRows.length}.`);
}

for (const citySlug of localityRows.map((item) => item.citySlug)) {
  if (!citySlugs.includes(citySlug)) {
    throw new Error(`Locality references unknown city slug: ${citySlug}`);
  }
}

for (const requiredText of ["Astral CPVC Pro", "qualityScore", "auditNotes", "indexable-ready", "not as a shortcut", "Why this locality page exists"]) {
  if (!source.includes(requiredText)) {
    throw new Error(`Programmatic SEO source is missing required text: ${requiredText}`);
  }
}

console.log(
  `Validated ${productSlugs.length + stateSlugs.length + cityRows.length + localityRows.length} programmatic SEO pages (${productSlugs.length} products, ${stateSlugs.length} states, ${cityRows.length} cities, ${localityRows.length} localities).`,
);
