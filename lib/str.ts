// lib/str.ts

import type { Opportunity, STRRegime } from "./scoring"

// --- Types -------------------------------------------------------------

export interface ShortTermRentalConfig {
  city: string
  submarket?: string

  // Core economics
  baseADR: number // typical nightly rate, before property-specific tweaks
  baseOccupancy: number // 0–1 (e.g. 0.65 = 65% of available nights booked)
  platformFeePct: number // Airbnb/VRBO + payment fees, e.g. 0.15 = 15%
  operatingCostPct: number // cleaning, utilities, supplies, mgmt, e.g. 0.25 = 25%

  // Regulation / policy
  regime: STRRegime
  maxNightsPerYear?: number // e.g. 90 for capped cities; 365 if unrestricted
  ownerOccupancyRequired?: boolean

  // Debt / equity (optional, for cash-on-cash)
  downPaymentPct?: number // e.g. 0.25
  interestRatePct?: number // e.g. 0.065
  amortYears?: number // e.g. 30
  propertyTaxPct?: number // annual tax as % of price, e.g. 0.012
  insurancePct?: number // annual insurance as % of price, e.g. 0.004
}

export interface ShortTermRentalResult {
  allowed: boolean

  availableNights: number
  bookedNights: number
  adr: number

  grossRevenue: number
  platformFees: number
  operatingCosts: number
  netOperatingIncome: number

  longTermGrossYieldPct: number // from existing rentEst
  strNetYieldPct: number // NOI / price

  annualDebtService?: number
  cashOnCashReturnPct?: number

  upliftVsLongTermPct: number // STR net yield minus LT gross yield, in % points
  regime: STRRegime
  score0to10: number
  drivers: string[]
}

// --- Helpers -----------------------------------------------------------

// Simple mortgage payment helper (annual payment)
const annualDebtService = (principal: number, interestRatePct: number, amortYears: number): number => {
  const r = interestRatePct / 100 / 12
  const n = amortYears * 12
  if (r <= 0) return principal / amortYears
  const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return payment * 12
}

const regimeMultiplier = (regime: STRRegime): number => {
  switch (regime) {
    case "forbidden":
      return 0
    case "hostile":
      return 0.5
    case "neutral":
      return 1.0
    case "supportive":
      return 1.2
  }
}

/**
 * Fallback ADR if none is provided in config:
 * - If we have existing monthly rent, approximate ADR as 1.6x long-term daily rent
 * - Else just use a conservative flat number
 */
const inferADRFromOpportunity = (opp: Opportunity, fallbackADR: number): number => {
  if (opp.rentExistingEst && opp.rentExistingEst > 0) {
    const dailyLongTerm = opp.rentExistingEst / 30
    return Math.round(dailyLongTerm * 1.6)
  }
  return fallbackADR
}

// --- Core Evaluation ---------------------------------------------------

export const evaluateShortTermRental = (opp: Opportunity, config: ShortTermRentalConfig): ShortTermRentalResult => {
  const drivers: string[] = []

  // 1) Check basic eligibility
  if (config.regime === "forbidden") {
    return {
      allowed: false,
      availableNights: config.maxNightsPerYear ?? 0,
      bookedNights: 0,
      adr: 0,
      grossRevenue: 0,
      platformFees: 0,
      operatingCosts: 0,
      netOperatingIncome: 0,
      longTermGrossYieldPct: 0,
      strNetYieldPct: 0,
      annualDebtService: 0,
      cashOnCashReturnPct: 0,
      upliftVsLongTermPct: 0,
      regime: config.regime,
      score0to10: 0,
      drivers: ["Short-term rentals effectively prohibited in this jurisdiction"],
    }
  }

  // 2) Nights and occupancy
  const maxNights = config.maxNightsPerYear && config.maxNightsPerYear > 0 ? config.maxNightsPerYear : 365
  const baseOcc = Math.min(Math.max(config.baseOccupancy, 0), 1)
  const bookedNights = Math.round(maxNights * baseOcc)

  if (maxNights < 365) {
    drivers.push(`Night cap of ${maxNights} nights/year`)
  }

  // 3) ADR (actual nightly rate)
  const adr = config.baseADR > 0 ? config.baseADR : inferADRFromOpportunity(opp, 300)

  // 4) Revenue & costs
  const grossRevenue = adr * bookedNights
  const platformFees = grossRevenue * config.platformFeePct
  const operatingCosts = grossRevenue * config.operatingCostPct
  const netOperatingIncome = grossRevenue - platformFees - operatingCosts

  if (config.platformFeePct > 0.1) {
    drivers.push("Platform/processing fees are a meaningful drag on yield")
  }
  if (config.operatingCostPct >= 0.3) {
    drivers.push("High STR operating cost assumption (cleaning, mgmt, supplies)")
  }

  // 5) Long-term gross yield baseline (from existing rent)
  const totalMonthlyRent = opp.rentExistingEst ?? 0
  const longTermGrossYieldPct = opp.askPrice > 0 ? ((totalMonthlyRent * 12) / opp.askPrice) * 100 : 0

  // 6) STR net yield
  const strNetYieldPct = opp.askPrice > 0 ? (netOperatingIncome / opp.askPrice) * 100 : 0

  // 7) Debt & cash-on-cash (optional)
  let annualDebt = 0
  let coc: number | undefined = undefined
  if (config.downPaymentPct && config.interestRatePct && config.amortYears) {
    const down = opp.askPrice * config.downPaymentPct
    const loan = opp.askPrice - down
    annualDebt = annualDebtService(loan, config.interestRatePct, config.amortYears)

    const taxes = config.propertyTaxPct ? opp.askPrice * config.propertyTaxPct : 0
    const insurance = config.insurancePct ? opp.askPrice * config.insurancePct : 0

    const cashFlowAfterDebt = netOperatingIncome - annualDebt - taxes - insurance
    if (down > 0) {
      coc = (cashFlowAfterDebt / down) * 100
      if (coc >= 10) drivers.push("Double-digit cash-on-cash potential")
      if (coc <= 4) drivers.push("Cash-on-cash return constrained by debt load")
    }
  }

  // 8) Uplift vs long-term
  const upliftVsLongTermPct = strNetYieldPct - longTermGrossYieldPct
  if (upliftVsLongTermPct >= 4) {
    drivers.push("STR net yield materially higher than long-term rent strategy")
  } else if (upliftVsLongTermPct <= 0) {
    drivers.push("STR yield does not clearly beat long-term rent")
  }

  // 9) Score 0–10 (pure STR arbitrage lens)
  const regimeMult = regimeMultiplier(config.regime)
  // Base score from yield uplift: 0 pts at 0%, ~10 pts at +8% uplift, before regime
  const baseScore = Math.max(0, Math.min(10, (upliftVsLongTermPct / 8) * 10))
  const regimeBonus = config.regime === "supportive" ? 1.0 : config.regime === "hostile" ? -1.5 : 0

  let score0to10 = (baseScore + regimeBonus) * regimeMult
  score0to10 = Math.max(0, Math.min(10, score0to10))

  if (config.regime === "supportive") {
    drivers.push("Local policy broadly supportive of STR activity")
  }
  if (config.regime === "hostile") {
    drivers.push("Local policy hostile to STRs (enforcement / permitting risk)")
  }

  // Trim to top 3 drivers
  const uniqueDrivers = Array.from(new Set(drivers)).slice(0, 3)

  return {
    allowed: true,
    availableNights: maxNights,
    bookedNights,
    adr,
    grossRevenue,
    platformFees,
    operatingCosts,
    netOperatingIncome,
    longTermGrossYieldPct,
    strNetYieldPct,
    annualDebtService: annualDebt || undefined,
    cashOnCashReturnPct: coc,
    upliftVsLongTermPct,
    regime: config.regime,
    score0to10,
    drivers: uniqueDrivers,
  }
}
