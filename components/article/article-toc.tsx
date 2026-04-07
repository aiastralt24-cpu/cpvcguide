import { TableOfContents } from "@/components/table-of-contents";
import type { Article } from "@/features/articles/types";

export function ArticleToc({ article }: { article: Article }) {
  return <TableOfContents items={article.toc} />;
}
