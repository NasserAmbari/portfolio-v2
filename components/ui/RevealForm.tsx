"use client";

import { useCallback, Children, isValidElement } from "react";
import { motion, useAnimation } from "framer-motion";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

type Direction = "up" | "down";
type Trigger = "viewport" | "none";

interface RevealFormProps {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  duration?: number;
  direction?: Direction;
  delay?: number;
  stagger?: number;
  threshold?: number;
  trigger?: Trigger;
}

/**
 * Maksimum child yang didukung = 20.
 * Semua hooks dipanggil di top-level (Rules of Hooks), lalu di-slice sesuai
 * jumlah child aktual yang diberikan.
 */
const MAX_CHILDREN = 20;

export default function RevealForm({
  children,
  onSubmit,
  className = "",
  duration = 0.6,
  direction = "up",
  delay = 0,
  stagger = 0.08,
  threshold = 0.3,
  trigger = "none",
}: RevealFormProps) {
  const yOffset = direction === "up" ? 40 : -40;

  // ─── Semua useAnimation dipanggil di top-level (Rules of Hooks) ───
  const c0 = useAnimation();
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();
  const c5 = useAnimation();
  const c6 = useAnimation();
  const c7 = useAnimation();
  const c8 = useAnimation();
  const c9 = useAnimation();
  const c10 = useAnimation();
  const c11 = useAnimation();
  const c12 = useAnimation();
  const c13 = useAnimation();
  const c14 = useAnimation();
  const c15 = useAnimation();
  const c16 = useAnimation();
  const c17 = useAnimation();
  const c18 = useAnimation();
  const c19 = useAnimation();

  const ALL_CONTROLS = [
    c0,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
    c11,
    c12,
    c13,
    c14,
    c15,
    c16,
    c17,
    c18,
    c19,
  ];

  // Ambil child yang valid lalu slice controls sesuai jumlah child
  const childArray = Children.toArray(children).filter(isValidElement);
  const count = Math.min(childArray.length, MAX_CHILDREN);
  const controls = ALL_CONTROLS.slice(0, count);

  const playAll = useCallback(() => {
    controls.forEach((ctrl, i) => {
      ctrl.start({
        opacity: 1,
        y: 0,
        transition: {
          duration,
          delay: delay + i * stagger,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      });
    });
  }, [controls, duration, delay, stagger]);

  const resetAll = useCallback(() => {
    controls.forEach((ctrl) => ctrl.set({ opacity: 0, y: yOffset }));
  }, [controls, yOffset]);

  const snapAll = useCallback(() => {
    controls.forEach((ctrl) => ctrl.set({ opacity: 1, y: 0 }));
  }, [controls]);

  const ref = useRevealAnimation<HTMLFormElement>({
    trigger,
    threshold,
    onPlay: playAll,
    onReset: resetAll,
    onSnap: snapAll,
  });

  return (
    <form ref={ref} onSubmit={onSubmit} className={className}>
      {childArray.map((child, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: yOffset }}
          animate={controls[i]}
        >
          {child}
        </motion.div>
      ))}
    </form>
  );
}
