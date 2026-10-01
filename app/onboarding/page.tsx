"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const capitalRanges = [
  { id: "50k-250k", label: "$50K–$250K" },
  { id: "250k-1m", label: "$250K–$1M" },
  { id: "1m-5m", label: "$1M–$5M" },
  { id: "5m-plus", label: "$5M+" },
]

export default function OnboardingCapital() {
  const [selectedRange, setSelectedRange] = useState<string | null>(null)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Title */}
        <h1 className="mb-12 text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
          Investment Capital
        </h1>

        {/* Capital Range Buttons */}
        <div className="mb-12 flex flex-col gap-4">
          {capitalRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedRange(range.id)}
              className={`
                rounded-full border-2 px-8 py-6 text-lg font-semibold transition-all
                sm:text-xl
                ${
                  selectedRange === range.id
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-accent"
                }
              `}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <Button size="lg" className="h-14 w-full rounded-full text-lg font-semibold" disabled={!selectedRange}>
          Continue
        </Button>
      </div>
    </div>
  )
}
