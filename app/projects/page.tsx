import RevealText from "@/components/ui/RevealText";
import Card from "@/components/Card";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
};

const Projects = () => {
  return (
    <main className="flex flex-col gap-12 md:gap-16">
      <div className="flex flex-col justify-end mt-10 md:mt-20">
        <h1 className="text-6xl lg:text-8xl font-bold md:mb-8">
          <RevealText
            text={`Projects`}
            mode="sentence"
            stagger={0.2}
            trigger="none"
          />
        </h1>

        {/* <hr className="my-12 border-t " /> */}

        <h2 className="text-lg lg:text-3x lg:w-[50vw]">
          <RevealText
            text={`I enjoy sharing the story behind each project — how it started, how it evolved, and what makes it unique.`}
            mode="sentence"
            duration={0.5}
            delay={0.2}
            stagger={0.2}
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
