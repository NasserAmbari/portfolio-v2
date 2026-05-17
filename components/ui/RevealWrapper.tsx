"use client";

import { motion, useAnimation } from "framer-motion";
import { ReactNode, useCallback } from "react";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

type Trigger = "viewport" | "none";

interface RevealWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  trigger?: Trigger;
  threshold?: number;
  once?: boolean;
}

export default function RevealWrapper({
  children,
  delay = 0,
  className = "",
  direction = "up",
  trigger = "viewport",
  threshold = 0.3,
  once = true,
}: RevealWrapperProps) {
  const controls = useAnimation();

  const { x: xOffset, y: yOffset } = (() => {
    switch (direction) {
      case "up":
        return { x: 0, y: 40 };
      case "down":
        return { x: 0, y: -40 };
      case "left":
        return { x: 40, y: 0 };
      case "right":
        return { x: -40, y: 0 };
      default:
        return { x: 0, y: 40 };
    }
  })();

  const ref = useRevealAnimation<HTMLDivElement>({
    trigger,
    threshold,
    once,
    onPlay: useCallback(() => {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      });
    }, [controls, delay]),
    onReset: useCallback(() => {
      controls.start({ opacity: 0, x: xOffset, y: yOffset });
    }, [controls, xOffset, yOffset]),
    onSnap: useCallback(() => {
      controls.set({ opacity: 1, x: 0, y: 0 });
    }, [controls]),
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: xOffset, y: yOffset }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
