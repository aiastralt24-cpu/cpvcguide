import Link from "next/link";
import { navItems } from "@/lib/site-config";

export function MainNav() {
  return (
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
  );
}
