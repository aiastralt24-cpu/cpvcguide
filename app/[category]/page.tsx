import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CardLink } from "@/components/shared/card-link";
import { SectionHeading } from "@/components/shared/section-heading";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getCategoryArchive, getHubByCategorySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import { getCategoryBySlug } from "@/lib/site-config";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getCategoryArchive().map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryBySlug(category);

  if (!config) {
    return {};
  }

  return buildPageMetadata({
    title: `${config.label} | CPVC Guide`,
    description: config.description,
    path: `/${config.slug}`,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const config = getCategoryBySlug(category);

  if (!config) {
    notFound();
  }

  const hub = getHubByCategorySlug(category);
  const archive = getCategoryArchive().find((item) => item.slug === category);

  if (!archive) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: config.label }]} />
      <div className="mt-8 grid gap-8 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)] md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow={config.label}
            title={hub?.title ?? config.label}
            description={hub?.description ?? config.description}
          />
        </div>
        <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/60 p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">Category snapshot</p>
          <p className="mt-3 font-[family-name:var(--font-serif)] text-4xl">{archive.items.length}</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
            Live published pages designed around this user task and topic lane.
          </p>
        </div>
      </div>

      <section className="mt-12">
        <SectionHeading
          eyebrow="Pages"
          title="Choose the question that matches the job to be done."
          description="The archive keeps taxonomy in the background and lets the reader move straight into a practical page."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {archive.items.map((item) => (
            <CardLink
              key={item.slug}
              href={`/${item.category}/${item.slug}`}
              eyebrow={item.pageTypeLabel}
              title={item.title}
              description={item.answerSummaryResolved}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
