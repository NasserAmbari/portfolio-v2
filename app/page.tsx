import Hero from "@/app/_section/Hero";
import About from "@/app/_section/About";
import Project from "@/app/_section/Project";
import Contact from "@/app/_section/Contact";
import TechStack from "./_section/TechStack";

export default function Home() {
  return (
    <>
      <main className="grid grid-cols-1 gap-24 md:gap-48">
        <Hero />
        <About />
        <TechStack />
        <Project />
        <Contact />
      </main>
    </>
  );
}
