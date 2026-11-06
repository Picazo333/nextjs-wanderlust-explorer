"use client";

import { useEffect } from "react";
import { FilterBar } from "@/components/FilterBar";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { SearchBar } from "@/components/SearchBar";
import { listCountries } from "@/data/experiences";
import { useExperiences } from "@/hooks/useExperiences";
import { useFavorites } from "@/hooks/useFavorites";
import { CATEGORIES } from "@/types/experience";

const countries = listCountries();

export function Explorer() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const {
    search,
    category,
    destination,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
    results,
    total,
  } = useExperiences();

  useEffect(() => {
    const parts = ["Experiences"];
    if (search.trim()) {
      parts.push(`“${search.trim()}”`);
    }
    if (category.trim()) {
      parts.push(category.trim());
    }
    if (destination.trim()) {
      parts.push(destination.trim());
    }
    document.title = `${parts.join(" · ")} · Wanderlust Explorer`;
  }, [search, category, destination]);

  const canClear = Boolean(
    search.trim() || category.trim() || destination.trim(),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          Explorer
        </p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
          Find an experience worth keeping.
        </h1>
        <p className="mt-3 text-base leading-7 text-muted">
          Search titles and stack a category with a destination. The link in
          the address bar is the filter.
        </p>
      </div>

      <div className="mt-8 space-y-4 rounded-3xl border border-line bg-sand/60 p-4 sm:p-5">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          category={category}
          destination={destination}
          categories={CATEGORIES}
          destinations={countries}
          onCategoryChange={setCategory}
          onDestinationChange={setDestination}
          onClear={clearFilters}
          canClear={canClear}
        />
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        Showing {results.length} of {total}
      </p>

      {results.length === 0 ? (
        <div
          role="status"
          className="mt-6 rounded-3xl border border-dashed border-line bg-card px-6 py-16 text-center"
        >
          <h2 className="font-serif text-3xl">No results found</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Nothing in the catalog matches this combination. Clear the search
            or choose another category and destination.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-6 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <ExperienceGrid
            experiences={results}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        </div>
      )}
    </div>
  );
}

export function ExplorerFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-muted">Loading experiences…</p>
    </div>
  );
}
