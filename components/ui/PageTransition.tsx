"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  PageTransitionProvider,
  usePageTransition,
} from "@/contexts/PageTransitionContext";

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

// ─── Inner wrapper (needs context access) ─────────────────────────────

function TransitionContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { markReady, markTransitioning } = usePageTransition();

  // Reset ready state whenever the route changes (new transition starts)
  useEffect(() => {
    markTransitioning();
  }, [pathname, markTransitioning]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        onAnimationComplete={(definition) => {
          // Only mark ready when the enter animation finishes, not exit
          if (definition === "enter") {
            markReady();
          }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Component ────────────────────────────────────────────────────────

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransitionProvider>
      <TransitionContent>{children}</TransitionContent>
    </PageTransitionProvider>
  );
}
