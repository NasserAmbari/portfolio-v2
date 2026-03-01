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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-0 py-8 text-2xl border-t mt-30 items-center">
        <div className="social-container flex flex-col lg:flex-row gap-4 lg:gap-24 text-xl sm:text-2xl">
          {socialLinks.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
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

        <div className="text-left xl:text-right text-white font-extrabold text-5xl xl:text-7xl md:mt-12 xl:mt-0">
          <RevealText
            text="Story Of BARI"
            mode="sentence"
            direction="up"
            duration={0.5}
            stagger={0.2}
            trigger="viewport"
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
