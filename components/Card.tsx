"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePageTransition } from "@/contexts/PageTransitionContext";

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  href?: string;
  index?: number;
  duration?: number;
  delay?: number;
  direction?: "up" | "down";
  stagger?: number;
  threshold?: number;
}

const Card = ({
  title,
  description,
  imageUrl,
  href,
  index = 0,
  duration = 0.7,
  delay = 0.5,
  direction = "up",
  stagger = 0.05,
  threshold = 0.3,
}: CardProps) => {
  const yOffset = direction === "up" ? 40 : -40;
  const totalDelay = delay;
  const { isTransitionReady } = usePageTransition();

  const content = (
    <motion.article
      className="rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: yOffset }}
      whileInView={isTransitionReady ? { opacity: 1, y: 0 } : undefined}
      animate={!isTransitionReady ? { opacity: 0, y: yOffset } : undefined}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay: totalDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="description-project pt-4">
        <h3 className="text-xl md:text-3xl lg:text-4xl font-extrabold mb-2 lg:mb-4">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 text-md md:text-md lg:text-xl line-clamp-3">
          {description}
        </p>
      </div>
    </motion.article>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

export default Card;
