import Link from "next/link";

export function SearchTrigger() {
  return (
    <Link
      href="/search"
      className="rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm font-medium text-[color:var(--muted)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
    >
      Ask a question
    </Link>
  );
}
