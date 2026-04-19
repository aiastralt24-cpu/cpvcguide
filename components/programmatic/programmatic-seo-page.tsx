import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { astralCpvcReference } from "@/lib/site-config";
import type { ProgrammaticPage } from "@/lib/programmatic-seo";
import { buildAbsoluteUrl } from "@/lib/metadata";

function buildProgrammaticSchema(page: ProgrammaticPage) {
  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": buildAbsoluteUrl(`${page.path}#article`),
    headline: page.title,
    description: page.description,
    datePublished: page.updatedAt,
    dateModified: page.updatedAt,
    author: {
      "@type": "Organization",
      "@id": buildAbsoluteUrl("/#publisher"),
    },
    publisher: {
      "@id": buildAbsoluteUrl("/#publisher"),
    },
    mainEntityOfPage: buildAbsoluteUrl(page.path),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildAbsoluteUrl(item.href),
    })),
  };

  const faq =
    page.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return [article, breadcrumbs, faq].filter(Boolean) as Record<string, unknown>[];
}

export function ProgrammaticSeoPage({ page }: { page: ProgrammaticPage }) {
  const schema = buildProgrammaticSchema(page);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      {schema.map((item, index) => (
        <JsonLd key={index} data={item} />
      ))}

      <Breadcrumbs items={page.breadcrumbs} />

      <article className="mt-8 rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)] md:p-10">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
          <span>{page.type} guide</span>
          <span>•</span>
          <span>{page.qualityState}</span>
          <span>•</span>
          <span>Quality {page.qualityScore}/100</span>
          <span>•</span>
          <span>Updated {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(page.updatedAt))}</span>
        </div>

        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight md:text-6xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">{page.description}</p>

        <div className="mt-8">
          <QuickAnswer eyebrow="Direct answer" title={page.primaryQuery} summary={page.directAnswer} />
        </div>

        <section className="mt-10 rounded-[1.75rem] border border-[color:var(--border)] bg-white/50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Decision snapshot</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {page.facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--muted)]">{fact.label}</p>
                <p className="mt-2 text-sm font-semibold leading-6">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="prose-content mt-10">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-[rgba(239,224,198,0.4)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Product context</p>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Use{" "}
            <Link href={astralCpvcReference.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-[color:var(--accent)]">
              {astralCpvcReference.label}
            </Link>{" "}
            as a manufacturer-side CPVC reference while comparing local plumbing needs, installation quality, and product specifications.
          </p>
        </section>

        <section className="mt-12 rounded-[1.75rem] border border-[color:var(--border)] bg-white/50 p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">FAQ</p>
          <div className="mt-6 space-y-4">
            {page.faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-5">
                <summary className="cursor-pointer list-none font-semibold">{item.question}</summary>
                <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Related CPVC pages</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {page.relatedLinks.slice(0, 9).map((item) => (
              <Link
                key={`${item.href}-${item.label}`}
                href={item.href}
                className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 text-sm font-semibold transition hover:border-[color:var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
