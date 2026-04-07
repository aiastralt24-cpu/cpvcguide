import { isValidElement, type HTMLAttributes, type ReactNode } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Prose } from "@/components/shared/prose";
import type { Article } from "@/features/articles/types";
import { slugifyHeading } from "@/lib/toc";

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return getNodeText(node.props.children);
  return "";
}

export function ArticleBody({ article }: { article: Article }) {
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
    <Prose>
      <MDXRemote source={article.body} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </Prose>
  );
}
