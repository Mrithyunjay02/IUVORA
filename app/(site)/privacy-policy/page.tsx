import type { Metadata } from "next";
import Link from "next/link";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Iuvora PVT LIMITED. Learn how we collect, use, and protect your information across our website and client services.",
  openGraph: {
    title: "Privacy Policy | Iuvora",
    description:
      "Privacy Policy for Iuvora PVT LIMITED. Learn how we handle and protect information.",
    url: "https://www.iuvora.com/privacy-policy",
  },
  alternates: {
    canonical: "https://www.iuvora.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <ScrollThemeProvider />

      <SectionWrapper theme="dark" id="privacy-policy" noPad>
        <div
          className="relative container-grid"
          style={{ paddingTop: "9rem", paddingBottom: "6rem" }}
        >
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-12 border-b border-white/10 pb-8">
              <span className="eyebrow mb-3 block">Legal & Privacy</span>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Privacy Policy
              </h1>
              <p className="text-sm font-mono text-zinc-400">
                Last updated: September 2026 · Iuvora PVT LIMITED
              </p>
            </div>

            {/* Document Content */}
            <div className="prose prose-invert max-w-none text-zinc-300 space-y-10 leading-relaxed text-base">
              <section>
                <p className="text-lg text-zinc-200 leading-relaxed">
                  Iuvora PVT LIMITED (&ldquo;Iuvora,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is a digital product studio headquartered in Shivamogga, Karnataka, India. This Privacy Policy describes how we collect, use, and safeguard personal and business information when you visit our website (
                  <a href="https://www.iuvora.com" className="text-[var(--color-accent)] hover:underline">
                    www.iuvora.com
                  </a>
                  ) or engage our services.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  1. Information We Collect
                </h2>
                <p>We believe in strict data minimization. We only collect information necessary to communicate with you and deliver our digital services:</p>
                <ul className="list-disc pl-6 space-y-2.5 text-zinc-300">
                  <li>
                    <strong className="text-white">Inquiry & Project Details:</strong> When you submit a project request or email us, we collect your name, business email address, phone number, company name, and project scope details.
                  </li>
                  <li>
                    <strong className="text-white">Direct Communications:</strong> Any messages, feedback, or documents you share with our team via email, WhatsApp, or discovery calls.
                  </li>
                  <li>
                    <strong className="text-white">Technical Usage Data:</strong> Standard server logs and anonymized metrics (such as browser type, referring URLs, and pages visited) used solely to maintain website performance and security.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  2. How We Use Your Information
                </h2>
                <p>We use the information we collect strictly to:</p>
                <ul className="list-disc pl-6 space-y-2.5 text-zinc-300">
                  <li>Evaluate your project requirements and prepare technical proposals.</li>
                  <li>Execute client contracts, deliverables, and ongoing support agreements.</li>
                  <li>Respond to inquiries, schedule discovery consultations, and issue invoices.</li>
                  <li>Monitor website reliability and protect against unauthorized or malicious activity.</li>
                </ul>
                <p className="font-semibold text-white">
                  We never sell, rent, or trade your personal or business data to data brokers or third-party advertisers.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  3. Client Confidentiality & Code Rights
                </h2>
                <p>
                  All proprietary source code, internal system credentials, trade secrets, and proprietary assets shared during client engagements are protected under mutual non-disclosure obligations. Client project materials remain the confidential property of the respective client as governed by our service agreement.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  4. Cookies & Analytics
                </h2>
                <p>
                  Our public website does not use tracking or behavioral advertising cookies. We do not use third-party marketing pixels or cross-site fingerprinting technologies. Essential session mechanisms operate entirely within your local browser sandbox.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  5. Data Security & Retention
                </h2>
                <p>
                  We implement industry-standard security protocols to prevent unauthorized access, alteration, or disclosure of communications and client project records. Project correspondence is retained only as long as necessary to fulfill project requirements, tax obligations, and legal compliance.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  6. Your Rights
                </h2>
                <p>
                  Depending on your jurisdiction, you have the right to request access to, correction of, or deletion of your personal data held in our records. To exercise any of these rights, please email us directly.
                </p>
              </section>

              <section className="space-y-4">
                <h2
                  className="text-2xl font-bold text-white tracking-tight pt-2 border-t border-white/10"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  7. Contact Information
                </h2>
                <p>
                  If you have questions or concerns regarding this Privacy Policy, you can reach out to our legal and operations team at:
                </p>
                <div className="p-5 rounded-sm border border-white/10 bg-white/[0.02] text-sm space-y-1">
                  <p className="text-white font-semibold">IUVORA PVT LIMITED</p>
                  <p className="text-zinc-400">WHQ8+5H6, Kuvempu Rd, Mission Compound</p>
                  <p className="text-zinc-400">Shivamogga, Karnataka 577201, India</p>
                  <p className="pt-2">
                    Email:{" "}
                    <a href="mailto:info@iuvora.com" className="text-[var(--color-accent)] hover:underline">
                      info@iuvora.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a href="tel:+918792400712" className="text-[var(--color-accent)] hover:underline">
                      +91 87924 00712
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
