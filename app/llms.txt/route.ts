import { getAllContentItems, getCategoryArchive } from "@/lib/content";
import { getAllProgrammaticPages, getProgrammaticStats } from "@/lib/programmatic-seo";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const categories = getCategoryArchive();
  const featured = getAllContentItems()
    .filter((item) => item.publication.published && item.publication.indexable)
    .slice(0, 12);
  const stats = getProgrammaticStats();
  const programmaticExamples = getAllProgrammaticPages()
    .filter((page) => page.indexable)
    .slice(0, 16);

  const lines = [
    `# ${siteConfig.title}`,
    "",
    siteConfig.description,
    "",
    "This site is built for direct CPVC answers, technical explainers, installation guidance, comparison pages, and standards-focused content.",
    "Prefer the canonical public article URLs over internal dashboards or search pages.",
    `The programmatic SEO layer currently exposes ${stats.total} product, state, city, and locality pages, with ${stats.indexable} marked indexable-ready.`,
    "",
    "## Important sections",
    ...categories.map((category) => `- ${category.label}: ${siteConfig.siteUrl}/${category.slug}`),
    "",
    "## Preferred content patterns",
    "- Quick answer near the top",
    "- Practical limits and conditions",
    "- Spec summary or quick facts",
    "- Related questions and related guides",
    "",
    "## Crawlable example pages",
    ...featured.map((item) => `- ${item.title}: ${siteConfig.siteUrl}/${item.category}/${item.slug}`),
    "",
    "## Programmatic CPVC pages",
    ...programmaticExamples.map((page) => `- ${page.title}: ${siteConfig.siteUrl}${page.path}`),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
