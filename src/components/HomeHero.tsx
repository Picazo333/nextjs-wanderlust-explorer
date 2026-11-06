"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  MOTION_EASE,
  motionAllowed,
  onMotionStop,
} from "@/lib/motion-runtime";

export function HomeHero() {
  const shiftRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shift = shiftRef.current;
    const enter = enterRef.current;
    const sentinel = sentinelRef.current;
    if (!shift || !enter || !sentinel) {
      return;
    }

    let entrance: Animation | null = null;
    let started = false;
    let frame = 0;
    let pendingX = 0;
    let pendingY = 0;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");

    const cancelFrame = () => {
      if (frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const resetPointer = () => {
      cancelFrame();
      shift.style.transitionDuration = "180ms";
      shift.style.setProperty("--px", "0px");
      shift.style.setProperty("--py", "0px");
    };

    const playEntrance = () => {
      if (started) {
        return;
      }
      started = true;
      if (!motionAllowed()) {
        return;
      }
      entrance = enter.animate(
        [
          { opacity: 0.6, transform: "translateY(12px)" },
          { opacity: 1, transform: "translateY(0px)" },
        ],
        { duration: 560, easing: MOTION_EASE, fill: "none" },
      );
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || !motionAllowed()) {
        return;
      }
      const rect = shift.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      pendingX = Math.max(-2.4, Math.min(2.4, nx * 2.4));
      pendingY = Math.max(-2.4, Math.min(2.4, ny * 2.4));
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        if (!motionAllowed()) {
          return;
        }
        shift.style.transitionDuration = "120ms";
        shift.style.setProperty("--px", `${pendingX}px`);
        shift.style.setProperty("--py", `${pendingY}px`);
      });
    };

    const bindPointer = () => {
      shift.addEventListener("pointermove", onMove);
      shift.addEventListener("pointerleave", resetPointer);
      shift.addEventListener("pointercancel", resetPointer);
    };

    const unbindPointer = () => {
      shift.removeEventListener("pointermove", onMove);
      shift.removeEventListener("pointerleave", resetPointer);
      shift.removeEventListener("pointercancel", resetPointer);
      resetPointer();
    };

    const onFineChange = () => {
      unbindPointer();
      if (fine.matches) {
        bindPointer();
      }
    };

    if (fine.matches) {
      bindPointer();
    }
    fine.addEventListener("change", onFineChange);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          playEntrance();
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(sentinel);

    const halt = () => {
      entrance?.cancel();
      entrance = null;
      cancelFrame();
      resetPointer();
    };
    const unregister = onMotionStop(halt);
    const onPreference = () => {
      if (!motionAllowed()) {
        halt();
      }
    };
    document.documentElement.addEventListener(
      "signal-motion-change",
      onPreference,
    );

    return () => {
      observer.disconnect();
      fine.removeEventListener("change", onFineChange);
      unbindPointer();
      unregister();
      document.documentElement.removeEventListener(
        "signal-motion-change",
        onPreference,
      );
      entrance?.cancel();
      cancelFrame();
    };
  }, []);

  return (
    <section className="section" data-hero>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div ref={sentinelRef} className="sentinel" aria-hidden="true" />
          <h1>Browse 100 travel experiences</h1>
          <p className="lead">
            Search by title, then filter by category and destination. The
            address keeps those choices, so a link opens the same list.
          </p>
          <Link className="button" href="/experiences">
            Explore experiences
          </Link>
        </div>
        <figure className="hero-figure">
          <div className="hero-art">
            <div
              ref={shiftRef}
              className="hero-shift"
              data-motion-node
            >
              <div ref={enterRef} className="hero-enter" data-motion-node>
                <Image
                  src="/images/1015.jpg"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
              </div>
            </div>
          </div>
          <figcaption className="caption">
            Placeholder photo from the local catalog. It is not a photograph
            of a named destination.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
