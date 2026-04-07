import { getAllContentItems, getPlannedArticleBacklog, getPublicationStats } from "@/lib/content";
import { publicationManifest } from "@/lib/publication-manifest";

export function getPublicationDashboardData() {
  const items = getAllContentItems().sort((a, b) => a.title.localeCompare(b.title));
  return {
    items,
    stats: getPublicationStats(),
    planned: getPlannedArticleBacklog(),
    manifestCount: publicationManifest.length,
  };
}
