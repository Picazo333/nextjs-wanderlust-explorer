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
    <div>
      <label htmlFor={inputId} className="field-label">
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
        placeholder="Title, for example sailing"
        autoComplete="off"
        className="field"
      />
    </div>
  );
}
