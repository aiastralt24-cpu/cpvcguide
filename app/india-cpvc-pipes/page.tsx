import Link from "next/link";
import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/metadata";
import { getAllProgrammaticPages } from "@/lib/programmatic-seo";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "India CPVC pipes guide: products, states, and city pages",
    description:
      "Browse indexable CPVC product, state, and city guides for India with practical hot-water, sizing, installation, and buying context.",
    path: "/india-cpvc-pipes",
  }),
  robots: { index: true, follow: true },
};

export default function IndiaCpvcPipesPage() {
  const pages = getAllProgrammaticPages().filter((page) => page.indexable && page.qualityState === "indexable-ready");
  const products = pages.filter((page) => page.type === "product");
  const states = pages.filter((page) => page.type === "state");
  const cities = pages.filter((page) => page.type === "city");
  const priorityCities = cities.slice(0, 80);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      <section className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)] md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">India CPVC index</p>
        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight md:text-6xl">
          CPVC pipe guides for India, organized by product, state, and city
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-[color:var(--muted)] md:text-lg">
          Use this page to reach the main CPVC product guides, state planning pages, and city pages that are ready for
          search indexing. Locality pages and Phase 2 expansion pages stay out of this index until they pass stronger
          quality review.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <StatCard label="Product guides" value={products.length} />
          <StatCard label="State guides" value={states.length} />
          <StatCard label="City guides" value={cities.length} />
        </div>
      </section>

      <IndexSection
        eyebrow="Product layer"
        title="Start with CPVC product and decision guides"
        description="These pages answer material, sizing, pressure, installation, and comparison questions before readers narrow down by location."
        pages={products}
      />

      <IndexSection
        eyebrow="State layer"
        title="Browse CPVC planning by state"
        description="State pages help Google and readers understand regional clusters before moving into city-specific CPVC decisions."
        pages={states}
      />

      <IndexSection
        eyebrow="City layer"
        title="Priority city CPVC guides"
        description="These city pages cover hot-water use, apartment or housing context, water conditions, installation risk, and product-selection checks."
        pages={priorityCities}
      />

      <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-white/50 p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Indexing policy</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl">Why this page does not list every generated URL</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)]">
          The site keeps published and indexable states separate. Pages are linked here only when they are considered
          safe for indexing. This protects the website from thin-location expansion and keeps the crawl path focused on
          useful CPVC pages.
        </p>
      </section>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/55 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-serif)] text-4xl">{value}</p>
    </div>
  );
}

function IndexSection({
  eyebrow,
  title,
  description,
  pages,
}: {
  eyebrow: string;
  title: string;
  description: string;
  pages: { path: string; title: string; directAnswer: string }[];
}) {
  return (
    <section className="mt-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 font-[family-name:var(--font-serif)] text-3xl md:text-4xl">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition hover:border-[color:var(--accent)] hover:shadow-[var(--shadow)]"
          >
            <h3 className="text-base font-semibold leading-6">{page.title}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-6 text-[color:var(--muted)]">{page.directAnswer}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
