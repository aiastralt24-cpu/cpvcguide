import Link from "next/link";
import type { CategoryArchiveItem, ContentItem, HubSummary } from "@/lib/content";
import type { CategoryConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageIntro } from "@/components/page-intro";

type CategoryListingProps = {
  category: CategoryConfig;
  hub?: HubSummary;
  archive: CategoryArchiveItem;
};

function groupItems(items: ContentItem[]) {
  return items.reduce<Record<string, ContentItem[]>>((acc, item) => {
    acc[item.pageTypeLabel] = [...(acc[item.pageTypeLabel] ?? []), item];
    return acc;
  }, {});
}

export function CategoryListing({ category, hub, archive }: CategoryListingProps) {
  const groups = groupItems(archive.items);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.label }]} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <PageIntro eyebrow={category.label} title={hub?.title ?? category.label} description={hub?.description ?? category.description} />
          {hub?.highlights.length ? (
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {hub.highlights.map((highlight) => (
                <div key={highlight} className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5">
                  <p className="text-sm leading-7 text-[color:var(--muted)]">{highlight}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Archive snapshot</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-4xl font-[family-name:var(--font-serif)]">{archive.items.length}</p>
              <p className="text-sm text-[color:var(--muted)]">Pages in this category</p>
            </div>
            <div>
              <p className="text-4xl font-[family-name:var(--font-serif)]">{archive.pageTypes.length}</p>
              <p className="text-sm text-[color:var(--muted)]">Page formats represented</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {Object.entries(groups).map(([group, items]) => (
          <section key={group}>
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{group}</p>
              <h2 className="mt-2 font-[family-name:var(--font-serif)] text-3xl">{group} in this category</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.category}/${item.slug}`}
                  className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition hover:border-[color:var(--accent)]"
                >
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
