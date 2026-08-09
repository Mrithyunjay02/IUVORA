import React from "react";
import Image from "next/image";

interface IuvoraLogoProps {
  className?: string;
  /** Width in px — height scales proportionally */
  width?: number;
  /** Pass priority=true for above-the-fold instances like Header */
  priority?: boolean;
}

export function IuvoraLogo({ className = "", width = 140, priority = false }: IuvoraLogoProps) {
  // Original aspect ratio of iuvora-logo.png is 1398x435
  const height = Math.round(width * (435 / 1398));

  return (
    <Image
      src="/logo/iuvora-logo.png"
      alt="Iuvora Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
      placeholder="empty"
      style={{ width, height, objectFit: "contain", background: "transparent" }}
    />
  );
}
