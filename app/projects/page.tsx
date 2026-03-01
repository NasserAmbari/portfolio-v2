import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import Card from "@/components/ui/Card";
import { projects } from "@/data/projects";

const Projects = () => {
  return (
    <main className="flex flex-col">
      <div className="flex flex-col h-[70vh] md:h-[70vh] justify-center">
        <h1 className="text-6xl lg:text-8xl font-bold">
          <RevealText
            text={`Projects`}
            mode="sentence"
            delay={0.2}
            stagger={0.2}
            trigger="none"
          />
        </h1>

        <hr className="my-12 border-t " />

        <h2 className="text-2xl lg:text-3xl ml-auto lg:w-[50vw]">
          <RevealText
            text={`I enjoy sharing the story behind each project — how it started, how it evolved, and what makes it unique.`}
            mode="word"
            duration={0.3}
            stagger={0.1}
            trigger="none"
          />
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {projects.map((project, index) => (
          <Card
            key={project.slug}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            href={`/projects/${project.slug}`}
            index={index}
            threshold={0.2}
          />
        ))}
      </div>

    </main>
  );
};

export default Projects;

