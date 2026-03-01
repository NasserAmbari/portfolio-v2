"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// ─── Variants ─────────────────────────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];

const variants = {
  initial: { opacity: 0, y: 18 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: EASE_OUT },
  },
};

// ─── Component ────────────────────────────────────────────────────────

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
