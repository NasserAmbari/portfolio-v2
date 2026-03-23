export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  techStack: string[];
  year: string;
}

export interface Experience {
  company: string;
  title: string;
  duration: string;
  description: string;
}

export const projects: Project[] = [
  {
    slug: "Famous",
    title: "Famous 2.0",
    description: "A Fleet management system for the future of transportation.",
    longDescription:
      "A scalable Fleet Management System designed to process real-time vehicle telemetry, safety-critical events, and high-volume IoT data from 900+ trucks operating concurrently. The platform enables operations teams to monitor vehicle movements, detect safety incidents, and respond faster through live dashboards and real-time alerting mechanisms.",
    imageUrl: "/assets/project_famous.png",
    techStack: [
      "React.js",
      "Express",
      "MySQL",
      "Restful API",
      "MQTT",
      "WebSocket",
    ],
    year: "2025",
  },
  {
    slug: "Famous-lite",
    title: "Famous Lite",
    description: "A lightweight version of the Famous fleet management system.",
    longDescription:
      "Famous Lite is a lightweight Fleet Monitoring application designed to monitor HRGA operational units such as buses, providing real-time visibility into vehicle location, movement, and basic operational status. More than 20 Units connected to this platform. The platform helps HRGA teams ensure transportation availability, improve monitoring efficiency, and support daily operational coordination.",
    imageUrl: "/assets/project_famous_lite.png",
    techStack: [
      "React",
      "Node.js",
      "MongoDB",
      "WebSocket",
      "MQTT",
      "Restful API",
      "WebSocket",
    ],
    year: "2025",
  },
  {
    slug: "HRIS-Minergo",
    title: "HRIS Minergo",
    description: "A human resources information system for Minergo Office.",
    longDescription:
      "HRIS is a centralized human resource platform built to optimize workforce administration by automating HR processes, improving data integrity, and enabling better decision-making through real-time insights and reporting. (Unfinished)",
    imageUrl: "/assets/project_hris.png",
    techStack: ["Laravel", "Blade", "MySQL", "Restful API"],
    year: "2025",
  },
  {
    slug: "Wulandari-Bangun-Laksana",
    title: "Landing Page Wulandari Bangun Laksana",
    description: "A landing page for Wulandari Bangun Laksana.",
    longDescription:
      "A leading source of information for investor and prospective investor about Wulandari Bangun Laksana, Tbk. Company and their product. Their product is Balikpapan Superblock.",
    imageUrl: "/assets/project_wbl.png",
    techStack: ["Divi", "Wordpress"],
    year: "2023",
  },
  {
    slug: "CasekuBPN",
    title: "Caseku.bpn",
    description: "A case study for Caseku.",
    longDescription:
      "My first project was to tackle item production tracking. The system I created includes order input, tracking how far the case has been made, printing receipts and packaging. the system was terminated at February 2024.",
    imageUrl: "/assets/project_caseku.png",
    techStack: ["Laravel", "Blade", "MySQL", "Restful API"],
    year: "2023",
  },
  {
    slug: "Wedding-invitation",
    title: "Wedding Invitation",
    description: "A custom wedding invitation website.",
    longDescription:
      "A beautifully designed wedding invitation website that allows couples to create and share their special day details with guests. The site features a modern design and responsive layout.",
    imageUrl: "/assets/project_wedding_invitation.png",
    techStack: ["HTML", "CSS", "JavaScript"],
    year: "2023",
  },
];

export const experiences: Experience[] = [
  {
    company: "Minergo Systems",
    title: "Lead Software Engineer",
    duration: "Jan 2025 - Dec 2025",
    description:
      "I Orchestrated cross functional team of  7 Engineer - Fullstack Engineer, QA Engineer, Mobile Engineer, DevOps - orchestrating development workflows and ensuring high-quality delivery. I worked closely with stakeholder to translate business requirement into scalable technical solutions. while maintaining clear communication and strategic alignment.",
  },

  {
    company: "Minergo Systems",
    title: "Fullstack Engineer",
    duration: "Sep 2024 - Jan 2025",
    description:
      "Played a key role in  building a real-time Fleet Management System across web and IoT platforms using JavaScript, MQTT, and WebSocket — now deployed to 900+ vehicles. I also created key technical documentation to maintain standards and align engineering with business needs.",
  },

  {
    company: "PT. Karya Bersama Anugerah",
    title: "IT Support",
    duration: "Mar 2021 - Dec 2023",
    description:
      "I built and maintained responsive, user-friendly WordPress websites, focusing not just on functionality but on user experience. At the same time, I supported computer systems and multimedia equipment, handling installations and troubleshooting to ensure smooth operations.",
  },

  {
    company: "Caseku.bpn",
    title: "Freelance Fullstack Engineer",
    duration: "Sep 2021 - Jan 2021",
    description:
      "This was my first time building a Laravel-based production tracking system. It challenged me to quickly learn the framework while delivering a reliable solution aligned with operational needs. Through this project, I strengthened my backend architecture and database design skills, and saw how technology can improve production visibility and efficiency.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
