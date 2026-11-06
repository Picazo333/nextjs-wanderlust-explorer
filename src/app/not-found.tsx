import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This address is not a page in Wanderlust Explorer.",
};

export default function NotFound() {
  return (
    <div className="shell section">
      <h1>This page is not in the explorer</h1>
      <p className="lead">
        The address does not match Home, the catalog, a saved list, or the
        sample profile.
      </p>
      <div className="button-row">
        <Link className="button" href="/">
          Go to home
        </Link>
        <Link className="button button-secondary" href="/experiences">
          Browse experiences
        </Link>
      </div>
    </div>
  );
}
