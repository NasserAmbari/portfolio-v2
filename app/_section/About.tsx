"use client";

import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import ParallaxImage, {
  ParallaxImageConfig,
} from "@/components/ui/ParallaxImage";
import useScrollSection from "@/hooks/useScrollSection";

const TEXT =
  "This is my story, a creative developer who creates memorable digital experiences. Every line of code is written with care, designed to make users pause for a moment and feel something. This isn’t just a website—it’s a story.";

const IMAGES: ParallaxImageConfig[] = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    alt: "Mountains",
    topPercent: 20,
    left: "15%",
    direction: "right",
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    alt: "Forest",
    topPercent: 30,
    right: "20%",
    direction: "left", // datang dari kiri ke kanan
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-24 md:w-44",
    height: "h-36 md:h-56",
  },
  {
    src: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
    alt: "Desert",
    topPercent: 40,
    left: "20%",
    direction: "right", // datang dari kanan ke kiri
    parallaxDistance: 70,
    fadeRange: 350,
    width: "w-32 md:w-52",
    height: "h-44 md:h-68",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
    alt: "Beach",
    topPercent: 50,
    right: "15%",
    direction: "left",
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80",
    alt: "Snow mountain",
    topPercent: 60,
    left: "15%",
    direction: "right",
    parallaxDistance: 70,
    fadeRange: 400,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
];

const About = () => {
  const { sectionRef, relativeScroll, progress, sectionHeightPx } =
    useScrollSection();

  return (
    <div
      ref={sectionRef}
      className="relative w-screen h-[300vh] -mb-[200px] -mt-[200px] md:-mb-[200px]"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
        <div className="w-[90vw] lg:w-[80vw] ">
          <ScrollHighlightText
            text={TEXT}
            progress={progress}
            className="text-2xl md:text-4xl lg:text-5xl text-center leading-relaxed"
          />
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {IMAGES.map((img, i) => (
          <ParallaxImage
            key={i}
            {...img}
            relativeScroll={relativeScroll}
            sectionHeightPx={sectionHeightPx}
          />
        ))}
      </div>
    </div>
  );
};

export default About;
