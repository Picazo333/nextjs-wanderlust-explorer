import type { Experience } from "../types/experience";

export interface ExperienceFilters {
  search: string;
  category: string;
  destination: string;
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function filterExperiences(
  list: readonly Experience[],
  filters: ExperienceFilters,
): Experience[] {
  const term = filters.search.trim();
  const titlePattern = term ? new RegExp(escapeRegExp(term), "i") : null;
  const category = filters.category.trim().toLowerCase();
  const destination = filters.destination.trim().toLowerCase();

  return list.filter((experience) => {
    const matchesTitle = titlePattern
      ? titlePattern.test(experience.title)
      : true;
    const matchesCategory = category
      ? experience.category.toLowerCase() === category
      : true;
    const matchesDestination = destination
      ? experience.destination.toLowerCase().includes(destination)
      : true;

    return matchesTitle && matchesCategory && matchesDestination;
  });
}
