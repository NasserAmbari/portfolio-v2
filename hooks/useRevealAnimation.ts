"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePageTransition } from "@/contexts/PageTransitionContext";

type AnimState = "below" | "visible" | "above";
type Trigger = "viewport" | "none";

interface UseRevealAnimationOptions {
  trigger?: Trigger;
  threshold?: number;
  onPlay: () => void;
  onReset: () => void;
  onSnap: () => void;
}

/**
 * Custom hook yang mengandung scroll state machine untuk animasi reveal.
 * Dapat dipakai ulang di RevealText, RevealImage, RevealForm, dll.
 *
 * Returns: ref yang harus dipasang ke elemen DOM target.
 */
export function useRevealAnimation<T extends HTMLElement>({
  trigger = "none",
  threshold = 0.3,
  onPlay,
  onReset,
  onSnap,
}: UseRevealAnimationOptions) {
  const ref = useRef<T>(null);
  const animState = useRef<AnimState>("below");
  const rafId = useRef<number | null>(null);
  const hasPlayed = useRef(false);

  const { isTransitionReady } = usePageTransition();

  const checkPosition = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const isAbove = rect.bottom <= 0;
    const isBelow = rect.top >= viewportHeight;
    const isInView = !isAbove && !isBelow;
    const triggerVisible = rect.top < viewportHeight - rect.height * threshold;

    const current = animState.current;

    if (current === "below" && isInView && triggerVisible) {
      animState.current = "visible";
      onPlay();
      return;
    }
    if (current === "visible" && isAbove) {
      animState.current = "above";
      return;
    }
    if (current === "above" && isInView) {
      animState.current = "visible";
      return;
    }
    if (current === "visible" && isBelow) {
      animState.current = "below";
      onReset();
      return;
    }
    if (current === "above" && isBelow) {
      animState.current = "below";
      onReset();
      return;
    }
    if (current === "below" && isAbove) {
      animState.current = "above";
      onSnap();
      return;
    }
  }, [threshold, onPlay, onReset, onSnap]);

  useEffect(() => {
    if (trigger === "viewport") {
      checkPosition();

      const onScroll = () => {
        if (rafId.current !== null) return;
        rafId.current = requestAnimationFrame(() => {
          checkPosition();
          rafId.current = null;
        });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
        if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      };
    }
  }, [trigger, checkPosition]);

  // For trigger="none": wait until the page transition finishes before playing
  useEffect(() => {
    if (trigger !== "none") return;
    if (!isTransitionReady) {
      // Transition still running — reset played flag so it fires once ready
      hasPlayed.current = false;
      return;
    }
    if (hasPlayed.current) return;

    hasPlayed.current = true;
    onPlay();
  }, [trigger, isTransitionReady, onPlay]);

  return ref;
}
