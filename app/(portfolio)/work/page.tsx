import React from "react";
import { Header } from "@/components/layout/Header";
import Hero from "@/components/portfolio/Hero";
import { PortfolioGallery } from "@/components/ui/portfolio-gallery";
import EditorialMetrics from "@/components/portfolio/EditorialMetrics";
import MinimalDeliveryProcess from "@/components/portfolio/MinimalDeliveryProcess";
import Footer from "@/components/portfolio/Footer";
import MobileQuickConnect from "@/components/portfolio/MobileQuickConnect";

export default function WorkPage() {
  return (
    <main id="main-content" className="relative min-h-screen bg-[var(--bg)] text-[var(--fg)] flex flex-col transition-colors duration-200 hero-radial-glow">
      <Header navLinks={[{ label: "Work", href: "/work" }, { label: "Inquire", href: "/contact" }]} />
      <Hero />
      <PortfolioGallery />
      <EditorialMetrics />
      <MinimalDeliveryProcess />
      <Footer />
      <MobileQuickConnect />
    </main>
  );
}
