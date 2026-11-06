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
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
