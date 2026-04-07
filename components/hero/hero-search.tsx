"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Suggestion = {
  question: string;
  href: string;
};

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/suggestions?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { suggestions: Suggestion[] };
        setSuggestions(data.suggestions);
      } catch {
        setSuggestions([]);
      }
    }, 120);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [query]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="w-full max-w-4xl">
        <div className="flex rounded-[1.75rem] border border-[color:var(--border)] bg-white/80 p-2 shadow-[var(--shadow)]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask about installation, temperature limits, standards, failures, or sizing..."
            className="h-14 flex-1 rounded-[1.25rem] bg-transparent px-4 text-base outline-none"
          />
          <button
            type="submit"
            className="rounded-[1.25rem] bg-[color:var(--accent)] px-6 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-soft)]"
          >
            Search
          </button>
        </div>
      </form>
      {suggestions.length > 0 ? (
        <div className="absolute mt-3 w-full max-w-3xl rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] p-3 shadow-[var(--shadow)]">
          <div className="grid gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.href}
                type="button"
                onClick={() => router.push(suggestion.href)}
                className="rounded-2xl px-4 py-3 text-left text-sm transition hover:bg-white/70"
              >
                {suggestion.question}
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
