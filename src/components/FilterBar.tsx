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
    <div className="filters">
      <div>
        <label htmlFor={categoryId} className="field-label">
          Category
        </label>
        <select
          id={categoryId}
          value={selected(categoryOptions, category)}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="field"
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
        <label htmlFor={destinationId} className="field-label">
          Destination
        </label>
        <select
          id={destinationId}
          value={selected(destinationOptions, destination)}
          onChange={(event) => onDestinationChange(event.target.value)}
          className="field"
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
        className="button button-secondary button-field"
      >
        Clear filters
      </button>
    </div>
  );
}
