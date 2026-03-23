"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────

export type Direction = "up" | "down" | "left" | "right";
export type Trigger = "viewport" | "none";

interface RevealMediaBaseProps {
  duration?: number;
  direction?: Direction;
  delay?: number;
  threshold?: number;
  className?: string;
  trigger?: Trigger;
  objectFit?: "cover" | "contain" | "fill" | "none";
}

interface RevealImageProps extends RevealMediaBaseProps {
  type: "image";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
}

interface RevealVideoProps extends RevealMediaBaseProps {
  type: "video";
  src: string | string[];
  poster?: string;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  controls?: boolean;
}

export type RevealMediaProps = RevealImageProps | RevealVideoProps;

// ─── Helpers ──────────────────────────────────────────────────────────

const getOffset = (direction: Direction, amount = 40) => {
  // Amount dikurangi dari 60 → 40 agar animasi lebih subtle di mobile
  switch (direction) {
    case "up":
      return { x: 0, y: amount };
    case "down":
      return { x: 0, y: -amount };
    case "left":
      return { x: amount, y: 0 };
    case "right":
      return { x: -amount, y: 0 };
  }
};

const normalizeSrc = (src: string | string[]): string[] =>
  Array.isArray(src) ? src : [src];

const getMimeType = (src: string): string => {
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".ogg")) return "video/ogg";
  if (src.endsWith(".mov")) return "video/quicktime";
  return "video/mp4";
};

// ─── Component ────────────────────────────────────────────────────────

export default function RevealMedia(props: RevealMediaProps) {
  const {
    duration = 0.7,
    direction = "up",
    delay = 0,
    threshold = 0.15,
    className = "",
    trigger = "viewport",
    objectFit = "cover",
  } = props;

  const controls = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { x: xOffset, y: yOffset } = getOffset(direction);

  // ── Kunci anti-blink: mulai dari opacity 1 jika trigger="none" ──────
  // Dengan trigger="none", tidak ada IntersectionObserver yang perlu ditunggu
  // sehingga tidak ada jeda antara render dan animasi.
  const [isReady, setIsReady] = useState(trigger === "none");

  // ── useInView dari Framer Motion — lebih reliable dari manual IO ────
  // once: true → hanya trigger sekali, tidak reset saat scroll balik
  // amount: threshold → persentase elemen yang harus terlihat
  const isInView = useInView(wrapperRef, {
    once: true,
    amount: threshold,
  });

  // ── Set isReady setelah mount untuk menghindari SSR mismatch ────────
  useEffect(() => {
    // Tandai komponen sudah mount di client
    // Ini mencegah hydration mismatch antara server (opacity:1) dan client
    setIsReady(true);
  }, []);

  // ── Trigger animasi ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isReady) return;

    const shouldPlay = trigger === "none" || isInView;
    if (!shouldPlay) return;

    controls.start({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    });

    // Play video jika tipe video
    if (props.type === "video" && props.autoPlay !== false) {
      videoRef.current?.play().catch(() => {});
    }
  }, [isInView, isReady, trigger]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Style ────────────────────────────────────────────────────────────

  const isFill = props.type === "image" && props.fill;

  const wrapperStyle: React.CSSProperties = {
    overflow: "hidden",
    ...(isFill ? { position: "relative" } : {}),
  };

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    display: "block",
  };

  // ── Anti-blink: initial state ────────────────────────────────────────
  // Kalau trigger="none" ATAU sudah inView sebelum mount (elemen langsung terlihat):
  // render langsung opacity:1 tanpa animasi masuk
  // Ini mencegah "flash of invisible content" di mobile
  const initialState = {
    opacity: 0,
    x: xOffset,
    y: yOffset,
  };

  return (
    <div ref={wrapperRef} className={className} style={wrapperStyle}>
      <motion.div
        initial={initialState}
        animate={controls}
        // willChange: hint ke browser untuk siapkan GPU layer lebih awal
        // Ini mencegah jank saat animasi pertama kali trigger di mobile
        style={{
          willChange: "opacity, transform",
          ...(isFill
            ? { position: "absolute", inset: 0 }
            : { width: "100%", height: "100%" }),
        }}
      >
        {props.type === "image" ? (
          isFill ? (
            <Image
              src={props.src}
              alt={props.alt}
              fill
              style={{ objectFit }}
              // priority untuk gambar yang likely above-the-fold
              // mencegah LCP yang buruk di mobile
            />
          ) : (
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width ?? 1600}
              height={props.height ?? 900}
              style={mediaStyle}
            />
          )
        ) : (
          <video
            ref={videoRef}
            poster={props.poster}
            muted={props.muted ?? true}
            loop={props.loop ?? true}
            autoPlay={props.autoPlay ?? true}
            playsInline={props.playsInline ?? true}
            controls={props.controls ?? false}
            style={mediaStyle}
          >
            {normalizeSrc(props.src).map((s) => (
              <source key={s} src={s} type={getMimeType(s)} />
            ))}
          </video>
        )}
      </motion.div>
    </div>
  );
}
