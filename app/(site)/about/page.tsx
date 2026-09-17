import type { Metadata } from "next";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Iuvora - our founding story, mission, and the team behind the work.",
  openGraph: {
    title: "About | Iuvora",
    description: "The team, mission, and story behind Iuvora.",
    url: "https://www.iuvora.com/about",
  },
  alternates: {
    canonical: "https://www.iuvora.com/about",
  },
};

const TEAM_MEMBERS = [
  {
    name: "Kandiga Akshay Kumar",
    role: "Founder, Iuvora & Daynit Enterprises",
    location: "Shimoga, Karnataka",
    bio: "Computer Science graduate leading development across Iuvora's web and app projects.",
    initial: "K",
    isFounder: true,
  },
  {
    name: "Nitish Jogi",
    role: (
      <>
        Product Designer &middot;{" "}
        <a href="https://www.iuvora.com/work" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Iuvora
        </a>
      </>
    ),
    location: "India",
    bio: "Product Designer at Iuvora · Crafting modern digital interfaces and visual brand experiences.",
    initial: "N",
    isFounder: false,
  },
];

const VALUES = [
  {
    title: "Clarity over cleverness",
    description:
      "We communicate plainly - in proposals, in code comments, and in client meetings.",
  },
  {
    title: "Craft in the details",
    description:
      "Performance budgets, accessibility audits, responsive edge cases - we care about the full picture.",
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
                Iuvora started as a group of friends who kept ending up on the same side of every project - one of us building the product, another shaping how it looked and felt, another figuring out how to get it in front of people. We noticed we worked better together than apart, and that the skills we&apos;d each been building separately - development, design, marketing - covered exactly what small businesses and startups actually need but rarely find under one roof.
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                We&apos;re a small team, which is deliberate. It means no handoffs between departments that don&apos;t talk to each other, no work getting diluted across five layers of account managers. Whether it&apos;s a website, an app, a marketing push, or the IT groundwork behind it, the same people who understand your project from day one are the ones building it through to launch.
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={`${member.name}-${idx}`}
                className={`relative rounded-sm p-8 transition-all duration-300 border ${
                  member.isFounder
                    ? "bg-[#0a0a0a] hover:border-[rgba(201,162,39,0.6)] hover:shadow-[0_0_24px_rgba(201,162,39,0.15)]"
                    : "bg-white dark:bg-black/[0.02] hover:border-[var(--color-accent)]/50 shadow-sm"
                }`}
                style={{
                  borderColor: member.isFounder
                    ? "rgba(201,162,39,0.28)"
                    : "color-mix(in srgb, var(--fg) 10%, transparent)",
                }}
                aria-label={`Team member: ${member.name}`}
              >
                {/* Top Row: Avatar + Featured Badge */}
                <div className="flex items-start justify-between mb-6">
                  {/* Avatar */}
                  <div
                    className="w-16 h-16 rounded-sm flex items-center justify-center text-xl font-bold"
                    style={
                      member.isFounder
                        ? {
                            backgroundColor: "rgba(201,162,39,0.12)",
                            border: "1px solid rgba(201,162,39,0.35)",
                            color: "#C9A227",
                          }
                        : {
                            backgroundColor: "color-mix(in srgb, var(--fg) 5%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--fg) 10%, transparent)",
                            color: "var(--fg)",
                          }
                    }
                    aria-hidden="true"
                  >
                    {member.initial}
                  </div>

                  {/* Featured Badge */}
                  {member.isFounder && (
                    <span
                      className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm flex items-center gap-1.5"
                      style={{
                        backgroundColor: "rgba(18,15,8,0.88)",
                        border: "1px solid rgba(201,162,39,0.55)",
                        color: "#C9A227",
                        backdropFilter: "blur(6px)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "#C9A227" }}
                      />
                      Featured
                    </span>
                  )}
                </div>

                <h3
                  className={`text-lg font-bold mb-1 ${member.isFounder ? "text-white" : ""}`}
                  style={{ fontFamily: "var(--font-display)", color: member.isFounder ? undefined : "var(--fg)" }}
                >
                  {member.name}
                </h3>
                <p className="eyebrow mb-2" style={{ color: member.isFounder ? "#C9A227" : "var(--color-accent)" }}>
                  {member.role}
                </p>
                {member.location && (
                  <p className="text-xs mb-4 font-medium tracking-wide uppercase" style={{ color: member.isFounder ? "rgba(255,255,255,0.4)" : "var(--fg-muted)" }}>
                    {member.location}
                  </p>
                )}
                <p className="text-sm leading-relaxed" style={{ color: member.isFounder ? "rgba(255,255,255,0.72)" : "var(--fg-muted)" }}>
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── CTA ──────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="about-cta">
        <div className="container-grid">
          <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
            <p className="eyebrow mb-4 text-center">Work with us</p>
            <h2 className="section-headline mb-6 text-center w-full" style={{ color: "var(--fg)" }}>
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
        </div>
      </SectionWrapper>
    </>
  );
}
