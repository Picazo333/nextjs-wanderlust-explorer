"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ExperienceGrid } from "@/components/ExperienceGrid";
import { experiences } from "@/data/experiences";
import { useFavorites } from "@/hooks/useFavorites";
import { formatPrice, formatRating } from "@/lib/format";
import type { Experience } from "@/types/experience";

export function ExperienceDetail({ experience }: { experience: Experience }) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const isFavorite = favoriteIds.includes(experience.id);
  const country = experience.destination.split(", ").pop() ?? experience.destination;
  const related = experiences
    .filter(
      (item) =>
        item.id !== experience.id &&
        item.destination.toLowerCase().includes(country.toLowerCase()),
    )
    .slice(0, 3);

  useEffect(() => {
    document.title = `${experience.title} · Wanderlust Explorer`;
  }, [experience.title]);

  return (
    <article className="shell section">
      <Link href="/experiences" className="back-link">
        Back to experiences
      </Link>
      <div className="detail-head">
        <div>
          <p className="ui">
            <Link
              href={`/experiences?category=${encodeURIComponent(experience.category)}`}
            >
              {experience.category}
            </Link>
          </p>
          <h1>{experience.title}</h1>
          <p className="lead">
            <Link
              href={`/experiences?destination=${encodeURIComponent(country)}`}
            >
              {experience.destination}
            </Link>
          </p>
        </div>
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(experience.id)}
          className={isFavorite ? "button button-secondary" : "button"}
        >
          {isFavorite ? "Remove from favorites" : "Save to favorites"}
        </button>
      </div>
      <div className="detail-media">
        <Image
          src={experience.imageUrl}
          alt=""
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
        />
      </div>
      <dl className="facts">
        <div>
          <dt>Dataset rating</dt>
          <dd>{formatRating(experience.rating)}</dd>
        </div>
        <div>
          <dt>Listed price</dt>
          <dd>{formatPrice(experience.price)}</dd>
        </div>
      </dl>
      <p className="prose">{experience.description}</p>
      <p className="caption footer-note">
        The photo is a local placeholder. It is not a photograph of{" "}
        {experience.destination}.
      </p>
      {related.length > 0 ? (
        <section className="subsection">
          <h2>More experiences in {country}</h2>
          <ExperienceGrid
            experiences={related}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            titleAs="h3"
          />
        </section>
      ) : null}
    </article>
  );
}
