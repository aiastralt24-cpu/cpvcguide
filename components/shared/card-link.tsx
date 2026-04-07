import Link from "next/link";

type CardLinkProps = {
  href: string;
  eyebrow?: string;
  title: string;
  description: string;
};

export function CardLink({ href, eyebrow, title, description }: CardLinkProps) {
  return (
    <Link
      href={href}
      className="rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition hover:-translate-y-1 hover:border-[color:var(--accent)]"
    >
      {eyebrow ? <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">{eyebrow}</p> : null}
      <h3 className="mt-2 font-[family-name:var(--font-serif)] text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
    </Link>
  );
}
