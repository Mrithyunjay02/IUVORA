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
          : "Something went wrong while sending your message. Please try again or email hello@iuvora.com directly."
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
                "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
            }}
          />
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="hero-headline mb-6" style={{ color: "var(--color-white)" }}>
              Let&apos;s talk.
            </h1>
            <p
              className="text-lg leading-relaxed"
              style={{ color: "var(--color-gray-mid)", maxWidth: "48ch" }}
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
                          <a href="mailto:hello@iuvora.com" className="underline font-medium text-[var(--color-accent)]">
                            hello@iuvora.com
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
                {[
                  {
                    label: "Email",
                    value: "hello@iuvora.com",
                    href: "mailto:hello@iuvora.com",
                  },
                  {
                    label: "Phone",
                    value: "[PLACEHOLDER — add phone number]",
                    href: "#",
                  },
                  {
                    label: "Location",
                    value: "[PLACEHOLDER — City, Country]",
                    href: null,
                  },
                ].map((info) => (
                  <div
                    key={info.label}
                    className="pb-8 border-b"
                    style={{ borderColor: "color-mix(in srgb, var(--fg) 10%, transparent)" }}
                  >
                    <p className="eyebrow mb-2">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-base font-semibold transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                        style={{ color: "var(--fg)" }}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-base font-semibold" style={{ color: "var(--fg)" }}>
                        {info.value}
                      </p>
                    )}
                  </div>
                ))}

                {/* Social */}
                <div>
                  <p className="eyebrow mb-4">Follow us</p>
                  <div className="flex gap-4">
                    {[
                      { label: "LinkedIn", href: "#", icon: "in" },
                      { label: "X / Twitter", href: "#", icon: "𝕏" },
                      { label: "Instagram", href: "#", icon: "ig" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
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
        </div>
      </SectionWrapper>
    </>
  );
}
