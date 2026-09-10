"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-[#f8f9fc] dark:bg-[var(--color-black)] border-t border-black/10 dark:border-white/10 pt-20 pb-16 sm:pb-12 safe-area-bottom overflow-hidden transition-colors duration-200 scroll-mt-16"
    >
      {/* Subtle top light gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 dark:via-[#60a5fa]/40 to-transparent pointer-events-none" />

      <div className="portfolio-container">
        {/* Main CTA Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-black/10 dark:border-white/10">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-6 uppercase tracking-wider">
              <span>Ready for your next project?</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight mb-6">
              Let&apos;s build something <br />
              <span className="text-[#3b82f6] dark:text-[#60a5fa]">exceptional</span> together.
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base max-w-lg mb-8 leading-relaxed font-light">
              Explore our full capabilities, company methodology, and services on our main corporate platform.
            </p>
            <a
              href="https://iuvora.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-sm bg-[#3b82f6] dark:bg-[#2563eb] text-white hover:bg-[#2563eb] dark:hover:bg-[#1d4ed8] transition-all duration-300 shadow-[0_4px_25px_rgba(59,130,246,0.3)] cursor-pointer"
            >
              <span>Visit iuvora.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">
                Direct Inquiries
              </h3>
              
              <a
                href="mailto:info@iuvora.com"
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-[#f3f4f8] dark:hover:bg-[#1a1c26] transition-all group shadow-sm touch-press active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#3b82f6] dark:text-[#60a5fa]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-medium">Email</div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] transition-colors">
                      info@iuvora.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>

              <a
                href="tel:+918792400712"
                className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-[#f3f4f8] dark:hover:bg-[#1a1c26] transition-all group shadow-sm touch-press active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#3b82f6] dark:text-[#60a5fa]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 font-medium">Phone</div>
                    <div className="text-sm font-medium text-zinc-900 dark:text-white group-hover:text-[#3b82f6] dark:group-hover:text-[#60a5fa] transition-colors">
                      +91 87924 00712
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-zinc-500 uppercase mb-3">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/aktekdynamics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.instagram.com/iuvora_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-white dark:bg-[#14151e] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-3">
            <div className="relative w-5 h-5 overflow-hidden rounded bg-black/5 dark:bg-white/5">
              <Image
                src="/logo/iuvora-logo.png"
                alt="Iuvora"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <span>© {currentYear} Iuvora. All rights reserved.</span>
          </div>

          <div>
            <span>Standalone Works Showcase · Designed &amp; Engineered by Iuvora</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
