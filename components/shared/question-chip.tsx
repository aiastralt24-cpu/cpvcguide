import Link from "next/link";

export function QuestionChip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-3 text-sm transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
    >
      {label}
    </Link>
  );
}
