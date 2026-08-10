import Link from "next/link";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";
import { SERVICES } from "@/lib/constants";

/**
 * Footer — Always dark. Outside the scroll-invert cycle.
 * Uses hardcoded dark palette, not --bg/--fg vars.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full section-pad"
      style={{
        backgroundColor: "var(--color-black)",
        color: "var(--color-white)",
        borderTop: "1px solid rgba(250,250,250,0.08)",
      }}
    >
      <div className="container-grid">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" aria-label="Iuvora — Home">
              <IuvoraLogo width={120} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--color-gray-mid)", maxWidth: "28ch" }}>
              Web development, app development, digital marketing, and IT services — end to end.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-6">
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
                  className="w-9 h-9 flex items-center justify-center rounded-sm text-xs font-bold border transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] no-underline"
                  style={{
                    borderColor: "rgba(250,250,250,0.2)",
                    color: "var(--color-gray-mid)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "var(--color-accent)" }}>
              Services
            </h3>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                    style={{ color: "var(--color-gray-mid)" }}
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "var(--color-accent)" }}>
              Company
            </h3>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Start a Project", href: "/contact" },
              ].map((l, idx) => (
                <li key={`${l.href}-${idx}`}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                    style={{ color: "var(--color-gray-mid)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: "var(--color-accent)" }}>
              Get in touch
            </h3>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              <li>
                <a
                  href="mailto:info@iuvora.com"
                  className="text-sm transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                  style={{ color: "var(--color-gray-mid)" }}
                >
                  info@iuvora.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918792400712"
                  className="text-sm transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                  style={{ color: "var(--color-gray-mid)" }}
                >
                  +91 87924 00712
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8">
          <p className="text-xs" style={{ color: "var(--color-gray-mid)" }}>
            © {currentYear} Iuvora. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-xs transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                style={{ color: "var(--color-gray-mid)" }}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
