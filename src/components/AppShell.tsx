"use client";

import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { FavoritesContext } from "@/components/favorites-context";
import { MotionPreference } from "@/components/MotionPreference";
import { Navbar, NavbarFallback } from "@/components/Navbar";
import { SignalLockup } from "@/components/SignalLockup";
import { getExperienceById } from "@/data/experiences";

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [notice, setNotice] = useState("");

  const toggleFavorite = useCallback(
    (id: string) => {
      const removing = favoriteIds.includes(id);
      const name = getExperienceById(id)?.title ?? "that experience";
      setNotice(
        removing
          ? `Removed ${name} from favorites.`
          : `Saved ${name} to favorites.`,
      );
      setFavoriteIds((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      );
    },
    [favoriteIds],
  );

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      <a className="skip-link button" href="#content">
        Skip to content
      </a>
      <Suspense fallback={<NavbarFallback favoriteCount={favoriteIds.length} />}>
        <Navbar favoriteCount={favoriteIds.length} />
      </Suspense>
      <p className="visually-hidden" role="status" aria-live="polite">
        {notice}
      </p>
      <main id="content" tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <p>Wanderlust Explorer</p>
            <p className="caption footer-note">
              Favorites stay in memory while you move between pages. Refreshing
              the page clears them.
            </p>
            <ul className="footer-links">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <div className="button-row">
              <MotionPreference />
            </div>
          </div>
          <SignalLockup />
        </div>
      </footer>
    </FavoritesContext.Provider>
  );
}
