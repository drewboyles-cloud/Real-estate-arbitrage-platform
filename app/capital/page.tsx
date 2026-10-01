"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

const capitalRanges = ["$50K–$250K", "$250K–$1M", "$1M–$5M", "$5M+"]

export default function InvestmentCapitalPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-16 text-balance">Investment Capital</h1>

        {/* Capital Range Pills */}
        <div className="flex flex-col gap-4 mb-12">
          {capitalRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelected(range)}
              className={`
                w-full px-8 py-6 rounded-full text-xl font-semibold
                transition-all duration-200
                border-2
                ${
                  selected === range
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                    : "bg-card text-foreground border-border hover:border-primary/50 hover:shadow-md"
                }
              `}
            >
              {range}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          disabled={!selected}
          className={`
            w-full max-w-md mx-auto px-8 py-5 rounded-xl text-lg font-semibold
            transition-all duration-200
            flex items-center justify-center gap-3
            ${
              selected
                ? "bg-primary text-primary-foreground hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            }
          `}
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
