"use client";

import { useEffect, useState } from "react";
import {
  applyMotionAttribute,
  readLocalPreference,
  systemPrefersReduced,
  writeLocalPreference,
} from "@/lib/motion-runtime";

type Mode = "system" | "reduce" | "system-forced";

function currentMode(): Mode {
  if (systemPrefersReduced()) {
    return "system-forced";
  }
  return readLocalPreference() === "reduce" ? "reduce" : "system";
}

export function MotionPreference() {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const sync = () => {
      applyMotionAttribute();
      setMode(currentMode());
    };
    sync();
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const reduced = mode !== "system";

  return (
    <button
      type="button"
      className="button button-secondary"
      aria-pressed={reduced}
      disabled={mode === "system-forced"}
      onClick={() => {
        if (mode === "system-forced") {
          return;
        }
        writeLocalPreference(mode === "reduce" ? "system" : "reduce");
        applyMotionAttribute();
        setMode(currentMode());
      }}
    >
      {mode === "system-forced"
        ? "Motion reduced by your system"
        : mode === "reduce"
          ? "Motion reduced in this browser"
          : "Reduce motion"}
    </button>
  );
}
