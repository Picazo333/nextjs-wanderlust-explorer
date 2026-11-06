"use client";

import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";

const featured = experiences
  .slice()
  .sort(
    (a, b) => b.rating - a.rating || a.title.localeCompare(b.title),
  )
  .slice(0, 3);

export function HomeHighlights() {
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
            Highest rated right now
          </h2>
          <p className="mt-2 text-muted">
            Three places people keep coming back to.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ExperienceGrid
          experiences={featured}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      </div>
    </section>
  );
}
