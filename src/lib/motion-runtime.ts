const STORAGE_KEY = "signal-motion";

let memoryPreference: "reduce" | "system" | null = null;
const stopHandlers = new Set<() => void>();

export function systemPrefersReduced(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function readLocalPreference(): "reduce" | "system" {
  if (memoryPreference) {
    return memoryPreference;
  }
  try {
    return localStorage.getItem(STORAGE_KEY) === "reduce" ? "reduce" : "system";
  } catch {
    return "system";
  }
}

export function writeLocalPreference(value: "reduce" | "system"): void {
  memoryPreference = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Storage can be blocked. The in-memory value still applies for this visit.
  }
}

export function motionAllowed(): boolean {
  if (systemPrefersReduced()) {
    return false;
  }
  return document.documentElement.getAttribute("data-motion") !== "reduced";
}

export function onMotionStop(handler: () => void): () => void {
  stopHandlers.add(handler);
  return () => {
    stopHandlers.delete(handler);
  };
}

export function stopMotion(): void {
  document.querySelectorAll("[data-motion-node]").forEach((node) => {
    node.getAnimations().forEach((animation) => animation.cancel());
    if (node instanceof HTMLElement) {
      node.style.transform = "";
      node.style.opacity = "";
      node.style.removeProperty("--px");
      node.style.removeProperty("--py");
    }
  });
  for (const handler of stopHandlers) {
    handler();
  }
}

export function applyMotionAttribute(): void {
  const reduce =
    systemPrefersReduced() || readLocalPreference() === "reduce";
  document.documentElement.setAttribute(
    "data-motion",
    reduce ? "reduced" : "full",
  );
  if (reduce) {
    stopMotion();
  }
  document.documentElement.dispatchEvent(new Event("signal-motion-change"));
}

export const MOTION_EASE = "cubic-bezier(.2, .8, .2, 1)";
