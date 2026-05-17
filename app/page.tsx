import Hero from "@/app/home/Hero";
import About from "@/app/home/About";
import Project from "@/app/home/Project";
import Contact from "@/app/home/Contact";
import TechStack from "./home/TechStack";
import Services from "@/app/home/Services";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 gap-24 md:gap-48">
        <Hero />
        <About />
        <TechStack />
        <Services />
        <Project />
        <Contact />
      </main>
    </>
  );
}
