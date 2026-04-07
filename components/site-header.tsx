import Link from "next/link";
import { navItems } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:rgba(245,239,230,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[color:var(--accent)] font-[family-name:var(--font-serif)] text-lg text-white">
            C
          </span>
          <div>
            <p className="font-[family-name:var(--font-serif)] text-xl">CPVC Guide</p>
            <p className="text-xs uppercase tracking-[0.22em] text-[color:var(--muted)]">Technical knowledge platform</p>
          </div>
        </Link>
        <nav className="hidden flex-wrap items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[color:var(--muted)] transition hover:text-[color:var(--accent)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
