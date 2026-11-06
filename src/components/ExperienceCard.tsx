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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
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
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-[0_12px_30px_-24px_rgba(28,25,21,0.7)]">
      <div className="relative aspect-[4/3] bg-sand">
        <Image
          src={experience.imageUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
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
        className={`absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sm ${
          isFavorite
            ? "bg-terracotta text-paper"
            : "bg-card/95 text-ink hover:bg-card"
        }`}
      >
        <HeartIcon filled={isFavorite} />
      </button>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          {experience.category}
        </p>
        <TitleTag className="font-serif text-2xl leading-tight tracking-tight">
          <Link
            href={`/experiences/${experience.id}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {experience.title}
          </Link>
        </TitleTag>
        <p className="line-clamp-3 text-sm leading-6 text-muted">
          {experience.description}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-2 text-sm">
          <p className="text-ink">{experience.destination}</p>
          <p className="text-right">
            <span className="block font-semibold">
              {formatRating(experience.rating)} ★
            </span>
            <span className="text-muted">{formatPrice(experience.price)}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
