import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-[75vh] md:min-h-[85vh] text-center container-grid overflow-hidden"
      style={{ paddingTop: "8rem", paddingBottom: "6rem" }}
      aria-label="404 - Page not found"
    >
      {/* Background grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(90deg, var(--color-white) 0, var(--color-white) 1px, transparent 1px, transparent 80px)",
        }}
      />

      {/* Radial blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: "clamp(300px, 40vw, 550px)",
          height: "clamp(300px, 40vw, 550px)",
          background: "radial-gradient(circle, rgba(47,123,255,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        <p className="eyebrow mb-4">404 Error</p>

        <h1
          className="hero-headline mb-6"
          style={{ color: "var(--color-white)" }}
        >
          Page not found.
        </h1>

        <p
          className="text-base md:text-lg mb-10 leading-relaxed"
          style={{ color: "var(--color-gray-mid)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist, was removed, or had
          its URL changed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/" size="lg" id="not-found-home-btn">
            Back to homepage →
          </Button>
          <Button href="/contact" size="lg" variant="outline" id="not-found-contact-btn">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
