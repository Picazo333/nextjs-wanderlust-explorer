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
    <div className="shell section">
      <h1>Favorites saved this visit</h1>
      <p className="lead">
        {saved.length === 0
          ? "You have not saved any experiences yet."
          : `${saved.length} saved ${saved.length === 1 ? "experience" : "experiences"}.`}
      </p>
      <p className="caption footer-note">
        The heart on a catalog card adds or removes that experience. This list
        lasts until you refresh the page.
      </p>
      {saved.length === 0 ? (
        <div className="status-block" role="status">
          <h2>No favorites yet</h2>
          <p className="muted">
            Open the catalog and save an experience you want to come back to
            during this visit.
          </p>
          <div className="button-row">
            <Link className="button" href="/experiences">
              Explore experiences
            </Link>
          </div>
        </div>
      ) : (
        <ExperienceGrid
          experiences={saved}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
