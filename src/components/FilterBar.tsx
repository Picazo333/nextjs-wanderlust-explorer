"use client";

import { useId } from "react";

interface FilterBarProps {
  category: string;
  destination: string;
  categories: readonly string[];
  destinations: readonly string[];
  onCategoryChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onClear: () => void;
  canClear: boolean;
}

function withCurrent(options: readonly string[], current: string): string[] {
  const trimmed = current.trim();
  if (!trimmed) {
    return [...options];
  }
  const exists = options.some(
    (option) => option.toLowerCase() === trimmed.toLowerCase(),
  );
  return exists ? [...options] : [trimmed, ...options];
}

function selected(options: readonly string[], current: string): string {
  const match = options.find(
    (option) => option.toLowerCase() === current.trim().toLowerCase(),
  );
  return match ?? current;
}

export function FilterBar({
  category,
  destination,
  categories,
  destinations,
  onCategoryChange,
  onDestinationChange,
  onClear,
  canClear,
}: FilterBarProps) {
  const categoryId = useId();
  const destinationId = useId();
  const categoryOptions = withCurrent(categories, category);
  const destinationOptions = withCurrent(destinations, destination);

  return (
    <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
      <div>
        <label htmlFor={categoryId} className="mb-1.5 block text-sm font-medium">
          Category
        </label>
        <select
          id={categoryId}
          value={selected(categoryOptions, category)}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink outline-none ring-terracotta focus:ring-2"
        >
          <option value="">All categories</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor={destinationId}
          className="mb-1.5 block text-sm font-medium"
        >
          Destination
        </label>
        <select
          id={destinationId}
          value={selected(destinationOptions, destination)}
          onChange={(event) => onDestinationChange(event.target.value)}
          className="w-full rounded-xl border border-line bg-card px-3 py-3 text-base text-ink outline-none ring-terracotta focus:ring-2"
        >
          <option value="">All destinations</option>
          {destinationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={onClear}
        disabled={!canClear}
        className="rounded-xl border border-line px-4 py-3 text-sm font-medium text-ink enabled:hover:bg-sand disabled:cursor-not-allowed disabled:opacity-50"
      >
        Clear filters
      </button>
    </div>
  );
}
