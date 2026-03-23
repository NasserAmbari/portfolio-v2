"use client";

import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/bari/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bari/" },
  { name: "GitHub", url: "https://github.com/bari" },
];

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 py-8 text-2xl border-t mt-30">
        <div className="social-container flex flex-col gap-4 text-xl sm:text-2xl">
          <div className="text-3xl font-semibold">
            <RevealText
              text={`Social`}
              direction="up"
              duration={0.7}
              delay={0.2}
              trigger="viewport"
            />
          </div>
          {socialLinks.map((item) => (
            <div key={item.name} className="flex pt-0.5 items-center gap-2">
              <RevealText
                text={item.name}
                direction="up"
                duration={0.7}
                delay={0.2}
                trigger="viewport"
              />

              <RevealMedia
                type="image"
                src="/assets/arrow.png"
                alt="Hero"
                width={16}
                height={16}
                direction="up"
                duration={0.7}
                delay={0.2}
                className="rounded-2xl"
              />
            </div>
          ))}
        </div>

        <div className="relative w-full sm:w-32 md:w-60 aspect-square mt-8 md:mt-0 md:ml-auto">
          <RevealMedia
            type="image"
            src="/assets/logo_full_white.png"
            alt="Hero"
            width={2000}
            height={2000}
            direction="up"
            duration={0.7}
            delay={0.2}
          />
        </div>
      </div>

      <div className="text-left md:text-right text-gray-400 text-sm border-t border-gray-700 pt-4 pb-4">
        &copy; 2026 by Bari. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
