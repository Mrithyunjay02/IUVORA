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
export function CardFooter() {
  const [qrOpen, setQrOpen] = useState(false);

  // Build current card URL on client
  const cardUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <footer className="pt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      {/* ── BLUE ACCENT 2 OF 2: Single Hairline Rule (#2F7BFF) ── */}
      <div className="border-t border-[#2F7BFF]/30 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <Link
            href="https://www.iuvora.com"
            target="_blank"
            rel="noopener noreferrer"
            id="card-footer-iuvora"
            className="group flex flex-col items-start gap-0.5 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[10px] text-zinc-500 font-medium">Powered by</span>
            <span className="text-[12.5px] font-bold tracking-[0.2em] uppercase text-zinc-300 group-hover:text-white transition-colors">
              IUVORA
            </span>
          </Link>

          {/* Show QR fallback toggle (Neutral text link) */}
          <button
            onClick={() => setQrOpen(!qrOpen)}
            id="card-toggle-qr"
            type="button"
            className="text-[11.5px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer bg-transparent border-0 p-0"
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
