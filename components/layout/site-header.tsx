import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { SearchTrigger } from "@/components/layout/search-trigger";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--border)] bg-[color:rgba(245,239,230,0.9)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/" className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/60 bg-[color:var(--accent)] font-[family-name:var(--font-serif)] text-2xl text-white shadow-[0_8px_24px_rgba(164,78,34,0.18)]">
            C
          </span>
          <p className="font-[family-name:var(--font-serif)] text-[2rem] leading-none tracking-[-0.02em]">CPVC Guide</p>
        </Link>
        <div className="flex items-center gap-4">
          <MainNav />
          <SearchTrigger />
        </div>
      </div>
    </header>
  );
}
