import Link from "next/link";
import { navItems } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-10">
        <div>
          <p className="font-[family-name:var(--font-serif)] text-2xl">CPVC Guide</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
            A search-first technical platform for CPVC decisions, installation guidance, troubleshooting, and standards clarity.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Navigate</p>
          <div className="mt-4 grid gap-3 text-sm">
            {navItems.slice(1, 6).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
	        <div>
	          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--muted)]">Trust and policy</p>
	          <div className="mt-4 grid gap-3 text-sm">
	            <Link href="/about">About</Link>
	            <Link href="/editorial-policy">Editorial policy</Link>
	          </div>
	        </div>
	      </div>
	    </footer>
	  );
}
