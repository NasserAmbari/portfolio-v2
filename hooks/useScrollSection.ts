// hooks/useScrollSection.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface ScrollSectionValues {
  sectionRef: React.RefObject<HTMLDivElement | null>;
  relativeScroll: number;
  progress: number;
  sectionHeightPx: number;
}

const useScrollSection = (): ScrollSectionValues => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [relativeScroll, setRelativeScroll] = useState(0);
  const [progress, setProgress] = useState(0);
  const [sectionHeightPx, setSectionHeightPx] = useState(0);

  const calculate = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scrollY = window.scrollY;
    const sectionTop = el.getBoundingClientRect().top + scrollY;
    const sectionH = el.offsetHeight;
    const winH = window.innerHeight;
    const rel = scrollY - sectionTop;
    const scrollable = sectionH - winH;

    setSectionHeightPx(sectionH);
    setRelativeScroll(Math.max(0, rel));
    setProgress(Math.max(0, Math.min(1, rel / scrollable)));
  }, []);

  useEffect(() => {
    const timeout = setTimeout(calculate, 50);
    window.addEventListener("scroll", calculate, { passive: true });
    window.addEventListener("resize", calculate);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("scroll", calculate);
      window.removeEventListener("resize", calculate);
    };
  }, [calculate]);

  return { sectionRef, relativeScroll, progress, sectionHeightPx };
};

export default useScrollSection;
