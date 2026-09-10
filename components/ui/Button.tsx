"use client";

import React from "react";
import Link from "next/link";

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
    // Glow added via CSS class - see globals.css .btn-primary-glow
    "btn-primary-glow",
    "focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
    "focus-visible:ring-offset-[var(--bg)]",
  ].join(" "),
  outline: [
    "bg-transparent border border-[var(--fg)] text-[var(--fg)]",
    "hover:bg-[var(--fg)] hover:text-[var(--bg)]",
    // Glow added via CSS class - see globals.css .btn-outline-glow
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
  const base = [
    "inline-flex items-center justify-center gap-2",
    "font-semibold font-[var(--font-display)]",
    "rounded-sm",
    "transition-all duration-150 cubic-bezier(0.16, 1, 0.3, 1)",
    "transform", // Required to ensure --tw-translate variables are applied
    // Hover: lift + glow intensify
    "hover:scale-[1.02] hover:shadow-lg",
    // Active: press-down + visual feedback
    "active:scale-[0.96] active:translate-y-[1px]",
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
      <Link href={href} className={base} id={id}>
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
    >
      {children}
    </button>
  );
}
