"use client";

import {
  ScrollVelocityRow,
  ScrollVelocityContainer,
  VelocityIconItem,
} from "@/components/ui/ScrollBasedVelocity";
import { Icon } from "@iconify/react";
import { iconFirstRowTech, secondFirstRowTech } from "@/data/itemTechStack";

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
