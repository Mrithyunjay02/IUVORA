"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  deterministic?: boolean;
}

export default function BackButton({
  href = "/#gallery",
  label = "Back to Works Archive",
  className = "",
  deterministic = true,
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!deterministic) {
      e.preventDefault();
      router.back();
    }
  };

  const buttonClasses = `inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 text-xs font-semibold tracking-wide text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all duration-300 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] ${className}`;

  if (!deterministic) {
    return (
      <button
        onClick={handleBack}
        className={buttonClasses}
        aria-label={label}
      >
        <ArrowLeft className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:-translate-x-1 transition-transform duration-200" />
        <span>{label}</span>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={buttonClasses}
      aria-label={label}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white group-hover:-translate-x-1 transition-transform duration-200" />
      <span>{label}</span>
    </Link>
  );
}
