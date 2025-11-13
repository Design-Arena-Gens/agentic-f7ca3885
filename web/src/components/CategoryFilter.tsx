"use client";

import { Technique } from "@/data/techniques";

type Props = {
  categories: Technique["category"][];
  selected: Set<Technique["category"]>;
  onToggle: (category: Technique["category"]) => void;
};

export default function CategoryFilter({ categories, selected, onToggle }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const isActive = selected.has(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className={
              "rounded-full border px-3 py-1 text-sm transition " +
              (isActive
                ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black"
                : "border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800")
            }
            aria-pressed={isActive}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
