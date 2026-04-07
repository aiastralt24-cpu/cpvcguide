type TableOfContentsProps = {
  items: { id: string; text: string; level: number }[];
};

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-28 rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--accent)]">On this page</p>
      <ul className="mt-4 space-y-3 text-sm text-[color:var(--muted)]">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a href={`#${item.id}`} className="transition hover:text-[color:var(--accent)]">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
