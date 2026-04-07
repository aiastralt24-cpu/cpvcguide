export type QualityState = "raw" | "polished" | "publishable" | "indexable-ready";

export type PublicationEntry = {
  slug: string;
  published: boolean;
  indexable: boolean;
  qualityState: QualityState;
  reviewer: string;
  reviewedAt: string;
  notes?: string;
};

export const publicationManifest: PublicationEntry[] = [
  {
    slug: "cpvc-fundamentals-hub",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "technical-guides-hub",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "installation-and-joining-hub",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "problems-and-fixes-hub",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "standards-and-sizing-hub",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "what-is-cpvc-pipe",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cpvc-temperature-limit",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "can-cpvc-handle-hot-water",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "where-cpvc-should-not-be-used",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
    notes: "Ready to publish; keep indexability under review if the exclusion cluster grows too quickly.",
  },
  {
    slug: "how-to-join-cpvc-pipes",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cpvc-support-spacing",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
    notes: "Strong supporting page; monitor whether a fuller spacing table is needed before long-term indexing.",
  },
  {
    slug: "why-cpvc-pipes-crack",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "why-cpvc-joints-leak",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "is-15778-explained",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Compliance Review",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "how-to-size-cpvc-for-a-house",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
    notes: "Ready for publication; can become indexable-ready after deeper sizing examples are added.",
  },
  {
    slug: "cpvc-vs-upvc",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cpvc-vs-ppr",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
    notes: "Publishable and useful; indexability can scale after more installation-specific evidence is added.",
  },
  {
    slug: "cpvc-vs-copper",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cpvc-vs-gi-pipe",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cpvc-vs-pvc",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "can-cpvc-handle-boiling-water",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "how-long-does-cpvc-last",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "does-sunlight-damage-cpvc",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "is-cpvc-safe-for-drinking-water",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Compliance Review",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "can-cpvc-be-threaded",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "solvent-cement",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "cts",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "sdr",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "water-hammer",
    published: true,
    indexable: true,
    qualityState: "publishable",
    reviewer: "Editorial Desk",
    reviewedAt: "2026-04-07",
  },
  {
    slug: "pressure-derating",
    published: true,
    indexable: true,
    qualityState: "indexable-ready",
    reviewer: "Technical Review Team",
    reviewedAt: "2026-04-07",
  },
];

export const publicationManifestBySlug = new Map(publicationManifest.map((entry) => [entry.slug, entry]));

export type PlannedArticleEntry = {
  plannedSlug: string;
  title: string;
  category: string;
  targetState: QualityState;
  intent: string;
};

export const plannedArticleBacklog: PlannedArticleEntry[] = [
  { plannedSlug: "what-is-cpvc-made-of", title: "What Is CPVC Made Of?", category: "cpvc-basics", targetState: "raw", intent: "definition" },
  { plannedSlug: "why-is-cpvc-used-in-plumbing", title: "Why Is CPVC Used in Plumbing?", category: "cpvc-basics", targetState: "raw", intent: "definition" },
  { plannedSlug: "is-cpvc-different-from-pvc", title: "Is CPVC Different From PVC?", category: "cpvc-basics", targetState: "raw", intent: "comparison" },
  { plannedSlug: "can-cpvc-handle-geyser-lines", title: "Can CPVC Handle Geyser Lines?", category: "technical-guides", targetState: "raw", intent: "application" },
  { plannedSlug: "cpvc-pressure-rating-explained", title: "CPVC Pressure Rating Explained", category: "technical-guides", targetState: "raw", intent: "definition" },
  { plannedSlug: "can-cpvc-be-used-in-commercial-buildings", title: "Can CPVC Be Used in Commercial Buildings?", category: "technical-guides", targetState: "raw", intent: "application" },
  { plannedSlug: "common-cpvc-installation-mistakes", title: "Common CPVC Installation Mistakes", category: "installation", targetState: "raw", intent: "application" },
  { plannedSlug: "what-tools-are-needed-for-cpvc-installation", title: "What Tools Are Needed for CPVC Installation?", category: "installation", targetState: "raw", intent: "application" },
  { plannedSlug: "how-long-does-cpvc-cement-take-to-cure", title: "How Long Does CPVC Cement Take to Cure?", category: "installation", targetState: "raw", intent: "application" },
  { plannedSlug: "why-does-cpvc-become-brittle", title: "Why Does CPVC Become Brittle?", category: "problems", targetState: "raw", intent: "troubleshooting" },
  { plannedSlug: "what-causes-cpvc-pipe-burst", title: "What Causes CPVC Pipe Burst?", category: "problems", targetState: "raw", intent: "troubleshooting" },
  { plannedSlug: "how-do-you-repair-a-leaking-cpvc-joint", title: "How Do You Repair a Leaking CPVC Joint?", category: "problems", targetState: "raw", intent: "troubleshooting" },
  { plannedSlug: "cpvc-vs-copper-lifecycle-cost", title: "CPVC vs Copper Lifecycle Cost", category: "comparisons", targetState: "raw", intent: "comparison" },
  { plannedSlug: "which-pipe-is-best-for-hard-water-areas", title: "Which Pipe Is Best for Hard Water Areas?", category: "comparisons", targetState: "raw", intent: "comparison" },
  { plannedSlug: "which-pipe-is-best-for-bathroom-plumbing", title: "Which Pipe Is Best for Bathroom Plumbing?", category: "comparisons", targetState: "raw", intent: "comparison" },
  { plannedSlug: "is-cpvc-uv-resistant", title: "Is CPVC UV Resistant?", category: "quick-answers", targetState: "raw", intent: "application" },
  { plannedSlug: "can-cpvc-release-chemicals-into-water", title: "Can CPVC Release Chemicals Into Water?", category: "quick-answers", targetState: "raw", intent: "definition" },
  { plannedSlug: "what-is-bis-for-cpvc", title: "What Is BIS for CPVC?", category: "standards", targetState: "raw", intent: "definition" },
  { plannedSlug: "what-markings-should-be-on-cpvc-pipes", title: "What Markings Should Be Present on CPVC Pipes?", category: "standards", targetState: "raw", intent: "definition" },
  { plannedSlug: "pipe-support-spacing", title: "What Is Pipe Support Spacing?", category: "glossary", targetState: "raw", intent: "definition" }
];
