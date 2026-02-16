"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type CreditTier = "A" | "B" | "C" | "D"

export type Horizon = "short" | "medium" | "long"
export type RiskTolerance = "low" | "medium" | "high"

export type StrategyPreference = "ADU" | "HouseHack" | "SmallMF" | "Teardown"

export interface ArbitrageProfile {
  willOccupy: boolean
  currentRent?: number | null
  targetMonthlyMax?: number | null
  downPaymentMin?: number | null
  downPaymentMax?: number | null
  horizon: Horizon
  riskTolerance: RiskTolerance
  renovationComfort: number // 0–5
  creditTier: CreditTier
  strategyPreferences: StrategyPreference[]
}

const defaultProfile: ArbitrageProfile = {
  willOccupy: false,
  currentRent: null,
  targetMonthlyMax: null,
  downPaymentMin: null,
  downPaymentMax: null,
  horizon: "medium",
  riskTolerance: "medium",
  renovationComfort: 2,
  creditTier: "B",
  strategyPreferences: ["SmallMF"],
}

interface ArbitrageProfileContextValue {
  profile: ArbitrageProfile
  setProfile: (profile: ArbitrageProfile) => void
}

const ArbitrageProfileContext = createContext<ArbitrageProfileContextValue | undefined>(undefined)

export const ArbitrageProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ArbitrageProfile>(defaultProfile)

  return <ArbitrageProfileContext.Provider value={{ profile, setProfile }}>{children}</ArbitrageProfileContext.Provider>
}

export const useArbitrageProfile = (): ArbitrageProfileContextValue => {
  const ctx = useContext(ArbitrageProfileContext)
  if (!ctx) {
    throw new Error("useArbitrageProfile must be used within an ArbitrageProfileProvider")
  }
  return ctx
}
