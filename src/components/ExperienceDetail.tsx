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
    <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
      <Link
        href="/experiences"
        className="text-sm font-medium text-pine underline-offset-4 hover:underline"
      >
        Back to experiences
      </Link>
      <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-3xl bg-sand">
        <Image
          src={experience.imageUrl}
          alt=""
          fill
          priority
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            <Link
              href={`/experiences?category=${encodeURIComponent(experience.category)}`}
              className="hover:underline"
            >
              {experience.category}
            </Link>
          </p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
            {experience.title}
          </h1>
          <p className="mt-3 text-lg">
            <Link
              href={`/experiences?destination=${encodeURIComponent(country)}`}
              className="underline-offset-4 hover:underline"
            >
              {experience.destination}
            </Link>
          </p>
        </div>
        <button
          type="button"
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(experience.id)}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${
            isFavorite
              ? "bg-terracotta text-paper"
              : "border border-line bg-card text-ink hover:bg-sand"
          }`}
        >
          {isFavorite ? "Saved to favorites" : "Save to favorites"}
        </button>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
        <div className="rounded-2xl border border-line bg-card px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-muted">Rating</dt>
          <dd className="mt-1 text-xl font-semibold">
            {formatRating(experience.rating)} ★
          </dd>
        </div>
        <div className="rounded-2xl border border-line bg-card px-4 py-3">
          <dt className="text-xs uppercase tracking-wide text-muted">Price</dt>
          <dd className="mt-1 text-xl font-semibold">
            {formatPrice(experience.price)}
          </dd>
        </div>
      </dl>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-ink">
        {experience.description}
      </p>
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-serif text-3xl tracking-tight">
            More in {country}
          </h2>
          <div className="mt-5">
            <ExperienceGrid
              experiences={related}
              favoriteIds={favoriteIds}
              onToggleFavorite={toggleFavorite}
              titleAs="h3"
            />
          </div>
        </section>
      ) : null}
    </article>
  );
}
