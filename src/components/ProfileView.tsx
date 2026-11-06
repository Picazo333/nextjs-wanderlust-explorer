"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export function ProfileView() {
  const { favoriteIds } = useFavorites();
  const count = favoriteIds.length;

  return (
    <div className="shell section">
      <h1>Maya Chen</h1>
      <p className="caption footer-note">
        Sample profile for this exercise. Maya Chen is not a real traveler.
      </p>
      <dl className="facts">
        <div>
          <dt>Home base in the sample</dt>
          <dd>Lisbon</dd>
        </div>
        <div>
          <dt>Saved favorites</dt>
          <dd>{count}</dd>
        </div>
      </dl>
      <p className="lead">
        {count === 1
          ? "1 experience is currently saved in this visit."
          : `${count} experiences are currently saved in this visit.`}
      </p>
      <div className="button-row">
        <Link className="button" href="/favorites">
          Open favorites
        </Link>
      </div>
    </div>
  );
}
