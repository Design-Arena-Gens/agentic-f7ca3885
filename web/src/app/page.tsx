"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import TipCard from "@/components/TipCard";
import { CATEGORIES, techniques, type Technique } from "@/data/techniques";

type SortKey = "best" | "impact" | "time" | "alpha";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<Technique["category"]>>(new Set());
  const [sortBy, setSortBy] = useState<SortKey>("best");

  function toggleCategory(category: Technique["category"]) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const activeCats = selected.size > 0 ? selected : new Set(CATEGORIES);

    const matches = techniques.filter((t) => {
      if (!activeCats.has(t.category)) return false;
      if (!normalized) return true;
      const hay = [
        t.title,
        t.description,
        t.category,
        ...t.tags,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(normalized);
    });

    const scored = matches.map((t) => ({
      item: t,
      efficiency: t.impact / Math.max(1, t.timeMinutes),
    }));

    switch (sortBy) {
      case "impact":
        scored.sort((a, b) => b.item.impact - a.item.impact);
        break;
      case "time":
        scored.sort((a, b) => a.item.timeMinutes - b.item.timeMinutes);
        break;
      case "alpha":
        scored.sort((a, b) => a.item.title.localeCompare(b.item.title));
        break;
      case "best":
      default:
        scored.sort((a, b) => b.efficiency - a.efficiency);
        break;
    }

    return scored.map((s) => s.item);
  }, [query, selected, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 font-sans dark:bg-black">
      <main className="mx-auto max-w-4xl">
        <header className="mb-8 flex flex-col gap-4 sm:items-start">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            New, simple techniques
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Concise, high?leverage tactics you can try in minutes. Filter by
            category, search by keywords, and sort for best ROI.
          </p>
        </header>

        <section className="mb-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <SearchBar value={query} onChange={setQuery} />
          <div className="flex items-center gap-2">
            <label className="text-sm text-zinc-600 dark:text-zinc-400">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              aria-label="Sort techniques"
            >
              <option value="best">Best ROI</option>
              <option value="impact">Highest Impact</option>
              <option value="time">Shortest Time</option>
              <option value="alpha">A ? Z</option>
            </select>
          </div>
        </section>

        <section className="mb-8">
          <CategoryFilter
            categories={CATEGORIES}
            selected={selected}
            onToggle={toggleCategory}
          />
        </section>

        <section aria-live="polite">
          <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            Showing {filtered.length} technique{filtered.length === 1 ? "" : "s"}
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((t) => (
              <TipCard key={t.id} item={t} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
