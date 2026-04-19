import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPage } from "@/components/programmatic/programmatic-seo-page";
import { buildPageMetadata } from "@/lib/metadata";
import { getLocalityPages } from "@/lib/programmatic-seo";

type LocalityPageProps = {
  params: Promise<{ city: string; locality: string }>;
};

export function generateStaticParams() {
  return getLocalityPages().map((page) => {
    const [, , city, locality] = page.path.split("/");
    return { city, locality };
  });
}

export async function generateMetadata({ params }: LocalityPageProps): Promise<Metadata> {
  const { city, locality } = await params;
  const page = getLocalityPages().find((item) => item.path === `/location/${city}/${locality}`);
  if (!page) return {};

  return {
    ...buildPageMetadata({ title: page.title, description: page.description, path: page.path }),
    robots: { index: page.indexable, follow: true },
  };
}

export default async function LocalityPage({ params }: LocalityPageProps) {
  const { city, locality } = await params;
  const page = getLocalityPages().find((item) => item.path === `/location/${city}/${locality}`);
  if (!page) notFound();

  return <ProgrammaticSeoPage page={page} />;
}
