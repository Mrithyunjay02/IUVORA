"use client";

import { useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

/**
 * CardFooter
 *
 * BLUE ACCENT LOCATION 2 OF 2:
 * The single hairline rule separating the body of the card from the footer (#2F7BFF/30).
 * All text is set in Montserrat and strictly neutral monochrome.
 */
interface CardFooterProps {
  borderAccent?: "gold" | "blue" | string;
}

export function CardFooter({ borderAccent }: CardFooterProps) {
  const [qrOpen, setQrOpen] = useState(false);
  const isGold = borderAccent === "gold";

  // Build current card URL on client
  const cardUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <footer className="pt-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* ── HAIRLINE RULE: Dynamic accent (#d9b266 for gold, #2563eb for blue) ── */}
      <div className={`border-t ${isGold ? "border-[#d9b266]/35" : "border-[#2563eb]/30"} pt-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <Link
            href="https://www.iuvora.com"
            target="_blank"
            rel="noopener noreferrer"
            id="card-footer-iuvora"
            className="group flex flex-col items-start gap-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
          >
            <span className="text-[10px] text-zinc-400 font-medium">Powered by</span>
            <span className="text-[12.5px] font-bold tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">
              IUVORA
            </span>
          </Link>

          {/* Show QR fallback toggle with WCAG 2.5.8 compliant touch target */}
          <button
            onClick={() => setQrOpen(!qrOpen)}
            id="card-toggle-qr"
            type="button"
            className="py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors cursor-pointer text-[11.5px] font-medium active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
            aria-expanded={qrOpen}
            aria-controls="card-qr-panel"
          >
            {qrOpen ? "Hide QR" : "Show QR"}
          </button>
        </div>

        {/* QR code panel */}
        {qrOpen && cardUrl && (
          <div
            id="card-qr-panel"
            className="flex flex-col items-center gap-2 py-3 bg-[#141419] rounded-xl border border-white/10 animate-in fade-in duration-150"
          >
            <div className="bg-white p-2.5 rounded-lg">
              <QRCodeSVG
                value={cardUrl}
                size={130}
                level="M"
                bgColor="#FFFFFF"
                fgColor="#070709"
              />
            </div>
            <p className="text-[11px] text-zinc-500 text-center font-medium">
              Scan to open card
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
