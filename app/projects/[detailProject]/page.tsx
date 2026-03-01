import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import Link from "next/link";

export function generateStaticParams() {
  return projects.map((project) => ({
    detailProject: project.slug,
  }));
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ detailProject: string }>;
}) {
  const { detailProject } = await params;
  const project = getProjectBySlug(detailProject);
  if (!project) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-12 md:gap-16">
      {/* Header */}
      <div className="flex flex-col h-[30vh] md:h-[40vh] justify-end gap-4">
        <Link
          href="/projects"
          className="text-gray-400 hover:text-white transition-colors text-sm md:text-base"
        >
          <RevealText
            text="← Back to Projects"
            mode="word"
            duration={0.3}
            delay={0.1}
            trigger="none"
          />
        </Link>

        <h1 className="text-5xl lg:text-8xl font-bold">
          <RevealText
            text={project.title}
            mode="sentence"
            delay={0.2}
            stagger={0.2}
            trigger="none"
          />
        </h1>

        <div className="flex items-center gap-4 text-gray-400">
          <span className="text-lg">
            <RevealText
              text={project.year}
              mode="sentence"
              duration={0.3}
              delay={0.3}
              trigger="none"
            />
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <RevealMedia
        src={project.imageUrl}
        type="image"
        alt={project.title}
        duration={0.7}
        delay={0.2}
        threshold={0.1}
        width={1600}
        height={900}
        className="rounded-2xl overflow-hidden w-full"
        direction="up"
        trigger="none"
      />

      {/* Description */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          <RevealText
            text="About This Project"
            mode="word"
            duration={0.3}
            stagger={0.1}
            delay={0.2}
            trigger="none"
          />
        </h2>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
          <RevealText
            text={project.longDescription}
            mode="sentence"
            duration={0.5}
            delay={0.2}
            trigger="none"
          />
        </p>
      </div>

      {/* Tech Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8">
        <h2 className="text-2xl md:text-3xl font-semibold">
          <RevealText
            text="Tech Stack"
            mode="word"
            duration={0.3}
            stagger={0.1}
            delay={0.2}
            trigger="viewport"
          />
        </h2>

        <div className="flex flex-wrap gap-3">
          {project.techStack.map((tech, index) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-full border border-white/20 text-sm md:text-base text-gray-300 hover:border-white/50 transition-colors"
            >
              <RevealText
                text={tech}
                mode="sentence"
                duration={0.3}
                delay={0.3 + index * 0.05}
                trigger="viewport"
              />
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
