"use client";

import RevealText from "@/components/ui/RevealText";
import {
  ScrollVelocityRow,
  ScrollVelocityContainer,
  VelocityIconItem,
} from "@/components/ui/ScrollBasedVelocity";
import PixelBlast from "@/components/ui/PixelBlast";

const Contact = () => {
  const handleEmailClick = () => {
    const subjectTemplate = encodeURIComponent(
      "Project Inquiry – Nasser Ambari",
    );
    const bodyTemplate =
      encodeURIComponent(`Hi Bari, I came across your portfolio and I'm interested in working with you.
I have a project that I believe would be a great fit for your skills and expertise. Please let me know if you're available to discuss this further. Looking forward to hearing from you!`);

    window.location.href = `mailto:nssr.mbr@gmail.com?subject=${subjectTemplate}&body=${bodyTemplate}`;
  };

  return (
    <div className="relative min-h-[40vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center my-12 gap-8 md:gap-16">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
              z-0 pointer-events-none transition-opacity duration-500
              w-full h-125
            opacity-100"
      >
        <PixelBlast
          patternScale={5}
          patternDensity={0.3}
          color="white"
          liquidRadius={0.1}
          pixelSize={2}
        />
      </div>

      <h3 className="flex flex-col text-xl md:text-5xl text-white">
        <RevealText
          text={`AVAILABLE FOR`}
          duration={0.3}
          stagger={0.15}
          delay={0.5}
          mode={"word"}
          trigger="viewport"
        />
        <RevealText
          text={`COLLABORATION AND OPPORTUNITIES`}
          duration={0.3}
          stagger={0.15}
          delay={0.5}
          mode={"word"}
          trigger="viewport"
        />
      </h3>

      <div
        onClick={handleEmailClick}
        className="w-full cursor-pointer"
        data-cursor-click
      >
        <ScrollVelocityContainer className="gap-6">
          <ScrollVelocityRow
            direction={-1}
            baseVelocity={0.3}
            velocityFactor={3}
            itemClassName="gap-10 px-3"
            className="w-[90%] py-6 text-2xl md:text-7xl font-bold rounded-full border border-white/20 mx-auto bg-gray-950"
          >
            <VelocityIconItem>AVAILABLE FOR WORK</VelocityIconItem>
            <VelocityIconItem>-</VelocityIconItem>
            <VelocityIconItem>AVAILABLE FOR WORK</VelocityIconItem>
            <VelocityIconItem>-</VelocityIconItem>
            <VelocityIconItem>AVAILABLE FOR WORK</VelocityIconItem>
            <VelocityIconItem>-</VelocityIconItem>
            <VelocityIconItem>AVAILABLE FOR WORK</VelocityIconItem>
            <VelocityIconItem>-</VelocityIconItem>
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>

      <h4 className="flex flex-col font-medium text-md">
        <RevealText
          text={`For further inquiries Email me at`}
          duration={0.3}
          stagger={0.15}
          delay={0.5}
          mode={"word"}
          trigger="viewport"
        />
        <div
          onClick={handleEmailClick}
          className="cursor-pointer hover:text-white/70 transition-colors"
          data-cursor-click
        >
          <RevealText
            text={`nssr.mbr@gmail.com`}
            duration={0.3}
            stagger={0.15}
            delay={0.5}
            mode={"word"}
            trigger="viewport"
          />
        </div>
      </h4>
    </div>
  );
};

export default Contact;
