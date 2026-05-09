export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  techStack: { icon: string; label: string }[];
  year: string;
}

export const projects: Project[] = [
  {
    slug: "Famous",
    title: "Famous 2.0",
    description: "A Fleet management system for the future of transportation.",
    longDescription:
      "A scalable Fleet Management System designed to process real-time vehicle telemetry, safety-critical events, and high-volume IoT data from 900+ trucks operating concurrently. The platform enables operations teams to monitor vehicle movements, detect safety incidents, and respond faster through live dashboards and real-time alerting mechanisms.",
    imageUrl: "/assets/project_famous.webp",
    techStack: [
      { icon: "simple-icons:react", label: "React" },
      { icon: "simple-icons:express", label: "Express" },
      { icon: "simple-icons:nodedotjs", label: "Node.js" },
      { icon: "simple-icons:mysql", label: "MySQL" },
      { icon: "simple-icons:postgresql", label: "PostgreSQL" },
      { icon: "mdi:api", label: "Restful API" },
      { icon: "simple-icons:mqtt", label: "MQTT" },
      { icon: "mdi:connection", label: "WebSocket" },
    ],
    year: "2025",
  },
  {
    slug: "Famous-lite",
    title: "Famous Lite",
    description: "A lightweight version of the Famous fleet management system.",
    longDescription:
      "Famous Lite is a lightweight Fleet Monitoring application designed to monitor HRGA operational units such as buses, providing real-time visibility into vehicle location, movement, and basic operational status. More than 20 Units connected to this platform. The platform helps HRGA teams ensure transportation availability, improve monitoring efficiency, and support daily operational coordination.",
    imageUrl: "/assets/project_famous_lite.webp",
    techStack: [
      { icon: "simple-icons:react", label: "React" },
      { icon: "simple-icons:nodedotjs", label: "Node.js" },
      { icon: "simple-icons:express", label: "Express" },
      { icon: "simple-icons:mysql", label: "MySQL" },
      { icon: "simple-icons:postgresql", label: "PostgreSQL" },
      { icon: "mdi:connection", label: "WebSocket" },
      { icon: "simple-icons:mqtt", label: "MQTT" },
      { icon: "mdi:api", label: "Restful API" },
    ],
    year: "2025",
  },
  {
    slug: "HRIS-Minergo",
    title: "HRIS Minergo",
    description: "A human resources information system for Minergo Office.",
    longDescription:
      "HRIS is a centralized human resource platform built to optimize workforce administration by automating HR processes, improving data integrity, and enabling better decision-making through real-time insights and reporting. (Unfinished)",
    imageUrl: "/assets/project_hris.webp",
    techStack: [
      { icon: "simple-icons:laravel", label: "Laravel" },
      { icon: "simple-icons:blade", label: "Blade" },
      { icon: "simple-icons:mysql", label: "MySQL" },
      { icon: "mdi:api", label: "Restful API" },
    ],
    year: "2025",
  },
  {
    slug: "Wulandari-Bangun-Laksana",
    title: "Landing Page Wulandari Bangun Laksana",
    description: "A landing page for Wulandari Bangun Laksana.",
    longDescription:
      "A leading source of information for investor and prospective investor about Wulandari Bangun Laksana, Tbk. Company and their product. Their product is Balikpapan Superblock.",
    imageUrl: "/assets/project_wbl.webp",
    techStack: [
      { icon: "simple-icons:elementor", label: "Elementor" },
      { icon: "simple-icons:wordpress", label: "WordPress" },
    ],
    year: "2023",
  },
  {
    slug: "CasekuBPN",
    title: "Caseku.bpn",
    description: "A case study for Caseku.",
    longDescription:
      "My first project was to tackle item production tracking. The system I created includes order input, tracking how far the case has been made, printing receipts and packaging. the system was terminated at February 2024.",
    imageUrl: "/assets/project_caseku.webp",
    techStack: [
      { icon: "simple-icons:laravel", label: "Laravel" },
      { icon: "simple-icons:mysql", label: "MySQL" },
      { icon: "mdi:api", label: "Restful API" },
    ],
    year: "2023",
  },
  {
    slug: "Wedding-invitation",
    title: "Wedding Invitation",
    description: "A custom wedding invitation website.",
    longDescription:
      "A beautifully designed wedding invitation website that allows couples to create and share their special day details with guests. The site features a modern design and responsive layout.",
    imageUrl: "/assets/project_wedding_invitation.webp",
    techStack: [
      { icon: "simple-icons:html5", label: "HTML5" },
      { icon: "simple-icons:css3", label: "CSS3" },
      { icon: "simple-icons:javascript", label: "JavaScript" },
    ],
    year: "2023",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
