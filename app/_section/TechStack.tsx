"use client";

import {
  ScrollVelocityRow,
  ScrollVelocityContainer,
  VelocityIconItem,
} from "@/components/ui/ScrollBasedVelocity";
import { Icon } from "@iconify/react";

const iconFirstRowTech = [
  { icon: "simple-icons:javascript", label: "JavaScript" },
  { icon: "simple-icons:react", label: "React" },
  { icon: "simple-icons:typescript", label: "TypeScript" },
  { icon: "simple-icons:tailwindcss", label: "Tailwind CSS" },
  { icon: "simple-icons:css", label: "CSS" },
  { icon: "simple-icons:php", label: "PHP" },
  { icon: "simple-icons:laravel", label: "Laravel" },
  { icon: "simple-icons:express", label: "express" },
  { icon: "simple-icons:nodedotjs", label: "Node.js" },
  { icon: "simple-icons:html5", label: "HTML5" },
  { icon: "simple-icons:shadcnui", label: "ShadCN UI" },
];

const secondFirstRowTech = [
  { icon: "simple-icons:linux", label: "Linux" },
  { icon: "simple-icons:pm2", label: "PM2" },
  { icon: "simple-icons:nginx", label: "Nginx" },
  { icon: "simple-icons:github", label: "GitHub" },
  { icon: "simple-icons:cloudflare", label: "Cloudflare" },
  { icon: "simple-icons:socketdotio", label: "Socket.io" },
  { icon: "simple-icons:mqtt", label: "MQTT" },
  { icon: "simple-icons:python", label: "Python" },
  { icon: "simple-icons:mysql", label: "MySQL" },
  { icon: "simple-icons:postgresql", label: "PostgreSQL" },
];

const TechStack = () => {
  return (
    <div>
      <ScrollVelocityContainer className="gap-6">
        <ScrollVelocityRow
          direction={1}
          baseVelocity={1}
          itemClassName="gap-10 px-3"
          className="py-3"
        >
          {iconFirstRowTech.map((tech, index) => (
            <VelocityIconItem key={index}>
              <div className="text-3xl md:text-4xl">
                <Icon icon={tech.icon} />
              </div>
            </VelocityIconItem>
          ))}
        </ScrollVelocityRow>

        <ScrollVelocityRow
          direction={-1}
          baseVelocity={1}
          itemClassName="gap-6 px-3"
          className="py-3"
        >
          {secondFirstRowTech.map((tech, index) => (
            <VelocityIconItem key={index}>
              <div className="text-3xl md:text-4xl ">
                <Icon icon={tech.icon} />
              </div>
            </VelocityIconItem>
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
    </div>
  );
};

export default TechStack;
