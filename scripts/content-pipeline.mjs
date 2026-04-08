import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const contentRoot = path.join(root, "content");
const opsRoot = path.join(root, "ops", "content");
const manifestPath = path.join(root, "lib", "publication-manifest.ts");
const validQualityStates = new Set(["raw", "polished", "publishable", "indexable-ready"]);
const stageKeys = {
  "topic-intake": "topicIntake",
  "research-brief": "researchBrief",
  draft: "draft",
  "editorial-review": "editorialReview",
  "technical-review": "technicalReview",
  "publish-decision": "publishDecision",
  "indexability-decision": "indexabilityDecision",
};
const stopwords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "how",
  "if",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "what",
  "when",
  "where",
  "which",
  "why",
  "with",
]);

function main() {
  const [command, ...rest] = process.argv.slice(2);
  const args = parseArgs(rest);

  switch (command) {
    case "init":
      runInit(args);
      return;
    case "autobrief":
      runAutoBrief(args);
      return;
    case "autodraft":
      runAutoDraft(args);
      return;
    case "autoedit":
      runAutoEdit(args);
      return;
    case "final-review":
      runFinalReview(args);
      return;
    case "run":
      runFullAutomation(args);
      return;
    case "similarity":
      runSimilarity(args);
      return;
    case "advance":
      runAdvance(args);
      return;
    case "score":
      runScore(args);
      return;
    case "gate":
      runGate(args);
      return;
    case "status":
      runStatus(args);
      return;
    case "apply-manifest":
      runApplyManifest(args);
      return;
    default:
      printHelp();
  }
}

function printHelp() {
  console.log(`Usage:

  node scripts/content-pipeline.mjs init --title "..." --primary-query "..." --page-type article --category technical-guides --pillar "Technical Properties" --intent-type definition
  node scripts/content-pipeline.mjs autobrief --slug my-topic
  node scripts/content-pipeline.mjs autodraft --slug my-topic
  node scripts/content-pipeline.mjs autoedit --slug my-topic
  node scripts/content-pipeline.mjs final-review --slug my-topic
  node scripts/content-pipeline.mjs run --title "..." --primary-query "..." --page-type article --category technical-guides --pillar "Technical Properties" --intent-type application
  node scripts/content-pipeline.mjs similarity --primary-query "..." [--title "..."]
  node scripts/content-pipeline.mjs advance --slug my-topic --stage research-brief --status complete --owner "Research Agent"
  node scripts/content-pipeline.mjs score --slug my-topic --answer-quality 4 --technical-usefulness 5 --practical-examples 4 --trust-language 4 --aeo-extractability 4 --duplication-risk 4
  node scripts/content-pipeline.mjs gate --slug my-topic --reviewer "Technical Review Team" --technical-status pass --publish true --indexable false --quality-state publishable --notes "Safe to publish; deepen examples before indexing."
  node scripts/content-pipeline.mjs status --slug my-topic
  node scripts/content-pipeline.mjs apply-manifest --slug my-topic
`);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }

    args[key] = next;
    i += 1;
  }
  return args;
}

function runInit(args) {
  const title = requiredArg(args, "title");
  const primaryQuery = requiredArg(args, "primary-query");
  const pageType = requiredArg(args, "page-type");
  const category = requiredArg(args, "category");
  const pillar = requiredArg(args, "pillar");
  const intentType = requiredArg(args, "intent-type");
  const audience = args.audience ?? "To be defined in research brief";
  const slug = args.slug ? slugify(args.slug) : slugify(primaryQuery);
  const now = today();
  const packetDir = path.join(opsRoot, slug);
  const corpus = loadCorpus();
  const similarity = buildSimilarityReport({
    title,
    primaryQuery,
    pageType,
    category,
    slug,
    corpus,
  });

  if (fs.existsSync(packetDir) && !args.force) {
    throw new Error(`Packet already exists for ${slug}. Use --force only if you intend to overwrite generated files.`);
  }

  fs.mkdirSync(packetDir, { recursive: true });

  const state = {
    topic: title,
    slug,
    primaryQuery,
    pageType,
    category,
    pillar,
    intentType,
    audience,
    createdAt: now,
    updatedAt: now,
    currentStage: "topic-intake",
    similarityDecision: similarity.decision,
    publication: {
      qualityState: "raw",
      published: false,
      indexable: false,
      reviewer: "",
      reviewedAt: "",
      notes: "",
    },
    stages: {
      topicIntake: {
        status: similarity.decision === "reject" ? "rejected" : "approved",
        owner: "Content Ops",
        completedAt: now,
      },
      researchBrief: pendingStage(),
      draft: pendingStage(),
      editorialReview: pendingStage(),
      technicalReview: pendingStage(),
      publishDecision: pendingStage(),
      indexabilityDecision: pendingStage(),
    },
    scorecard: null,
  };

  saveState(packetDir, state);
  writeFile(packetDir, "00-similarity-report.md", renderSimilarityReport(state, similarity));
  writeFile(packetDir, "01-topic-intake.md", renderTopicIntake(state, similarity));
  writeFile(packetDir, "02-research-brief.md", renderResearchBrief(state));
  writeFile(packetDir, "03-draft.md", renderDraftTemplate(state));
  writeFile(packetDir, "04-editorial-review.md", renderEditorialReview(state));
  writeFile(packetDir, "05-technical-review.md", renderTechnicalReview(state));
  writeFile(packetDir, "06-publish-decision.md", renderPublishDecision(state));
  writeFile(packetDir, "07-indexability-decision.md", renderIndexabilityDecision(state));

  console.log(`Created content packet at ${path.relative(root, packetDir)}`);
  console.log(`Similarity decision: ${similarity.decision}`);
  console.log(`Next step: complete 02-research-brief.md and run the draft through the remaining stages.`);
}

function runAutoBrief(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);
  const corpus = loadCorpus();
  const related = getRecommendedRelatedItems(state, corpus);
  const brief = buildAutoBrief(state, corpus, related);

  writeFile(packetDirFor(slug), "02-research-brief.md", renderAutoResearchBrief(state, brief));
  state.stages.researchBrief = {
    status: "complete",
    owner: "Research Agent",
    completedAt: today(),
    notes: "Auto-generated first-pass research brief. Human review still recommended before publishing.",
  };
  state.currentStage = nextPendingStage(state.stages);
  state.updatedAt = today();
  savePacketState(slug, state);

  console.log(`Generated research brief for ${slug}.`);
}

function runAutoDraft(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);
  const corpus = loadCorpus();
  const related = getRecommendedRelatedItems(state, corpus);
  const brief = buildAutoBrief(state, corpus, related);
  const draft = buildAutoDraft(state, brief, related);

  writeFile(packetDirFor(slug), "03-draft.md", renderAutoDraft(state, draft));
  state.stages.draft = {
    status: "complete",
    owner: "Writer Agent",
    completedAt: today(),
    notes: "Auto-generated first-pass draft. Requires editorial and technical review.",
  };
  state.publication.qualityState = "polished";
  state.currentStage = nextPendingStage(state.stages);
  state.updatedAt = today();
  savePacketState(slug, state);

  console.log(`Generated first draft for ${slug}.`);
}

function runAutoEdit(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);
  const draftPath = path.join(packetDirFor(slug), "03-draft.md");

  if (!fs.existsSync(draftPath)) {
    throw new Error(`No draft found for ${slug}. Run autodraft first.`);
  }

  const draft = fs.readFileSync(draftPath, "utf8");
  const notes = buildEditorialNotes(state, draft);

  writeFile(packetDirFor(slug), "04-editorial-review.md", renderAutoEditorialReview(state, notes));
  state.stages.editorialReview = {
    status: notes.approval === "revise" ? "needs-revision" : "complete",
    owner: "Editor Agent",
    completedAt: today(),
    notes: `Auto-generated editorial review. Recommendation: ${notes.approval}.`,
  };
  state.currentStage = nextPendingStage(state.stages);
  state.updatedAt = today();
  savePacketState(slug, state);

  console.log(`Generated editorial review for ${slug}.`);
}

function runFinalReview(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);
  const packetDir = packetDirFor(slug);
  const draftPath = path.join(packetDir, "03-draft.md");
  const editorialPath = path.join(packetDir, "04-editorial-review.md");
  const technicalPath = path.join(packetDir, "05-technical-review.md");

  const draft = fs.existsSync(draftPath) ? fs.readFileSync(draftPath, "utf8") : "";
  const editorial = fs.existsSync(editorialPath) ? fs.readFileSync(editorialPath, "utf8") : "";
  const technical = fs.existsSync(technicalPath) ? fs.readFileSync(technicalPath, "utf8") : "";
  const report = buildFinalReview(state, draft, editorial, technical);

  writeFile(packetDir, "09-final-review.md", renderFinalReviewReport(state, report));

  if (args.apply && report.gate === "publishable") {
    state.publication.qualityState = "publishable";
  }
  if (args.apply && report.gate === "indexable-ready") {
    state.publication.qualityState = "indexable-ready";
  }

  state.updatedAt = today();
  savePacketState(slug, state);

  console.log(`Generated final review for ${slug}. Gate: ${report.gate}.`);
}

function runFullAutomation(args) {
  runInit(args);
  const slug = args.slug ? slugify(args.slug) : slugify(requiredArg(args, "primary-query"));
  runAutoBrief({ slug });
  runAutoDraft({ slug });
  runAutoEdit({ slug });
  runFinalReview({ slug });
}

function runSimilarity(args) {
  const primaryQuery = requiredArg(args, "primary-query");
  const title = args.title ?? primaryQuery;
  const slug = args.slug ? slugify(args.slug) : slugify(primaryQuery);
  const pageType = args["page-type"] ?? "article";
  const category = args.category ?? "unspecified";
  const similarity = buildSimilarityReport({
    title,
    primaryQuery,
    pageType,
    category,
    slug,
    corpus: loadCorpus(),
  });

  console.log(renderSimilarityPreview(similarity));
}

function runAdvance(args) {
  const slug = requiredArg(args, "slug");
  const stage = requiredArg(args, "stage");
  const status = requiredArg(args, "status");
  const owner = args.owner ?? "Content Team";
  const notes = args.notes ?? "";
  const state = loadStateForSlug(slug);
  const stageKey = stageKeys[stage];

  if (!stageKey) {
    throw new Error(`Unknown stage "${stage}".`);
  }

  state.stages[stageKey] = {
    status,
    owner,
    completedAt: today(),
    notes,
  };
  state.currentStage = nextPendingStage(state.stages);
  state.updatedAt = today();
  savePacketState(slug, state);

  console.log(`Updated ${stage} to ${status} for ${slug}.`);
}

function runScore(args) {
  const slug = requiredArg(args, "slug");
  const scores = {
    answerQuality: parseScore(args["answer-quality"], "answer-quality"),
    technicalUsefulness: parseScore(args["technical-usefulness"], "technical-usefulness"),
    practicalExamples: parseScore(args["practical-examples"], "practical-examples"),
    trustLanguage: parseScore(args["trust-language"], "trust-language"),
    aeoExtractability: parseScore(args["aeo-extractability"], "aeo-extractability"),
    duplicationRisk: parseScore(args["duplication-risk"], "duplication-risk"),
  };
  const total = Object.values(scores).reduce((sum, value) => sum + value, 0);
  const recommendation = qualityRecommendation(total);
  const state = loadStateForSlug(slug);

  state.scorecard = {
    ...scores,
    total,
    recommendation,
    scoredAt: today(),
  };
  state.updatedAt = today();
  savePacketState(slug, state);
  writeFile(packetDirFor(slug), "08-scorecard.md", renderScorecard(state));

  console.log(`Saved scorecard for ${slug}. Total: ${total}/30. Recommended quality state: ${recommendation}.`);
}

function runGate(args) {
  const slug = requiredArg(args, "slug");
  const reviewer = requiredArg(args, "reviewer");
  const technicalStatus = requiredArg(args, "technical-status");
  const publish = parseBoolean(requiredArg(args, "publish"), "publish");
  const indexable = parseBoolean(requiredArg(args, "indexable"), "indexable");
  const qualityState = requiredArg(args, "quality-state");
  const notes = args.notes ?? "";

  if (!validQualityStates.has(qualityState)) {
    throw new Error(`Invalid quality state "${qualityState}".`);
  }
  if (indexable && !publish) {
    throw new Error(`A page cannot be indexable if it is not published.`);
  }
  if (qualityState === "indexable-ready" && !indexable) {
    throw new Error(`indexable-ready requires indexable=true.`);
  }
  if (technicalStatus === "fail" && indexable) {
    throw new Error(`A technical review failure cannot be marked indexable.`);
  }

  const state = loadStateForSlug(slug);
  const now = today();
  state.publication = {
    qualityState,
    published: publish,
    indexable,
    reviewer,
    reviewedAt: now,
    notes,
  };
  state.stages.technicalReview = {
    status: technicalStatus === "pass" ? "complete" : "blocked",
    owner: reviewer,
    completedAt: now,
    notes,
  };
  state.stages.publishDecision = {
    status: publish ? "approved" : "rejected",
    owner: reviewer,
    completedAt: now,
    notes,
  };
  state.stages.indexabilityDecision = {
    status: indexable ? "approved" : "withheld",
    owner: reviewer,
    completedAt: now,
    notes,
  };
  state.currentStage = "complete";
  state.updatedAt = now;
  savePacketState(slug, state);
  writeFile(packetDirFor(slug), "05-technical-review.md", renderTechnicalReview(state));
  writeFile(packetDirFor(slug), "06-publish-decision.md", renderPublishDecision(state));
  writeFile(packetDirFor(slug), "07-indexability-decision.md", renderIndexabilityDecision(state));

  console.log(`Recorded gate decision for ${slug}. published=${publish} indexable=${indexable} qualityState=${qualityState}`);
}

function runStatus(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);

  console.log(`Topic: ${state.topic}`);
  console.log(`Slug: ${state.slug}`);
  console.log(`Current stage: ${state.currentStage}`);
  console.log(`Similarity decision: ${state.similarityDecision}`);
  console.log(`Publication: quality=${state.publication.qualityState} published=${state.publication.published} indexable=${state.publication.indexable}`);
  console.log(`Stages:`);
  for (const [key, value] of Object.entries(state.stages)) {
    console.log(`- ${key}: ${value.status}`);
  }
  if (state.scorecard) {
    console.log(`Scorecard: ${state.scorecard.total}/30 (${state.scorecard.recommendation})`);
  }
}

function runApplyManifest(args) {
  const slug = requiredArg(args, "slug");
  const state = loadStateForSlug(slug);

  if (!state.publication.reviewer || !state.publication.reviewedAt) {
    throw new Error(`Gate decision is incomplete for ${slug}. Run the gate step first.`);
  }

  const entry = renderManifestEntry(state);
  const source = fs.readFileSync(manifestPath, "utf8");
  const entryRegex = new RegExp(`\\{\\n\\s+slug: "${escapeRegExp(state.slug)}",[\\s\\S]*?\\n\\s+\\},`, "m");
  const nextSource = entryRegex.test(source)
    ? source.replace(entryRegex, entry)
    : source.replace(/\n\];\s*$/, `\n${entry}\n];\n`);

  fs.writeFileSync(manifestPath, nextSource);
  console.log(`Synced ${state.slug} into lib/publication-manifest.ts`);
}

function requiredArg(args, key) {
  const value = args[key];
  if (value === undefined || value === "") {
    throw new Error(`Missing required argument --${key}`);
  }
  return String(value);
}

function parseScore(value, key) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 5) {
    throw new Error(`--${key} must be an integer from 1 to 5.`);
  }
  return parsed;
}

function parseBoolean(value, key) {
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  throw new Error(`--${key} must be "true" or "false".`);
}

function loadCorpus() {
  const directories = ["articles", "comparisons", "faqs", "glossary", "hubs"];
  return directories.flatMap((directory) => {
    const dir = path.join(contentRoot, directory);
    if (!fs.existsSync(dir)) {
      return [];
    }

    return fs.readdirSync(dir)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const fullPath = path.join(dir, file);
        const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
        return {
          ...data,
          body: content,
          file: fullPath,
        };
      });
  });
}

function buildSimilarityReport(candidate) {
  const overlaps = loadCorpus()
    .filter((item) => item.slug !== candidate.slug)
    .map((item) => scoreOverlap(candidate, item))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  let decision = "proceed";
  if (overlaps[0]?.exactPrimaryQuery) {
    decision = "reject";
  } else if ((overlaps[0]?.score ?? 0) >= 78) {
    decision = "merge";
  } else if ((overlaps[0]?.score ?? 0) >= 60) {
    decision = "narrow";
  }

  return {
    decision,
    overlaps,
  };
}

function scoreOverlap(candidate, item) {
  const candidateQuery = normalize(candidate.primaryQuery);
  const itemQuery = normalize(item.primaryQuery);
  const candidateTitle = normalize(candidate.title);
  const itemTitle = normalize(item.title);
  const candidateTokens = tokenSet([candidate.primaryQuery, candidate.title, candidate.category, candidate.pageType].join(" "));
  const itemTokens = tokenSet([
    item.primaryQuery,
    item.title,
    item.category,
    item.pageType,
    item.quickAnswer ?? "",
  ].join(" "));
  const shared = intersection(candidateTokens, itemTokens);
  const union = new Set([...candidateTokens, ...itemTokens]);
  const tokenScore = union.size === 0 ? 0 : Math.round((shared.size / union.size) * 35);
  const exactPrimaryQuery = candidateQuery === itemQuery;
  const titleScore = candidateTitle === itemTitle ? 25 : candidateTitle.includes(itemTitle) || itemTitle.includes(candidateTitle) ? 18 : 0;
  const queryScore = exactPrimaryQuery ? 55 : candidateQuery.includes(itemQuery) || itemQuery.includes(candidateQuery) ? 32 : 0;
  const categoryScore = candidate.category === item.category ? 8 : 0;
  const pageTypeScore = candidate.pageType === item.pageType ? 6 : 0;
  const score = queryScore + titleScore + tokenScore + categoryScore + pageTypeScore;

  return {
    slug: item.slug,
    title: item.title,
    score,
    exactPrimaryQuery,
    category: item.category,
    pageType: item.pageType,
    sharedTokens: [...shared].slice(0, 8),
  };
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenSet(value) {
  return new Set(
    normalize(value)
      .split(" ")
      .filter((token) => token.length > 2 && !stopwords.has(token)),
  );
}

function intersection(left, right) {
  const shared = new Set();
  for (const token of left) {
    if (right.has(token)) {
      shared.add(token);
    }
  }
  return shared;
}

function pendingStage() {
  return {
    status: "pending",
    owner: "",
    completedAt: "",
    notes: "",
  };
}

function nextPendingStage(stages) {
  for (const [name, value] of Object.entries(stages)) {
    if (value.status === "pending") {
      return name;
    }
  }
  return "complete";
}

function qualityRecommendation(total) {
  if (total >= 28) {
    return "indexable-ready";
  }
  if (total >= 24) {
    return "publishable";
  }
  return "polished";
}

function saveState(packetDir, state) {
  fs.writeFileSync(path.join(packetDir, "state.json"), `${JSON.stringify(state, null, 2)}\n`);
}

function savePacketState(slug, state) {
  saveState(packetDirFor(slug), state);
}

function loadStateForSlug(slug) {
  const packetDir = packetDirFor(slug);
  const statePath = path.join(packetDir, "state.json");

  if (!fs.existsSync(statePath)) {
    throw new Error(`No packet found for ${slug}. Run the init step first.`);
  }

  return JSON.parse(fs.readFileSync(statePath, "utf8"));
}

function packetDirFor(slug) {
  return path.join(opsRoot, slug);
}

function writeFile(packetDir, fileName, contents) {
  fs.mkdirSync(packetDir, { recursive: true });
  fs.writeFileSync(path.join(packetDir, fileName), contents);
}

function renderSimilarityReport(state, similarity) {
  const rows = similarity.overlaps.length === 0
    ? "- No meaningful overlap detected in the current corpus.\n"
    : similarity.overlaps.map((item, index) => {
        return `${index + 1}. ${item.title} (\`${item.slug}\`) - score ${item.score}\n   - category: ${item.category}\n   - page type: ${item.pageType}\n   - shared terms: ${item.sharedTokens.join(", ") || "none"}\n`;
      }).join("\n");

  return `# Similarity Report\n\n- Topic: ${state.topic}\n- Proposed slug: \`${state.slug}\`\n- Decision: \`${similarity.decision}\`\n\n## Top overlaps\n\n${rows}`;
}

function renderTopicIntake(state, similarity) {
  return `# Topic Intake\n\n## Topic summary\n- Title: ${state.topic}\n- Primary query: ${state.primaryQuery}\n- Slug: \`${state.slug}\`\n- Page type: ${state.pageType}\n- Category: ${state.category}\n- Pillar: ${state.pillar}\n- Intent type: ${state.intentType}\n- Initial audience: ${state.audience}\n\n## Intake decision\n- Similarity decision: \`${similarity.decision}\`\n- Proceed only if the angle is distinct from the top overlaps in \`00-similarity-report.md\`.\n\n## Decision notes\n- Reader problem:\n- Why this page deserves to exist:\n- What nearby page it must not duplicate:\n- Recommended outcome: proceed / merge / narrow / reject\n`;
}

function renderResearchBrief(state) {
  return `# Research Brief\n\n## 1. Audience\n- Primary audience:\n- Secondary audience:\n\n## 2. Search Intent\n- Intent type: ${state.intentType}\n- Why the reader is searching:\n\n## 3. Reader Problem\n- What practical problem are they trying to solve?\n\n## 4. Content Objective\n- What decision or understanding should the page unlock?\n\n## 5. Domain Context\n- Where this topic shows up in real plumbing work:\n\n## 6. Important Facts and Insights\n- \n- \n- \n\n## 7. Technical Concepts to Include\n- \n- \n- \n\n## 8. Practical Use Cases and Field Situations\n- \n- \n\n## 9. Related Reader Questions\n- \n- \n- \n\n## 10. FAQ Opportunities\n- \n- \n\n## 11. SEO Opportunities\n- Primary query: ${state.primaryQuery}\n- Supporting terms:\n- Internal link targets:\n\n## 12. AEO Opportunities\n- Direct answer block:\n- Quick facts to surface:\n- Definitions, comparisons, or steps to make extractable:\n\n## 13. Recommended Article Angle\n- Write this like a plumbing consultant, not a generic copywriter.\n- Cover what is true, when it is true, when it is not true, common mistakes, and what to do next.\n\n## 14. Recommended Outline\n1. Direct answer\n2. Practical explanation\n3. Limits and conditions\n4. Common mistakes\n5. Field example or use case\n6. FAQ or next step\n\n## 15. What to Avoid\n- Decorative intros\n- Generic claims without field specifics\n- Repeating the keyword without helping the reader act\n`;
}

function buildAutoBrief(state, corpus, related) {
  const category = guessCategoryContext(state.category);
  const audience = inferAudience(state);
  const readerProblem = inferReaderProblem(state);
  const objective = inferObjective(state);
  const concepts = inferTechnicalConcepts(state);
  const useCases = inferUseCases(state);
  const faqs = inferFaqOpportunities(state, related);
  const seoTerms = inferSeoTerms(state, related);
  const aeoHooks = inferAeoHooks(state, related);
  const avoid = inferAvoidList(state);

  return {
    audience,
    readerProblem,
    objective,
    domainContext: category.domainContext,
    facts: category.facts,
    concepts,
    useCases,
    relatedQuestions: faqs,
    faqOpportunities: faqs.slice(0, 3),
    seoTerms,
    aeoHooks,
    angle: category.angle,
    outline: inferOutline(state),
    avoid,
    relatedItems: related.map((item) => ({ slug: item.slug, title: item.title })),
    topCorpusSupport: corpus
      .filter((item) => state.category === item.category || state.intentType === item.intentType)
      .slice(0, 3)
      .map((item) => item.title),
  };
}

function renderAutoResearchBrief(state, brief) {
  return `# Research Brief\n\n## 1. Audience\n- Primary audience: ${brief.audience.primary}\n- Secondary audience: ${brief.audience.secondary}\n\n## 2. Search Intent\n- Intent type: ${state.intentType}\n- Why the reader is searching: ${brief.readerProblem}\n\n## 3. Reader Problem\n- ${brief.readerProblem}\n\n## 4. Content Objective\n- ${brief.objective}\n\n## 5. Domain Context\n- ${brief.domainContext}\n\n## 6. Important Facts and Insights\n${brief.facts.map((item) => `- ${item}`).join("\n")}\n\n## 7. Technical Concepts to Include\n${brief.concepts.map((item) => `- ${item}`).join("\n")}\n\n## 8. Practical Use Cases and Field Situations\n${brief.useCases.map((item) => `- ${item}`).join("\n")}\n\n## 9. Related Reader Questions\n${brief.relatedQuestions.map((item) => `- ${item}`).join("\n")}\n\n## 10. FAQ Opportunities\n${brief.faqOpportunities.map((item) => `- ${item}`).join("\n")}\n\n## 11. SEO Opportunities\n- Primary query: ${state.primaryQuery}\n- Supporting terms: ${brief.seoTerms.join(", ")}\n- Related internal targets: ${brief.relatedItems.map((item) => `${item.title} (\`${item.slug}\`)`).join(", ") || "None yet"}\n\n## 12. AEO Opportunities\n${brief.aeoHooks.map((item) => `- ${item}`).join("\n")}\n\n## 13. Recommended Article Angle\n- ${brief.angle}\n\n## 14. Recommended Outline\n${brief.outline.map((item, index) => `${index + 1}. ${item}`).join("\n")}\n\n## 15. What to Avoid\n${brief.avoid.map((item) => `- ${item}`).join("\n")}\n\n## 16. Corpus Context\n${brief.topCorpusSupport.map((item) => `- ${item}`).join("\n")}\n`;
}

function buildAutoDraft(state, brief, related) {
  const title = state.topic;
  const metaDescription = buildMetaDescription(state, brief);
  const directAnswer = buildDirectAnswer(state);
  const practicalExplanation = buildPracticalExplanation(state, brief);
  const limits = buildLimits(state, brief);
  const mistakes = buildCommonMistakes(state);
  const nextSteps = buildNextSteps(state, related);
  const faqItems = brief.faqOpportunities.map((question) => ({
    question,
    answer: buildFaqAnswer(state, question),
  }));

  return {
    title,
    metaDescription,
    directAnswer,
    practicalExplanation,
    limits,
    mistakes,
    nextSteps,
    faqItems,
    takeaway: buildTakeaway(state),
  };
}

function renderAutoDraft(state, draft) {
  return `# Draft\n\n## Title\n${draft.title}\n\n## Meta Description\n${draft.metaDescription}\n\n## Direct Answer\n${draft.directAnswer}\n\n## Article Body\n\n### What is true\n${draft.practicalExplanation.trueNow}\n\n### When it is true\n${draft.practicalExplanation.whenTrue}\n\n### When it is not true\n${draft.practicalExplanation.whenNotTrue}\n\n### Limits and conditions\n${draft.limits}\n\n### Common mistakes\n${draft.mistakes}\n\n### What to do next\n${draft.nextSteps}\n\n## FAQ\n${draft.faqItems.map((item) => `- Question: ${item.question}\n  - Answer: ${item.answer}`).join("\n")}\n\n## Key Takeaway\n${draft.takeaway}\n`;
}

function buildEditorialNotes(state, draft) {
  const weaknesses = [];
  const improvements = [];
  const bannedMatches = [
    "in today's world",
    "there are many factors",
    "it is important to note",
    "when it comes to",
  ].filter((phrase) => draft.toLowerCase().includes(phrase));

  if (!draft.includes("## Direct Answer")) {
    weaknesses.push("The draft is missing a dedicated direct-answer section near the top.");
  } else {
    improvements.push("The draft already separates the direct answer from the deeper explanation.");
  }

  if (!draft.includes("### Common mistakes")) {
    weaknesses.push("The draft does not yet call out the mistake readers are most likely to make.");
  } else {
    improvements.push("The draft includes a mistake-prevention section, which strengthens practical usefulness.");
  }

  if (!draft.includes("### When it is not true")) {
    weaknesses.push("The draft needs a clearer 'when it is not true' section to prevent overclaiming.");
  } else {
    improvements.push("The draft includes a limit/exception path, which supports trust.");
  }

  if (bannedMatches.length > 0) {
    weaknesses.push(`The draft still contains banned filler phrasing: ${bannedMatches.join(", ")}.`);
  }

  if (draft.length < 900) {
    weaknesses.push("The draft is still light on practical explanation and likely needs one stronger field example.");
  } else {
    improvements.push("The draft is long enough to support a full answer without forcing decorative filler.");
  }

  const approval = weaknesses.length >= 3 ? "revise" : "publishable";

  return {
    weaknesses,
    improvements,
    seoValidation: [
      "The title and primary query should stay tightly aligned.",
      "The direct answer should remain quotable within the opening screenful.",
      `Use internal links to ${state.relatedSlugs?.join(", ") || "the nearest cluster pages"} only where they deepen the decision.`,
    ],
    aeoValidation: [
      "The answer block is present and easy to extract.",
      "The headings follow a practical problem-solving flow.",
      "The FAQ set stays question-led instead of keyword-led.",
    ],
    approval,
  };
}

function renderAutoEditorialReview(state, notes) {
  const weaknesses = notes.weaknesses.length > 0 ? notes.weaknesses : ["No major structural weaknesses detected in the automated pass."];
  const improvements = notes.improvements.length > 0 ? notes.improvements : ["No auto-improvements to note; review manually for tone and technical depth."];

  return `# Editorial Review\n\n## Draft Weaknesses\n${weaknesses.map((item) => `- ${item}`).join("\n")}\n\n## Improvements Made or Confirmed\n${improvements.map((item) => `- ${item}`).join("\n")}\n\n## SEO Validation\n${notes.seoValidation.map((item) => `- ${item}`).join("\n")}\n\n## AEO Validation\n${notes.aeoValidation.map((item) => `- ${item}`).join("\n")}\n\n## Approval\n- Recommendation: ${notes.approval}\n- Editor: Editor Agent\n- Date: ${today()}\n`;
}

function buildFinalReview(state, draft, editorial, technical) {
  const blockers = [];
  const strengths = [];
  const technicalComplete = state.stages.technicalReview?.status === "complete";
  const editorialComplete = state.stages.editorialReview?.status === "complete";

  if (!draft.includes("## Direct Answer")) {
    blockers.push("Missing direct-answer section.");
  } else {
    strengths.push("Direct answer is present.");
  }

  if (!draft.includes("### Common mistakes")) {
    blockers.push("Missing common-mistakes section.");
  } else {
    strengths.push("Common mistakes are called out.");
  }

  if (!draft.includes("### What to do next")) {
    blockers.push("Missing next-step guidance.");
  } else {
    strengths.push("Next-step guidance is present.");
  }

  if (!editorial.trim() || !editorialComplete) {
    blockers.push("Editorial review has not been generated yet.");
  } else {
    strengths.push("Editorial review exists.");
  }

  if (!technicalComplete) {
    blockers.push("Technical review has not been completed or approved yet.");
  } else {
    strengths.push("Technical review appears complete.");
  }

  let gate = "blocked";
  if (blockers.length === 1 && !technicalComplete) {
    gate = "publishable";
  } else if (blockers.length === 0) {
    gate = "indexable-ready";
  } else if (blockers.length <= 2) {
    gate = "publishable";
  }

  return {
    blockers,
    strengths,
    gate,
  };
}

function renderFinalReviewReport(state, report) {
  return `# Final Review\n\n## Strengths\n${report.strengths.map((item) => `- ${item}`).join("\n")}\n\n## Blockers\n${report.blockers.length > 0 ? report.blockers.map((item) => `- ${item}`).join("\n") : "- No blocking issues detected in the automated gate."}\n\n## Gate Recommendation\n- ${report.gate}\n\n## Publish Rule\n- Do not sync this topic into the publication manifest until the gate recommendation matches the decision you want to take and the technical reviewer has confirmed the risk-sensitive claims.\n`;
}

function getRecommendedRelatedItems(state, corpus) {
  return corpus
    .filter((item) => item.slug !== state.slug)
    .map((item) => scoreOverlap(state, item))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((result) => corpus.find((item) => item.slug === result.slug))
    .filter(Boolean);
}

function inferAudience(state) {
  const byCategory = {
    "cpvc-basics": {
      primary: "Homeowners, junior engineers, and first-time specifiers trying to understand the material correctly.",
      secondary: "Contractors who need a quick definition before comparing materials.",
    },
    "technical-guides": {
      primary: "Installers, supervisors, and specifiers checking performance limits before making a decision.",
      secondary: "Homeowners or buyers validating whether CPVC fits a specific use case.",
    },
    installation: {
      primary: "Plumbers, installers, and site supervisors who need correct field execution guidance.",
      secondary: "Procurement or QA reviewers checking whether installation advice is realistic.",
    },
    comparisons: {
      primary: "Decision-makers comparing CPVC with another material for a real job.",
      secondary: "Homeowners and procurement teams evaluating trade-offs.",
    },
    problems: {
      primary: "Readers trying to diagnose failure, leakage, cracking, or misuse in an existing system.",
      secondary: "Contractors who need to explain cause and prevention clearly to a client or team.",
    },
    standards: {
      primary: "Engineers, reviewers, and technically minded buyers checking sizing, terminology, or standards meaning.",
      secondary: "Installers who need a plain-English explanation of compliance-related terms.",
    },
    "quick-answers": {
      primary: "Readers who need a reliable yes/no or short technical answer fast.",
      secondary: "Mobile users checking a quick decision before reading a deeper page.",
    },
    glossary: {
      primary: "Readers who understand the broader topic but need one term explained clearly.",
      secondary: "Teams using the site while reading a more detailed article or standard.",
    },
  };
  return byCategory[state.category] ?? {
    primary: "Readers with a practical CPVC decision to make.",
    secondary: "Anyone who needs a plain-English technical answer.",
  };
}

function inferReaderProblem(state) {
  const byIntent = {
    definition: "The reader has seen the term but does not yet know what it means in practical plumbing use.",
    comparison: "The reader needs to choose between CPVC and another option instead of collecting features with no decision value.",
    application: "The reader is trying to decide whether CPVC is suitable for a specific use case, installation condition, or design detail.",
    troubleshooting: "The reader is looking for the likely cause of a visible problem and how to prevent it from happening again.",
  };
  return byIntent[state.intentType];
}

function inferObjective(state) {
  const byType = {
    article: "Give a direct answer, explain the condition around it, and move the reader toward the next technical check.",
    comparison: "State the trade-off clearly and show when each material is the better choice.",
    faq: "Resolve the immediate question quickly while still pointing to the deeper page if the decision needs more detail.",
    glossary: "Explain the term in context so the reader understands why it matters in a real system.",
    hub: "Orient the reader quickly and route them into the strongest supporting page for their task.",
  };
  return byType[state.pageType];
}

function guessCategoryContext(categorySlug) {
  const byCategory = {
    "cpvc-basics": {
      domainContext: "This topic appears early in the buyer or installer journey when people are still identifying the material and its normal use in domestic water systems.",
      facts: [
        "Readers often confuse CPVC with PVC or UPVC unless the heat-use distinction is explained clearly.",
        "The material choice alone is never the full answer; temperature, pressure, joining, and support practice still matter.",
        "Definition pages should help the reader act, not just expand the abbreviation.",
      ],
      angle: "Explain the material in plain English and immediately connect the definition to a real plumbing decision.",
    },
    "technical-guides": {
      domainContext: "These pages sit in the middle of a design or installation decision where the reader is checking whether CPVC is suitable under a practical condition.",
      facts: [
        "Technical pages must state the usable answer first, then explain the limits.",
        "Readers trust this category more when conditions and exceptions are made explicit.",
        "AEO value is strongest when quick facts and next-step guidance are clearly separated.",
      ],
      angle: "Lead with the usable answer, then show the boundaries, not just the positive case.",
    },
    installation: {
      domainContext: "Installation pages are used in the field or immediately before installation decisions, so vague guidance quickly becomes untrustworthy.",
      facts: [
        "Execution details matter more than polished wording in this category.",
        "Readers want mistake prevention and sequence clarity, not theoretical prose.",
        "A strong installation page calls out where workmanship usually fails.",
      ],
      angle: "Write like an installer educator: sequence first, mistakes second, risk control third.",
    },
    comparisons: {
      domainContext: "Comparison pages are used during material selection and need to support a real trade-off, not a feature dump.",
      facts: [
        "Readers need to know where CPVC wins, where it does not, and what job condition changes the choice.",
        "Comparison pages should not pretend there is one winner in all cases.",
        "The page becomes more useful when it states the decision logic in plain language after the comparison table.",
      ],
      angle: "Take a position by use case and explain what changes the answer.",
    },
    problems: {
      domainContext: "Troubleshooting pages are often read after a failure or complaint, so the writing must be concrete and accountable.",
      facts: [
        "Readers want probable causes, common installation mistakes, and prevention logic.",
        "Overconfident blame language hurts trust in troubleshooting content.",
        "The page should separate symptoms, causes, and prevention clearly.",
      ],
      angle: "Write like a diagnosis note: cause, condition, mistake, and corrective next step.",
    },
    standards: {
      domainContext: "Standards and sizing pages are read when someone needs a term, rule, or sizing idea translated into usable guidance.",
      facts: [
        "These pages should explain what the standard or sizing concept changes in practice.",
        "Risk-sensitive claims need restrained language and a clear note on context.",
        "The page should help the reader know whether to keep reading, consult a table, or escalate to a design review.",
      ],
      angle: "Translate technical language into a practical checkpoint without overclaiming precision.",
    },
    "quick-answers": {
      domainContext: "Quick-answer pages are used for fast yes/no or short explanatory queries and should route into deeper pages only when needed.",
      facts: [
        "The first paragraph should stand alone as the answer.",
        "Short pages still need conditions and limits to remain trustworthy.",
        "A FAQ page should never feel like a keyword placeholder.",
      ],
      angle: "Resolve the question quickly, but do not skip the condition that changes the answer.",
    },
    glossary: {
      domainContext: "Glossary pages are used as support pages while someone is reading a larger technical topic.",
      facts: [
        "A glossary definition should explain why the term matters in the surrounding system.",
        "Readers should leave knowing what action or interpretation the term affects.",
        "The page should connect back to the parent topic cluster naturally.",
      ],
      angle: "Define the term, then show what real decision it affects.",
    },
  };
  return byCategory[categorySlug] ?? {
    domainContext: "This page should support a real CPVC decision and avoid generic plumbing-blog language.",
    facts: [
      "Answer the query in the first screenful.",
      "State the condition that changes the answer.",
      "Point to the next useful check instead of ending with filler.",
    ],
    angle: "Stay specific, practical, and conservative.",
  };
}

function inferTechnicalConcepts(state) {
  const concepts = {
    definition: ["material role in domestic water plumbing", "difference from nearby materials", "where the term matters in practice"],
    comparison: ["use-case trade-offs", "service conditions", "installation implications"],
    application: ["service temperature and pressure", "installation condition", "long-term reliability factors"],
    troubleshooting: ["symptom versus cause", "common workmanship errors", "prevention method"],
  }[state.intentType];

  return [...concepts, categoryConcept(state.category)];
}

function categoryConcept(category) {
  const concepts = {
    "technical-guides": "limits, operating conditions, and quick decision checkpoints",
    installation: "sequence, workmanship, and failure-prevention checkpoints",
    standards: "code, standard, or sizing meaning in real use",
    comparisons: "what changes the winner from one project to another",
    problems: "root cause, not just visible symptom",
    glossary: "term definition plus the consequence of misunderstanding it",
    "quick-answers": "short answer plus one condition that changes it",
    "cpvc-basics": "plain-English explanation tied to actual plumbing use",
  };
  return concepts[category] ?? "practical decision logic";
}

function inferUseCases(state) {
  const byCategory = {
    "technical-guides": [
      "Checking whether CPVC is suitable before finalizing a domestic water line decision.",
      "Explaining a technical limit to a homeowner or procurement reviewer.",
      "Confirming whether a hot-water or service-condition assumption is safe.",
    ],
    installation: [
      "Using the page during installation planning before solvent welding or support placement.",
      "Reviewing workmanship issues with a site team before the line is closed up.",
      "Preventing repeat mistakes on a new installation.",
    ],
    comparisons: [
      "Choosing between CPVC and another material for a home or light commercial project.",
      "Explaining trade-offs during specification or procurement review.",
      "Helping a buyer understand why two materials are not interchangeable in all conditions.",
    ],
    problems: [
      "Diagnosing cracking, leakage, or performance complaints after installation.",
      "Explaining root cause to a client or supervisor in plain language.",
      "Preventing repeat failures in similar lines or fittings.",
    ],
    standards: [
      "Understanding what a standard or sizing term changes before selecting pipe or fittings.",
      "Checking whether a design assumption matches common technical practice.",
      "Clarifying what a compliance-related term means in a meeting or approval flow.",
    ],
  };
  return byCategory[state.category] ?? [
    "Helping a reader move from confusion to a practical next decision.",
    "Supporting an internal discussion with a clear, restrained explanation.",
  ];
}

function inferFaqOpportunities(state, related) {
  const defaults = [
    `What should I check before relying on ${state.primaryQuery.replace(/\?$/, "")}?`,
    `What mistake do people usually make with ${state.primaryQuery.replace(/\?$/, "")}?`,
    `What page should I read next if ${state.primaryQuery.replace(/\?$/, "")} is only part of my decision?`,
  ];
  const relatedTitles = related.slice(0, 2).map((item) => `How does this relate to ${item.title.toLowerCase()}?`);
  return [...defaults, ...relatedTitles].slice(0, 5);
}

function inferSeoTerms(state, related) {
  const base = tokenSet(`${state.primaryQuery} ${state.topic} ${state.category} ${state.pillar}`);
  for (const item of related) {
    for (const token of tokenSet(`${item.title} ${item.primaryQuery}`)) {
      base.add(token);
    }
  }
  return [...base].slice(0, 10);
}

function inferAeoHooks(state, related) {
  return [
    "Open with one direct answer paragraph that can stand alone in a quoted answer.",
    "Follow the answer with 3 to 5 quick facts, limits, or checkpoints.",
    `Route the reader into ${related[0]?.title ?? "the nearest related guide"} only if the decision needs more detail.`,
  ];
}

function inferAvoidList(state) {
  return [
    "Do not write a decorative intro before the answer.",
    "Do not repeat the keyword without adding decision value.",
    `Do not present ${state.pageType === "comparison" ? "a fake universal winner" : "a universal answer"} if job conditions change the recommendation.`,
  ];
}

function inferOutline(state) {
  const outlines = {
    comparison: [
      "Short decision answer",
      "When CPVC is the better choice",
      "When the other option is better",
      "What changes the decision on site",
      "Common comparison mistake",
      "Next step",
    ],
    troubleshooting: [
      "Short diagnosis answer",
      "Most likely causes",
      "When that cause is more or less likely",
      "Common installation or use mistake",
      "What to inspect next",
      "FAQ or escalation path",
    ],
  };
  return outlines[state.intentType] ?? [
    "Short answer",
    "Practical explanation",
    "Limits and conditions",
    "Common mistake",
    "Field example or checkpoint",
    "Next step",
  ];
}

function buildMetaDescription(state, brief) {
  const sentence = `Get a direct answer to "${state.primaryQuery}" with practical CPVC guidance, limits, and next checks for real plumbing decisions.`;
  return sentence.length <= 160 ? sentence : sentence.slice(0, 157) + "...";
}

function buildDirectAnswer(state) {
  const byIntent = {
    definition: `${state.topic} should answer the term in plain English first, then explain why it matters in practical CPVC work instead of stopping at a textbook definition.`,
    comparison: `${state.topic} should state the decision clearly: CPVC is better in some conditions, but not all, so the answer depends on service conditions, installation expectations, and long-term maintenance priorities.`,
    application: `${state.topic} should give a usable yes-or-no answer first, then explain the condition that changes the answer so the reader does not treat CPVC as suitable in every case.`,
    troubleshooting: `${state.topic} should identify the most likely cause first, then explain what on-site condition usually confirms or disproves that diagnosis.`,
  };
  return byIntent[state.intentType];
}

function buildPracticalExplanation(state, brief) {
  return {
    trueNow: `In practical terms, this page should help the reader make a plumbing decision instead of just collecting facts. ${brief.objective}`,
    whenTrue: `The answer holds when the service condition, installation quality, and use case stay within the normal expectations for this topic. That is why the article should explain the condition around the answer, not just the answer itself.`,
    whenNotTrue: `The answer changes when the reader ignores limits such as heat, pressure, workmanship, exposure, or the difference between residential guidance and edge-case service conditions.`,
  };
}

function buildLimits(state, brief) {
  return `Do not present this topic as universally safe or universally unsafe. Show the limit, the condition that changes the recommendation, and what additional check the reader should make if the job falls outside normal domestic plumbing assumptions. ${brief.domainContext}`;
}

function buildCommonMistakes(state) {
  const byCategory = {
    installation: "The common mistake is treating sequence and workmanship as minor details. On CPVC work, poor preparation or rushed joining often matters more than the material label alone.",
    comparisons: "The common mistake is comparing only features and never stating which choice is better for the actual service condition.",
    problems: "The common mistake is blaming the visible symptom instead of checking the installation condition, support, exposure, or service stress that caused it.",
    standards: "The common mistake is quoting a standard or sizing term without explaining what it changes in actual design or installation practice.",
  };
  return byCategory[state.category] ?? "The common mistake is stopping at a polished explanation without showing the practical condition that changes the answer.";
}

function buildNextSteps(state, related) {
  if (related.length === 0) {
    return "End the page with the next practical check the reader should make so they are not left with a disconnected explanation.";
  }
  const first = related[0];
  return `If this answer is only part of the decision, move next to ${first.title.toLowerCase()} and then check the adjacent guide only if the job condition still needs clarification.`;
}

function buildFaqAnswer(state, question) {
  return `Answer this briefly, but keep the same rule: state the usable answer first, then add the condition or exception that stops the reader from overgeneralizing the result for every CPVC installation.`;
}

function buildTakeaway(state) {
  return `The page should leave the reader with one clear takeaway: answer the question directly, explain when that answer changes, and point to the next useful technical check instead of padding the article with decorative language.`;
}

function renderDraftTemplate(state) {
  return `# Draft\n\n## Title\n${state.topic}\n\n## Meta Description\n\n## Direct Answer\n\n## Article Body\n\n### What is true\n\n### When it is true\n\n### When it is not true\n\n### Common mistakes\n\n### What to do next\n\n## FAQ\n- Question:\n  - Answer:\n- Question:\n  - Answer:\n\n## Key Takeaway\n`;
}

function renderEditorialReview(state) {
  return `# Editorial Review\n\n## Draft Weaknesses\n- \n- \n\n## Improvements Made\n- \n- \n\n## SEO Validation\n- Title and primary query alignment:\n- Internal link opportunities:\n- Duplicate/filler risk:\n\n## AEO Validation\n- Direct answer in first screenful:\n- Extractable quick facts:\n- Clear FAQ language:\n\n## Approval\n- Recommendation: hold / revise / publishable\n- Editor:\n- Date:\n`;
}

function renderTechnicalReview(state) {
  const review = state.publication.reviewer
    ? `- Reviewer: ${state.publication.reviewer}\n- Reviewed at: ${state.publication.reviewedAt}\n- Outcome: ${state.stages.technicalReview.status}\n- Notes: ${state.publication.notes || "None"}\n`
    : "- Reviewer:\n- Reviewed at:\n- Outcome: pass / fail\n- Notes:\n";

  return `# Technical Review\n\n## Scope\n- standards references\n- temperature and pressure claims\n- joining guidance\n- fitting logic\n- safety and failure language\n\n## Decision\n${review}\n## Required corrections\n- \n- \n`;
}

function renderPublishDecision(state) {
  return `# Publish Decision\n\n- Published: ${state.publication.published}\n- Quality state: ${state.publication.qualityState}\n- Reviewer: ${state.publication.reviewer || "Pending"}\n- Reviewed at: ${state.publication.reviewedAt || "Pending"}\n- Notes: ${state.publication.notes || "None"}\n`;
}

function renderIndexabilityDecision(state) {
  return `# Indexability Decision\n\n- Indexable: ${state.publication.indexable}\n- Quality state: ${state.publication.qualityState}\n- Reviewer: ${state.publication.reviewer || "Pending"}\n- Reviewed at: ${state.publication.reviewedAt || "Pending"}\n- Notes: ${state.publication.notes || "None"}\n`;
}

function renderScorecard(state) {
  const scorecard = state.scorecard;
  return `# Scorecard\n\n- Answer quality: ${scorecard.answerQuality}/5\n- Technical usefulness: ${scorecard.technicalUsefulness}/5\n- Practical examples: ${scorecard.practicalExamples}/5\n- Trust language: ${scorecard.trustLanguage}/5\n- AEO extractability: ${scorecard.aeoExtractability}/5\n- Duplication risk: ${scorecard.duplicationRisk}/5\n\n## Total\n- ${scorecard.total}/30\n- Recommended quality state: \`${scorecard.recommendation}\`\n`;
}

function renderSimilarityPreview(similarity) {
  const lines = [`Decision: ${similarity.decision}`];
  for (const item of similarity.overlaps.slice(0, 5)) {
    lines.push(`- ${item.title} (${item.slug}) score=${item.score} shared=[${item.sharedTokens.join(", ")}]`);
  }
  return lines.join("\n");
}

function renderManifestEntry(state) {
  const lines = [
    "  {",
    `    slug: "${state.slug}",`,
    `    published: ${state.publication.published},`,
    `    indexable: ${state.publication.indexable},`,
    `    qualityState: "${state.publication.qualityState}",`,
    `    reviewer: "${escapeDoubleQuotes(state.publication.reviewer)}",`,
    `    reviewedAt: "${state.publication.reviewedAt}",`,
  ];

  if (state.publication.notes) {
    lines.push(`    notes: "${escapeDoubleQuotes(state.publication.notes)}",`);
  }

  lines.push("  },");
  return lines.join("\n");
}

function escapeDoubleQuotes(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

main();
