"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useArbitrageProfile, type StrategyPreference, type CreditTier } from "@/context/ArbitrageProfileContext"

export default function AssessmentPage() {
  const { profile, setProfile } = useArbitrageProfile()
  const router = useRouter()
  const [localProfile, setLocalProfile] = useState(profile)

  const updateField = <K extends keyof typeof localProfile>(key: K, value: (typeof localProfile)[K]) => {
    setLocalProfile((prev) => ({ ...prev, [key]: value }))
  }

  const toggleStrategy = (strategy: StrategyPreference) => {
    setLocalProfile((prev) => {
      const exists = prev.strategyPreferences.includes(strategy)
      return {
        ...prev,
        strategyPreferences: exists
          ? prev.strategyPreferences.filter((s) => s !== strategy)
          : [...prev.strategyPreferences, strategy],
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfile(localProfile)
    router.push("/insights")
  }

  return (
    <main className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Start New Assessment</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Tell us how you plan to invest and whether you will live in the property. We&apos;ll tailor arbitrage scores
          to your profile.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid gap-6 rounded-lg border bg-card p-6">
        {/* Owner-occupied checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="willOccupy"
            checked={localProfile.willOccupy}
            onChange={(e) => updateField("willOccupy", e.target.checked)}
            className="h-4 w-4 rounded border-gray-300"
          />
          <label htmlFor="willOccupy" className="text-sm font-medium">
            I plan to live in one of the units (owner-occupied)
          </label>
        </div>

        {/* Financial inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Current monthly rent you pay</label>
            <input
              type="number"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="e.g. 3000"
              value={localProfile.currentRent ?? ""}
              onChange={(e) => updateField("currentRent", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Target max monthly housing cost</label>
            <input
              type="number"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="e.g. 3500"
              value={localProfile.targetMonthlyMax ?? ""}
              onChange={(e) => updateField("targetMonthlyMax", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Down payment minimum ($)</label>
            <input
              type="number"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="e.g. 100000"
              value={localProfile.downPaymentMin ?? ""}
              onChange={(e) => updateField("downPaymentMin", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Down payment maximum ($)</label>
            <input
              type="number"
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="e.g. 500000"
              value={localProfile.downPaymentMax ?? ""}
              onChange={(e) => updateField("downPaymentMax", e.target.value ? Number(e.target.value) : null)}
            />
          </div>
        </div>

        {/* Horizon and Risk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Investment horizon</label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={localProfile.horizon}
              onChange={(e) => updateField("horizon", e.target.value as "short" | "medium" | "long")}
            >
              <option value="short">1–3 years</option>
              <option value="medium">3–7 years</option>
              <option value="long">7+ years</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Risk tolerance</label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
              value={localProfile.riskTolerance}
              onChange={(e) => updateField("riskTolerance", e.target.value as "low" | "medium" | "high")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        {/* Renovation comfort slider */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Comfort with renovations (0 = none, 5 = very comfortable)</label>
          <input
            type="range"
            min={0}
            max={5}
            value={localProfile.renovationComfort}
            onChange={(e) => updateField("renovationComfort", Number(e.target.value))}
            className="w-full max-w-md"
          />
          <div className="text-xs text-muted-foreground">Current: {localProfile.renovationComfort}/5</div>
        </div>

        {/* Credit tier */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Approximate credit tier</label>
          <select
            className="w-full rounded-md border bg-background px-3 py-2 text-sm md:max-w-md"
            value={localProfile.creditTier}
            onChange={(e) => updateField("creditTier", e.target.value as CreditTier)}
          >
            <option value="A">A (740+)</option>
            <option value="B">B (700–739)</option>
            <option value="C">C (660–699)</option>
            <option value="D">D (&lt; 660)</option>
          </select>
        </div>

        {/* Strategy preferences */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Strategy preferences</label>
          <div className="flex flex-wrap gap-4 text-sm">
            {(["ADU", "HouseHack", "SmallMF", "Teardown"] as StrategyPreference[]).map((s) => (
              <label key={s} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={localProfile.strategyPreferences.includes(s)}
                  onChange={() => toggleStrategy(s)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span>{s === "SmallMF" ? "Small Multifamily" : s === "HouseHack" ? "House Hack" : s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to dashboard
          </Link>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Save profile & view top opportunities
          </button>
        </div>
      </form>
    </main>
  )
}
