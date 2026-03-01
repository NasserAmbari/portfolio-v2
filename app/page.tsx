import Hero from "@/components/section/Hero";
import About from "@/components/section/About";
import Project from "@/components/section/Project";
import Contact from "@/components/section/Contact";

export default function Home() {
  return (
    <main className="grid grid-cols-1 gap-24 md:gap-48">
      <Hero />
      <About />
      <Project />
      <Contact />
    </main>
  );
}
