import { ParallaxImageConfig } from "@/components/ui/ParallaxImage";

const imagesAbout: ParallaxImageConfig[] = [
  {
    src: "/assets/project_famous.webp",
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

export default imagesAbout;
