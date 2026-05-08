"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useInView,
  Easing,
} from "framer-motion";

const DEFAULT_EASING: Easing = [0.16, 1, 0.3, 1];

interface ScrambleTextProps {
  text: string;
  duration?: number;
  speed?: number;
  from?: "left" | "right";
  decay?: number;
  easing?: Easing;
  once?: boolean;
}

export default function ScrambleText({
  text,
  duration = 2,
  speed = 0.04,
  from = "left",
  decay = 0.8,
  easing = DEFAULT_EASING,
  once = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once });

  const progress = useMotionValue(0);
  const lastUpdateRef = useRef(0);

  const characters = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`";

  useEffect(() => {
    if (!isInView) return;

    progress.set(0);
    lastUpdateRef.current = 0;

    const controls = animate(progress, 1, {
      duration,
      ease: easing,
    });

    const unsubscribe = progress.on("change", (latest) => {
      if (latest >= 1) {
        setDisplayText(text);
        return;
      }

      const now = performance.now() / 1000;
      if (now - lastUpdateRef.current < speed) return;
      lastUpdateRef.current = now;

      const revealCount = Math.floor(latest * text.length);
      const chaosIntensity = 1 - Math.pow(latest, decay);

      const newText = text
        .split("")
        .map((letter, index) => {
          const shouldReveal =
            from === "left"
              ? index < revealCount
              : index >= text.length - revealCount;

          if (shouldReveal) return letter;
          if (letter === " ") return " ";

          if (Math.random() > chaosIntensity) {
            return letter;
          }

          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join("");

      setDisplayText(newText);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [isInView, text, duration, speed, from, decay, easing]);

  return <motion.span ref={ref}>{displayText}</motion.span>;
}
