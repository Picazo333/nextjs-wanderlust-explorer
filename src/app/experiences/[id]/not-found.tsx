import Link from "next/link";

export default function ExperienceNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="font-serif text-4xl">That experience is not in the catalog.</h1>
      <p className="mt-3 text-muted">
        The link may be out of date. The explorer still has the full list.
      </p>
      <Link
        href="/experiences"
        className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper"
      >
        Back to experiences
      </Link>
    </div>
  );
}
