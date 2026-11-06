"use client";

import { useMemo } from "react";
import { experiences } from "@/data/experiences";
import { useFilters } from "@/hooks/useFilters";
import { filterExperiences } from "@/lib/filterExperiences";

export function useExperiences() {
  const filters = useFilters();

  const results = useMemo(
    () =>
      filterExperiences(experiences, {
        search: filters.search,
        category: filters.category,
        destination: filters.destination,
      }),
    [filters.search, filters.category, filters.destination],
  );

  return {
    ...filters,
    results,
    total: experiences.length,
  };
}
