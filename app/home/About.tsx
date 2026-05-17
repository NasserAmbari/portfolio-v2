"use client";

import ScrollHighlightText from "@/components/ui/ScrollHighlightText";
import ParallaxImage from "@/components/ui/ParallaxImage";
import useScrollSection from "@/hooks/useScrollSection";
import imagesAbout from "@/data/homeAbout";
import RevealText from "@/components/ui/RevealText";

const TEXT =
  "This is my story, a creative developer who creates memorable digital experiences. Every line of code is written with care, designed to make users pause for a moment and feel something. This isn’t just a website—it’s a story.";

const About = () => {
  const { sectionRef, relativeScroll, progress, sectionHeightPx } =
    useScrollSection();

  return (
    <div className="flex flex-col gap-32">
      <div
        ref={sectionRef}
        className="relative w-screen h-[300vh] -mb-50 -mt-50 md:-mb-50"
        style={{
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center z-10 pointer-events-none">
          <div className="w-[90vw] lg:w-[80vw] max-w-7xl">
            <ScrollHighlightText
              text={TEXT}
              progress={progress}
              className="text-2xl sm:text-4xl  lg:text-5xl text-center leading-relaxed"
            />
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {imagesAbout.map((img, i) => (
            <ParallaxImage
              key={i}
              {...img}
              relativeScroll={relativeScroll}
              sectionHeightPx={sectionHeightPx}
            />
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-between items-center gap-16">
        <div className="flex flex-col">
          <h3 className="text-lg md:text-2xl text-center">
            <RevealText
              text={`Years of Experience`}
              mode="sentence"
              delay={0.2}
              stagger={0.2}
              trigger="viewport"
            />
          </h3>
          <h3 className="text-7xl md:text-8xl text-center">
            <RevealText
              text={`4+`}
              mode="sentence"
              delay={0.2}
              stagger={0.2}
              trigger="viewport"
            />
          </h3>
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg md:text-2xl text-center">
            <RevealText
              text={`Projects Completed`}
              mode="sentence"
              delay={0.2}
              stagger={0.2}
              trigger="viewport"
            />
          </h3>
          <h3 className="text-7xl md:text-8xl text-center">
            <RevealText
              text={`11+`}
              mode="sentence"
              delay={0.2}
              stagger={0.2}
              trigger="viewport"
            />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default About;
