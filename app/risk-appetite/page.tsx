"use client"

import { useState } from "react"
import { Shield, TrendingUp, Zap, Rocket } from "lucide-react"

type RiskLevel = "conservative" | "moderate" | "opportunistic" | "aggressive"

export default function RiskAppetitePage() {
  const [selected, setSelected] = useState<RiskLevel | null>(null)

  const riskOptions = [
    {
      id: "conservative" as RiskLevel,
      label: "Conservative",
      description: "Stable, predictable returns with minimal risk",
      icon: Shield,
    },
    {
      id: "moderate" as RiskLevel,
      label: "Moderate",
      description: "Balanced approach with calculated risk",
      icon: TrendingUp,
    },
    {
      id: "opportunistic" as RiskLevel,
      label: "Opportunistic",
      description: "Active pursuit of market opportunities",
      icon: Zap,
    },
    {
      id: "aggressive" as RiskLevel,
      label: "Aggressive",
      description: "Maximum returns with higher risk tolerance",
      icon: Rocket,
    },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Risk Appetite</h1>
          <p className="text-muted-foreground text-lg">Select your preferred investment approach</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {riskOptions.map((option) => {
            const Icon = option.icon
            const isSelected = selected === option.id

            return (
              <button
                key={option.id}
                onClick={() => setSelected(option.id)}
                className={`p-8 rounded-2xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg scale-[1.02]"
                    : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{option.description}</p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex justify-center">
          <button
            disabled={!selected}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all duration-200 ${
              selected
                ? "bg-primary text-primary-foreground hover:shadow-lg hover:scale-105"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
