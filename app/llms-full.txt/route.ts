import { getAllContentItems } from "@/lib/content";
import { getAllProgrammaticPages } from "@/lib/programmatic-seo";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const items = getAllContentItems().filter((item) => item.publication.published && item.publication.indexable);
  const programmaticPages = getAllProgrammaticPages().filter((page) => page.indexable);
  const lines = [
    `# ${siteConfig.title} full route map`,
    "",
    "Use these URLs for machine-readable CPVC explanations and answer extraction.",
    "",
    ...items.map(
      (item) =>
        `- ${item.title} | ${item.pageTypeLabel} | ${siteConfig.siteUrl}/${item.category}/${item.slug} | ${item.answerSummaryResolved}`,
    ),
    "",
    "## Programmatic product, state, city, and locality pages",
    ...programmaticPages.map((page) => `- ${page.title} | ${page.type} | ${siteConfig.siteUrl}${page.path} | ${page.directAnswer}`),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
