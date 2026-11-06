"use client";

import { Suspense, useCallback, useState } from "react";
import { FavoritesContext } from "@/components/favorites-context";
import { Navbar, NavbarFallback } from "@/components/Navbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite }}>
      <Suspense fallback={<NavbarFallback favoriteCount={favoriteIds.length} />}>
        <Navbar favoriteCount={favoriteIds.length} />
      </Suspense>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Wanderlust Explorer</p>
          <p>One hundred experiences. Filters you can send to a friend.</p>
        </div>
      </footer>
    </FavoritesContext.Provider>
  );
}
