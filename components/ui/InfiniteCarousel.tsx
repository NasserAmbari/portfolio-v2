"use client";

import React, { Children, ReactNode, useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";

interface InfiniteCarouselProps {
  children: ReactNode;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function InfiniteCarousel({
  children,
  gap = 24, // 24px = gap-6 di Tailwind
  autoPlay = true,
  autoPlayInterval = 3000,
}: InfiniteCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const items = Children.toArray(children);

  // Render 3 set komponen agar bisa scroll kiri-kanan tanpa batas (infinite loop)
  const extendedItems = [...items, ...items, ...items];

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || items.length === 0) return;

    const getSetWidth = () => {
      const firstChild = carousel.firstElementChild as HTMLElement;
      if (!firstChild) return 0;
      // Lebar asli 1 card + jarak gap-nya
      return (firstChild.offsetWidth + gap) * items.length;
    };

    // Pindahkan posisi scroll awal ke set kedua (tengah) agar pengguna bisa swipe ke kiri
    const initPosition = () => {
      if (carousel.scrollLeft === 0) {
        carousel.style.scrollBehavior = "auto";
        carousel.scrollLeft = getSetWidth();
        carousel.style.scrollBehavior = "smooth";
      }
    };

    const initTimeout = setTimeout(initPosition, 100);
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      // Tunggu hingga scroll / swiping berhenti sebentar sebelum melakukan silent reset
      scrollTimeout = setTimeout(() => {
        const setWidth = getSetWidth();
        if (setWidth === 0) return;

        const { scrollLeft } = carousel;

        // Jika masuk ke set pertama (ujung kiri), lempat balik ke set kedua
        if (scrollLeft < setWidth * 0.5) {
          carousel.style.scrollBehavior = "auto";
          carousel.scrollLeft += setWidth;
          carousel.style.scrollBehavior = "smooth";
        }
        // Jika masuk ke set ketiga (ujung kanan), lempar balik ke set kedua
        else if (scrollLeft > setWidth * 1.5) {
          carousel.style.scrollBehavior = "auto";
          carousel.scrollLeft -= setWidth;
          carousel.style.scrollBehavior = "smooth";
        }
      }, 150);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", initPosition);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(scrollTimeout);
      carousel.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", initPosition);
    };
  }, [items.length, gap]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      const firstChild = carousel.firstElementChild as HTMLElement;
      const scrollAmount = firstChild?.offsetWidth || 400;

      carousel.scrollBy({
        left: direction === "left" ? -(scrollAmount + gap) : scrollAmount + gap,
        behavior: "smooth",
      });
    }
  };

  // Autoplay Logic
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      if (!isHovered) {
        scroll("right");
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isHovered, gap]);

  return (
    <div
      className="w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="relative w-full">
        {/* Fade Effect Kanan-Kiri */}

        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-0 sm:w-6 md:w-48 lg:w-64 z-10"
            style={{
              background: `linear-gradient(to right, #0a0a0a, transparent)`,
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-0 sm:w-6 md:w-48 lg:w-64 z-10"
            style={{
              background: `linear-gradient(to left, #0a0a0a, transparent)`,
            }}
          />
        </>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory px-4 md:px-8 lg:px-12 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{ gap: `${gap}px` }}
        >
          {extendedItems.map((child, i) => (
            <div key={i} className="snap-center shrink-0">
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="px-4 md:px-8 lg:px-12 w-full flex justify-end gap-4 pb-[5vh]">
        <button
          onClick={() => scroll("left")}
          className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors z-20"
          data-cursor-click
        >
          <Icon icon="lucide:arrow-left" className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-4 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          data-cursor-click
        >
          <Icon icon="lucide:arrow-right" className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
