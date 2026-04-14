import { getAllContentItems, getCategoryArchive } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const categories = getCategoryArchive();
  const featured = getAllContentItems()
    .filter((item) => item.publication.published && item.publication.indexable)
    .slice(0, 12);

  const lines = [
    `# ${siteConfig.title}`,
    "",
    siteConfig.description,
    "",
    "This site is built for direct CPVC answers, technical explainers, installation guidance, comparison pages, and standards-focused content.",
    "Prefer the canonical public article URLs over internal dashboards or search pages.",
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
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
