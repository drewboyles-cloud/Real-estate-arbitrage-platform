"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp, Building2, Zap } from "lucide-react"

const markets = [
  {
    rank: 1,
    city: "Austin",
    region: "TX",
    score: 78,
    tags: ["OZ Density", "Growth", "Infrastructure"],
  },
  {
    rank: 2,
    city: "Charlotte",
    region: "NC",
    score: 72,
    tags: ["Growth", "Tax Friendly", "Infrastructure"],
  },
  {
    rank: 3,
    city: "Raleigh",
    region: "NC",
    score: 68,
    tags: ["OZ Density", "Tech Hub", "Infrastructure"],
  },
  {
    rank: 4,
    city: "Nashville",
    region: "TN",
    score: 65,
    tags: ["Growth", "Tax Friendly", "Population Influx"],
  },
  {
    rank: 5,
    city: "Phoenix",
    region: "AZ",
    score: 62,
    tags: ["OZ Density", "Growth", "Affordability"],
  },
  {
    rank: 6,
    city: "Tampa",
    region: "FL",
    score: 59,
    tags: ["Tax Friendly", "Growth", "Infrastructure"],
  },
]

export default function TopMarkets() {
  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Top Markets for Your Profile
          </h1>
          <p className="text-lg text-muted-foreground">Ranked by Arbitrage Score™</p>
        </div>

        {/* Markets List */}
        <div className="mb-8 space-y-3">
          {markets.map((market) => (
            <div
              key={market.rank}
              className="group flex items-center gap-4 rounded-lg border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/40 hover:shadow-md sm:gap-6 sm:p-6"
            >
              {/* Rank */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-lg font-bold text-foreground">
                {market.rank}
              </div>

              {/* Market Info */}
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-baseline gap-2">
                  <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                    {market.city}
                    <span className="ml-2 text-base font-normal text-muted-foreground">{market.region}</span>
                  </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {market.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {tag === "OZ Density" && <Building2 className="h-3 w-3" />}
                      {tag === "Growth" && <TrendingUp className="h-3 w-3" />}
                      {tag === "Infrastructure" && <Zap className="h-3 w-3" />}
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Score */}
              <div className="flex shrink-0 flex-col items-end gap-1">
                <div className="text-4xl font-bold text-primary sm:text-5xl">{market.score}</div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Score</div>
              </div>

              {/* Arrow */}
              <ChevronRight className="h-6 w-6 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button size="lg" className="h-14 w-full rounded-lg text-base font-semibold shadow-md hover:shadow-lg">
          Export Full Market Analysis
        </Button>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <button className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
