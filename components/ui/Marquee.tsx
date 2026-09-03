/**
 * Capabilities marquee strip — Section 9.2
 *
 * Pure CSS-animated horizontal ticker. Placed between ServicesOverview (light)
 * and Process (dark) as a visual rhythm break. Hardcoded dark styling so it
 * reads correctly regardless of which --bg is currently active.
 *
 * - Two identical copies of the text track placed side-by-side.
 * - CSS translateX(-50%) lands exactly where copy-2 begins → seamless loop.
 * - Pauses on :hover (see globals.css).
 * - Pauses for prefers-reduced-motion (see globals.css).
 * - Sits at z-index: 2 so it stays above the clip-path overlay layer (z-index: 1).
 */

const CAPABILITIES = [
  "WEB DEVELOPMENT",
  "APP DEVELOPMENT",
  "DIGITAL MARKETING",
  "IT SERVICES",
];

// Single pass of text: "WEB DEVELOPMENT — APP DEVELOPMENT — DIGITAL MARKETING — IT SERVICES — "
const TRACK = CAPABILITIES.join("\u00A0\u00A0—\u00A0\u00A0") + "\u00A0\u00A0—\u00A0\u00A0";

export function Marquee() {
  return (
    <div
      role="presentation"
      style={{
        position: "relative",
        zIndex: 2,
        overflow: "hidden",
        backgroundColor: "var(--color-black)",
        borderTop: "1px solid rgba(250,250,250,0.07)",
        borderBottom: "1px solid rgba(250,250,250,0.07)",
        paddingBlock: "1.125rem",
        userSelect: "none",
      }}
    >
      {/* Edge fade gradients for premium look */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(to right, var(--color-black) 0%, transparent 15%, transparent 85%, var(--color-black) 100%)",
          zIndex: 10,
        }}
      />
      {/*
       * .marquee-track is defined in globals.css:
       *   animation: marquee-scroll 35s linear infinite
       * Two copies of TRACK inside — when first copy exits left, the second
       * is already in the exact same visual position. translateX(-50%) = one full copy.
       */}
      <div className="marquee-track" aria-hidden="true">
        <span style={trackStyle}>{TRACK}</span>
        <span style={trackStyle}>{TRACK}</span>
        <span style={trackStyle}>{TRACK}</span>
        <span style={trackStyle}>{TRACK}</span>
      </div>

      {/* Accessible label for screen readers */}
      <span className="sr-only">
        Services: {CAPABILITIES.join(", ")}
      </span>
    </div>
  );
}

const trackStyle: React.CSSProperties = {
  display: "inline-block",
  whiteSpace: "nowrap",
  fontFamily: "var(--font-display), 'Inter Tight', sans-serif",
  fontSize: "clamp(0.6rem, 1vw, 0.72rem)",
  fontWeight: 700,
  letterSpacing: "0.2em",
  color: "var(--color-white)",
  // Padding between repeated cycles
  paddingRight: "2rem",
};
