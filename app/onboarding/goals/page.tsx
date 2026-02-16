"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"

const investmentGoals = [
  "Stable Cashflow",
  "Long-Term Growth",
  "Redevelopment / Value-Add",
  "Tax Optimization (1031 / OZ / Depreciation)",
  "Arbitrage Discovery (Regulatory / Zoning / Incentives)",
]

export default function InvestmentGoalsPage() {
  const [selected, setSelected] = useState<string[]>([])

  const toggleGoal = (goal: string) => {
    setSelected((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Investment Goals</h1>

        {/* Helper Text */}
        <p className="text-muted-foreground text-lg mb-16 text-balance">
          Select the outcomes that matter most to you. You can choose more than one.
        </p>

        {/* Goal Pills */}
        <div className="flex flex-col gap-4 mb-12">
          {investmentGoals.map((goal) => {
            const isSelected = selected.includes(goal)
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`
                  w-full px-8 py-6 rounded-full text-xl font-semibold
                  transition-all duration-200
                  border-2 relative
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-md"
                  }
                `}
              >
                <span className="flex items-center justify-center gap-3">
                  {goal}
                  {isSelected && <Check className="w-5 h-5" />}
                </span>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        <button
          disabled={selected.length === 0}
          className={`
            w-full max-w-md mx-auto px-8 py-5 rounded-xl text-lg font-semibold
            transition-all duration-200
            flex items-center justify-center gap-3
            ${
              selected.length > 0
                ? "bg-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            }
          `}
        >
          Review My Arbitrage Profile
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
