"use client";

import { useState } from "react";
import { ScrollThemeProvider } from "@/components/scroll/ScrollThemeProvider";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

const PROJECT_TYPES = [
  "Web Development",
  "App Development",
  "Digital Marketing",
  "IT Services",
  "Multiple services",
  "Not sure yet",
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
    honeypot: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side quick validation
    if (!formData.name.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please enter your message or project requirements.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send your message. Please try again.");
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
        honeypot: "",
      });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong while sending your message. Please try again or email info@iuvora.com directly."
      );
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-sm text-sm bg-transparent border outline-none transition-all duration-200 focus:border-[var(--color-accent)] placeholder:text-[var(--fg-muted)]";
  const inputStyle = {
    borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
    color: "var(--fg)",
  };

  return (
    <>
      <ScrollThemeProvider />

      {/* ── Hero ─────────────────────────────────────────── */}
      <SectionWrapper theme="dark" id="contact-hero" noPad>
        <div
          className="relative flex flex-col justify-center min-h-[50vh] container-grid"
          style={{ paddingTop: "9rem", paddingBottom: "4rem" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, var(--fg) 0, var(--fg) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--fg) 0, var(--fg) 1px, transparent 1px, transparent 80px)",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="hero-headline mb-6" style={{ color: "var(--fg)" }}>
              Let&apos;s talk.
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--fg-muted)", maxWidth: "48ch" }}
            >
              Fill in the form and we&apos;ll get back to you within one
              business day with a clear, no-fluff next step.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ── Form + Info ──────────────────────────────────── */}
      <SectionWrapper theme="light" id="contact-form">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* ── Contact form ──────────────── */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                Tell us about your project
              </h2>

              {status === "sent" ? (
                <div
                  className="p-8 rounded-sm border text-center"
                  style={{
                    borderColor: "var(--color-accent)",
                    backgroundColor: "rgba(47,123,255,0.05)",
                  }}
                  role="alert"
                >
                  <span className="text-4xl block mb-4" aria-hidden="true">✓</span>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                    Message received!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--fg-muted)" }}>
                    Thanks, we&apos;ll get back to you within one business day with clear next steps.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setStatus("idle");
                      setErrorMessage("");
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  {/* Honeypot Spam Protection (hidden from humans) */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <label htmlFor="contact-hp-field">Leave this empty</label>
                    <input
                      id="contact-hp-field"
                      name="honeypot"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Error Notification Banner */}
                  {status === "error" && errorMessage && (
                    <div
                      className="p-4 rounded-sm border text-sm flex items-start gap-3"
                      style={{
                        backgroundColor: "rgba(239, 68, 68, 0.08)",
                        borderColor: "rgba(239, 68, 68, 0.35)",
                        color: "#ef4444",
                      }}
                      role="alert"
                    >
                      <span className="font-bold text-base leading-none">⚠</span>
                      <div className="flex-1">
                        <p className="font-semibold">{errorMessage}</p>
                        <p className="text-xs text-[var(--fg-muted)] mt-1">
                          You can also reach us directly at{" "}
                          <a href="mailto:info@iuvora.com" className="underline font-medium text-[var(--color-accent)]">
                            info@iuvora.com
                          </a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold mb-2 tracking-wide"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputBase}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold mb-2 tracking-wide"
                        style={{ color: "var(--fg-muted)" }}
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputBase}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Project type */}
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-semibold mb-2 tracking-wide"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Project type
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className={inputBase}
                      style={inputStyle}
                    >
                      <option value="">Select a service</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold mb-2 tracking-wide"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us what you're building, what's the problem, and any timeline constraints."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputBase} resize-none`}
                      style={inputStyle}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    id="contact-submit-btn"
                  >
                    {status === "sending" ? "Sending message…" : "Send message →"}
                  </Button>
                </form>
              )}
            </div>

            {/* ── Contact info ──────────────── */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
                Direct channels
              </h2>

              <div className="flex flex-col gap-8">
                {([
                  {
                    label: "Email",
                    value: "info@iuvora.com",
                    href: "mailto:info@iuvora.com",
                  },
                  {
                    label: "Phone",
                    value: "+91 87924 00712",
                    href: "tel:+918792400712",
                  },
                  {
                    label: "Location",
                    value: "IUVORA PVT LIMITED\nWHQ8+5H6, Kuvempu Rd\nMission Compound\nShivamogga, Karnataka 577201",
                    href: "#office-location",
                    actionText: "View on map ↓",
                  },
                ] as Array<{
                  label: string;
                  value: string;
                  href?: string;
                  target?: string;
                  rel?: string;
                  actionText?: string;
                }>).map((info) => (
                  <div
                    key={info.label}
                    className="pb-8 border-b"
                    style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
                  >
                    <p className="eyebrow mb-2">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.target}
                        rel={info.rel}
                        className="text-base font-semibold transition-colors duration-200 hover:text-[var(--color-accent)] no-underline block"
                        style={{ color: "var(--fg)", whiteSpace: "pre-wrap" }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold" style={{ color: "var(--fg)" }}>
                        {info.value}
                      </p>
                    )}
                    {info.actionText && (
                      <a
                        href={info.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-accent)] mt-2.5 hover:underline no-underline"
                      >
                        {info.actionText}
                      </a>
                    )}
                  </div>
                ))}

                {/* Social */}
                <div>
                  <p className="eyebrow mb-4">Follow us</p>
                  <div className="flex gap-4">
                    {[
                      {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/company/aktekdynamics/",
                        icon: "in",
                      },
                      {
                        label: "Instagram",
                        href: "https://www.instagram.com/iuvora_info",
                        icon: "ig",
                      },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 flex items-center justify-center rounded-sm text-xs font-bold border transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] no-underline"
                        style={{
                          borderColor: "color-mix(in srgb, var(--fg) 20%, transparent)",
                          color: "var(--fg-muted)",
                        }}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Live Office Location Map ──────────────── */}
          <div
            id="office-location"
            className="mt-16 pt-12 border-t scroll-mt-24"
            style={{ borderColor: "color-mix(in srgb, var(--fg) 12%, transparent)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <p className="eyebrow mb-2">Our Office</p>
                <h2
                  className="text-2xl font-bold"
                  style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}
                >
                  Visit our headquarters
                </h2>
                <p className="text-sm mt-1" style={{ color: "var(--fg-muted)" }}>
                  WHQ8+5H6, Kuvempu Rd, Mission Compound, Shivamogga, Karnataka 577201
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=IUVORA+PVT+LIMITED+Shivamogga+Karnataka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)] hover:underline underline-offset-4 shrink-0 no-underline"
              >
                <span>Open in Google Maps</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>

            <div
              className="relative w-full h-[360px] sm:h-[450px] rounded-xl overflow-hidden border shadow-sm"
              style={{
                borderColor: "color-mix(in srgb, var(--fg) 15%, transparent)",
                backgroundColor: "color-mix(in srgb, var(--fg) 4%, transparent)",
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3872.3479446994525!2d75.56380997388557!3d13.937876392960654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbba90002c51f61%3A0x15a7621907b41b02!2sIUVORA%20PVT%20LIMITED!5e0!3m2!1sen!2sin!4v1789037847725!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="IUVORA PVT LIMITED Office Location Map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
