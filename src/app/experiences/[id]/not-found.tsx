import Link from "next/link";

export default function ExperienceNotFound() {
  return (
    <div className="shell section">
      <h1>That experience is not in the catalog</h1>
      <p className="lead">
        The link may be out of date. The explorer still has the full list of
        100 experiences.
      </p>
      <div className="button-row">
        <Link className="button" href="/experiences">
          Back to experiences
        </Link>
        <Link className="button button-secondary" href="/">
          Go to home
        </Link>
      </div>
    </div>
  );
}
