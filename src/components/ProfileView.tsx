"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export function ProfileView() {
  const { favoriteIds } = useFavorites();
  const count = favoriteIds.length;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
        Profile
      </p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        Maya Chen
      </h1>
      <div className="mt-8 flex flex-col gap-6 rounded-3xl border border-line bg-card p-6 sm:flex-row sm:items-center">
        <div
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-pine font-serif text-2xl text-paper"
        >
          MC
        </div>
        <div>
          <p className="text-lg">Home base · Lisbon, Portugal</p>
          <p className="mt-1 text-sm text-muted">Member since March 2024</p>
          <p className="mt-3 max-w-xl leading-7 text-ink">
            Plans slow trips around food, coastlines, and one long walk a day.
            Keeps a short list of experiences instead of a long one.
          </p>
        </div>
      </div>
      <section className="mt-6 rounded-3xl border border-line bg-sand/70 p-6">
        <h2 className="font-serif text-2xl">Saved favorites</h2>
        <p className="mt-2 text-4xl font-semibold tracking-tight">{count}</p>
        <p className="mt-2 text-muted">
          {count === 1
            ? "1 experience is currently saved."
            : `${count} experiences are currently saved.`}
        </p>
        <Link
          href="/favorites"
          className="mt-4 inline-flex text-sm font-semibold text-pine underline-offset-4 hover:underline"
        >
          Open favorites
        </Link>
      </section>
    </div>
  );
}
