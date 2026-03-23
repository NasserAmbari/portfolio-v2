"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const menuNavigation = [
  { name: "Home", href: "/" },
  { name: "About Me", href: "/about" },
  { name: "Projects", href: "/projects" },
  // { name: "Contact", href: "/contact" },
];

const EASE_IN_OUT = [0.76, 0, 0.24, 1] as [number, number, number, number];
const EASE_OUT = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EASE_SPRING = [0.33, 1, 0.68, 1] as [number, number, number, number];

const BLOB = {
  hidden: "M -5,105 Q 25,92 50,94 Q 75,96 105,105 Z",
  pulling: "M -5,105 Q 18,50 50,42 Q 82,50 105,105 Z",
  open: "M -5,105 Q 25,-5 50,-5 Q 75,-5 105,105 Z",
};

const panelVariants: Variants = {
  hidden: {
    y: "100%",
    transition: { duration: 0.6, ease: EASE_IN_OUT },
  },
  open: {
    y: "0%",
    transition: { duration: 0.7, ease: EASE_IN_OUT },
  },
};

const blobVariants = {
  hidden: {
    d: BLOB.hidden,
    transition: { duration: 0.45, ease: EASE_IN_OUT },
  },
  pulling: {
    d: BLOB.pulling,
    transition: { duration: 0.22, ease: EASE_SPRING },
  },
  open: {
    d: BLOB.open,
    transition: { duration: 0.5, ease: EASE_IN_OUT, delay: 0.12 },
  },
} as unknown as Variants;

const listVariants: Variants = {
  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};

const itemVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

type BlobState = "hidden" | "pulling" | "open";

function SlimeBlob({ state }: { state: BlobState }) {
  return (
    <div
      className="absolute left-0 w-full pointer-events-none"
      style={{ top: -80, height: 80, overflow: "visible" }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          overflow: "visible",
        }}
      >
        <motion.path
          fill="#0a0a0a"
          variants={blobVariants}
          initial="hidden"
          animate={state}
        />
      </svg>
    </div>
  );
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [blobState, setBlobState] = useState<BlobState>("hidden");

  const openMenu = () => {
    setIsOpen(true);
    setBlobState("pulling");
    setTimeout(() => setBlobState("open"), 220);
  };

  const closeMenu = () => {
    setBlobState("pulling");
    setTimeout(() => {
      setBlobState("hidden");
      setIsOpen(false);
    }, 220);
  };

  return (
    <nav>
      <div className="fixed w-full z-50 backdrop-blur-lg text-white">
        <div className="mx-auto flex justify-between items-center px-4 py-4 md:px-8 max-w-480">
          <div className="logo">
            <Image
              src="/assets/logo_white.png"
              alt="logo"
              width={48}
              height={48}
              className="border-none"
            />
          </div>
          <motion.div
            data-cursor-click
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="side-bar cursor-pointer navbar-icon"
            onClick={openMenu}
          >
            <Image
              src="/assets/navbar_icon.svg"
              alt="menu"
              width={48}
              height={48}
              className="border-none"
            />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={closeMenu}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-0 w-full z-50 bg-[#0a0a0a] text-white"
              variants={panelVariants}
              initial="hidden"
              animate="open"
              exit="hidden"
            >
              <SlimeBlob state={blobState} />

              <div className="relative flex flex-col h-full px-4 py-4 md:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-auto">
                  <span className="text-white/25 text-xs tracking-[0.2em] uppercase">
                    Menu
                  </span>
                  <motion.div
                    data-cursor-click
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="navbar-icon"
                    onClick={closeMenu}
                  >
                    <Image
                      src="/assets/navbar_icon.svg"
                      alt="close"
                      width={48}
                      height={48}
                      className="border-none"
                    />
                  </motion.div>
                </div>

                {/* Menu items */}
                <motion.ul
                  className="flex flex-col justify-center flex-1 gap-0 py-6"
                  variants={listVariants}
                  initial="hidden"
                  animate="open"
                  exit="hidden"
                >
                  {menuNavigation.map((item, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      className="border-b border-white/[0.07] last:border-none overflow-hidden"
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between py-4 md:py-5"
                      >
                        <span className="text-white/20 text-xs mr-5 select-none tabular-nums">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <motion.span
                          className="flex-1 text-4xl sm:text-5xl md:text-6xl font-black leading-none tracking-tight group-hover:opacity-50 transition-opacity duration-300"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.5 + index * 0.1,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        >
                          {item.name}
                        </motion.span>
                        <span className="ml-4 text-white/20 text-lg group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Footer */}
                <div className="flex justify-between text-white/20 text-[11px] font-mono tracking-widest mt-auto">
                  <span>Story of Bari</span>
                  <span>© 2025</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
