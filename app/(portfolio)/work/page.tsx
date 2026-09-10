import React from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Capabilities from "@/components/portfolio/Capabilities";
import EditorialMetrics from "@/components/portfolio/EditorialMetrics";
import MinimalDeliveryProcess from "@/components/portfolio/MinimalDeliveryProcess";
import Footer from "@/components/portfolio/Footer";
import MobileQuickConnect from "@/components/portfolio/MobileQuickConnect";

export default function WorkPage() {
  return (
    <main id="main-content" className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col transition-colors duration-200">
      <Navbar />
      <Hero />
      <Capabilities />
      <EditorialMetrics />
      <MinimalDeliveryProcess />
      <Footer />
      <MobileQuickConnect />
    </main>
  );
}
