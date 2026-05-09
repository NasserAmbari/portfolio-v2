"use client";

import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import PixelBlast from "@/components/ui/PixelBlast";
import { usePathname } from "next/navigation";

const ROUTE = "/";

const Hero = () => {
  const pathname = usePathname();
  const isActive = ROUTE == pathname;

  return (
    <section className="hero-section relative data-cursor-invert">
      <div className="relative min-h-[65vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center mb-8">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              z-0 pointer-events-none transition-opacity duration-500
              w-full h-125
              ${isActive ? "opacity-100" : "opacity-0"}`}
        >
          <PixelBlast
            patternScale={5}
            patternDensity={0.3}
            color="white"
            liquidRadius={0.1}
            pixelSize={2}
          />
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center">
          <RevealText
            text={`TIME CHANGE MY TITLE BUT NOT MY CODE`}
            duration={0.3}
            stagger={0.15}
            mode={"word"}
          />
        </h1>
        <div className="absolute bottom-0 left-0 text-[0.6rem] md:text-sm text-neutral-400 text-left">
          <span className="font-extrabold block md:inline">
            <RevealText
              text={`Based in 1°16'36.5"S 116°49'39.8"E`}
              duration={0.2}
              stagger={0.05}
              delay={1}
              mode={"character"}
            />
          </span>
        </div>
        <div className="absolute bottom-0 right-0 text-[0.6rem] md:text-sm text-neutral-400 text-right">
          <span className="font-extrabold block md:inline">
            <RevealText
              text={`Software Engineer`}
              duration={0.2}
              stagger={0.05}
              delay={1}
              mode={"character"}
            />
          </span>
        </div>
      </div>
      <RevealMedia
        type="video"
        src="/assets/video_about.webm"
        preload="auto"
        duration={0.7}
        delay={1}
        threshold={0.3}
        className="w-full h-[30vh] md:h-[50vh] lg:h-[70vh] max-h-1/2 rounded-2xl"
        direction="up"
        trigger="none"
      />
    </section>
  );
};

export default Hero;
