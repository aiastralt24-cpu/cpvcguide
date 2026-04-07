import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryListing } from "@/components/category-listing";
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

  return <CategoryListing category={config} hub={hub} archive={archive} />;
}
