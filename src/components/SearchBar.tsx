"use client";

import { useId, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const inputId = useId();
  const [draft, setDraft] = useState(value);
  const [syncedValue, setSyncedValue] = useState(value);
  const [editing, setEditing] = useState(false);

  if (value !== syncedValue) {
    setSyncedValue(value);
    if (!editing) {
      setDraft(value);
    }
  }

  return (
    <div className="flex-1">
      <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium">
        Search by title
      </label>
      <input
        id={inputId}
        type="search"
        value={draft}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
        onChange={(event) => {
          const next = event.target.value;
          setDraft(next);
          onChange(next);
        }}
        placeholder="Try sailing, market, ridge..."
        autoComplete="off"
        className="w-full rounded-xl border border-line bg-card px-4 py-3 text-base text-ink outline-none ring-terracotta placeholder:text-muted focus:ring-2"
      />
    </div>
  );
}
