import { isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ComparisonTable } from "@/components/comparison-table";
import { FAQList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { QuickAnswer } from "@/components/quick-answer";
import { RelatedReading } from "@/components/related-reading";
import { ReviewComments } from "@/components/review-comments";
import { ReviewSummary } from "@/components/review-summary";
import { SpecSummary } from "@/components/spec-summary";
import { TableOfContents } from "@/components/table-of-contents";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/json-ld";
import type { ContentItem } from "@/lib/content";
import { slugifyHeading } from "@/lib/toc";

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return getNodeText(node.props.children);
  }

  return "";
}

export function ArticlePage({ content }: { content: ContentItem }) {
  const jsonLd = [
    buildArticleJsonLd(content),
    buildBreadcrumbJsonLd(content),
    content.faqItems.length > 0 ? buildFaqJsonLd(content) : null,
  ].filter(Boolean) as Record<string, unknown>[];

  const mdxComponents = {
    h2: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = getNodeText(props.children);
      return (
        <h2 {...props} id={slugifyHeading(text)}>
          {props.children}
        </h2>
      );
    },
    h3: (props: HTMLAttributes<HTMLHeadingElement>) => {
      const text = getNodeText(props.children);
      return (
        <h3 {...props} id={slugifyHeading(text)}>
          {props.children}
        </h3>
      );
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      {jsonLd.map((data, index) => (
        <JsonLd key={index} data={data} />
      ))}

      <Breadcrumbs items={content.breadcrumbs} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_18rem]">
        <article className="min-w-0">
          <div className="rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-[var(--shadow)] md:p-10">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">
              <span>{content.pageTypeLabel}</span>
              <span>•</span>
              <span>{content.intentTypeLabel}</span>
              <span>•</span>
              <span>{content.readingTime}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-serif)] text-4xl leading-tight md:text-6xl">
              {content.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">{content.description}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <QuickAnswer summary={content.quickAnswer} />
              <div className="rounded-[1.75rem] border border-[color:var(--border)] bg-white/55 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Publishing data</p>
                <div className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
                  <p>Primary query: {content.primaryQuery}</p>
                  <p>Reviewed by: {content.author}</p>
                  <p>Published: {content.publishedAtLabel}</p>
                  <p>Updated: {content.updatedAtLabel}</p>
                </div>
              </div>
            </div>
            <SpecSummary items={content.specSummary} />
            <ComparisonTable rows={content.comparisonRows} />
            <div className="mt-10">
              <ReviewSummary summary={content.ratingSummaryResolved} />
            </div>
            <div className="prose-content mt-10">
              <MDXRemote
                source={content.body}
                components={mdxComponents}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              />
            </div>
            <FAQList items={content.faqItems} />
            <ReviewComments threads={content.reviewThreadsWithLabels} />
          </div>
          <RelatedReading items={content.relatedItems} />
        </article>

        <div className="space-y-6">
          <TableOfContents items={content.toc} />
          <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">Cluster rules</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
              <li>Each page owns one primary query.</li>
              <li>Astral references default to disallowed.</li>
              <li>Every page links back into the cluster.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
