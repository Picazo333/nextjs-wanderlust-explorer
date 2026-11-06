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
    <div className="shell section">
      <div className="stack">
        <h1>Search the experience catalog</h1>
        <p className="lead">
          Match a title, then narrow by category and destination. The fields
          fill from the address, and the address updates as you change them.
        </p>
      </div>

      <div className="panel">
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

      <p className="ui muted result-count" aria-live="polite">
        Showing {results.length} of {total}
      </p>

      {results.length === 0 ? (
        <div className="status-block" role="status">
          <h2>No results found</h2>
          <p className="muted">
            Nothing in the catalog matches this combination. Clear the search
            or choose another category and destination.
          </p>
          <div className="button-row">
            <button type="button" className="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        </div>
      ) : (
        <ExperienceGrid
          experiences={results}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}

export function ExplorerFallback() {
  return (
    <div className="shell section loading-block" role="status" aria-live="polite">
      <h1>Search the experience catalog</h1>
      <p className="lead">Loading the catalog…</p>
    </div>
  );
}
