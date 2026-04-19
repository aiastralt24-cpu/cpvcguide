import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/programmatic/programmatic-seo-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getProductPages } from "@/lib/programmatic-seo";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProductPages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getProductPages().find((item) => item.slug === slug);
  if (!page) return {};

  return {
    ...buildPageMetadata({ title: page.title, description: page.description, path: page.path }),
    robots: { index: page.indexable, follow: true },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const page = getProductPages().find((item) => item.slug === slug);
  if (!page) notFound();

  return <ProgrammaticSeoPage page={page} />;
}
