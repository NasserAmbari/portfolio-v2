"use client";

import { useCallback, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { useRevealAnimation } from "@/hooks/useRevealAnimation";

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

const getOffset = (direction: Direction, amount = 60) => {
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

export default function RevealMedia(props: RevealMediaProps) {
  const {
    duration = 0.7,
    direction = "up",
    delay = 0,
    threshold = 0.3,
    className = "",
    trigger = "viewport",
    objectFit = "cover",
  } = props;

  const controls = useAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { x: xOffset, y: yOffset } = getOffset(direction);

  const ref = useRevealAnimation<HTMLDivElement>({
    trigger,
    threshold,
    onPlay: useCallback(() => {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        transition: { duration, delay, ease: [0.25, 0.46, 0.45, 0.94] },
      });
      // Untuk video: pastikan play setelah reveal
      if (props.type === "video" && props.autoPlay !== false) {
        videoRef.current?.play().catch(() => {
          // Autoplay diblokir browser — aman diabaikan karena video muted
        });
      }
    }, [controls, duration, delay]), // eslint-disable-line react-hooks/exhaustive-deps

    onReset: useCallback(() => {
      controls.set({ opacity: 0, x: xOffset, y: yOffset });
    }, [controls, xOffset, yOffset]),

    onSnap: useCallback(() => {
      controls.set({ opacity: 1, x: 0, y: 0 });
    }, [controls]),
  });

  const mediaStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit,
    display: "block",
  };

  // Wrapper hanya butuh overflow:hidden — sizing via className (Tailwind)
  const wrapperStyle: React.CSSProperties = {
    overflow: "hidden",
    // fill mode butuh position:relative agar Next.js <Image fill> bisa bekerja
    ...(props.type === "image" && props.fill ? { position: "relative" } : {}),
  };

  return (
    <div ref={ref} className={className} style={wrapperStyle}>
      <motion.div
        initial={{ opacity: 0, x: xOffset, y: yOffset }}
        animate={controls}
        style={{ width: "100%", height: "100%" }}
      >
        {props.type === "image" ? (
          props.fill ? (
            // Fill mode — mengikuti ukuran parent sepenuhnya
            <Image src={props.src} alt={props.alt} fill style={{ objectFit }} />
          ) : (
            // Normal mode — width/height untuk aspect ratio, ukuran via className
            <Image
              src={props.src}
              alt={props.alt}
              width={props.width ?? 1600}
              height={props.height ?? 900}
              style={mediaStyle}
            />
          )
        ) : (
          // Video
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
            Browser kamu tidak mendukung tag video.
          </video>
        )}
      </motion.div>
    </div>
  );
}
