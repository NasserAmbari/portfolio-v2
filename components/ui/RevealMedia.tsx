"use client";

import { useRef, useEffect, useState, useCallback } from "react";
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
  /** Preload gambar — pakai untuk gambar above-the-fold / hero */
  priority?: boolean;
  /**
   * Aspect ratio container agar layout tidak shift saat gambar load.
   * Format Tailwind: "video" | "square" | "[4/3]" | "[3/4]" dsb.
   * Jika tidak diset, container tidak punya tinggi terdefinisi (behavior lama).
   */
  aspectRatio?: string;
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
  preload?: "auto" | "metadata" | "none";
}

export type RevealMediaProps = RevealImageProps | RevealVideoProps;

// ─── Helpers ──────────────────────────────────────────────────────────

const getOffset = (direction: Direction, amount = 40) => {
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

  // ── State: apakah konten sudah siap dianimasikan ─────────────────
  // Image → tunggu onLoad callback dari Next.js Image
  // Video → langsung ready saat mount (tidak bisa deteksi load video easily)
  const [isLoaded, setIsLoaded] = useState(props.type === "video");

  // ── Aspect ratio class untuk container ───────────────────────────
  const aspectRatioClass =
    props.type === "image" && props.aspectRatio
      ? `aspect-${props.aspectRatio}`
      : "";

  // ── useInView — trigger saat elemen masuk viewport ───────────────
  const isInView = useInView(wrapperRef, {
    once: true,
    amount: threshold,
  });

  // ── Play animasi — hanya jalan jika DUA kondisi terpenuhi: ───────
  // 1. Konten sudah selesai load (isLoaded = true)
  // 2. Elemen sudah masuk viewport ATAU trigger="none"
  const playAnimation = useCallback(() => {
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
  }, [controls, duration, delay]);

  useEffect(() => {
    const shouldPlay = isLoaded && (trigger === "none" || isInView);

    if (shouldPlay) playAnimation();
  }, [isLoaded, isInView, trigger, playAnimation]);

  // ── Play video setelah animasi ────────────────────────────────────
  useEffect(() => {
    if (props.type === "video" && props.autoPlay !== false && isInView) {
      videoRef.current?.play().catch(() => {});
    }
  }, [isInView]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Styles ───────────────────────────────────────────────────────
  const isFill = props.type === "image" && props.fill;

  const wrapperStyle: React.CSSProperties = {
    overflow: "hidden",
    position: "relative", // selalu relative — dibutuhkan skeleton absolute
    ...(isFill ? {} : {}),
  };

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    display: "block",
  };

  return (
    <div
      ref={wrapperRef}
      // aspectRatioClass memastikan container punya tinggi sejak awal
      // sehingga layout tidak shift (CLS = 0) saat gambar selesai load
      className={`${className} ${aspectRatioClass}`.trim()}
      style={wrapperStyle}
    >
      {/* ── Skeleton placeholder ─────────────────────────────────────
           Tampil selama gambar belum selesai load (isLoaded = false).
           Warna gelap subtle agar tidak mencolok di background hitam.
           Pulse animation sebagai indikator loading.                  */}
      {!isLoaded && props.type === "image" && (
        <div
          className="absolute inset-0 bg-transparent animate-pulse"
          style={{ borderRadius: "inherit" }}
        />
      )}

      <motion.div
        // Selalu mulai dari opacity:0 — animasi hanya jalan setelah
        // isLoaded AND isInView terpenuhi, sehingga tidak ada blink
        initial={{ opacity: 0, x: xOffset, y: yOffset }}
        animate={controls}
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
              priority={props.priority}
              style={{ objectFit }}
              // onLoad: animasi baru boleh jalan setelah gambar selesai decode
              onLoad={() => setIsLoaded(true)}
            />
          ) : (
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width ?? 1600}
              height={props.height ?? 900}
              priority={props.priority}
              style={mediaStyle}
              // onLoad: sama — tunggu gambar benar-benar render di DOM
              onLoad={() => setIsLoaded(true)}
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
            preload={props.preload ?? "auto"}
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
