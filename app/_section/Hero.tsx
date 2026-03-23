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
      <div
        className="inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{
          width: "100%",
          height: "500px",
          position: "absolute",
          opacity: isActive ? 1 : 0,
        }}
      ></div>
      <div className="relative min-h-[65vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center mb-8">
        <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold text-center">
          <RevealText
            text={`TIME CHANGE MY TITLE `}
            duration={0.3}
            stagger={0.15}
            mode={"sentence"}
          />
          <RevealText
            text={`BUT NOT MY CODE`}
            duration={0.3}
            stagger={0.15}
            delay={0.3}
            mode={"sentence"}
          />
        </h1>

        <h2 className="text-md md:text-xl mt-4">
          <RevealText
            text={`Crafting somehting reliable with clarity, care, and long-term thinking.`}
            duration={0.4}
            stagger={0.15}
            delay={0.3}
          />
        </h2>
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
        type="image"
        src="/assets/hero_image.png"
        alt="Hero"
        width={1360}
        height={500}
        duration={0.7}
        delay={0.2}
        threshold={0.3}
        className="rounded-2xl"
        direction="up"
        trigger="none"
      />
    </section>
  );
};

export default Hero;
