"use client";

import RevealText from "@/components/ui/RevealText";

const About = () => {
  return (
    <div className="grid lg:grid-cols-[1fr_2fr] gap-6 mlg:gap-0 md:text-5xl">
      <h2 className="text-4xl md:text-5xl font-semibold mb-4 md:mb-0">
        <RevealText
          text={`THIS IS ME 😎`}
          mode="word"
          delay={0.2}
          stagger={0.2}
          trigger="viewport"
        />
      </h2>

      <span>
        <p className="text-xl sm:text-3xl md:text-md font-normal leading-normal mb-4 md:mb-8">
          <RevealText
            text={`“Ahmad Nasser Ambari” well that my name but you can call me Nasser or Bari. im a software engineer  shaped by real-world challenge in the mining industry.`}
            mode={"word"}
            duration={0.3}
            stagger={0.1}
            delay={0.2}
            trigger="viewport"
          />
        </p>

        <p className="text-xl sm:text-3xl md:text-md font-normal leading-normal">
          <RevealText
            text={`Driven by curiosity and a desire to build something with technology to make meaningfull difference.`}
            mode={"word"}
            duration={0.3}
            stagger={0.1}
            delay={0.2}
            trigger="viewport"
          />
        </p>
      </span>
    </div>
  );
};

export default About;
