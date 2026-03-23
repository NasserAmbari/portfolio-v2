"use client";

import RevealText from "@/components/ui/RevealText";
import RevealMedia from "@/components/ui/RevealMedia";
import Link from "next/link";

const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/bari/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bari/" },
  { name: "GitHub", url: "https://github.com/bari" },
];

const Footer = () => {
  return (
    <div>
      <div className="flex flex-row md:flex-row gap-8 md:gap-0 py-8 text-2xl border-t mt-30">
        <div className="social-container flex flex-col gap-4 text-xl sm:text-2xl">
          <div className="text-3xl md:text-4xl font-semibold">
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
              <Link href={item.url} target="_blank" rel="noopener noreferrer">
                <RevealText
                  text={`${item.name}  →`}
                  direction="up"
                  duration={0.7}
                  delay={0.2}
                  trigger="viewport"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="relative w-24 sm:w-32 md:w-60 aspect-square md:mt-0 mt-auto ml-auto">
          <Link href="/">
            <RevealMedia
              type="image"
              src="/assets/logo_white.png"
              alt="Hero"
              width={1000}
              height={1000}
              direction="up"
              duration={0.7}
              delay={0.2}
            />
          </Link>
        </div>
      </div>

      <div className="text-left md:text-right text-gray-400 text-sm border-t border-gray-700 pt-4 pb-4">
        &copy; 2026 by Bari. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
