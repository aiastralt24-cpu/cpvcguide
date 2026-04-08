import Link from "next/link";

export function SearchTrigger() {
  return (
    <Link
      href="/search"
      className="rounded-full border border-[color:var(--border)] bg-white/72 px-5 py-2.5 text-[15px] font-semibold text-[color:var(--foreground)] transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
    >
      Ask
    </Link>
  );
}
