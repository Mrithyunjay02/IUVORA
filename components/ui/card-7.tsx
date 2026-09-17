"use client"; // Required for state and event handlers

import * as React from "react";
import { cn } from "@/lib/utils";

// --- PROPS INTERFACE ---
interface InteractiveProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  logoUrl?: string;
  logoIcon?: React.ReactNode;
  title: string;
  description: string;
  price?: string;
}

// --- COMPONENT DEFINITION ---
export function InteractiveProductCard({
  className,
  imageUrl,
  logoUrl,
  logoIcon,
  title,
  description,
  price,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  // --- MOUSE MOVE HANDLER ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rotateX = (y - height / 2) / (height / 2) * -8; // Max rotation 8deg
    const rotateY = (x - width / 2) / (width / 2) * 8;   // Max rotation 8deg

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    });
  };

  // --- MOUSE LEAVE HANDLER ---
  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  // --- DEVICE ORIENTATION HANDLER (GYROSCOPE) ---
  React.useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // e.beta: front-to-back tilt (-180 to 180)
      // e.gamma: left-to-right tilt (-90 to 90)
      if (e.beta === null || e.gamma === null) return;

      // Assuming the user holds the phone at roughly a 45-degree angle
      // Normalize beta around 45 degrees
      let normalizedBeta = e.beta - 45;
      
      // Clamp values between -20 and 20 degrees for a subtle effect
      const beta = Math.max(-20, Math.min(20, normalizedBeta));
      const gamma = Math.max(-20, Math.min(20, e.gamma));

      // Calculate rotation
      const rotateX = beta * -0.5; // Max 10deg rotation
      const rotateY = gamma * 0.5;  // Max 10deg rotation

      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      });
    };

    if (typeof window !== "undefined" && window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn(
        "relative w-full max-w-[340px] aspect-[9/12] rounded-3xl bg-card shadow-lg",
        "[transform-style:preserve-3d]", // Enables 3D transformations for children
        className
      )}
      {...props}
    >
      {/* Background Image - scales slightly to avoid showing edges on tilt */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-110"
        style={{ transform: "translateZ(-20px) scale(1.1)" }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 rounded-3xl" />

      {/* Main Content with 3D effect */}
      <div
        className="absolute inset-0 p-5 flex flex-col"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Glassmorphism Header */}
        <div className="flex items-start justify-between rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-xs text-white/80">{description}</p>
          </div>
          {logoIcon ? (
            <div className="text-white opacity-90">{logoIcon}</div>
          ) : logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-4 w-auto" />
          ) : null}
        </div>

        {/* Price Tag - Absolute position for pixel perfection */}
        {price && (
          <div className="absolute top-[108px] left-5">
            <div className="rounded-full bg-black/50 border border-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              {price}
            </div>
          </div>
        )}

        {/* Action Button - Replaced Pagination Dots */}
        <div className="mt-auto w-full pb-2">
          <a
            href="mailto:nitishjogiwork@gmail.com"
            className="flex items-center justify-center w-full gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors"
          >
            Contact Nitish
          </a>
        </div>
      </div>
    </div>
  );
}
