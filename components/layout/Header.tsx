"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IuvoraLogo } from "@/components/icons/IuvoraLogo";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

/**
 * Header - Sticky nav that reads --fg/--bg from the live CSS custom props
 * so it naturally inverts with the section theme. No hardcoded colors.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        color: "var(--fg)",
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--bg) 85%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid color-mix(in srgb, var(--fg) 10%, transparent)"
          : "none",
        transition:
          "background-color var(--section-transition-duration) var(--section-transition-easing), border-color var(--section-transition-duration) var(--section-transition-easing), color var(--section-transition-duration) var(--section-transition-easing)",
      }}
    >
      <div className="container-grid">
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" aria-label="Iuvora - Home">
            <IuvoraLogo width={120} priority={true} />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm font-semibold tracking-wide transition-colors duration-200 hover:text-[var(--color-accent)] no-underline"
                    style={{
                      color: isActive ? "var(--color-accent)" : "var(--fg)",
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                        style={{ backgroundColor: "var(--color-accent)" }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button href="/contact" size="sm" id="nav-cta-btn">
              Start a Project
            </Button>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-[5px] p-2 -mr-2"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              id="mobile-menu-toggle"
            >
              <span
                className="block w-5 h-[2px] rounded transition-all duration-300"
                style={{
                  backgroundColor: "var(--fg)",
                  transform: menuOpen
                    ? "translateY(7px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                className="block w-5 h-[2px] rounded transition-all duration-300"
                style={{
                  backgroundColor: "var(--fg)",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[2px] rounded transition-all duration-300"
                style={{
                  backgroundColor: "var(--fg)",
                  transform: menuOpen
                    ? "translateY(-7px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-300 ease-out"
          style={{ maxHeight: menuOpen ? "400px" : "0" }}
        >
          <ul className="flex flex-col gap-2 pb-6 list-none m-0 p-0">
            {NAV_LINKS.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-semibold border-b no-underline transition-colors duration-200"
                    style={{
                      color: isActive ? "var(--color-accent)" : "var(--fg)",
                      borderColor: "color-mix(in srgb, var(--fg) 15%, transparent)",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
