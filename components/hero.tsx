import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Announcement badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">
            Now analyzing 50+ markets nationwide
          </span>
          <ArrowRight className="h-3 w-3 text-muted-foreground" />
        </div>

        {/* Main heading */}
        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl md:leading-tight">
          Real Estate Arbitrage
          <br />
          <span className="text-accent">Made Intelligent</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          Identify undervalued properties, forecast rental yields, and execute
          arbitrage strategies with data-driven precision. Built for investors
          who move fast.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="#cta"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-medium text-accent-foreground transition-opacity hover:opacity-90"
          >
            Request Access
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#product"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
          >
            Explore the Platform
          </Link>
        </div>
      </div>
    </section>
  );
}
