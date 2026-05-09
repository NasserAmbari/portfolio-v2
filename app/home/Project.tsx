"use client";

import Card from "@/components/Card";
import RevealText from "@/components/ui/RevealText";
import { projects } from "@/data/projects";

const Project = () => {
  return (
    <div className="grid grid-cols-1 gap-8">
      <h2 className="text-3xl md:text-5xl font-semibold">
        <RevealText
          text={`FEATURED PROJECT`}
          mode="sentence"
          delay={0.2}
          stagger={0.2}
          trigger="viewport"
        />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {projects.slice(0, 4).map((project, index) => (
          <Card
            key={project.slug}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            href={`/projects/${project.slug}`}
            index={index}
            threshold={0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default Project;
