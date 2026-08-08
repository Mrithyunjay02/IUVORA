"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  id?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: [
    "bg-[var(--color-accent)] text-white",
    "hover:bg-[var(--color-accent-dim)]",
    // Glow added via CSS class — see globals.css .btn-primary-glow
    "btn-primary-glow",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--bg)]",
  ].join(" "),
  outline: [
    "bg-transparent border border-[var(--fg)] text-[var(--fg)]",
    "hover:bg-[var(--fg)] hover:text-[var(--bg)]",
    // Glow added via CSS class — see globals.css .btn-outline-glow
    "btn-outline-glow",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--bg)]",
  ].join(" "),
  ghost: [
    "bg-transparent text-[var(--fg)]",
    "hover:text-[var(--color-accent)]",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--bg)]",
  ].join(" "),
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  id,
}: ButtonProps) {
  const isMagnetic = variant === "primary" && !disabled;
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    if (!isMagnetic) return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    // Only apply on fine pointers (desktop)
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const btn = buttonRef.current;
    if (!btn) return;

    // GSAP quickTo using Tailwind's transform variables to avoid clashing with hover:scale
    const xTo = gsap.quickTo(btn, "--tw-translate-x", { duration: 0.8, ease: "elastic.out(1, 0.3)", unit: "px" });
    const yTo = gsap.quickTo(btn, "--tw-translate-y", { duration: 0.8, ease: "elastic.out(1, 0.3)", unit: "px" });

    // Lock the bounding box when the mouse enters the radius to prevent vibration feedback loops
    let restingRect: DOMRect | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!restingRect) {
        // Only sample rect when resting to prevent reading moving coordinates
        restingRect = btn.getBoundingClientRect();
      }

      const { clientX, clientY } = e;
      const { left, top, width, height } = restingRect!;
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Pull radius: ~80px beyond boundaries
      const maxPullRadius = Math.max(width, height) / 2 + 80;
      
      if (distance < maxPullRadius) {
        xTo(distanceX * 0.15);
        yTo(distanceY * 0.15);
      } else {
        // Outside radius, release and reset the lock
        xTo(0);
        yTo(0);
        restingRect = null;
      }
    };

    const handleScroll = () => {
      // Invalidate the resting rect if the user scrolls
      restingRect = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMagnetic]);

  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold font-[var(--font-display)]",
    "rounded-sm",
    "transition-all duration-200 ease-out",
    "transform", // Required to ensure --tw-translate variables are applied
    // 9.5 — hover polish: subtle scale lift + press-down on click
    "hover:scale-[1.02] active:scale-[0.97]",
    "cursor-pointer select-none",
    "no-underline",
    disabled ? "opacity-50 pointer-events-none" : "",
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={base} id={id} ref={buttonRef}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={base}
      disabled={disabled}
      id={id}
      ref={buttonRef}
    >
      {children}
    </button>
  );
}
