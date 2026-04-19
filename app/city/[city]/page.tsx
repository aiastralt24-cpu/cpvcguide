import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/programmatic/programmatic-seo-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getCityPages } from "@/lib/programmatic-seo";

type CityPageProps = {
  params: Promise<{ city: string }>;
};

export function generateStaticParams() {
  return getCityPages().map((page) => ({ city: page.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const page = getCityPages().find((item) => item.slug === city);
  if (!page) return {};

  return {
    ...buildPageMetadata({ title: page.title, description: page.description, path: page.path }),
    robots: { index: page.indexable, follow: true },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params;
  const page = getCityPages().find((item) => item.slug === city);
  if (!page) notFound();

  return <ProgrammaticSeoPage page={page} />;
}
