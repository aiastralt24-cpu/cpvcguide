import { CardLink } from "@/components/shared/card-link";
import type { HubSummary } from "@/lib/content";

export function TopicCardGrid({ hubs }: { hubs: HubSummary[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {hubs.map((hub) => (
        <CardLink key={hub.slug} href={`/${hub.slug}`} eyebrow={hub.categoryLabel} title={hub.title} description={hub.description} />
      ))}
    </div>
  );
}
