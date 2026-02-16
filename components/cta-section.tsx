import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-8 py-16 text-center md:px-16 md:py-24">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-accent">
              Get Early Access
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Start finding opportunities
              <br />
              the market overlooks.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Join a growing community of data-driven investors using Arbor to
              gain an edge in real estate markets across the country.
            </p>
            <div className="mt-10">
              <Link
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
              >
                Request Access
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
