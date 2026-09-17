import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

// Interface for individual process card props
export interface ProcessCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}

// Reusable Process Card Component
export const ProcessCard: React.FC<ProcessCardProps> = ({ icon: Icon, title, description, className }) => (
  <div
    className={cn(
      "group relative w-full rounded-2xl border bg-black/[0.02] dark:bg-white/[0.03] p-6 sm:p-8 flex flex-col transition-all cursor-pointer duration-300 hover:border-[#3b82f6]/50 hover:shadow-lg",
      className
    )}
    style={{ borderColor: "color-mix(in srgb, var(--fg) 8%, transparent)" }}
  >
    {/* Decorative Line - Visible on larger screens */}
    <div className="absolute -left-[1px] top-1/2 hidden h-1/2 w-px -translate-y-1/2 bg-black/10 dark:bg-white/10 transition-colors group-hover:bg-[#3b82f6]/60 md:block" />
    <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-black/10 dark:bg-white/10 transition-colors group-hover:bg-[#3b82f6]/60 md:hidden" />

    {/* Icon Container */}
    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl duration-300 border bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-[var(--fg)] shadow-sm transition-colors group-hover:bg-zinc-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-zinc-900 group-hover:border-transparent">
      <Icon className="h-5 w-5" />
    </div>

    {/* Content */}
    <div className="flex flex-col">
      <h3 className="mb-2 text-xl font-bold tracking-tight" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
        {description}
      </p>
    </div>
  </div>
);

// Interface for the main section props
export interface ProcessSectionProps {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  items: ProcessCardProps[];
}

// Main Process Section Component
export const ProcessSection: React.FC<ProcessSectionProps> = ({
  subtitle,
  title,
  description,
  buttonText,
  items,
}) => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="portfolio-container grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="flex flex-col items-start justify-center text-center md:col-span-1 md:text-left">
          <span className="mb-4 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {subtitle}
          </span>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl" style={{ color: "var(--fg)", fontFamily: "var(--font-display)" }}>
            {title}
          </h2>
          <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            {description}
          </p>
          <Button size="lg" className="hover:scale-105 duration-300 transition-all cursor-pointer bg-[#2563eb] text-white hover:bg-[#1d4ed8] rounded-xl shadow-[0_4px_25px_rgba(37,99,235,0.3)] border-0">
            {buttonText}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Right Content - Grid of Process Cards */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 md:col-span-2">
          {items.map((item, index) => (
            <ProcessCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};
