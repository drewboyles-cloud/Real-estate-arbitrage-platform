import { BarChart3, Scan, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Market Scanning",
    description:
      "Continuously scan markets to surface properties with the highest arbitrage potential using real-time data feeds and proprietary algorithms.",
  },
  {
    icon: BarChart3,
    title: "Yield Forecasting",
    description:
      "Model rental income, appreciation, and net returns with scenario analysis. Make confident decisions backed by comprehensive financial projections.",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Strategy",
    description:
      "Build and optimize multi-property portfolios with automated rebalancing signals, risk scoring, and performance benchmarking across markets.",
  },
];

export function Features() {
  return (
    <section id="product" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 font-mono text-sm uppercase tracking-widest text-accent">
            Platform
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Every edge, quantified.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            From discovery to execution, Arbor gives you the analytical
            infrastructure to find and act on real estate arbitrage opportunities
            before the market catches up.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col bg-card p-8 md:p-10"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
