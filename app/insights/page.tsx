"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useArbitrageProfile } from "@/context/ArbitrageProfileContext"
import { scoreOpportunity, OPPORTUNITIES } from "@/lib/scoring"

export default function ArbitrageInsights() {
  const { profile } = useArbitrageProfile()

  // Score and sort opportunities based on user profile
  const scored = OPPORTUNITIES.map((opp) => ({
    opp,
    result: scoreOpportunity(opp, profile),
  })).sort((a, b) => b.result.score - a.result.score)

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Arbitrage Insights</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Based on your Arbitrage Profile, here are properties ranked by fit score.
          </p>
        </div>

        {/* Hero Profile Card */}
        <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-sm mb-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Profile Summary</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {profile.willOccupy ? "Owner-Occupied" : "Investor"} •{" "}
            {profile.riskTolerance.charAt(0).toUpperCase() + profile.riskTolerance.slice(1)} Risk
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {profile.horizon === "short" ? "1–3 year" : profile.horizon === "medium" ? "3–7 year" : "7+ year"} horizon •
            Credit Tier {profile.creditTier} • Renovation comfort: {profile.renovationComfort}/5
          </p>
        </div>

        {/* Scorecards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Top Score</p>
            <p className="text-4xl font-bold text-foreground mb-2">
              {Number(scored[0]?.result.score ?? 0).toFixed(1)} / 100
            </p>
            <p className="text-xs text-muted-foreground">Best match for your profile</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Properties Analyzed
            </p>
            <p className="text-4xl font-bold text-foreground mb-2">{OPPORTUNITIES.length}</p>
            <p className="text-xs text-muted-foreground">Scored against your profile</p>
          </div>

          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">Strategy Focus</p>
            <p className="text-4xl font-bold text-foreground mb-2">{profile.strategyPreferences.length}</p>
            <p className="text-xs text-muted-foreground">Active strategy preferences</p>
          </div>
        </div>

        {/* Top Opportunities Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Top Scored Properties</h3>

          <div className="space-y-4">
            {scored.map(({ opp, result }) => (
              <Link
                key={opp.id}
                href={`/opportunity/${opp.id}`}
                className="block bg-card border-2 border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {opp.city} • {opp.zoning} • {opp.assetType.replace("_", " ")}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground">{Number(result.score).toFixed(1)}/100</div>
                    <div className="text-xs text-muted-foreground">Arbitrage Score</div>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{opp.title}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span>
                    <strong className="text-foreground">Ask:</strong> ${opp.askPrice.toLocaleString()}
                  </span>
                  <span>
                    <strong className="text-foreground">Lot:</strong> {opp.lotSizeSqft.toLocaleString()} sqft
                  </span>
                  <span>
                    <strong className="text-foreground">Units:</strong> {opp.legalUnits}
                  </span>
                </div>
                {result.drivers.length > 0 && (
                  <div className="text-xs text-muted-foreground border-t pt-3 mt-3">
                    <strong className="text-foreground">Top drivers:</strong> {result.drivers.join(" • ")}
                  </div>
                )}
                <div className="mt-3 text-primary hover:text-primary/80 transition-colors text-sm font-medium inline-flex items-center gap-1">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3">
          <Link
            href="/opportunities"
            className="w-full px-8 py-5 rounded-xl text-lg font-semibold bg-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-3"
          >
            View Strategy Playbooks
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/assessment"
            className="w-full px-8 py-5 rounded-xl text-lg font-semibold bg-background text-foreground border-2 border-border hover:border-primary/50 hover:shadow-md transition-all duration-200 flex items-center justify-center gap-3"
          >
            Refine My Profile
          </Link>
        </div>
      </div>
    </div>
  )
}
