"use client";

import Link from "next/link";
import "./globals.css";

export default function GlobalError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <html lang="en" data-motion="reduced">
      <body>
        <main className="shell section">
          <h1>This page could not be shown</h1>
          <p className="lead">
            Wanderlust Explorer hit an unexpected error. Try the page again,
            or go back to the home page.
          </p>
          <div className="button-row">
            <button type="button" className="button" onClick={() => retry()}>
              Try again
            </button>
            <Link className="button button-secondary" href="/">
              Go to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
