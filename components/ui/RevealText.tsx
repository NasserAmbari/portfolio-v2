"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

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
  once?: boolean;
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
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  // trigger "none" → langsung visible, tidak perlu cek isInView
  const shouldReveal = trigger === "none" ? true : isInView;

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

  return (
    <span ref={ref} style={{ display: "inline" }} aria-label={text}>
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.25em",
              marginBottom: "-0.25em",
            }}
          >
            <motion.span
              custom={i}
              initial="hidden"
              animate={shouldReveal ? "visible" : "hidden"} // ← langsung reaktif
              variants={variants}
              style={{
                display: "inline-block",
                ...(mode !== "word" ? { padding: "8px 0" } : {}),
              }}
            >
              {segment}
            </motion.span>
          </span>
          {mode === "word" && i < segments.length - 1 && " "}
        </React.Fragment>
      ))}
    </span>
  );
}
