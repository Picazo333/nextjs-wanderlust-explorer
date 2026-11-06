"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export interface FilterValues {
  search: string;
  category: string;
  destination: string;
}

const FILTER_KEYS = ["search", "category", "destination"] as const;

export function useFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") ?? "";
  const category = searchParams.get("category") ?? "";
  const destination = searchParams.get("destination") ?? "";

  const update = useCallback(
    (next: Partial<FilterValues>) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged: FilterValues = {
        search: searchParams.get("search") ?? "",
        category: searchParams.get("category") ?? "",
        destination: searchParams.get("destination") ?? "",
        ...next,
      };

      for (const key of FILTER_KEYS) {
        const value = merged[key].trim();
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const setSearch = useCallback(
    (value: string) => update({ search: value }),
    [update],
  );
  const setCategory = useCallback(
    (value: string) => update({ category: value }),
    [update],
  );
  const setDestination = useCallback(
    (value: string) => update({ destination: value }),
    [update],
  );
  const clearFilters = useCallback(
    () => update({ search: "", category: "", destination: "" }),
    [update],
  );

  return {
    search,
    category,
    destination,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
  };
}
