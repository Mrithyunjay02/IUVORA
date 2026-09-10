"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative bg-[var(--bg)] border-t pt-20 pb-16 sm:pb-12 safe-area-bottom overflow-hidden transition-colors duration-200 scroll-mt-16"
      style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
    >
      {/* Subtle top light gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#3b82f6]/30 dark:via-[#60a5fa]/40 to-transparent pointer-events-none" />

      <div className="portfolio-container">
        {/* Main CTA Section */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
        >
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">
              Ready for your next project?
            </p>
            <h2
              className="section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              Let&apos;s build something <br />
              <span style={{ color: "var(--color-accent)" }}>exceptional</span> together.
            </h2>
            <p
              className="text-base max-w-lg mb-8 leading-relaxed"
              style={{ color: "var(--fg-muted)" }}
            >
              Explore our full capabilities, company methodology, and services on our main corporate platform.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-xl font-semibold text-sm bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.3)] cursor-pointer"
            >
              <span>Visit iuvora.com</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4">
              <h3 className="eyebrow text-[11px]" style={{ color: "var(--fg-muted)" }}>
                Direct Inquiries
              </h3>
              
              <a
                href="mailto:info@iuvora.com"
                className="card-border flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all group shadow-sm touch-press active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>Email</div>
                    <div className="text-sm font-medium transition-colors" style={{ color: "var(--fg)" }}>
                      info@iuvora.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[var(--color-accent)] transition-colors" />
              </a>

              <a
                href="tel:+918792400712"
                className="card-border flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-all group shadow-sm touch-press active:scale-[0.98]"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>Phone</div>
                    <div className="text-sm font-medium transition-colors" style={{ color: "var(--fg)" }}>
                      +91 87924 00712
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[var(--color-accent)] transition-colors" />
              </a>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="eyebrow text-[11px] mb-3" style={{ color: "var(--fg-muted)" }}>
                Connect
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/company/aktekdynamics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-border px-4 py-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] text-xs font-medium transition-colors hover:border-[var(--color-accent)]"
                  style={{ color: "var(--fg)" }}
                >
                  LinkedIn ↗
                </a>
                <a
                  href="https://www.instagram.com/iuvora_info"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-border px-4 py-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] text-xs font-medium transition-colors hover:border-[var(--color-accent)]"
                  style={{ color: "var(--fg)" }}
                >
                  Instagram ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs font-medium"
          style={{ color: "var(--fg-muted)" }}
        >
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
