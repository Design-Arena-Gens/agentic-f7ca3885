import Link from "next/link";
import type { Technique } from "@/data/techniques";

export default function TipCard({ item }: { item: Technique }) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h3>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {item.category}
        </span>
      </div>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">{item.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-700">
          ? {item.timeMinutes} min
        </span>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-700">
          ? Impact {item.impact}/5
        </span>
        <span className="rounded-full border border-zinc-200 px-2 py-0.5 dark:border-zinc-700">
          {item.difficulty}
        </span>
        {item.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            #{t}
          </span>
        ))}
      </div>

      {item.link && (
        <div className="mt-4">
          <Link
            href={item.link}
            target="_blank"
            className="text-sm font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600 dark:text-zinc-100 dark:decoration-zinc-700 dark:hover:decoration-zinc-400"
          >
            Learn more
          </Link>
        </div>
      )}
    </article>
  );
}
