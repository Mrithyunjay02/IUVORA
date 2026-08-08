/**
 * GrainOverlay
 *
 * Fixed full-viewport div with an inline SVG feTurbulence noise texture.
 * Rendered once in the root layout — not re-rendered anywhere else.
 *
 * Properties:
 * - position: fixed, inset: 0 — covers the entire viewport always
 * - pointer-events: none — completely invisible to interaction
 * - mix-blend-mode: overlay — blends with the background beneath
 * - opacity: 0.03 (3%) — barely perceptible, adds texture without muddying
 * - z-index: 9998 — above content but below the custom cursor (9999)
 *
 * The SVG filter is inlined so no external file request is needed.
 * feTurbulence baseFrequency controls grain density; 0.65 is a fine grain.
 * numOctaves: 4 gives a natural, film-like texture.
 *
 * This is a Server Component (no "use client") — rendered on the server
 * as pure static HTML, zero JS cost.
 */
export function GrainOverlay() {
  return (
    <>
      {/* Inline SVG filter definition — hidden, zero size */}
      <svg
        aria-hidden="true"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter id="grain-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves={4}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* The visible overlay — applies the filter as a background */}
      <div
        aria-hidden="true"
        id="grain-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: "none",
          opacity: 0.03,
          mixBlendMode: "overlay",
          // Apply the SVG filter as a background image
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          // No animation — static texture, not animated noise
          // (animated noise would cost GPU and distract from content)
          willChange: "auto",
        }}
      />
    </>
  );
}
