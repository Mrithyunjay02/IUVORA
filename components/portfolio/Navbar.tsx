"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";
import ThemeToggle from "./ThemeToggle";
import { LayoutGrid, Mail } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Work", icon: LayoutGrid, href: "/work", activeWidth: 32 },
  { label: "Inquire", icon: Mail, href: "/contact", activeWidth: 42 },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="portfolio-container relative flex items-center justify-between sm:justify-start h-16 md:h-20">
        {/* Top Left: Official Iuvora Brand Logo */}
        <div className="pointer-events-auto flex items-center">
          <Link
            href="/"
            className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] rounded transition-opacity hover:opacity-85"
            aria-label="Iuvora - Home"
          >
            <IuvoraLogo width={140} priority={true} />
          </Link>
        </div>

        {/* Centered Navigation Pill */}
        <div className="pointer-events-auto sm:absolute sm:left-1/2 sm:-translate-x-1/2">
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            aria-label="Primary site navigation"
            className={`relative flex items-center p-1.5 rounded-full gap-1 overflow-hidden transition-all duration-500 border ${
              scrolled 
                ? "bg-[#111111]/85 dark:bg-[#222222]/85 backdrop-blur-xl border-white/10 dark:border-white/10 shadow-lg" 
                : "bg-transparent border-transparent shadow-none"
            }`}
          >
            {/* Quick Links with Expanding Icons */}
            <div className="relative z-10 flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href === "/work" && pathname.startsWith("/work"));
                
                // Dynamic colors based on scroll state
                const activeClasses = scrolled 
                  ? "bg-white/15 dark:bg-white/20 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] gap-1.5"
                  : "bg-black/5 dark:bg-white/10 text-[var(--fg)] gap-1.5";
                  
                const inactiveClasses = scrolled
                  ? "bg-transparent text-white/70 hover:text-white hover:bg-white/10 dark:hover:bg-white/10"
                  : "bg-transparent text-[var(--fg-muted)] hover:text-[var(--fg)] hover:bg-black/5 dark:hover:bg-white/5";

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-center px-3.5 rounded-full transition-all duration-200 relative h-9 sm:h-8 active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${
                      isActive ? activeClasses : inactiveClasses
                    }`}
                    aria-label={item.label}
                    title={item.label}
                  >
                    <Icon
                      size={15}
                      strokeWidth={2.5}
                      aria-hidden
                      className="transition-colors duration-200"
                    />

                    <motion.div
                      initial={false}
                      animate={{
                        width: isActive ? `${item.activeWidth}px` : "0px",
                        opacity: isActive ? 1 : 0,
                        marginLeft: isActive ? "2px" : "0px",
                      }}
                      transition={{
                        width: { type: "spring", stiffness: 350, damping: 32 },
                        opacity: { duration: 0.19 },
                        marginLeft: { duration: 0.19 },
                      }}
                      className="overflow-hidden flex items-center"
                    >
                      <span
                         className={`font-semibold text-xs whitespace-nowrap select-none transition-opacity duration-200 text-ellipsis ${
                           isActive 
                             ? (scrolled ? "text-white" : "text-[var(--fg)]") 
                             : "opacity-0"
                         }`}
                      >
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div
              aria-hidden="true"
              className={`relative z-10 w-px h-4 mx-0.5 transition-colors duration-500 ${
                scrolled ? "bg-white/20 dark:bg-white/30" : "bg-black/10 dark:bg-white/10"
              }`}
            />

            {/* Theme Toggle */}
            <div className="relative z-10 flex items-center">
              <ThemeToggle scrolled={scrolled} />
            </div>
          </motion.nav>
        </div>
      </div>
    </header>
  );
}
