import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.4fr_0.8fr_0.8fr] md:px-10">
        <div>
          <p className="font-[family-name:var(--font-serif)] text-2xl">CPVC Guide</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            A focused technical content platform built around CPVC systems, answer-engine formatting, and editorial
            trust controls.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Reference</p>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link href="/about">About</Link>
            <Link href="/editorial-policy">Editorial policy</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Operating model</p>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Brief {"->"} draft {"->"} review {"->"} publish {"->"} 90-day refresh
          </p>
        </div>
      </div>
    </footer>
  );
}
