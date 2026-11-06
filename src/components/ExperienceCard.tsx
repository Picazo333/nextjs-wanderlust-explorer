"use client";

import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/experience";
import { formatPrice, formatRating } from "@/lib/format";

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  titleAs?: "h2" | "h3";
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-7-9.1C5 8 6.8 6.2 9.1 6.2c1.3 0 2.4.6 2.9 1.6.5-1 1.6-1.6 2.9-1.6C17.2 6.2 19 8 19 10.9 19 15.6 12 20 12 20z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function ExperienceCard({
  experience,
  isFavorite,
  onToggleFavorite,
  titleAs = "h2",
}: ExperienceCardProps) {
  const TitleTag = titleAs;
  return (
    <article className="catalog-card">
      <div className="catalog-media">
        <Image
          src={experience.imageUrl}
          alt=""
          fill
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>
      <button
        type="button"
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${experience.title} from favorites`
            : `Save ${experience.title} to favorites`
        }
        onClick={() => onToggleFavorite(experience.id)}
        className="heart"
      >
        <HeartIcon filled={isFavorite} />
      </button>
      <div className="catalog-body">
        <p className="tag">{experience.category}</p>
        <TitleTag>
          <Link href={`/experiences/${experience.id}`}>{experience.title}</Link>
        </TitleTag>
        <p className="clamp-3">{experience.description}</p>
        <div className="card-meta">
          <p>{experience.destination}</p>
          <p className="meta-lines">
            <span>
              <span className="visually-hidden">Dataset rating </span>
              {formatRating(experience.rating)}
            </span>
            <span className="muted">
              <span className="visually-hidden">Listed price </span>
              {formatPrice(experience.price)}
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}
