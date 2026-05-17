"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { ReactNode } from "react";

interface ScrollStackCardProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  className?: string;
  children: ReactNode;
}

export default function ScrollStackCard({
  index,
  total,
  progress,
  className = "",
  children,
}: ScrollStackCardProps) {
  const range = [index / total, 1];
  const targetScale = 1 - (total - index - 1) * 0.05;
  const targetOpacity = 1 - (total - index - 1) * 0.2;

  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, targetOpacity]);

  return (
    <div className="h-screen w-full sticky top-0 flex flex-col items-center justify-center pt-20">
      <motion.div
        style={{
          scale,
          opacity,
          top: `calc(${index * 20}px)`,
        }}
        className={`relative w-full h-[70vh] md:h-[20vh] border border-white/10 rounded-[2rem] p-8 md:p-14 flex flex-col justify-between shadow-2xl origin-top mx-auto ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
