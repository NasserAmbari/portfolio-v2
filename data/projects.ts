export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  techStack: string[];
  year: string;
}

export const projects: Project[] = [
  {
    slug: "project-1",
    title: "Project 1",
    description: "A brief description of Project 1.",
    longDescription:
      "A detailed look into Project 1 — exploring the challenges, the process, and the solutions that brought this idea to life. This project pushed boundaries in design and engineering, resulting in something truly meaningful.",
    imageUrl: "/assets/famous.png",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2025",
  },
  {
    slug: "project-2",
    title: "Project 2",
    description: "A brief description of Project 2.",
    longDescription:
      "Project 2 was an exciting journey from concept to deployment. It involved building a scalable, real-time system with a focus on performance and user experience.",
    imageUrl: "/assets/hero_image.png",
    techStack: ["React", "Node.js", "MongoDB", "WebSocket"],
    year: "2024",
  },
  {
    slug: "project-3",
    title: "Project 3",
    description: "A brief description of Project 3.",
    longDescription:
      "Project 3 started as a small experiment and grew into a full-featured application. The focus was on clean architecture and maintainable code.",
    imageUrl: "/assets/hero_image.png",
    techStack: ["Laravel", "Vue.js", "PostgreSQL", "Docker"],
    year: "2024",
  },
  {
    slug: "project-4",
    title: "Project 4",
    description: "A brief description of Project 4.",
    longDescription:
      "Project 4 challenged me to think differently about user interaction and data visualization. Every detail was crafted with intention.",
    imageUrl: "/assets/hero_image.png",
    techStack: ["Python", "TensorFlow", "Flask", "D3.js"],
    year: "2023",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
