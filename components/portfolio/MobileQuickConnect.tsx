"use client";

import React, { useState } from "react";
import { Phone, Mail, MessageSquare, Download, Check, X, UserPlus } from "lucide-react";
import { downloadVCard, ContactProfile } from "@/lib/vcard";

const MRITHYUNJAY_PROFILE: ContactProfile = {
  name: "D K Mrithyunjay",
  title: "Founder & Director",
  company: "Iuvora",
  phone: "+91 87924 00712",
  email: "info@iuvora.com",
  website: "https://iuvora.com",
  location: "Shivamogga, Karnataka",
  oneLineBio: "Founder & Director at Iuvora · Modern Web & Mobile Systems",
  slug: "mrithyunjay-iuvora",
};

export default function MobileQuickConnect() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveContact = () => {
    downloadVCard(MRITHYUNJAY_PROFILE);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isMinimized) {
    return (
      <aside
        aria-label="Quick Connect Toggle"
        className="fixed bottom-[max(1rem,env(safe-area-inset-bottom,1rem))] right-4 z-40 lg:hidden"
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xl border border-white/20 dark:border-black/20 text-xs font-medium tracking-wide active:scale-95 transition-transform"
          aria-label="Open quick connect menu"
        >
          <UserPlus className="w-3.5 h-3.5 text-[#3b82f6] dark:text-[#2563eb]" />
          <span>Connect</span>
        </button>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Quick contact actions for NFC visitors"
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40 lg:hidden transition-all duration-300"
    >
      <div className="relative rounded-2xl bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.7)] p-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
              D K Mrithyunjay
            </span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-300 truncate">
              · Iuvora
            </span>
          </div>

          <button
            onClick={() => setIsMinimized(true)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            title="Minimize bar"
            aria-label="Minimize quick connect bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-4 gap-2">
          {/* Call */}
          <a
            href="tel:+918792400712"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 dark:hover:bg-[#60a5fa]/10 transition-all text-zinc-800 dark:text-zinc-200 active:scale-95"
            aria-label="Call +91 87924 00712"
          >
            <div className="w-7 h-7 rounded-full bg-[#3b82f6]/10 dark:bg-[#60a5fa]/15 flex items-center justify-center mb-1 text-[#3b82f6] dark:text-[#60a5fa]">
              <Phone className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium tracking-tight">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/918792400712?text=Hi%20Mrithyunjay%2C%20I%20reviewed%20your%20Iuvora%20portfolio..."
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 dark:hover:bg-emerald-500/15 transition-all text-zinc-800 dark:text-zinc-200 active:scale-95"
            aria-label="Message on WhatsApp"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mb-1 text-emerald-600 dark:text-emerald-400">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium tracking-tight">WhatsApp</span>
          </a>

          {/* Email */}
          <a
            href="mailto:info@iuvora.com?subject=Inquiry%20from%20Iuvora%20Portfolio"
            className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 hover:border-[#3b82f6]/40 hover:bg-[#3b82f6]/10 dark:hover:bg-[#60a5fa]/10 transition-all text-zinc-800 dark:text-zinc-200 active:scale-95"
            aria-label="Send direct email to info@iuvora.com"
          >
            <div className="w-7 h-7 rounded-full bg-[#3b82f6]/10 dark:bg-[#60a5fa]/15 flex items-center justify-center mb-1 text-[#3b82f6] dark:text-[#60a5fa]">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium tracking-tight">Email</span>
          </a>

          {/* Save Contact */}
          <button
            onClick={handleSaveContact}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border transition-all active:scale-95 cursor-pointer ${
              saved
                ? "bg-emerald-500 text-white border-emerald-500 shadow-md"
                : "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-black/10 dark:border-white/10 hover:opacity-90"
            }`}
            aria-label="Download and save contact to phonebook"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1">
              {saved ? (
                <Check className="w-4 h-4 text-white" />
              ) : (
                <Download className="w-3.5 h-3.5 text-white dark:text-zinc-900" />
              )}
            </div>
            <span className="text-[10px] font-medium tracking-tight">
              {saved ? "Saved" : "Save VCF"}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
