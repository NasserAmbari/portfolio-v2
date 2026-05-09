import { ParallaxImageConfig } from "@/components/ui/ParallaxImage";

const imagesAbout: ParallaxImageConfig[] = [
  {
    src: "/assets/parallax_1.webp",
    alt: "Master of Ceremony",
    topPercent: 20,
    left: "15%",
    direction: "right",
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
  {
    src: "/assets/parallax_2.webp",
    alt: "Focus",
    topPercent: 30,
    right: "20%",
    direction: "left", // datang dari kiri ke kanan
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-24 md:w-44",
    height: "h-36 md:h-56",
  },
  {
    src: "/assets/parallax_3.webp",
    alt: "Code",
    topPercent: 40,
    left: "20%",
    direction: "right", // datang dari kanan ke kiri
    parallaxDistance: 70,
    fadeRange: 350,
    width: "w-32 md:w-52",
    height: "h-44 md:h-68",
  },
  {
    src: "/assets/parallax_4.webp",
    alt: "Crochet",
    topPercent: 50,
    right: "15%",
    direction: "left",
    parallaxDistance: 70,
    fadeRange: 300,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
  {
    src: "/assets/parallax_5.webp",
    alt: "My Best Friend",
    topPercent: 60,
    left: "15%",
    direction: "right",
    parallaxDistance: 70,
    fadeRange: 400,
    width: "w-28 md:w-48",
    height: "h-40 md:h-64",
  },
];

export default imagesAbout;
