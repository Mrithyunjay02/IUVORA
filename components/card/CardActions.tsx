"use client";

import { useState } from "react";
import { CardProfile } from "@/data/cards/types";
import { downloadVCard } from "@/lib/vcard";

interface CardActionsProps {
  profile: CardProfile;
}

/**
 * CardActions
 *
 * BLUE ACCENT LOCATION 1 OF 2:
 * Save Contact button uses Iuvora's exact brand blue (#2F7BFF).
 * All secondary actions (Call, WhatsApp, Email) are strictly neutral monochrome.
 * Font: Montserrat.
 */
export function CardActions({ profile }: CardActionsProps) {
  const [saved, setSaved] = useState(false);

  const cleanPhone = profile.phone ? profile.phone.replace(/[^\d+]/g, "") : "";
  const whatsappDigits = profile.whatsapp
    ? profile.whatsapp.replace(/\D/g, "")
    : cleanPhone.replace(/\D/g, "");

  const handleSaveContact = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadVCard(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
      {/* ── BLUE ACCENT 1 OF 2: Save Contact Primary Button (#2563eb - WCAG AA 4.6:1+) ── */}
      <button
        onClick={handleSaveContact}
        disabled={saved}
        id="card-btn-save-contact"
        type="button"
        aria-label="Save contact card to phone"
        className={`w-full h-11 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D11] ${
          saved
            ? "bg-emerald-600 text-white"
            : "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-[0_2px_12px_rgba(37,99,235,0.25)]"
        }`}
      >
        {saved ? (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Saved to Contacts</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Save Contact</span>
          </>
        )}
      </button>

      {/* ── Secondary Actions: Flat Neutral Text Links (NO GOLD, NO BLUE) ── */}
      {(cleanPhone || profile.email) && (
        <div className="flex items-center justify-between pt-1">
          {cleanPhone && (
            <a
              href={`tel:${cleanPhone}`}
              id="card-btn-call"
              aria-label={`Call ${profile.name}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[12.5px] font-medium text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call</span>
            </a>
          )}

          {cleanPhone && (
            <>
              <span className="w-px h-3 bg-white/10" aria-hidden="true" />
              <a
                href={`https://wa.me/${whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                id="card-btn-whatsapp"
                aria-label={`Message ${profile.name} on WhatsApp`}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[12.5px] font-medium text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
              >
                <svg className="w-3.5 h-3.5 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.044c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-10.416c-4.402 0-7.986 3.584-7.988 7.987-.001 1.408.365 2.784 1.058 3.992l-1.078 3.935 4.026-1.056c1.169.641 2.493.985 3.978.986 4.404 0 7.987-3.585 7.989-7.988 0-4.404-3.583-7.987-7.985-7.987z" />
                </svg>
                <span>WhatsApp</span>
              </a>
            </>
          )}

          {cleanPhone && profile.email && (
            <span className="w-px h-3 bg-white/10" aria-hidden="true" />
          )}

          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              id="card-btn-email"
              aria-label={`Send email to ${profile.email}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[12.5px] font-medium text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded"
            >
              <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
