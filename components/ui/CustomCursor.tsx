"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────

type CursorState = "default" | "click" | "link" | "invert";

const LABELS: Record<"click" | "link", string> = {
  click: "Click",
  link: "Go to",
};

// ─── Props ────────────────────────────────────────────────────────────

interface CustomCursorProps {
  /** Ukuran cincin normal dalam px. Default: 28 */
  size?: number;
  /** Ukuran saat expanded dalam px. Default: 80 */
  sizeExpanded?: number;
  /** Warna border & teks. Default: "#ffffff" */
  color?: string;
  /** Ketebalan border dalam px. Default: 1.5 */
  borderWidth?: number;
  /** Spring stiffness. Default: 380 */
  stiffness?: number;
  /** Spring damping. Default: 28 */
  damping?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────

function getStateFromTarget(target: Element): CursorState {
  if (target.closest("[data-cursor-invert]")) return "invert";

  const anchor = target.closest("a");
  if (anchor?.hasAttribute("href")) return "link";

  const isClickable =
    target.closest("button") !== null ||
    target.closest("[data-cursor-click]") !== null ||
    target.closest("[role='button']") !== null ||
    ["submit", "button", "reset"].includes(
      (target.closest("input") as HTMLInputElement | null)?.type ?? "",
    );

  if (isClickable) return "click";
  return "default";
}

const NATIVE_POINTER_SELECTOR = [
  "a[href]",
  "button",
  "[data-cursor-click]",
  "[role='button']",
  "input[type='submit']",
  "input[type='button']",
  "input[type='reset']",
].join(", ");

// ─── Cursor inner — semua hooks ada di sini tanpa early return ────────
// Komponen ini HANYA dirender jika sudah dipastikan desktop.
// Dengan begitu Rules of Hooks tidak dilanggar.

function CursorInner({
  size,
  sizeExpanded,
  color,
  borderWidth,
  stiffness,
  damping,
}: Required<CustomCursorProps>) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const styleTagRef = useRef<HTMLStyleElement | null>(null);

  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // ── Motion values ──────────────────────────────────────────────────
  const rawX = useMotionValue(-300);
  const rawY = useMotionValue(-300);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.5 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.5 });

  const isExpanded = state === "click" || state === "link";
  const currentSize = isExpanded ? sizeExpanded : size;

  // ── CSS: sembunyikan cursor native di semua elemen kecuali clickable ─
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      *, *::before, *::after { cursor: none !important; }
      ${NATIVE_POINTER_SELECTOR} { cursor: pointer !important; }
      ${NATIVE_POINTER_SELECTOR} * { cursor: pointer !important; }
    `;
    document.head.appendChild(style);
    styleTagRef.current = style;
    return () => {
      styleTagRef.current?.remove();
    };
  }, []);

  // ── Event handlers ─────────────────────────────────────────────────

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    },
    [rawX, rawY],
  );

  const handleMouseOver = useCallback((e: MouseEvent) => {
    setState(getStateFromTarget(e.target as Element));
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setState("default");
  }, []);

  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave,
      );
    };
  }, [
    handleMouseMove,
    handleMouseOver,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
  ]);

  // ── Derived styles ─────────────────────────────────────────────────
  const bgColor = state === "invert" ? color : "rgba(0, 0, 0, 0)";
  const bWidth = isExpanded ? borderWidth * 1.2 : borderWidth;
  const border = `${bWidth}px solid ${color}`;

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 99999,
        pointerEvents: "none",
        mixBlendMode: state === "invert" ? "difference" : "normal",
      }}
      animate={{
        width: currentSize,
        height: currentSize,
        opacity: isVisible ? 1 : 0,
        backgroundColor: bgColor,
        border,
        scale: isPressed ? 0.82 : 1,
      }}
      transition={{
        width: { type: "spring", stiffness: 260, damping: 22 },
        height: { type: "spring", stiffness: 260, damping: 22 },
        backgroundColor: { duration: 0.1 },
        border: { duration: 0.1 },
        scale: { type: "spring", stiffness: 500, damping: 28 },
        opacity: { duration: 0.18 },
      }}
      className="rounded-full"
    >
      <AnimatePresence mode="wait">
        {(state === "click" || state === "link") && (
          <motion.div
            key={state}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.16,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
          >
            <span
              style={{
                color: color,
                fontSize: 9,
                fontFamily: "monospace",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                userSelect: "none",
                whiteSpace: "nowrap",
                fontWeight: 500,
              }}
            >
              {LABELS[state]}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mqWidth = window.matchMedia("(min-width: 1024px)");
    const mqPointer = window.matchMedia("(pointer: fine)");

    const check = () => setIsDesktop(mqWidth.matches && mqPointer.matches);

    check();

    mqWidth.addEventListener("change", check);
    mqPointer.addEventListener("change", check);

    return () => {
      mqWidth.removeEventListener("change", check);
      mqPointer.removeEventListener("change", check);
    };
  }, []);

  return isDesktop;
}

export default function CustomCursor({
  size = 28,
  sizeExpanded = 80,
  color = "#ffffff",
  borderWidth = 1.5,
  stiffness = 380,
  damping = 28,
}: CustomCursorProps) {
  const isDesktop = useIsDesktop();

  if (!isDesktop) return null;

  return (
    <CursorInner
      size={size}
      sizeExpanded={sizeExpanded}
      color={color}
      borderWidth={borderWidth}
      stiffness={stiffness}
      damping={damping}
    />
  );
}
