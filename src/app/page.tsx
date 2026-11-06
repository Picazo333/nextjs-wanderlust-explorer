import Link from "next/link";
import { HomeHero } from "@/components/HomeHero";
import { RegisterOnView } from "@/components/RegisterOnView";
import { CATEGORIES } from "@/types/experience";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="section section-follow">
        <div className="shell">
          <h2>Open the catalog by category</h2>
          <ul className="category-list">
            {CATEGORIES.map((category) => (
              <li key={category}>
                <Link
                  href={`/experiences?category=${encodeURIComponent(category)}`}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-follow">
        <RegisterOnView>
          <div className="shell">
            <div className="sentinel" data-sentinel aria-hidden="true" />
            <h2 data-register>How a shared filter works</h2>
            <ol className="steps">
              <li>
                The search compares the title with a case-insensitive pattern.
                Typing sailing keeps experiences whose title contains that word.
              </li>
              <li>
                Category and destination each work on their own, and both
                combine with the search.
              </li>
              <li>
                The fields fill from the address when you{" "}
                <Link href="/experiences?search=sailing&category=Adventure&destination=Croatia">open sailing adventures in Croatia</Link>{". The catalog contains that match."}
                <code className="example-url">
                  /experiences?search=sailing&category=Adventure&destination=Croatia
                </code>
              </li>
            </ol>
          </div>
        </RegisterOnView>
      </section>
    </>
  );
}
