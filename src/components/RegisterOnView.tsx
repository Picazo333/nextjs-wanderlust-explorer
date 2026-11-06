"use client";

import { useEffect, useRef } from "react";
import {
  MOTION_EASE,
  motionAllowed,
  onMotionStop,
} from "@/lib/motion-runtime";

export function RegisterOnView({
  children,
}: {
  children: React.ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }
    const target = root.querySelector("[data-register]");
    const sentinel = root.querySelector("[data-sentinel]");
    if (!(target instanceof HTMLElement) || !(sentinel instanceof Element)) {
      return;
    }

    let played = false;
    let animation: Animation | null = null;
    let sentinelIn = false;
    let heroGone = true;

    const play = () => {
      if (played || !sentinelIn || !heroGone) {
        return;
      }
      played = true;
      sentinelObserver.disconnect();
      heroObserver?.disconnect();
      if (!motionAllowed()) {
        return;
      }
      animation = target.animate(
        [
          { transform: "translateY(10px)" },
          { transform: "translateY(0px)" },
        ],
        { duration: 480, easing: MOTION_EASE, fill: "none" },
      );
    };

    const sentinelObserver = new IntersectionObserver(
      (entries) => {
        sentinelIn = entries.some((entry) => entry.isIntersecting);
        play();
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    sentinelObserver.observe(sentinel);

    const hero = document.querySelector("[data-hero]");
    let heroObserver: IntersectionObserver | null = null;
    if (hero) {
      heroGone = false;
      heroObserver = new IntersectionObserver(
        (entries) => {
          heroGone = entries.every((entry) => !entry.isIntersecting);
          play();
        },
        { threshold: 0 },
      );
      heroObserver.observe(hero);
    }

    const unregister = onMotionStop(() => {
      animation?.cancel();
      animation = null;
    });

    return () => {
      sentinelObserver.disconnect();
      heroObserver?.disconnect();
      animation?.cancel();
      unregister();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
