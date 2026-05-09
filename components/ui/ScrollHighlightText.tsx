// components/ui/ScrollHighlightText.tsx

import React from "react";

interface ScrollHighlightTextProps {
  text: string;
  progress: number; // 0.0 → 1.0, khusus untuk highlight (fase 2 saja)
  className?: string;
}

const ScrollHighlightText: React.FC<ScrollHighlightTextProps> = ({
  text,
  progress,
  className = "text-2xl md:text-4xl font-bold leading-relaxed text-center",
}) => {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, index) => {
        const startHighlight = index / words.length;
        const isHighlighted = progress > startHighlight;

        return (
          <span
            key={index}
            className={`transition-colors duration-200 ${
              isHighlighted ? "text-white" : "text-white/30"
            }`}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
};

export default ScrollHighlightText;
