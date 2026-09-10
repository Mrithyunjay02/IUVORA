import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Compass,
  Layout,
  Code2,
  Workflow,
  Sparkles,
  Mail,
  Phone,
  Layers
} from "lucide-react";
import Navbar from "@/components/portfolio/Navbar";
import Footer from "@/components/portfolio/Footer";
import CaseStudyHero from "@/components/portfolio/CaseStudyHero";
import CaseStudyNav from "@/components/portfolio/CaseStudyNav";
import CaseStudyGallery from "@/components/portfolio/CaseStudyGallery";
import BackButton from "@/components/portfolio/BackButton";
import { PROJECTS } from "@/data/projects";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | Iuvora",
      description: "The requested project case study could not be found.",
    };
  }

  return {
    metadataBase: new URL("https://www.iuvora.com"),
    title: `${project.title} | Case Study | Iuvora`,
    description: project.description,
    keywords: [
      project.title,
      project.category,
      ...(project.industry ? [project.industry] : []),
      ...project.tags,
      "Iuvora Case Study",
      "Web Engineering",
      "Selected Works",
    ],
    openGraph: {
      title: `${project.title} | Case Study | Iuvora`,
      description: project.description,
      url: `https://iuvora.com/work/${project.id}`,
      siteName: "Iuvora Portfolio",
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const galleryImages = project.gallery && project.gallery.length > 0
    ? project.gallery
    : [project.image];

  return (
    <main id="main-content" className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] selection:bg-[#2563eb] selection:text-white flex flex-col transition-colors duration-200">
      <Navbar />

      {/* Sticky Floating Case Study Section Navigator */}
      <CaseStudyNav />

      {/* 1. Cinematic Hero Header */}
      <CaseStudyHero project={project} />

      <div className="portfolio-container space-y-32 sm:space-y-40 lg:space-y-48 pb-32">
        
        {/* 2. Luxury Specification Sheet (Project Overview) */}
        <section id="overview" className="scroll-mt-28">
          <div
            className="border-y py-12 sm:py-16"
            style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              <div className="space-y-2">
                <span className="eyebrow text-[11px] block">
                  01 / Client &amp; Project
                </span>
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                  {project.category}
                </div>
              </div>

              <div className="space-y-2">
                <span className="eyebrow text-[11px] block">
                  02 / Industry Sector
                </span>
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {project.industry || "Commercial Platform"}
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                  {project.platform || "Web System"}
                </div>
              </div>

              <div className="space-y-2">
                <span className="eyebrow text-[11px] block">
                  03 / Delivered Scope
                </span>
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {project.scope || "Full-Stack Design & Architecture"}
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                  {project.status || "Production Release"}
                </div>
              </div>

              <div className="space-y-2">
                <span className="eyebrow text-[11px] block">
                  04 / Core Architecture
                </span>
                <div
                  className="text-lg font-bold tracking-tight"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {project.technologies ? project.technologies.slice(0, 2).join(", ") : "Modern Web Stack"}
                </div>
                <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                  {project.technologies && project.technologies.length > 2
                    ? `+ ${project.technologies.length - 2} specialized tools`
                    : "Type-safe Engineering"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 & 4. Editorial Challenge & Solution */}
        <section className="space-y-28 lg:space-y-36">
          {/* The Challenge */}
          <div id="challenge" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="eyebrow">
                01 · The Challenge
              </p>
              <h2
                className="section-headline leading-snug"
                style={{ color: "var(--fg)" }}
              >
                The Problem &amp; Operational Context
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p
                className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed"
                style={{ color: "var(--fg)" }}
              >
                {project.challenge || project.description}
              </p>
              <div className="pt-4 flex items-center gap-3 text-xs font-medium" style={{ color: "var(--fg-muted)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                <span>Scope definition and business constraints analyzed</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }} />

          {/* The Solution */}
          <div id="solution" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              <p className="eyebrow">
                02 · The Solution
              </p>
              <h2
                className="section-headline leading-snug"
                style={{ color: "var(--fg)" }}
              >
                Engineered Delivery &amp; Architecture
              </h2>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <p
                className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed"
                style={{ color: "var(--fg)" }}
              >
                {project.solution || project.description}
              </p>
              <div className="pt-4 flex items-center gap-2 text-xs font-medium text-[var(--color-accent)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Engineered for performance, responsiveness, and scale</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Key Feature Capabilities */}
        {project.features && project.features.length > 0 && (
          <section id="features" className="scroll-mt-28 space-y-12 sm:space-y-16">
            <div className="max-w-2xl space-y-3">
              <p className="eyebrow">
                03 · Key Capabilities
              </p>
              <h2
                className="section-headline mb-4"
                style={{ color: "var(--fg)" }}
              >
                Core Feature Architecture
              </h2>
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Purpose-built modules engineered to streamline interactions and support real-world usage.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="card-border p-8 sm:p-10 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] hover:border-[var(--color-accent)]/50 shadow-sm transition-all duration-300 space-y-4 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-accent)]">
                      {`// 0${idx + 1}`}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-black/10 dark:bg-white/10 group-hover:bg-[var(--color-accent)] transition-colors" />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold tracking-tight transition-colors"
                    style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Technology Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="space-y-8">
            <div className="space-y-3">
              <p className="eyebrow">
                04 · Technical Stack
              </p>
              <h2
                className="section-headline mb-4"
                style={{ color: "var(--fg)" }}
              >
                Frameworks &amp; Toolchain
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <div
                  key={tech}
                  className="card-border inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] text-sm font-medium transition-colors hover:border-[var(--color-accent)]"
                  style={{ color: "var(--fg)" }}
                >
                  <Cpu className="w-4 h-4 text-[var(--color-accent)]" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 7. Visual Showcase Gallery with Fullscreen Lightbox */}
        <section id="gallery" className="scroll-mt-28 space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">
              05 · Visual Showcase
            </p>
            <h2
              className="section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              Interface &amp; Layout Gallery
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              High-resolution screen captures. Click any preview to inspect in high-definition fullscreen.
            </p>
          </div>

          <CaseStudyGallery
            images={galleryImages}
            title={project.title}
            isPrototype={project.isPrototype}
          />
        </section>

        {/* 8. Engineering Discipline / Build Approach */}
        <section id="process" className="scroll-mt-28 space-y-14">
          <div className="max-w-2xl space-y-3">
            <p className="eyebrow">
              06 · Engineering Discipline
            </p>
            <h2
              className="section-headline mb-4"
              style={{ color: "var(--fg)" }}
            >
              How We Built It
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              A structured, client-aligned delivery process ensuring architectural clarity, quality assurance, and stable deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 01
                </span>
                <Compass className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>Discovery &amp; Scope</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Defining technical requirements, business goals, target audience expectations, and architectural boundaries.
              </p>
            </div>

            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 02
                </span>
                <Layout className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>UX &amp; Structure</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Structuring intuitive navigation hierarchies, mobile viewport wireframes, and streamlined conversion flows.
              </p>
            </div>

            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 03
                </span>
                <Sparkles className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>Visual Design System</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Crafting typography, dark/light contrast systems, custom iconography, and micro-interactions.
              </p>
            </div>

            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 04
                </span>
                <Code2 className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>Full-Stack Development</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Writing type-safe modular components, implementing responsive grids, and configuring client logic.
              </p>
            </div>

            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 05
                </span>
                <Workflow className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>QA &amp; Verification</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Thorough cross-device testing, performance audits, asset optimization, and accessibility evaluations.
              </p>
            </div>

            <div className="card-border p-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] space-y-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-xs text-[var(--color-accent)] font-bold">
                  Phase 06
                </span>
                <Layers className="w-5 h-5 text-zinc-400 dark:bg-zinc-500" />
              </div>
              <h3 className="text-lg font-bold" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>Production Deployment</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                Automated continuous delivery, custom domain DNS configuration, and live production verification.
              </p>
            </div>
          </div>
        </section>

        {/* 9. Outcome & Value Statement */}
        <section
          id="outcome"
          className="scroll-mt-28 py-16 sm:py-20 border-y space-y-6"
          style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
        >
          <p className="eyebrow">
            07 · Delivery Outcome
          </p>
          <h2
            className="section-headline max-w-4xl"
            style={{ color: "var(--fg)" }}
          >
            Delivering Qualitative Impact &amp; Long-Term Digital Value
          </h2>
          <p
            className="text-xl sm:text-2xl font-light leading-relaxed max-w-4xl"
            style={{ color: "var(--fg)" }}
          >
            {project.outcome ||
              "Successfully engineered to provide users with a clean, high-performance experience that aligns with commercial standards and project requirements."}
          </p>
        </section>

        {/* Continuous Portfolio Flow: Next Case Study Transition Banner */}
        <section className="card-border relative rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] p-6 sm:p-10 lg:p-12 overflow-hidden hover:border-[var(--color-accent)]/40 transition-all duration-300 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <p className="eyebrow">
                Next Case Study · {nextProject.number}
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight"
                style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
              >
                {nextProject.title}
              </h2>
              <p className="text-sm sm:text-base font-light line-clamp-2" style={{ color: "var(--fg-muted)" }}>
                {nextProject.description}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <Link
                href={`/work/${nextProject.id}`}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all shadow-md group touch-press"
              >
                <span>Read Case Study</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 10. Final Call To Action */}
        <section className="card-border relative rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] p-8 sm:p-14 lg:p-18 overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#3b82f6]/5 dark:bg-[#60a5fa]/10 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="eyebrow">
                Ready to start?
              </p>
              <h2
                className="section-headline"
                style={{ color: "var(--fg)" }}
              >
                Let&apos;s build something <br />
                <span style={{ color: "var(--color-accent)" }}>exceptional</span> together.
              </h2>
              <p
                className="text-base sm:text-lg max-w-lg leading-relaxed font-light"
                style={{ color: "var(--fg-muted)" }}
              >
                Discuss your next web platform, digital system, or mobile prototype with the engineering team at Iuvora.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="/"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-all duration-300 shadow-[0_4px_25px_rgba(37,99,235,0.3)] cursor-pointer"
                >
                  <span>Visit iuvora.com</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <BackButton href="/work#gallery" label="Back to Works Archive" />
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <a
                href="mailto:info@iuvora.com"
                className="card-border flex items-center justify-between p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>Email Direct</div>
                    <div className="text-sm font-medium transition-colors" style={{ color: "var(--fg)" }}>
                      info@iuvora.com
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[var(--color-accent)] transition-colors" />
              </a>

              <a
                href="tel:+918792400712"
                className="card-border flex items-center justify-between p-5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] hover:border-[var(--color-accent)] transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-[var(--color-accent)]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium" style={{ color: "var(--fg-muted)" }}>Phone Direct</div>
                    <div className="text-sm font-medium transition-colors" style={{ color: "var(--fg)" }}>
                      +91 87924 00712
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[var(--color-accent)] transition-colors" />
              </a>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
