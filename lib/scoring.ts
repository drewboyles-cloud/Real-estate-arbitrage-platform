import type { ArbitrageProfile, CreditTier } from "@/context/ArbitrageProfileContext"
import type { STRRegime } from "./str.ts"

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type Zoning = "R1" | "R2" | "R3" | "Other"

export type AssetType =
  | "SFR_ADU"
  | "SFR_Underbuilt"
  | "SFR_Underbuilt_R2"
  | "Triplex"
  | "Triplex_Underbuilt_R2"
  | "Triplex_Coastal_Compound"
  | "Fourplex"
  | "Fourplex_Stabilized"
  | "Small_MF"
  | "ValueAdd_Multifamily"
  | "LargeMultifamily"
  | "Teardown"
  | "Land"
  | "Triplex_R2_Underbuilt_ADU"
  | "R3_Dev_Teardown"
  | "Duplex_R2_DeepLot_ADU"
  | "SFR_R2_Underbuilt_ADUStack"
  | "Triplex_R3_ValueAdd"
  | "SFR_R2_GarageADU"
  | "Fourplex_R3_Stabilized_Yield"
  | "Duplex"

export type EnforcementLevel = "low" | "medium" | "high" | "extreme"

export type NeighborhoodTier = "prime" | "strong" | "middle" | "value" | "distressed"

export type ADUPotential = "high" | "medium" | "low" | "none"
export type RentControlRisk = "low" | "medium" | "high"
export type DirtValueTier = "prime" | "strong" | "middle" | "value"
export type PropertyCondition = "excellent" | "good" | "average" | "poor"

export type Sb9Type = "two_unit" | "lot_split" | "both"

export interface Opportunity {
  id: string
  title: string
  address?: string
  city: string
  zoning: Zoning
  assetType: AssetType
  lotSizeSqft: number
  buildingSqft: number
  legalUnits: number
  existingStructures: number
  existingUnits?: number
  hasAlley: boolean
  hasGarage: boolean
  yearBuilt: number
  askPrice: number
  estMarketValue?: number
  rentExistingEst?: number
  rentADUEst?: number | null
  operationalEnv: EnforcementLevel
  developmentEnv: EnforcementLevel
  regulatoryEnv?: "low" | "medium" | "high"
  underbuiltFlag?: boolean
  r2UnderbuiltFlag?: boolean
  r3UnderbuiltFlag?: boolean
  arbitrageScore?: number
  neighborhoodSubmarket: string
  neighborhoodTier: NeighborhoodTier
  aduPotential?: ADUPotential
  rentControlRisk?: RentControlRisk
  enforcementScore?: number
  dirtValueTier?: DirtValueTier
  neighborhoodModifier?: number
  condition?: PropertyCondition
  drivers?: string[]

  // SB-9
  sb9Eligible?: boolean
  sb9Type?: Sb9Type
  sb9Score?: number

  // STR fields
  strRegime?: STRRegime
  strMaxNightsPerYear?: number
}

export interface ScoreResult {
  score: number // 0–100
  drivers: string[]
}

export interface ArbitrageFactors {
  regulatoryUpside: number // 0–10
  zoningFlex: number // 0–10
  densityPotential: number // 0–10
  underbuildGap: number // 0–10
  financingAdvantage: number // 0–10
  riskAdjustedYield: number // 0–10
  ownerOccupiedFit: number // 0–10
}

// ─────────────────────────────────────────────────────────────
// Core helpers
// ─────────────────────────────────────────────────────────────

export function computeArbitrageScore(factors: ArbitrageFactors): number {
  const {
    regulatoryUpside,
    zoningFlex,
    densityPotential,
    underbuildGap,
    financingAdvantage,
    riskAdjustedYield,
    ownerOccupiedFit,
  } = factors

  // Weighted sum (weights add to 100)
  const score =
    regulatoryUpside * 0.18 +
    zoningFlex * 0.15 +
    densityPotential * 0.2 +
    underbuildGap * 0.15 +
    financingAdvantage * 0.12 +
    riskAdjustedYield * 0.15 +
    ownerOccupiedFit * 0.05

  return Math.round(score)
}

const creditTierPenalty = (tier: CreditTier): number => {
  switch (tier) {
    case "A":
      return 0
    case "B":
      return -3
    case "C":
      return -7
    case "D":
      return -12
  }
}

const neighborhoodMultiplierMap: Record<NeighborhoodTier, number> = {
  prime: 1.2, // bumped from 1.18
  strong: 1.15, // bumped from 1.13
  middle: 1.0,
  value: 0.87, // reduced from 0.9
  distressed: 0.85,
}

// Density and yield multipliers
const densityBonusR2 = 1.06
const densityBonusR3 = 1.07

const yieldBonusFourplex = 0.84

const FOURPLEX_STABILIZED_CEILING = 6.8

type Sb9Posture = "forbidden" | "neutral" | "supportive"

const sb9CitySupportMap: Record<string, Sb9Posture> = {
  "El Segundo": "forbidden",
  "Redondo Beach": "neutral",
  Hawthorne: "neutral",
  "Manhattan Beach": "forbidden",
  Torrance: "supportive",
  Hollyglen: "neutral",
  Wiseburn: "neutral",
}

// Regulatory multiplier from dual enforcement
function regulatoryScore(op: Opportunity): number {
  const opEnvScore: Record<EnforcementLevel, number> = {
    low: 1.0,
    medium: 0.85,
    high: 0.65,
    extreme: 0.4,
  }

  const devEnvScore: Record<EnforcementLevel, number> = {
    low: 1.0,
    medium: 0.8,
    high: 0.55,
    extreme: 0.35,
  }

  return opEnvScore[op.operationalEnv] * devEnvScore[op.developmentEnv]
}

function sb9PotentialScore(opp: Opportunity): number {
  if (!opp.sb9Eligible) return 0

  const posture = sb9CitySupportMap[opp.city] ?? "neutral"
  const postureFactor = posture === "supportive" ? 1.0 : posture === "neutral" ? 0.5 : 0.0

  let base = 0
  if (opp.sb9Type === "two_unit") base += 2
  if (opp.sb9Type === "lot_split") base += 2
  if (opp.sb9Type === "both") base += 4

  return base * postureFactor
}

// ─────────────────────────────────────────────────────────────
// Raw arbitrage score (property only, no profile)
// ─────────────────────────────────────────────────────────────

export function computeOpportunityArbitrageScore(opp: Opportunity): number {
  const regMultiplier = regulatoryScore(opp)
  const regulatoryUpside = Math.round(regMultiplier * 10)

  const zoningFlex = opp.zoning === "R3" ? 9 : opp.zoning === "R2" ? 7 : 4

  const unusedUnits = Math.max(0, opp.legalUnits - opp.existingStructures)
  let densityPotential = unusedUnits * 2
  if (opp.underbuiltFlag) densityPotential += 3
  if (opp.r2UnderbuiltFlag) densityPotential += 2
  if (opp.r3UnderbuiltFlag) densityPotential += 2

  // SB-9 can add up to +4 into density lane
  const sb9Score = sb9PotentialScore(opp)
  densityPotential += Math.min(4, Math.floor(sb9Score / 3))

  densityPotential = Math.min(10, densityPotential)

  const lotToBuildRatio = opp.lotSizeSqft / Math.max(opp.buildingSqft, 1)
  const underbuildGap = Math.min(10, Math.round(lotToBuildRatio * 1.5))

  const pricePerUnit = opp.askPrice / Math.max(opp.legalUnits, 1)
  const financingAdvantage =
    pricePerUnit < 400000 ? 10 : pricePerUnit < 500000 ? 8 : pricePerUnit < 600000 ? 6 : pricePerUnit < 750000 ? 4 : 2

  const totalRent = (opp.rentExistingEst || 0) + (opp.rentADUEst || 0)
  const annualRent = totalRent * 12
  const grossYield = annualRent / opp.askPrice
  const riskAdjustedYield = Math.min(10, Math.round(grossYield * 100))

  const ownerOccupiedFit =
    opp.legalUnits >= 2 && opp.legalUnits <= 4 && (opp.rentADUEst || 0) > 0
      ? 9
      : opp.legalUnits >= 2 && opp.legalUnits <= 4
        ? 7
        : opp.assetType === "SFR_ADU" || opp.assetType === "SFR_Underbuilt"
          ? 6
          : 3

  let score =
    computeArbitrageScore({
      regulatoryUpside,
      zoningFlex,
      densityPotential,
      underbuildGap,
      financingAdvantage,
      riskAdjustedYield,
      ownerOccupiedFit,
    }) * regulatoryScore(opp)

  // Neighborhood + density + yield multipliers
  const neighborhoodMultiplier = neighborhoodMultiplierMap[opp.neighborhoodTier]

  let densityMultiplier = 1.0
  if (opp.zoning === "R2" && (opp.underbuiltFlag || opp.r2UnderbuiltFlag)) {
    densityMultiplier = densityBonusR2
  } else if (opp.zoning === "R3" && (opp.underbuiltFlag || opp.r3UnderbuiltFlag)) {
    densityMultiplier = densityBonusR3
  }

  let yieldMultiplier = 1.0
  if (opp.assetType === "Fourplex_R3_Stabilized_Yield" && !opp.underbuiltFlag && !opp.r3UnderbuiltFlag) {
    yieldMultiplier = yieldBonusFourplex
  }

  score *= neighborhoodMultiplier * densityMultiplier * yieldMultiplier

  if (opp.assetType === "Fourplex_R3_Stabilized_Yield" && !opp.underbuiltFlag && !opp.r3UnderbuiltFlag) {
    score = Math.min(score, FOURPLEX_STABILIZED_CEILING)
  }

  score = Math.max(0, Math.min(100, score))
  return score
}

// ─────────────────────────────────────────────────────────────
// Profile-aware scoring
// ─────────────────────────────────────────────────────────────

export const scoreOpportunity = (opp: Opportunity, profile: ArbitrageProfile): ScoreResult => {
  let score = 0
  const drivers: string[] = []

  const regMultiplier = regulatoryScore(opp)

  // 1) Market / regulatory base
  if (regMultiplier >= 0.9) {
    score += 12
    drivers.push("Low regulatory / rent-control risk")
  } else if (regMultiplier >= 0.6) {
    score += 7
  } else {
    score += 2
  }

  // 2) Density / underbuilt arbitrage
  let densityBonus = 0
  const unusedUnits = Math.max(0, opp.legalUnits - opp.existingStructures)

  if (opp.zoning === "R2" && (opp.underbuiltFlag || opp.r2UnderbuiltFlag)) {
    densityBonus += 12
    drivers.push("Underbuilt R2 lot with density upside")
  }
  if (opp.zoning === "R3" && (opp.underbuiltFlag || opp.r3UnderbuiltFlag)) {
    densityBonus += 14
    drivers.push("Underbuilt R3 lot with multifamily upside")
  }
  if (unusedUnits > 0) {
    densityBonus += 4
  }

  // SB-9 lens into density
  const sb9Score = sb9PotentialScore(opp)
  if (sb9Score >= 6) {
    densityBonus += 4
    if (opp.sb9Type === "both") {
      drivers.push("SB-9 two-unit + lot-split potential")
    } else if (opp.sb9Type === "two_unit") {
      drivers.push("SB-9 two-unit prime candidate")
    } else if (opp.sb9Type === "lot_split") {
      drivers.push("SB-9 flag-lot / split potential")
    }
  }

  score += densityBonus

  // 3) ADU potential
  let aduBonus = 0
  const aduFeasible =
    opp.assetType === "SFR_ADU" || (opp.zoning === "R1" && opp.lotSizeSqft >= 5000 && (opp.hasAlley || opp.hasGarage))
  if (aduFeasible && opp.rentADUEst && opp.rentADUEst > 0) {
    aduBonus += 10
    drivers.push("Strong ADU income and equity potential")
  }
  score += aduBonus

  // 4) Owner-occupied arbitrage
  let ownerBonus = 0
  if (profile.willOccupy && opp.rentExistingEst && opp.rentADUEst) {
    const totalRents = opp.rentExistingEst + opp.rentADUEst
    const assumedPITI = Math.max(opp.askPrice * 0.0055, 4000)
    const netHousingCost = assumedPITI - totalRents

    if (profile.currentRent && netHousingCost <= profile.currentRent) {
      ownerBonus += 16
      drivers.push("Owner-occupied net housing cost at or below current rent")
    } else if (profile.currentRent && netHousingCost <= profile.currentRent * 1.2) {
      ownerBonus += 8
      drivers.push("Owner-occupied cost slightly above current rent with high equity upside")
    }
  }
  score += ownerBonus

  // 5) Strategy alignment
  let strategyBonus = 0
  if (profile.strategyPreferences.includes("SmallMF") && opp.assetType === "Small_MF") {
    strategyBonus += 6
    drivers.push("Aligns with Small Multifamily strategy preference")
  }
  if (
    profile.strategyPreferences.includes("ADU") &&
    (opp.assetType === "SFR_ADU" || opp.assetType === "SFR_R2_GarageADU")
  ) {
    strategyBonus += 6
    drivers.push("Aligns with ADU / SFR density strategy preference")
  }
  if (profile.strategyPreferences.includes("Teardown") && opp.assetType === "Teardown") {
    strategyBonus += 5
    drivers.push("Teardown / redevelopment candidate")
  }
  if (profile.strategyPreferences.includes("SB9") && opp.sb9Eligible) {
    strategyBonus += 4
    drivers.push("SB-9 friendly for your strategy")
  }
  score += strategyBonus

  // 6) Credit tier penalty
  score += creditTierPenalty(profile.creditTier)

  // Underbuilt multipliers
  if (opp.underbuiltFlag) score *= 1.25
  if (opp.r2UnderbuiltFlag) score *= 1.15
  if (opp.r3UnderbuiltFlag) score *= 1.1

  // Lot / alley bonuses for 1–2 family
  if (opp.zoning === "R1" || opp.zoning === "R2") {
    if (opp.lotSizeSqft >= 6000) score *= 1.1
    if (opp.hasAlley) score *= 1.05
  }

  // Owner-occupier global bump
  if (profile.willOccupy === true) {
    score *= 1.1
    if (opp.zoning === "R2" || opp.zoning === "R3") score *= 1.05
  }

  // Dirt value per legal unit
  const dirtValuePerUnit = opp.askPrice / opp.legalUnits
  if (dirtValuePerUnit < 500000) {
    score *= 1.2
    drivers.push("Exceptional dirt value per unit")
  } else if (dirtValuePerUnit < 600000) {
    score *= 1.1
    drivers.push("Strong dirt value per unit")
  }

  // Apply regulatory + neighborhood multipliers
  score *= regMultiplier
  score *= neighborhoodMultiplierMap[opp.neighborhoodTier]

  if (opp.assetType === "Fourplex_R3_Stabilized_Yield" && !opp.underbuiltFlag && !opp.r3UnderbuiltFlag) {
    score = Math.min(score, FOURPLEX_STABILIZED_CEILING)
  }

  // Normalize & clamp
  score = Math.max(0, Math.min(100, score))

  const uniqueDrivers = Array.from(new Set(drivers)).slice(0, 3)

  return {
    score,
    drivers: uniqueDrivers,
  }
}

// ─────────────────────────────────────────────────────────────
// South Bay v0 opportunity dataset
// ─────────────────────────────────────────────────────────────

const BASE_OPPORTUNITIES: Opportunity[] = [
  // EL SEGUNDO – CORE / EAST / NORTH / MID
  {
    id: "es_848_penn",
    title: "848 Penn St – R2 Triplex + ADU Permit In Process",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – Core",
    neighborhoodTier: "prime",
    zoning: "R2",
    assetType: "Triplex_R2_Underbuilt_ADU",
    lotSizeSqft: 7268,
    buildingSqft: 1793,
    legalUnits: 3,
    existingStructures: 1,
    hasAlley: true,
    hasGarage: true,
    yearBuilt: 1943,
    askPrice: 1699000,
    estMarketValue: 1900000,
    rentExistingEst: 6650,
    rentADUEst: 2500,
    operationalEnv: "low",
    developmentEnv: "medium",
    regulatoryEnv: "low",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },
  {
    id: "es_1224_eucalyptus",
    title: "1224 Eucalyptus Dr – R3 Fourplex / Teardown Site",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – Core",
    neighborhoodTier: "prime",
    zoning: "R3",
    assetType: "R3_Dev_Teardown",
    lotSizeSqft: 6500,
    buildingSqft: 2600,
    legalUnits: 4,
    existingStructures: 1,
    hasAlley: true,
    hasGarage: false,
    yearBuilt: 1950,
    askPrice: 2350000,
    estMarketValue: 2500000,
    rentExistingEst: 11500,
    rentADUEst: 0,
    operationalEnv: "low",
    developmentEnv: "high",
    regulatoryEnv: "medium",
    underbuiltFlag: true,
    r2UnderbuiltFlag: false,
    r3UnderbuiltFlag: true,
    sb9Eligible: false,
  },
  {
    id: "es_503_whiting",
    title: "503 Whiting St – R2 Duplex on Deep Lot (ADU Stack)",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – East R2",
    neighborhoodTier: "strong",
    zoning: "R2",
    assetType: "Duplex_R2_DeepLot_ADU",
    lotSizeSqft: 6000,
    buildingSqft: 2100,
    legalUnits: 2,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1962,
    askPrice: 1950000,
    estMarketValue: 2050000,
    rentExistingEst: 8200,
    rentADUEst: 2200,
    operationalEnv: "low",
    developmentEnv: "medium",
    regulatoryEnv: "low",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },
  {
    id: "es_330_whiting",
    title: "330 Whiting St – R2 SFR on Multifamily Lot (Prime ADU/JADU)",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – East R2",
    neighborhoodTier: "strong",
    zoning: "R2",
    assetType: "SFR_R2_Underbuilt_ADUStack",
    lotSizeSqft: 6000,
    buildingSqft: 1450,
    legalUnits: 1,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1948,
    askPrice: 1650000,
    estMarketValue: 1750000,
    rentExistingEst: 5200,
    rentADUEst: 2600,
    operationalEnv: "low",
    developmentEnv: "medium",
    regulatoryEnv: "low",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },
  {
    id: "es_938_sheldon",
    title: "938 Sheldon St – R3 Triplex + Future Roof-Deck Units",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – North R3",
    neighborhoodTier: "strong",
    zoning: "R3",
    assetType: "Triplex_R3_ValueAdd",
    lotSizeSqft: 5400,
    buildingSqft: 2600,
    legalUnits: 3,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1970,
    askPrice: 2150000,
    estMarketValue: 2250000,
    rentExistingEst: 10200,
    rentADUEst: 0,
    operationalEnv: "low",
    developmentEnv: "medium",
    regulatoryEnv: "medium",
    underbuiltFlag: true,
    r2UnderbuiltFlag: false,
    r3UnderbuiltFlag: true,
    sb9Eligible: false,
  },
  {
    id: "es_750_center",
    title: "750 Center St – R2 SFR + Detached Garage ADU Candidate",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – Mid R2",
    neighborhoodTier: "strong",
    zoning: "R2",
    assetType: "SFR_R2_GarageADU",
    lotSizeSqft: 5200,
    buildingSqft: 1350,
    legalUnits: 1,
    existingStructures: 1,
    hasAlley: true,
    hasGarage: true,
    yearBuilt: 1955,
    askPrice: 1495000,
    estMarketValue: 1600000,
    rentExistingEst: 4800,
    rentADUEst: 2300,
    operationalEnv: "low",
    developmentEnv: "medium",
    regulatoryEnv: "low",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },
  {
    id: "es_540_sycamore",
    title: "540 Sycamore Ave – Stabilized R3 Fourplex (Yield Play)",
    city: "El Segundo",
    neighborhoodSubmarket: "El Segundo – North R3",
    neighborhoodTier: "strong",
    zoning: "R3",
    assetType: "Fourplex_R3_Stabilized_Yield",
    lotSizeSqft: 6500,
    buildingSqft: 3200,
    legalUnits: 4,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1978,
    askPrice: 2600000,
    estMarketValue: 2700000,
    rentExistingEst: 13200,
    rentADUEst: 0,
    operationalEnv: "low",
    developmentEnv: "low",
    regulatoryEnv: "medium",
    underbuiltFlag: false,
    r2UnderbuiltFlag: false,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },

  // TORRANCE
  {
    id: "1220-maple",
    title: "1220 Maple Ave – SFR with ADU Lot",
    city: "Torrance",
    neighborhoodSubmarket: "Torrance – Central",
    neighborhoodTier: "middle",
    zoning: "R1",
    assetType: "SFR_ADU",
    lotSizeSqft: 6500,
    buildingSqft: 1800,
    legalUnits: 2,
    existingStructures: 1,
    hasAlley: true,
    hasGarage: true,
    yearBuilt: 1962,
    askPrice: 1250000,
    estMarketValue: 1400000,
    rentExistingEst: 2800,
    rentADUEst: 2400,
    operationalEnv: "medium",
    developmentEnv: "medium",
    regulatoryEnv: "medium",
    underbuiltFlag: false,
    r2UnderbuiltFlag: false,
    r3UnderbuiltFlag: false,
    sb9Eligible: true,
    sb9Type: "both",
  },

  // REDONDO
  {
    id: "445-ocean",
    title: "445 Ocean Blvd – R3 Development Site",
    city: "Redondo Beach",
    neighborhoodSubmarket: "Redondo – Beach Adjacent",
    neighborhoodTier: "strong",
    zoning: "R3",
    assetType: "Teardown",
    lotSizeSqft: 12000,
    buildingSqft: 900,
    legalUnits: 8,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: false,
    yearBuilt: 1948,
    askPrice: 2100000,
    estMarketValue: 2500000,
    rentExistingEst: 1800,
    rentADUEst: 0,
    operationalEnv: "medium",
    developmentEnv: "medium",
    regulatoryEnv: "medium",
    underbuiltFlag: true,
    r2UnderbuiltFlag: false,
    r3UnderbuiltFlag: true,
    sb9Eligible: false,
  },

  // MANHATTAN BEACH
  {
    id: "892-vista",
    title: "892 Vista Del Mar – Duplex + Garage ADU",
    city: "Manhattan Beach",
    neighborhoodSubmarket: "Manhattan Beach – Hill Section",
    neighborhoodTier: "prime",
    zoning: "R2",
    assetType: "Duplex",
    lotSizeSqft: 5800,
    buildingSqft: 2400,
    legalUnits: 3,
    existingStructures: 2,
    hasAlley: true,
    hasGarage: true,
    yearBuilt: 1975,
    askPrice: 2350000,
    estMarketValue: 2600000,
    rentExistingEst: 4200,
    rentADUEst: 2800,
    operationalEnv: "low",
    developmentEnv: "high",
    regulatoryEnv: "high",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    r3UnderbuiltFlag: false,
    sb9Eligible: false,
  },

  // HOLLYGLEN / WISEBURN – STRONG TIER
  {
    id: "hg_5253_138th",
    title: "5253 W 138th St – Hollyglen SFR + ADU Opportunity",
    city: "Hawthorne",
    neighborhoodSubmarket: "Hollyglen – Core",
    neighborhoodTier: "strong",
    zoning: "R1",
    assetType: "SFR_ADU",
    lotSizeSqft: 5800,
    buildingSqft: 1500,
    legalUnits: 1,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1953,
    askPrice: 1350000,
    estMarketValue: 1450000,
    rentExistingEst: 4200,
    rentADUEst: 2200,
    operationalEnv: "medium",
    developmentEnv: "medium",
    regulatoryEnv: "medium",
    underbuiltFlag: true,
    sb9Eligible: true,
    sb9Type: "two_unit",
  },
  {
    id: "hg_14617_plantation",
    title: "14617 Plantation Dr – Hollyglen SFR + Large ADU Lot",
    city: "Hawthorne",
    neighborhoodSubmarket: "Hollyglen – West",
    neighborhoodTier: "strong",
    zoning: "R1",
    assetType: "SFR_ADU",
    lotSizeSqft: 6500,
    buildingSqft: 1600,
    legalUnits: 2,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1956,
    askPrice: 1395000,
    estMarketValue: 1500000,
    rentExistingEst: 4300,
    rentADUEst: 2400,
    operationalEnv: "medium",
    developmentEnv: "medium",
    regulatoryEnv: "medium",
    underbuiltFlag: true,
    sb9Eligible: true,
    sb9Type: "both",
  },
  {
    id: "hg_11641_la_cienega",
    title: "11641 La Cienega Blvd – Wiseburn SFR + Large Lot",
    city: "Hawthorne",
    neighborhoodSubmarket: "Wiseburn – Hollyglen Border",
    neighborhoodTier: "strong",
    zoning: "R1",
    assetType: "SFR_ADU",
    lotSizeSqft: 7000,
    buildingSqft: 1550,
    legalUnits: 1,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1954,
    askPrice: 1295000,
    estMarketValue: 1400000,
    rentExistingEst: 3900,
    rentADUEst: 2300,
    operationalEnv: "high",
    developmentEnv: "medium",
    regulatoryEnv: "high",
    underbuiltFlag: true,
    r3UnderbuiltFlag: true,
    sb9Eligible: true,
    sb9Type: "both",
  },

  // HAWTHORNE – GENERIC VALUE TIER
  {
    id: "ht_11937_inglewood",
    title: "11937 S Inglewood Ave – R2 Duplex Value-Add (Alley)",
    city: "Hawthorne",
    neighborhoodSubmarket: "Hawthorne – Generic",
    neighborhoodTier: "value",
    zoning: "R2",
    assetType: "Duplex_R2_DeepLot_ADU",
    lotSizeSqft: 6000,
    buildingSqft: 1900,
    legalUnits: 2,
    existingStructures: 1,
    hasAlley: true,
    hasGarage: false,
    yearBuilt: 1950,
    askPrice: 1050000,
    estMarketValue: 1150000,
    rentExistingEst: 3200,
    rentADUEst: 1800,
    operationalEnv: "high",
    developmentEnv: "medium",
    regulatoryEnv: "high",
    underbuiltFlag: true,
    r2UnderbuiltFlag: true,
    sb9Eligible: true,
    sb9Type: "two_unit",
  },
  {
    id: "ht_4445_129th",
    title: "4445 W 129th St – R3 Triplex Value-Play",
    city: "Hawthorne",
    neighborhoodSubmarket: "Hawthorne – Generic",
    neighborhoodTier: "value",
    zoning: "R3",
    assetType: "Triplex_R3_ValueAdd",
    lotSizeSqft: 5400,
    buildingSqft: 2600,
    legalUnits: 3,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: true,
    yearBuilt: 1968,
    askPrice: 1350000,
    estMarketValue: 1450000,
    rentExistingEst: 6000,
    rentADUEst: 0,
    operationalEnv: "high",
    developmentEnv: "medium",
    regulatoryEnv: "high",
    underbuiltFlag: true,
    r3UnderbuiltFlag: true,
    sb9Eligible: false,
  },
  {
    id: "ht_11829_hawthorne",
    title: "11829 Hawthorne Blvd – SFR on R3 Lot Teardown",
    city: "Hawthorne",
    neighborhoodSubmarket: "Hawthorne – Generic",
    neighborhoodTier: "value",
    zoning: "R3",
    assetType: "R3_Dev_Teardown",
    lotSizeSqft: 6500,
    buildingSqft: 1300,
    legalUnits: 1,
    existingStructures: 1,
    hasAlley: false,
    hasGarage: false,
    yearBuilt: 1947,
    askPrice: 950000,
    estMarketValue: 1050000,
    rentExistingEst: 2600,
    rentADUEst: 0,
    operationalEnv: "high",
    developmentEnv: "medium",
    regulatoryEnv: "high",
    underbuiltFlag: true,
    r3UnderbuiltFlag: true,
    sb9Eligible: false,
  },
]

// Pre-compute raw arbitrage scores
BASE_OPPORTUNITIES.forEach((opp) => {
  opp.arbitrageScore = computeOpportunityArbitrageScore(opp)
})

export const OPPORTUNITIES: Opportunity[] = BASE_OPPORTUNITIES

// Backwards-compat alias used in older imports
export const MOCK_OPPORTUNITIES = OPPORTUNITIES
