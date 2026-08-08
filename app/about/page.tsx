import type { Metadata } from "next";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Iuvora — our founding story, mission, and the team behind the work.",
  openGraph: {
    title: "About | Iuvora",
    description: "The team, mission, and story behind Iuvora.",
    url: "https://iuvora.com/about",
  },
};

const TEAM_MEMBERS = [
  {
    name: "[PLACEHOLDER — Founder Name]",
    role: "[PLACEHOLDER — Founder / CEO]",
    bio: "[PLACEHOLDER — Replace with real team bio. Do not publish this text.]",
    initial: "F",
  },
  {
    name: "[PLACEHOLDER — Team Member Name]",
    role: "[PLACEHOLDER — Role]",
    bio: "[PLACEHOLDER — Replace with real team bio. Do not publish this text.]",
    initial: "T",
  },
  {
    name: "[PLACEHOLDER — Team Member Name]",
    role: "[PLACEHOLDER — Role]",
    bio: "[PLACEHOLDER — Replace with real team bio. Do not publish this text.]",
    initial: "T",
  },
];

const VALUES = [
  {
    title: "Clarity over cleverness",
    description:
      "We communicate plainly — in proposals, in code comments, and in client meetings.",
  },
  {
    title: "Craft in the details",
    description:
      "Performance budgets, accessibility audits, responsive edge cases — we care about the full picture.",
  },
  {
    title: "Long-term thinking",
    description:
      "We build things that are easy to maintain and evolve, not just impressive at launch.",
  },
];

export default function AboutPage() {
  return (
    <>
      <ScrollThemeProvider />

      {/* ── Hero ─────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="about-hero" noPad>
        <div
          className="relative flex flex-col justify-center min-h-[60vh] container-grid"
          style={{ paddingTop: "9rem", paddingBottom: "5rem" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-5">About Iuvora</p>
            <h1 className="hero-headline mb-6" style={{ color: "var(--color-white)" }}>
              Built to build.
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-gray-mid)", maxWidth: "50ch" }}
            >
              Iuvora was founded on a single belief: that the gap between
              strategic ambition and technical execution shouldn&apos;t require
              managing five different vendors.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Mission ──────────────────────────────────────── */}
      <SectionWrapper theme="light" id="mission">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-4">Our mission</p>
              <h2 className="section-headline mb-6" style={{ color: "var(--fg)" }}>
                End-to-end.
                <br />
                No exceptions.
              </h2>
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                [PLACEHOLDER — Founding story paragraph. Replace with the real narrative of why Iuvora was started, what problem you saw in the market, and what you set out to change. Do not publish this placeholder.]
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                [PLACEHOLDER — Second paragraph. Could cover: team background, geographic reach, approach philosophy. Replace before publishing.]
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Values ───────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="values">
        <div className="container-grid">
          <div className="max-w-xl mb-16">
            <p className="eyebrow mb-4">Values</p>
            <h2 className="section-headline" style={{ color: "var(--fg)" }}>
              How we think.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                className="p-8 rounded-sm"
                style={{
                  border: "1px solid color-mix(in srgb, var(--fg) 12%, transparent)",
                }}
              >
                <span
                  className="block text-4xl font-black font-[var(--font-display)] mb-6 leading-none"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Team ─────────────────────────────────────────── */}
      <SectionWrapper theme="light" id="team">
        <div className="container-grid">
          <div className="max-w-xl mb-16">
            <p className="eyebrow mb-4">The team</p>
            <h2 className="section-headline" style={{ color: "var(--fg)" }}>
              People behind
              <br />
              the work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={`${member.name}-${idx}`}
                className="card-border rounded-sm p-8"
                aria-label={`Team member: ${member.name}`}
              >
                {/* Avatar */}
                <div
                  className="w-16 h-16 rounded-sm flex items-center justify-center text-xl font-bold mb-6"
                  style={{ backgroundColor: "color-mix(in srgb, var(--fg) 8%, transparent)", color: "var(--fg)" }}
                  aria-hidden="true"
                >
                  {member.initial}
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  {member.name}
                </h3>
                <p className="eyebrow mb-4">{member.role}</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs" style={{ color: "var(--color-accent)" }}>
            ⚠ Team placeholders — replace with real names and bios before publishing
          </p>
        </div>
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="about-cta">
        <div className="container-grid text-center max-w-2xl mx-auto">
          <p className="eyebrow mb-4">Work with us</p>
          <h2 className="section-headline mb-6" style={{ color: "var(--fg)" }}>
            Let&apos;s build
            <br />
            something great.
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" size="lg" id="about-cta-btn">
              Start a Project →
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
