"use client";

import { useCallback } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

type Mode = "word" | "sentence" | "character";
type Direction = "up" | "down";
type Trigger = "viewport" | "none";

interface RevealTextProps {
  text?: string;
  duration?: number;
  mode?: Mode;
  direction?: Direction;
  delay?: number;
  stagger?: number;
  threshold?: number;
  trigger?: Trigger;
}

export default function RevealText({
  text = "Sebuah Text",
  duration = 0.6,
  mode = "word",
  direction = "up",
  delay = 0,
  stagger = 0.05,
  threshold = 0.3,
  trigger = "none",
}: RevealTextProps) {
  const controls = useAnimation();

  const segments: string[] = (() => {
    if (mode === "character")
      return text.split("").map((char) => (char === " " ? "\u00A0" : char));
    if (mode === "word") return text.split(" ");
    return [text];
  })();

  const yOffset = direction === "up" ? 40 : -40;

  const variants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay: delay + i * stagger,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const ref = useRevealAnimation<HTMLSpanElement>({
    trigger,
    threshold,
    onPlay: useCallback(() => controls.start("visible"), [controls]),
    onReset: useCallback(() => controls.start("hidden"), [controls]),
    onSnap: useCallback(() => controls.set("visible"), [controls]),
  });

  return (
    <span ref={ref} style={{ display: "inline" }} aria-label={text}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
          }}
        >
          <motion.span
            custom={i}
            initial="hidden"
            animate={controls}
            variants={variants}
            style={{
              display: "inline-block",
              ...(mode !== "word" ? { padding: "8px 0" } : {}),
            }}
          >
            {mode === "word" && i < segments.length - 1
              ? segment + "\u00A0"
              : segment}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
