import { ExperienceCard } from "@/components/ExperienceCard";
import type { Experience } from "@/types/experience";

interface ExperienceGridProps {
  experiences: Experience[];
  favoriteIds: string[];
  onToggleFavorite: (id: string) => void;
  titleAs?: "h2" | "h3";
}

export function ExperienceGrid({
  experiences,
  favoriteIds,
  onToggleFavorite,
  titleAs = "h2",
}: ExperienceGridProps) {
  return (
    <ul className="catalog-grid">
      {experiences.map((experience) => (
        <li key={experience.id}>
          <ExperienceCard
            experience={experience}
            isFavorite={favoriteIds.includes(experience.id)}
            onToggleFavorite={onToggleFavorite}
            titleAs={titleAs}
          />
        </li>
      ))}
    </ul>
  );
}
