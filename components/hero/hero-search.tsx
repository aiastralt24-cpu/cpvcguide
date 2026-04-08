"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Suggestion = {
  question: string;
  href: string;
};

type HeroSearchProps = {
  initialQuery?: string;
  autoFocus?: boolean;
  suggestionTarget?: "search" | "article";
};

export function HeroSearch({
  initialQuery = "",
  autoFocus = false,
  suggestionTarget = "search",
}: HeroSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const router = useRouter();

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/suggestions?q=${encodeURIComponent(trimmed)}`, {
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

  function onSuggestionSelect(suggestion: Suggestion) {
    if (suggestionTarget === "article") {
      router.push(suggestion.href);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(suggestion.question)}`);
  }

  return (
    <div className="relative w-full max-w-4xl">
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex rounded-[1.75rem] border border-[color:var(--border)] bg-white/80 p-2 shadow-[var(--shadow)]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoFocus={autoFocus}
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
        <div className="absolute inset-x-0 top-full z-30 mt-3 overflow-hidden rounded-[1.5rem] border border-[color:var(--border)] bg-[color:var(--card)] shadow-[var(--shadow)]">
          <div className="grid gap-px bg-[color:var(--border)]">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.href}
                type="button"
                onClick={() => onSuggestionSelect(suggestion)}
                className="bg-[color:var(--card)] px-5 py-4 text-left text-base transition hover:bg-white/70"
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
