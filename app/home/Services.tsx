"use client";

import RevealText from "@/components/ui/RevealText";
import InfiniteCarousel from "@/components/ui/InfiniteCarousel";

const services = [
  {
    title: "Frontend & Web Development",
    description:
      "Transforming ideas into fast, responsive, and accessible web applications. I specialize in modern frameworks like React and Next.js to deliver seamless user experiences that look great on any device.",
    number: "01",
    color: "bg-neutral-900",
  },
  {
    title: "Backend & API Integration",
    description:
      "Building robust architectures and integrating secure APIs. Ensuring your application scales effectively while maintaining high performance and data integrity behind the scenes.",
    number: "02",
    color: "bg-neutral-950",
  },
  {
    title: "UI/UX & Interaction Design",
    description:
      "Bridging the gap between design and engineering. I create intuitive interfaces with engaging animations and micro-interactions that captivate users and elevate your brand.",
    number: "03",
    color: "bg-black",
  },
];

export default function Services() {
  return (
    <div className="flex flex-col gap-12 w-full overflow-hidden">
      {/* Wrapper Judul */}
      <div className="w-full">
        <h2 className="text-6xl lg:text-7xl font-semibold text-center">
          <RevealText
            text={`Bringing Ideas to Life`}
            mode="sentence"
            delay={0.2}
            stagger={0.2}
            trigger="viewport"
          />
        </h2>
      </div>

      {/* Reusable Infinite Carousel */}
      <InfiniteCarousel gap={24} autoPlay={true} autoPlayInterval={3000}>
        {services.map((service, i) => (
          <div
            key={i}
            className={`w-[90vw] sm:w-[75vw] md:max-w-[600px] h-[45vh] md:h-[500px] ${service.color} border border-white/10 rounded-[2rem] p-6 md:p-12 flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start gap-8">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-[80%] leading-tight">
                {service.title}
              </h3>
              <span className="text-3xl md:text-5xl font-light text-white/20">
                {service.number}
              </span>
            </div>
            <div className="text-sm md:text-xl text-neutral-400 leading-relaxed">
              {service.description}
            </div>
          </div>
        ))}
      </InfiniteCarousel>
    </div>
  );
}
