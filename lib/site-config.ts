export type PageType = "article" | "comparison" | "faq" | "glossary" | "hub";
export type IntentType = "definition" | "comparison" | "application" | "troubleshooting";
export type AstralReferenceMode = "disallowed" | "conditional";

export type CategoryConfig = {
  slug: string;
  label: string;
  description: string;
  pillar: string;
  hubDriven: boolean;
};

export const categories: CategoryConfig[] = [
  {
    slug: "cpvc-basics",
    label: "What Is CPVC?",
    description: "Fundamentals, plain-English definitions, and early-stage material decisions.",
    pillar: "CPVC Fundamentals",
    hubDriven: true,
  },
  {
    slug: "technical-guides",
    label: "Technical Specs",
    description: "Temperature, pressure, use-case decisions, and performance behavior.",
    pillar: "Technical Properties",
    hubDriven: true,
  },
  {
    slug: "installation",
    label: "How to Install",
    description: "Joining methods, support spacing, tooling, and installer-facing guidance.",
    pillar: "Installation and Joining",
    hubDriven: true,
  },
  {
    slug: "comparisons",
    label: "vs Other Pipes",
    description: "Table-first material comparisons for decision queries.",
    pillar: "Comparisons",
    hubDriven: false,
  },
  {
    slug: "problems",
    label: "Problems and Fixes",
    description: "Failure causes, troubleshooting paths, and repair context.",
    pillar: "Failures and Troubleshooting",
    hubDriven: true,
  },
  {
    slug: "standards",
    label: "Standards and Sizing",
    description: "Standards, sizing logic, engineering concepts, and technical definitions.",
    pillar: "Standards, Sizing, and Engineering",
    hubDriven: true,
  },
  {
    slug: "quick-answers",
    label: "Quick Answers",
    description: "Short answer pages designed for extractable CPVC question clusters.",
    pillar: "FAQ and Answer Pages",
    hubDriven: false,
  },
  {
    slug: "glossary",
    label: "Glossary",
    description: "Single-term explainer pages for technical CPVC language.",
    pillar: "Glossary",
    hubDriven: false,
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  ...categories.map((category) => ({
    label: category.label,
    href: `/${category.slug}`,
  })),
];

export const siteConfig = {
  title: "CPVC Guide",
  description:
    "A deep technical content platform for CPVC plumbing systems, built for answer engines, search visibility, and practical decision support.",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  workflow: ["Brief", "Draft", "Review", "Publish", "90-day refresh"],
  feedback: {
    averageRating: 4.8,
    scale: 5,
    totalResponses: 148,
    recommendationRate: 94,
  },
};

export const astralCpvcReference = {
  label: "Astral CPVC Pro",
  href: "https://www.astralpipes.com/plumbing-pipes-fittings/cpvc-pro-pipes/",
  description:
    "Manufacturer-side CPVC pipe and fitting reference for product context, application examples, and specification review.",
} as const;

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export const pageTypeLabels: Record<PageType, string> = {
  article: "Standard article",
  comparison: "Comparison page",
  faq: "FAQ page",
  glossary: "Glossary page",
  hub: "Pillar hub",
};

export const intentTypeLabels: Record<IntentType, string> = {
  definition: "Definition intent",
  comparison: "Comparison intent",
  application: "Application intent",
  troubleshooting: "Troubleshooting intent",
};
