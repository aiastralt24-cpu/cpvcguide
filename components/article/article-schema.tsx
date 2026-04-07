import { JsonLd } from "@/components/json-ld";
import type { Article } from "@/features/articles/types";
import { buildArticleSchema } from "@/features/seo/lib/build-article-schema";
import { buildBreadcrumbSchema } from "@/features/seo/lib/build-breadcrumb-schema";
import { buildFaqSchema } from "@/features/seo/lib/build-faq-schema";

export function ArticleSchema({ article }: { article: Article }) {
  const items = [
    buildArticleSchema(article),
    buildBreadcrumbSchema(article),
    article.faqItems.length > 0 ? buildFaqSchema(article) : null,
  ].filter(Boolean) as Record<string, unknown>[];

  return (
    <>
      {items.map((item, index) => (
        <JsonLd key={index} data={item} />
      ))}
    </>
  );
}
