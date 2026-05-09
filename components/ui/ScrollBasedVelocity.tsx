"use client";

import {
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  motion,
} from "framer-motion";
import React, { useRef } from "react";
import { cn } from "@/lib/utils"; // ganti dengan clsx atau hapus jika tidak pakai shadcn

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface ScrollVelocityContainerProps {
  children: React.ReactNode;
  /** Override warna fade di kiri/kanan. Default: #0a0a0a */
  fadeColor?: string;
  className?: string;
}

interface ScrollVelocityRowProps {
  children: React.ReactNode;
  /**
   * Kecepatan dasar animasi (px/detik).
   * @default 5
   */
  baseVelocity?: number;
  /**
   * Arah gerak idle:
   * - `1`  → kiri (teks/icon bergerak ke kiri)
   * - `-1` → kanan (teks/icon bergerak ke kanan)
   * @default 1
   */
  direction?: 1 | -1;
  /**
   * Seberapa kuat scroll user memengaruhi kecepatan.
   * Nilai lebih besar = efek lebih dramatis.
   * @default 5
   */
  velocityFactor?: number;
  /**
   * Konfigurasi spring untuk meng-smooth velocity scroll.
   */
  springConfig?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
  /** Tailwind class untuk gap antar item. Default: "gap-8 px-4" */
  itemClassName?: string;
  className?: string;
}

// ─────────────────────────────────────────────
// Utility: wrap number dalam range [min, max)
// ─────────────────────────────────────────────

function wrap(min: number, max: number, value: number): number {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

// ─────────────────────────────────────────────
// ScrollVelocityContainer
// ─────────────────────────────────────────────

export function ScrollVelocityContainer({
  children,
  fadeColor = "#0a0a0a",
  className,
}: ScrollVelocityContainerProps) {
  return (
    <div className={cn("relative flex w-full flex-col", className)}>
      {children}

      {/* Fade kiri */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10"
        style={{
          background: `linear-gradient(to right, ${fadeColor}, transparent)`,
        }}
      />
      {/* Fade kanan */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10"
        style={{
          background: `linear-gradient(to left, ${fadeColor}, transparent)`,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// ScrollVelocityRow
// ─────────────────────────────────────────────

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  velocityFactor = 5,
  springConfig = { damping: 50, mass: 0.01, stiffness: 400 },
  itemClassName,
  className,
}: ScrollVelocityRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Smooth out scroll velocity spike
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: springConfig.damping ?? 50,
    mass: springConfig.mass ?? 0.01,
    stiffness: springConfig.stiffness ?? 400,
  });

  // scrollFactor adalah multiplier penuh:
  // - 0              → tidak scroll, pakai idle
  // - positif (0..N) → scroll down, makin besar makin cepat
  // - negatif (-N..0)→ scroll up, makin kecil makin cepat ke arah balik
  const scrollFactor = useTransform(
    smoothVelocity,
    [-3000, 0, 3000],
    [-(velocityFactor + 2), 0, velocityFactor + 2],
  );

  // Wrap baseX ke -50% → 0% untuk seamless loop
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const dt = delta / 1000;
    const factor = scrollFactor.get();

    // Saat tidak scroll: gerak idle sesuai direction
    // Saat scroll down: direction * speed dipercepat
    // Saat scroll up: (1 + factor) bisa negatif → otomatis balik arah
    //   contoh: factor = -3 → multiplier = (1 + -3) = -2 → bergerak 2x ke arah berlawanan
    const moveBy = direction * baseVelocity * (1 + factor) * dt;

    baseX.set(baseX.get() + moveBy);
  });

  // Duplikasi 4x untuk seamless infinite loop
  const copies = Array.from({ length: 4 });

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <motion.div className="flex" style={{ x }}>
        {copies.map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 items-center",
              itemClassName ?? "gap-8 px-4",
            )}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────
// VelocityIconItem
// Wrapper item untuk icon + label opsional
// ─────────────────────────────────────────────

export function VelocityIconItem({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("flex flex-col items-center gap-2 select-none", className)}
    >
      <div className="flex items-center justify-center  rounded-xl text-white/70 transition-colors hover:bg-white/10 hover:border-white/20">
        {children}
      </div>
      {label && (
        <span className="text-xs text-white/40 font-mono tracking-wider whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
