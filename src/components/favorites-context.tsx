"use client";

import { createContext, useContext } from "react";

export interface FavoritesContextValue {
  favoriteIds: string[];
  toggleFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null,
);

export function useFavorites(): FavoritesContextValue {
  const value = useContext(FavoritesContext);
  if (!value) {
    throw new Error("useFavorites must be used within AppShell");
  }
  return value;
}
