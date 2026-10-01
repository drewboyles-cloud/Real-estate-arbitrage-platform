"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Edit2 } from "lucide-react"

export default function OnboardingSummary() {
  const profileData = {
    timeHorizon: "Long-Term (7–15 years)",
    assetClasses: ["Multifamily", "Industrial", "Retail"],
    investmentGoals: ["Stable Cashflow", "Long-Term Growth", "Tax Optimization (1031 / OZ / Depreciation)"],
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">Review Your Profile</h1>
          <p className="text-lg text-muted-foreground">Confirm your selections before generating your profile</p>
        </div>

        {/* Summary Cards */}
        <div className="space-y-4 mb-8">
          {/* Time Horizon Card */}
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Investment Time Horizon
              </h3>
              <Link
                href="/onboarding/timeline"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
            </div>
            <p className="text-xl font-bold text-foreground">{profileData.timeHorizon}</p>
          </div>

          {/* Preferred Asset Classes Card */}
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                Preferred Asset Classes
              </h3>
              <Link
                href="/onboarding/assets"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.assetClasses.map((asset) => (
                <div
                  key={asset}
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {asset}
                </div>
              ))}
            </div>
          </div>

          {/* Investment Goals Card */}
          <div className="bg-card border-2 border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Investment Goals</h3>
              <Link
                href="/onboarding/goals"
                className="text-primary hover:text-primary/80 transition-colors flex items-center gap-1 text-sm font-medium"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileData.investmentGoals.map((goal) => (
                <div
                  key={goal}
                  className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {goal}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Profile Button */}
        <button
          className="w-full px-8 py-5 rounded-xl text-lg font-semibold
            bg-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02]
            transition-all duration-200 flex items-center justify-center gap-3"
        >
          Generate My Arbitrage Profile
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
