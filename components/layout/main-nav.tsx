import Link from "next/link";

const headerNavItems = [
  { label: "Home", href: "/" },
  { label: "Basics", href: "/cpvc-basics" },
  { label: "Specs", href: "/technical-guides" },
  { label: "Install", href: "/installation" },
  { label: "Problems", href: "/problems" },
  { label: "Standards", href: "/standards" },
];

export function MainNav() {
  return (
    <nav className="hidden items-center gap-6 xl:flex">
      {headerNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-[15px] font-medium text-[color:var(--foreground)]/78 transition hover:text-[color:var(--accent)]"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
