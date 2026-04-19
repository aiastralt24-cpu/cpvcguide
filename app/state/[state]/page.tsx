import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/programmatic/programmatic-seo-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getStatePages } from "@/lib/programmatic-seo";

type StatePageProps = {
  params: Promise<{ state: string }>;
};

export function generateStaticParams() {
  return getStatePages().map((page) => ({ state: page.slug }));
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state } = await params;
  const page = getStatePages().find((item) => item.slug === state);
  if (!page) return {};

  return {
    ...buildPageMetadata({ title: page.title, description: page.description, path: page.path }),
    robots: { index: page.indexable, follow: true },
  };
}

export default async function StatePage({ params }: StatePageProps) {
  const { state } = await params;
  const page = getStatePages().find((item) => item.slug === state);
  if (!page) notFound();

  return <ProgrammaticSeoPage page={page} />;
}
