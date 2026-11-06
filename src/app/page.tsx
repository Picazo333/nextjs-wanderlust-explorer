import Image from "next/image";
import Link from "next/link";
import { HomeHighlights } from "@/components/HomeHighlights";
import { CATEGORIES } from "@/types/experience";

export default function HomePage() {
  return (
    <>
      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="/images/1015.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/45 to-ink/20" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-end px-4 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sand">
            Wanderlust Labs
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-none tracking-tight text-paper sm:text-7xl">
            Trips worth telling twice.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-sand">
            One hundred curated experiences, from Adriatic sailing to night
            markets. Search them, filter them, and keep the ones you want.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/experiences"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3 text-base font-semibold text-paper hover:bg-[#a33e22]"
            >
              Explore experiences
            </Link>
            <Link
              href="/favorites"
              className="inline-flex items-center justify-center rounded-full border border-paper/40 px-6 py-3 text-base font-semibold text-paper hover:bg-paper/10"
            >
              View favorites
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-serif text-3xl tracking-tight">Browse by category</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link
                href={`/experiences?category=${encodeURIComponent(category)}`}
                className="inline-flex rounded-full border border-line bg-card px-4 py-2 text-sm font-medium hover:border-ink"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <HomeHighlights />
    </>
  );
}
