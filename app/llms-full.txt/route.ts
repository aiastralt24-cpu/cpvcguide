import { getAllContentItems } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const items = getAllContentItems().filter((item) => item.publication.published && item.publication.indexable);
  const lines = [
    `# ${siteConfig.title} full route map`,
    "",
    "Use these URLs for machine-readable CPVC explanations and answer extraction.",
    "",
    ...items.map(
      (item) =>
        `- ${item.title} | ${item.pageTypeLabel} | ${siteConfig.siteUrl}/${item.category}/${item.slug} | ${item.answerSummaryResolved}`,
    ),
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
