import fs from "node:fs";
import Module from "node:module";
import path from "node:path";
import ts from "typescript";

const sourcePath = path.join(process.cwd(), "lib", "programmatic-seo.ts");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
    esModuleInterop: true,
  },
});

const originalLoad = Module._load;
Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "@/lib/site-config") {
    return {
      astralCpvcReference: {
        label: "Astral CPVC Pro",
        href: "https://www.astralpipes.com/plumbing-pipes-fittings/cpvc-pro-pipes/",
        description:
          "Manufacturer-side CPVC pipe and fitting reference for product context, application examples, and specification review.",
      },
    };
  }

  return originalLoad.call(this, request, parent, isMain);
};

const runtimeModule = new Module(sourcePath);
runtimeModule.filename = sourcePath;
runtimeModule.paths = Module._nodeModulePaths(process.cwd());
runtimeModule._compile(compiled.outputText, sourcePath);
Module._load = originalLoad;

const { getAllProgrammaticPages } = runtimeModule.exports;
const pages = getAllProgrammaticPages();
const pagesByType = groupBy(pages, (page) => page.type);
const indexablePages = pages.filter((page) => page.indexable);

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const group = key(item);
    groups[group] ??= [];
    groups[group].push(item);
    return groups;
  }, {});
}

function fail(message) {
  throw new Error(message);
}

function duplicateValues(key) {
  const seen = new Map();

  for (const page of pages) {
    const value = String(page[key]);
    seen.set(value, [...(seen.get(value) ?? []), page.path]);
  }

  return [...seen.entries()].filter(([, paths]) => paths.length > 1);
}

function ensureNoDuplicates(key, label) {
  const duplicates = duplicateValues(key);

  if (duplicates.length > 0) {
    const detail = duplicates.map(([value, paths]) => `${value}: ${paths.join(", ")}`).join("; ");
    fail(`Duplicate ${label}: ${detail}`);
  }
}

function words(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

function shingles(page) {
  const sourceText = [
    page.title,
    page.description,
    page.primaryQuery,
    page.directAnswer,
    ...page.facts.flatMap((fact) => [fact.label, fact.value]),
    ...page.sections.flatMap((section) => [section.heading, section.body]),
    ...page.faqs.flatMap((faq) => [faq.question, faq.answer]),
  ].join(" ");
  const tokens = words(sourceText);
  const output = new Set();

  for (let index = 0; index <= tokens.length - 5; index += 1) {
    output.add(tokens.slice(index, index + 5).join(" "));
  }

  return output;
}

function similarity(left, right) {
  let overlap = 0;

  for (const value of left) {
    if (right.has(value)) overlap += 1;
  }

  const union = left.size + right.size - overlap;
  return union === 0 ? 0 : overlap / union;
}

function similarityReport(scope, candidates) {
  const prepared = candidates.map((page) => ({ page, shingles: shingles(page) }));
  let max = { score: 0, left: "", right: "" };
  let total = 0;
  let sum = 0;
  let pairsOver35 = 0;

  for (let left = 0; left < prepared.length; left += 1) {
    for (let right = left + 1; right < prepared.length; right += 1) {
      const score = similarity(prepared[left].shingles, prepared[right].shingles);
      total += 1;
      sum += score;

      if (score > max.score) {
        max = {
          score,
          left: prepared[left].page.path,
          right: prepared[right].page.path,
        };
      }

      if (score >= 0.35) pairsOver35 += 1;
    }
  }

  return {
    scope,
    average: total === 0 ? 0 : Number((sum / total).toFixed(3)),
    max: {
      score: Number(max.score.toFixed(3)),
      left: max.left,
      right: max.right,
    },
    pairsOver35,
  };
}

function ensureCount(type, minimum) {
  const count = pagesByType[type]?.length ?? 0;

  if (count < minimum) {
    fail(`Expected at least ${minimum} ${type} pages. Found ${count}.`);
  }
}

ensureNoDuplicates("path", "routes");
ensureNoDuplicates("title", "titles");
ensureNoDuplicates("primaryQuery", "primary queries");

ensureCount("product", 25);
ensureCount("state", 35);
ensureCount("city", 100);
ensureCount("locality", 25);

const weakLocalities = pages.filter(
  (page) => page.type === "locality" && (page.indexable || page.qualityState === "indexable-ready"),
);

if (weakLocalities.length > 0) {
  fail(`Locality pages must stay noindex in Phase 1 remediation: ${weakLocalities.map((page) => page.path).join(", ")}`);
}

const prematurePhaseTwoPages = pages.filter((page) => page.rolloutPhase === 2 && page.indexable);
if (prematurePhaseTwoPages.length > 0) {
  fail(`Phase 2 pages must stay noindex until promotion: ${prematurePhaseTwoPages.map((page) => page.path).join(", ")}`);
}

const indexableButNotReady = pages.filter((page) => page.indexable && page.qualityState !== "indexable-ready");
if (indexableButNotReady.length > 0) {
  fail(`Indexable pages must be indexable-ready: ${indexableButNotReady.map((page) => page.path).join(", ")}`);
}

const noindexReady = pages.filter((page) => !page.indexable && page.qualityState === "indexable-ready");
if (noindexReady.some((page) => page.type !== "locality")) {
  fail(`Non-locality indexable-ready pages should not be noindexed: ${noindexReady.map((page) => page.path).join(", ")}`);
}

for (const page of pages) {
  const sectionText = page.sections.map((section) => `${section.heading} ${section.body}`).join(" ");

  if (!/Astral CPVC Pro/i.test(sectionText)) {
    fail(`Missing neutral Astral CPVC Pro context: ${page.path}`);
  }

  if (page.relatedLinks.length < 5) {
    fail(`Page needs at least 5 internal/contextual links: ${page.path}`);
  }

  if (!/\b(limit|limits|avoid|do not|not as a shortcut|not as a substitute|check|depends)\b/i.test(sectionText)) {
    fail(`Page is missing practical limit/caution language: ${page.path}`);
  }
}

const similarityReports = [
  similarityReport("indexable", indexablePages),
  ...Object.entries(pagesByType).map(([type, typePages]) => similarityReport(type, typePages)),
];
const indexableReport = similarityReports.find((report) => report.scope === "indexable");

if ((indexableReport?.max.score ?? 0) > 0.72) {
  fail(
    `Indexable programmatic pages are too similar (${indexableReport.max.score}): ${indexableReport.max.left} and ${indexableReport.max.right}`,
  );
}

const counts = {
  total: pages.length,
  indexable: indexablePages.length,
  noindex: pages.length - indexablePages.length,
  products: pagesByType.product?.length ?? 0,
  states: pagesByType.state?.length ?? 0,
  cities: pagesByType.city?.length ?? 0,
  localities: pagesByType.locality?.length ?? 0,
  phaseTwoPages: pages.filter((page) => page.rolloutPhase === 2).length,
  phaseTwoIndexable: pages.filter((page) => page.rolloutPhase === 2 && page.indexable).length,
};

console.log("Programmatic SEO validation passed.");
console.log(JSON.stringify({ counts, similarityReports }, null, 2));
