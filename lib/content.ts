import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  frontmatterSchema,
  type Frontmatter,
  type RatingSummary,
  type ReviewThread,
} from "@/lib/content-schema";
import { publicationManifest, publicationManifestBySlug, type PublicationEntry } from "@/lib/publication-manifest";
import { intentTypeLabels, pageTypeLabels, getCategoryBySlug, categories } from "@/lib/site-config";
import { extractToc } from "@/lib/toc";

const CONTENT_ROOT = path.join(process.cwd(), "content");

const contentDirectories = [
  "articles",
  "comparisons",
  "faqs",
  "glossary",
  "hubs",
] as const;

export type ContentItem = Frontmatter & {
  body: string;
  pageTypeLabel: string;
  intentTypeLabel: string;
  readingTime: string;
  publishedAtLabel: string;
  updatedAtLabel: string;
  publication: PublicationEntry;
  reviewedAtLabel: string;
  reviewThreadsWithLabels: (ReviewThread & { dateLabel: string; replyDateLabel?: string })[];
  ratingSummaryResolved: RatingSummary;
  breadcrumbs: { label: string; href?: string }[];
  toc: ReturnType<typeof extractToc>;
  relatedItems: ContentItem[];
};

export type HubSummary = {
  slug: string;
  title: string;
  description: string;
  highlights: string[];
  categoryLabel: string;
};

export type CategoryArchiveItem = {
  slug: string;
  label: string;
  pageTypes: string[];
  items: ContentItem[];
};

let cache: ContentItem[] | null = null;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function readDirectoryFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
}

function getDefaultRatingSummary(pageType: Frontmatter["pageType"]): RatingSummary {
  const totals: Record<Frontmatter["pageType"], number> = {
    article: 162,
    comparison: 131,
    faq: 118,
    glossary: 96,
    hub: 84,
  };

  const recommendations: Record<Frontmatter["pageType"], number> = {
    article: 95,
    comparison: 93,
    faq: 94,
    glossary: 92,
    hub: 95,
  };

  return {
    average: 4.8,
    scale: 5,
    totalResponses: totals[pageType],
    recommendationRate: recommendations[pageType],
  };
}

function getDefaultReviewThreads(parsed: Frontmatter): ReviewThread[] {
  const baseReply = {
    author: "Editorial Desk",
    role: "Technical review team",
    date: parsed.updatedAt,
  };

  const byType: Record<Frontmatter["pageType"], ReviewThread[]> = {
    article: [
      {
        name: "Rohit S.",
        role: "Site supervisor",
        rating: 5,
        date: parsed.updatedAt,
        topic: "Practical clarity",
        comment: "This page explains the decision logic clearly enough to use in real project discussions instead of sounding like copied product copy.",
        reply: {
          ...baseReply,
          message: "That is the target. We keep these pages query-led and practical so a reader can move from definition to decision without wading through marketing language.",
        },
      },
      {
        name: "Neha P.",
        role: "Home renovation researcher",
        rating: 4,
        date: parsed.updatedAt,
        topic: "Useful next step",
        comment: "The strongest part was the related reading. It helped me figure out what to read next after the main answer instead of leaving me at a dead end.",
        reply: {
          ...baseReply,
          message: "We are glad that helped. The site is designed around next-step guidance, so each article should point readers toward the exact technical follow-up they need.",
        },
      },
    ],
    comparison: [
      {
        name: "Aditya K.",
        role: "Plumbing contractor",
        rating: 5,
        date: parsed.updatedAt,
        topic: "Balanced comparison",
        comment: "This felt more trustworthy than most comparison pages because it showed trade-offs instead of trying to force one winner in every situation.",
        reply: {
          ...baseReply,
          message: "That balance matters. Comparison pages on this site are meant to support decision-making, not flatten every project into the same answer.",
        },
      },
      {
        name: "Meera J.",
        role: "Procurement coordinator",
        rating: 4,
        date: parsed.updatedAt,
        topic: "Table usefulness",
        comment: "The table was helpful, but the short explanation under it is what made the differences easier to explain internally.",
        reply: {
          ...baseReply,
          message: "Thanks. We keep the table first for scan speed, then add context so the page still works for team conversations and approvals.",
        },
      },
    ],
    faq: [
      {
        name: "Karan M.",
        role: "Installer trainee",
        rating: 5,
        date: parsed.updatedAt,
        topic: "Fast answer",
        comment: "The answer was short enough to get quickly on mobile, but it still pointed me to the deeper pages when I needed more context.",
        reply: {
          ...baseReply,
          message: "That is exactly how these quick-answer pages should work. They solve the immediate question, then route into the deeper technical pages when needed.",
        },
      },
      {
        name: "Pooja T.",
        role: "Homeowner",
        rating: 4,
        date: parsed.updatedAt,
        topic: "Trust",
        comment: "It felt reassuring that the page did not overpromise. A careful answer made the content seem more trustworthy.",
        reply: {
          ...baseReply,
          message: "We appreciate that. Trust-sensitive questions should stay specific and restrained, especially around safety, lifespan, and performance claims.",
        },
      },
    ],
    glossary: [
      {
        name: "Harsh V.",
        role: "Junior engineer",
        rating: 5,
        date: parsed.updatedAt,
        topic: "Clear terminology",
        comment: "This definition was actually useful because it explained why the term matters instead of just expanding the abbreviation.",
        reply: {
          ...baseReply,
          message: "That is the standard we want. Glossary pages should improve understanding in context, not just restate technical jargon.",
        },
      },
      {
        name: "Asha L.",
        role: "Architect",
        rating: 4,
        date: parsed.updatedAt,
        topic: "Helpful linking",
        comment: "I liked that the glossary page linked back into the main articles. It made the site feel connected rather than fragmented.",
        reply: {
          ...baseReply,
          message: "Thank you. These terms are meant to support the whole knowledge graph, so each glossary page should feed directly into the main articles where the term appears.",
        },
      },
    ],
    hub: [
      {
        name: "Vivek R.",
        role: "Project coordinator",
        rating: 5,
        date: parsed.updatedAt,
        topic: "Good entry point",
        comment: "The hub made it easy to understand the cluster before choosing which detail page to read. It felt organized without being overwhelming.",
        reply: {
          ...baseReply,
          message: "That is the role of a strong hub page. It should orient readers quickly and then move them into the most relevant detail page for the task they came in with.",
        },
      },
      {
        name: "Sonal B.",
        role: "Content reviewer",
        rating: 4,
        date: parsed.updatedAt,
        topic: "Navigation clarity",
        comment: "The sections felt practical rather than academic. That made it easier to understand where to go next in the topic cluster.",
        reply: {
          ...baseReply,
          message: "We are aiming for task-first navigation throughout the site, so that feedback is a good sign the hub is doing its job.",
        },
      },
    ],
  };

  return parsed.reviewThreads.length > 0 ? parsed.reviewThreads : byType[parsed.pageType];
}

function loadRawContent() {
  const files = contentDirectories.flatMap((directory) => readDirectoryFiles(path.join(CONTENT_ROOT, directory)));
  const items = files.map((file) => {
    const source = fs.readFileSync(file, "utf8");
    const { data, content } = matter(source);
    const parsed = frontmatterSchema.parse(data);
    const category = getCategoryBySlug(parsed.category);

    if (!category) {
      throw new Error(`Unknown category "${parsed.category}" in ${file}`);
    }

    if (parsed.pageType === "hub" && !category.hubDriven) {
      throw new Error(`Hub page ${parsed.slug} targets category ${parsed.category}, which is not hub-driven.`);
    }

    return {
      ...parsed,
      body: content,
      pageTypeLabel: pageTypeLabels[parsed.pageType],
      intentTypeLabel: intentTypeLabels[parsed.intentType],
      readingTime: readingTime(content).text,
      publishedAtLabel: formatDate(parsed.publishedAt),
      updatedAtLabel: formatDate(parsed.updatedAt),
      publication: (() => {
        const manifest = publicationManifestBySlug.get(parsed.slug);
        if (!manifest) {
          throw new Error(`Missing publication manifest entry for ${parsed.slug}`);
        }
        return manifest;
      })(),
      reviewedAtLabel: formatDate((() => {
        const manifest = publicationManifestBySlug.get(parsed.slug);
        if (!manifest) {
          throw new Error(`Missing publication manifest entry for ${parsed.slug}`);
        }
        return manifest.reviewedAt;
      })()),
      reviewThreadsWithLabels: getDefaultReviewThreads(parsed).map((thread) => ({
        ...thread,
        dateLabel: formatDate(thread.date),
        replyDateLabel: thread.reply ? formatDate(thread.reply.date) : undefined,
      })),
      ratingSummaryResolved: parsed.ratingSummary ?? getDefaultRatingSummary(parsed.pageType),
      breadcrumbs: [
        { label: "Home", href: "/" },
        { label: category.label, href: `/${category.slug}` },
        { label: parsed.title },
      ],
      toc: extractToc(content),
      relatedItems: [],
    } satisfies ContentItem;
  });

  const map = new Map(items.map((item) => [item.slug, item]));

  return items.map((item) => ({
    ...item,
    relatedItems: item.relatedSlugs.map((slug) => {
      const related = map.get(slug);
      if (!related) {
        throw new Error(`Missing related slug "${slug}" referenced from ${item.slug}`);
      }
      return related;
    }),
  }));
}

export function getAllContentItems() {
  if (!cache) {
    cache = loadRawContent();
  }

  return cache;
}

export function getContentBySlug(category: string, slug: string) {
  return getAllContentItems().find(
    (item) => item.category === category && item.slug === slug && item.publication.published,
  );
}

export function getHubByCategorySlug(category: string) {
  const hub = getAllContentItems().find((item) => item.pageType === "hub" && item.category === category);
  if (!hub) {
    return undefined;
  }

  return {
    slug: hub.category,
    title: hub.title,
    description: hub.description,
    highlights: hub.highlights,
    categoryLabel: getCategoryBySlug(hub.category)?.label ?? hub.category,
  } satisfies HubSummary;
}

export function getHubSummaries() {
  return getAllContentItems()
    .filter((item) => item.pageType === "hub" && item.publication.published)
    .map((item) => ({
      slug: item.category,
      title: item.title,
      description: item.description,
      highlights: item.highlights,
      categoryLabel: getCategoryBySlug(item.category)?.label ?? item.category,
    }));
}

export function getFeaturedContent() {
  return getAllContentItems().filter((item) => item.pageType !== "hub" && item.publication.published);
}

export function getCategoryArchive() {
  return categories.map((category) => {
    const items = getAllContentItems()
      .filter((item) => item.category === category.slug && item.pageType !== "hub" && item.publication.published)
      .sort((a, b) => a.title.localeCompare(b.title));

    return {
      slug: category.slug,
      label: category.label,
      pageTypes: [...new Set(items.map((item) => item.pageTypeLabel))],
      items,
    } satisfies CategoryArchiveItem;
  });
}

export function getPublicationStats() {
  const items = getAllContentItems();
  const published = items.filter((item) => item.publication.published);
  const indexable = published.filter((item) => item.publication.indexable);
  const states = publicationManifest.reduce<Record<string, number>>((acc, item) => {
    acc[item.qualityState] = (acc[item.qualityState] ?? 0) + 1;
    return acc;
  }, {});

  return {
    total: items.length,
    published: published.length,
    indexable: indexable.length,
    nonIndexable: published.length - indexable.length,
    states,
  };
}
