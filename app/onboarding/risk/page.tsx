"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, BarChart3, TrendingUp, Zap } from "lucide-react"

const riskProfiles = [
  {
    id: "conservative",
    label: "Conservative",
    icon: Shield,
    description: "Prioritize capital preservation with stable, low-risk investments and steady returns.",
  },
  {
    id: "moderate",
    label: "Moderate",
    icon: BarChart3,
    description: "Balance risk and reward with diversified portfolios and moderate growth potential.",
  },
  {
    id: "opportunistic",
    label: "Opportunistic",
    icon: TrendingUp,
    description: "Target higher returns through value-add strategies and emerging market opportunities.",
  },
  {
    id: "aggressive",
    label: "Aggressive",
    icon: Zap,
    description: "Maximize returns with high-risk, high-reward investments and development projects.",
  },
]

export default function RiskTolerance() {
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-5xl">
        {/* Title */}
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          Choose Your Risk Appetite
        </h1>

        {/* Risk Profile Cards Grid */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          {riskProfiles.map((profile) => {
            const Icon = profile.icon
            const isSelected = selectedRisk === profile.id

            return (
              <button
                key={profile.id}
                onClick={() => setSelectedRisk(profile.id)}
                className={`
                  group flex flex-col items-center gap-4 rounded-2xl border-2 p-8 text-center transition-all
                  ${
                    isSelected
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border bg-card hover:border-primary/50 hover:bg-accent"
                  }
                `}
              >
                {/* Icon */}
                <div
                  className={`
                  flex h-16 w-16 items-center justify-center rounded-xl transition-all
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                  }
                `}
                >
                  <Icon className="h-8 w-8" />
                </div>

                {/* Label */}
                <h3 className="text-2xl font-semibold text-foreground">{profile.label}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-muted-foreground">{profile.description}</p>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <Button size="lg" className="h-14 w-full rounded-full text-lg font-semibold" disabled={!selectedRisk}>
          Continue
        </Button>
      </div>
    </div>
  )
}
