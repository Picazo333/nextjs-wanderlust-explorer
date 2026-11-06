"use client";

import Link from "next/link";

export default function Error({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <div className="shell section" role="alert">
      <h1>This page could not be shown</h1>
      <p className="lead">
        The view failed while rendering. If you were filtering, the address
        still holds the search. Try again, or return home.
      </p>
      <div className="button-row">
        <button type="button" className="button" onClick={() => retry()}>
          Try again
        </button>
        <Link className="button button-secondary" href="/">
          Go to home
        </Link>
      </div>
    </div>
  );
}
