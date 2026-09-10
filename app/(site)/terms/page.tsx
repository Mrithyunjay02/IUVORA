import type { Metadata } from "next";
import Link from "next/link";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Iuvora PVT LIMITED. Terms governing software development, digital marketing, and IT consulting engagements.",
  openGraph: {
    title: "Terms of Service | Iuvora",
    description:
      "Terms of Service for Iuvora PVT LIMITED.",
    url: "https://www.iuvora.com/terms",
  },
  alternates: {
    canonical: "https://www.iuvora.com/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <ScrollThemeProvider />

      <SectionWrapper theme="dark" id="terms-of-service" noPad>
        <div
          className="relative container-grid"
          style={{ paddingTop: "9rem", paddingBottom: "6rem" }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12 border-b border-white/10 pb-8">
              <span className="eyebrow mb-3 block">Legal & Compliance</span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Terms of Service
              </h1>
              <p className="text-sm font-mono text-zinc-400">
                Last updated: September 2026 · Iuvora PVT LIMITED
              </p>
            </div>

            {/* Document Content */}
            <div className="prose prose-invert max-w-none text-zinc-300 space-y-10 leading-relaxed text-base">
              <section>
                <p className="text-lg text-zinc-200 leading-relaxed">
                  Welcome to Iuvora PVT LIMITED (&ldquo;Iuvora,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website (www.iuvora.com) and our client engineering, design, and marketing services. By accessing our website or retaining our services, you agree to be bound by these Terms.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  1. Scope of Services
                </h2>
                <p>
                  Iuvora provides custom software engineering, web application development, mobile application development, digital marketing, and cloud infrastructure consulting. Specific deliverables, sprint schedules, milestones, and technical specifications are defined in dedicated Statements of Work (SOW) or written client agreements.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  2. Intellectual Property & Code Ownership
                </h2>
                <ul className="list-disc pl-6 space-y-2.5 text-zinc-300">
                  <li>
                    <strong className="text-white">Client Deliverables:</strong> Upon receipt of full and final payment for the agreed project scope, all custom designs, software source code, assets, and documentation created specifically for the client transfer to the client as work-for-hire.
                  </li>
                  <li>
                    <strong className="text-white">Pre-existing Frameworks:</strong> Open-source libraries (e.g. Next.js, React, Tailwind) and generic developer utilities remain subject to their respective open-source licenses (MIT, Apache, etc.).
                  </li>
                  <li>
                    <strong className="text-white">Portfolio Rights:</strong> Unless otherwise stipulated in an executed Non-Disclosure Agreement (NDA), Iuvora retains the non-exclusive right to display completed project screenshots, logos, and high-level case study descriptions within its portfolio showcase.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  3. Client Obligations & Approvals
                </h2>
                <p>
                  Timely delivery depends on mutual collaboration. Clients agree to provide requisite assets, brand guidelines, content, and feedback within agreed review windows. Delays in asset provision or milestone sign-offs may adjust the projected completion timeline.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4. Payment & Milestone Schedules
                </h2>
                <p>
                  Project engagements are billed according to the milestone schedule detailed in the relevant contract (typically split into discovery, build sprints, and pre-deployment milestones). Invoices are payable within 14 business days of issuance unless otherwise agreed in writing.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  5. Warranties & Quality Assurance
                </h2>
                <p>
                  We adhere to senior engineering standards, including responsive design, cross-browser compatibility, WCAG 2.1 AA accessibility guidelines, and Core Web Vitals optimization. We provide a post-launch warranty period (typically 30 days) to rectify any reproducible defects or bugs within the contracted scope at no extra charge.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  6. Governing Law & Dispute Resolution
                </h2>
                <p>
                  These Terms and any dispute arising out of or related to our services shall be governed by and construed in accordance with the laws of India, under the jurisdiction of the competent courts in Shivamogga, Karnataka.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  7. Contact Information
                </h2>
                <div className="p-5 rounded-sm border border-white/10 bg-white/[0.02] text-sm space-y-1">
                  <p className="text-white font-semibold">IUVORA PVT LIMITED</p>
                  <p className="text-zinc-400">WHQ8+5H6, Kuvempu Rd, Mission Compound</p>
                  <p className="text-zinc-400">Shivamogga, Karnataka 577201, India</p>
                  <p className="pt-2">
                    Inquiries:{" "}
                    <a href="mailto:info@iuvora.com" className="text-[var(--color-accent)] hover:underline">
                      info@iuvora.com
                    </a>
                  </p>
                </div>
              </section>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] hover:underline"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
