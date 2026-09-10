"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-[max(0.75rem,env(safe-area-inset-top,0.75rem))] pb-2 px-3 sm:px-8 pointer-events-none flex items-center justify-between sm:justify-center">
      {/* Top Left: Standalone Brand Identity */}
      <div className="pointer-events-auto sm:absolute sm:left-6 md:left-8 sm:top-[max(0.75rem,env(safe-area-inset-top,0.75rem))]">
        <a
          href="https://iuvora.com"
          target="_blank"
          rel="noopener noreferrer"
          className="apple-liquid-glass flex items-center gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] touch-press transition-all duration-300 shadow-sm"
          aria-label="Iuvora Company Platform"
        >
          <div className="relative w-6 h-6 overflow-hidden rounded-md flex items-center justify-center bg-white/15 dark:bg-white/20 backdrop-blur-md border border-white/30 dark:border-white/35 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] group-hover:scale-105 transition-transform">
            <Image
              src="/logo/iuvora-logo.png"
              alt="Iuvora"
              width={24}
              height={24}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#60a5fa] transition-colors">
            iuvora
          </span>
        </a>
      </div>

      {/* Centered Liquid Glass Navigation Pill */}
      <nav
        aria-label="Primary site navigation"
        className="apple-liquid-glass relative flex items-center px-2 sm:px-3 py-1.5 rounded-full pointer-events-auto gap-1 sm:gap-1.5 overflow-hidden shadow-sm"
      >
        {/* Specular Liquid Glare Layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-3 top-0 h-[45%] rounded-t-full bg-gradient-to-b from-white/25 dark:from-white/35 to-transparent blur-[0.5px]"
        />

        {/* Quick Links */}
        <div className="relative z-10 flex items-center gap-1 text-xs sm:text-sm font-medium text-white/90">
          <Link
            href="/#gallery"
            className="px-3 py-1.5 sm:px-3.5 rounded-full hover:text-white hover:bg-white/15 dark:hover:bg-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          >
            Works
          </Link>
          <Link
            href="/#process"
            className="hidden sm:inline-flex px-3.5 py-1.5 rounded-full hover:text-white hover:bg-white/15 dark:hover:bg-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          >
            Discipline
          </Link>
          <Link
            href="/#contact"
            className="px-3 py-1.5 sm:px-3.5 rounded-full hover:text-white hover:bg-white/15 dark:hover:bg-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
          >
            Inquire
          </Link>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className="relative z-10 w-px h-4 bg-white/20 dark:bg-white/30 mx-0.5"
        />

        {/* Theme Toggle */}
        <div className="relative z-10 flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
