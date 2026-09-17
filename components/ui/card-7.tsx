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
  email?: string;
  linkedin?: string;
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
  email,
  linkedin,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});
  
  const backgroundColors = [
    null, // Default image
    "bg-gradient-to-br from-[#FFD700] via-white to-black", // Yellow, white, black
    "bg-gradient-to-tr from-red-500 via-pink-500 to-blue-600", // Red, pink, blue
    "bg-gradient-to-bl from-indigo-900 via-purple-600 to-pink-500", // Indigo, purple, pink
    "bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-600", // Emerald, cyan, blue
    "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600" // Orange, red, pink
  ];
  const [bgIndex, setBgIndex] = React.useState(0);

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
      {/* Background Layer */}
      {backgroundColors[bgIndex] === null ? (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-110"
          style={{ transform: "translateZ(-20px) scale(1.1)" }}
        />
      ) : (
        <div 
          className={cn(
            "absolute inset-0 h-full w-full rounded-3xl transition-transform duration-300 group-hover:scale-110",
            backgroundColors[bgIndex]
          )} 
          style={{ transform: "translateZ(-20px) scale(1.1)" }}
        />
      )}
      {/* Gradient Overlay - Less dark so the image shows clearly */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 rounded-3xl pointer-events-none" />

      {/* Main Content with 3D effect */}
      <div
        className="absolute inset-0 p-5 flex flex-col pointer-events-none"
        style={{ transform: "translateZ(40px)" }}
      >
        {/* Glassmorphism Header */}
        <div className="flex items-start justify-between rounded-xl border border-white/20 bg-white/20 p-4 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] pointer-events-auto">
          <div className="flex flex-col drop-shadow-md">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-xs text-white/90 font-medium">{description}</p>
          </div>
          {logoIcon ? (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setBgIndex((prev) => (prev + 1) % backgroundColors.length);
              }}
              className="text-white opacity-100 drop-shadow-md cursor-pointer hover:scale-110 transition-transform active:scale-95 z-50 p-1 -m-1"
              aria-label="Change background color"
            >
              {logoIcon}
            </button>
          ) : logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-4 w-auto drop-shadow-md" />
          ) : null}
        </div>

        {/* Price Tag - Absolute position for pixel perfection */}
        {price && (
          <div className="absolute top-[108px] left-5">
            <div className="rounded-full bg-black/40 border border-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md shadow-lg">
              {price}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto w-full pb-2 flex flex-col gap-2.5 pointer-events-auto">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full gap-2 rounded-xl bg-[#0077b5]/90 hover:bg-[#0077b5] border border-white/20 py-3 text-sm font-semibold text-white backdrop-blur-md shadow-lg transition-colors"
            >
              LinkedIn Profile
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="flex items-center justify-center w-full gap-2 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 py-3 text-sm font-semibold text-white backdrop-blur-md shadow-lg transition-colors"
            >
              {email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
