"use client";

import Link from "next/link";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { getExperienceById } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import type { Experience } from "@/types/experience";

export function FavoritesView() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const saved = favoriteIds
    .map((id) => getExperienceById(id))
    .filter((experience): experience is Experience => experience !== undefined);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        Favorites
      </p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        Saved for later.
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {saved.length === 0
          ? "You have not saved any experiences yet."
          : `${saved.length} saved ${saved.length === 1 ? "experience" : "experiences"}.`}
      </p>
      {saved.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-line bg-card px-6 py-16 text-center">
          <p className="text-muted">
            Tap the heart on any card in the explorer. The list stays while you
            move between pages.
          </p>
          <Link
            href="/experiences"
            className="mt-6 inline-flex rounded-full bg-terracotta px-5 py-3 text-sm font-semibold text-paper"
          >
            Explore experiences
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <ExperienceGrid
            experiences={saved}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      )}
    </div>
  );
}
