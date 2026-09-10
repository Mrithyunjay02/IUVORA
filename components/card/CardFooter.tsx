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
      {/* ── HAIRLINE RULE: Dynamic accent ── */}
      <div className={`border-t ${isGold ? "dark:border-[#d9b266]/35 light:border-[#b48c3c]/30" : "dark:border-[#2563eb]/30 light:border-[#2563eb]/25"} pt-4 space-y-3`}>
        <div className="flex items-center justify-between">
          <Link
            href="https://www.iuvora.com"
            target="_blank"
            rel="noopener noreferrer"
            id="card-footer-iuvora"
            className="group flex flex-col items-start gap-0.5 focus-visible:outline-none focus-visible:ring-1 dark:focus-visible:ring-white/30 light:focus-visible:ring-black/20 rounded"
          >
            <span className="text-[10px] dark:text-zinc-400 light:text-zinc-500 font-medium">Powered by</span>
            <span className="text-[12.5px] font-bold tracking-[0.2em] uppercase dark:text-zinc-300 light:text-zinc-600 dark:group-hover:text-white light:group-hover:text-black transition-colors">
              IUVORA
            </span>
          </Link>

          {/* QR toggle — WCAG 2.5.8 compliant touch target */}
          <button
            onClick={() => setQrOpen(!qrOpen)}
            id="card-toggle-qr"
            type="button"
            className="py-1.5 px-3 rounded-lg dark:bg-white/[0.04] light:bg-black/[0.04] dark:hover:bg-white/[0.08] light:hover:bg-black/[0.07] border dark:border-white/[0.08] light:border-black/[0.08] dark:text-zinc-300 light:text-zinc-600 dark:hover:text-white light:hover:text-black transition-colors cursor-pointer text-[11.5px] font-medium active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
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
            className="flex flex-col items-center gap-2 py-3 dark:bg-[#141419] light:bg-[#EEECE8] rounded-xl border dark:border-white/10 light:border-black/10 animate-in fade-in duration-150"
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
            <p className="text-[11px] dark:text-zinc-500 light:text-zinc-400 text-center font-medium">
              Scan to open card
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
