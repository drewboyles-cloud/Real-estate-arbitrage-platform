// lib/strConfig.ts

import type { Opportunity } from "./scoring"
import type { ShortTermRentalConfig, STRRegime } from "./str"

// Simple key to allow submarket-level overrides later
type MarketKey = {
  city: string
  submarket?: string
}

const makeKey = (city: string, submarket?: string): string =>
  `${city.toLowerCase()}::${(submarket || "").toLowerCase()}`

// --- Base market configs ----------------------------------------------------
// These are opinionated placeholders. You should tweak ADR/occupancy/regime
// once you lock in actual STR rules & comp data per city/submarket.

const BASE_MARKET_CONFIGS: ShortTermRentalConfig[] = [
  // EL SEGUNDO – generally restrictive / high scrutiny
  {
    city: "El Segundo",
    submarket: "El Segundo – Core",
    regime: "hostile",
    baseADR: 325,
    baseOccupancy: 0.58,
    platformFeePct: 0.15,
    operatingCostPct: 0.28,
    maxNightsPerYear: 120,
    ownerOccupancyRequired: true,
  },
  {
    city: "El Segundo",
    submarket: "El Segundo – East R2",
    regime: "hostile",
    baseADR: 300,
    baseOccupancy: 0.55,
    platformFeePct: 0.15,
    operatingCostPct: 0.28,
    maxNightsPerYear: 120,
    ownerOccupancyRequired: true,
  },
  {
    city: "El Segundo",
    submarket: "El Segundo – North R3",
    regime: "hostile",
    baseADR: 310,
    baseOccupancy: 0.56,
    platformFeePct: 0.15,
    operatingCostPct: 0.3,
    maxNightsPerYear: 120,
    ownerOccupancyRequired: true,
  },

  // REDONDO – beach-adjacent, mixed but more workable
  {
    city: "Redondo Beach",
    submarket: "Redondo – Beach Adjacent",
    regime: "neutral",
    baseADR: 350,
    baseOccupancy: 0.6,
    platformFeePct: 0.15,
    operatingCostPct: 0.3,
    maxNightsPerYear: 180,
  },

  // MANHATTAN – premium ADR, but strict posture
  {
    city: "Manhattan Beach",
    submarket: "Manhattan Beach – Hill Section",
    regime: "hostile",
    baseADR: 450,
    baseOccupancy: 0.62,
    platformFeePct: 0.15,
    operatingCostPct: 0.32,
    maxNightsPerYear: 90,
    ownerOccupancyRequired: true,
  },

  // TORRANCE – more permissive / "supportive" stance
  {
    city: "Torrance",
    submarket: "Torrance – Central",
    regime: "supportive",
    baseADR: 260,
    baseOccupancy: 0.6,
    platformFeePct: 0.14,
    operatingCostPct: 0.26,
    maxNightsPerYear: 365,
  },

  // HAWTHORNE – assume workable but not "pro STR"
  {
    city: "Hawthorne",
    submarket: "Hawthorne – Generic",
    regime: "neutral",
    baseADR: 220,
    baseOccupancy: 0.58,
    platformFeePct: 0.14,
    operatingCostPct: 0.27,
    maxNightsPerYear: 365,
  },

  // HOLLYGLEN / WISEBURN – premium vs Hawthorne core
  {
    city: "Hawthorne",
    submarket: "Hollyglen",
    regime: "neutral",
    baseADR: 280,
    baseOccupancy: 0.6,
    platformFeePct: 0.14,
    operatingCostPct: 0.27,
    maxNightsPerYear: 365,
  },
  {
    city: "Hawthorne",
    submarket: "Wiseburn",
    regime: "neutral",
    baseADR: 260,
    baseOccupancy: 0.59,
    platformFeePct: 0.14,
    operatingCostPct: 0.27,
    maxNightsPerYear: 365,
  },
]

// Build a lookup map for fast resolution
const MARKET_CONFIG_MAP: Record<string, ShortTermRentalConfig> = {}

BASE_MARKET_CONFIGS.forEach((cfg) => {
  MARKET_CONFIG_MAP[makeKey(cfg.city, cfg.submarket)] = cfg
})

// Optional: default by city if submarket isn't found
const CITY_DEFAULTS: Record<string, ShortTermRentalConfig> = {
  "el segundo": {
    city: "El Segundo",
    regime: "hostile",
    baseADR: 310,
    baseOccupancy: 0.55,
    platformFeePct: 0.15,
    operatingCostPct: 0.28,
    maxNightsPerYear: 120,
    ownerOccupancyRequired: true,
  },
  "redondo beach": {
    city: "Redondo Beach",
    regime: "neutral",
    baseADR: 335,
    baseOccupancy: 0.58,
    platformFeePct: 0.15,
    operatingCostPct: 0.29,
    maxNightsPerYear: 180,
  },
  "manhattan beach": {
    city: "Manhattan Beach",
    regime: "hostile",
    baseADR: 430,
    baseOccupancy: 0.6,
    platformFeePct: 0.15,
    operatingCostPct: 0.32,
    maxNightsPerYear: 90,
    ownerOccupancyRequired: true,
  },
  torrance: {
    city: "Torrance",
    regime: "supportive",
    baseADR: 250,
    baseOccupancy: 0.58,
    platformFeePct: 0.14,
    operatingCostPct: 0.26,
    maxNightsPerYear: 365,
  },
  hawthorne: {
    city: "Hawthorne",
    regime: "neutral",
    baseADR: 225,
    baseOccupancy: 0.58,
    platformFeePct: 0.14,
    operatingCostPct: 0.27,
    maxNightsPerYear: 365,
  },
}

/**
 * Resolve an STR config for a given opportunity.
 * Returns null if we shouldn't even consider STR for this market.
 */
export function getSTRConfigForOpportunity(opp: Opportunity): ShortTermRentalConfig | null {
  const cityKey = opp.city.toLowerCase()
  const submarket = opp.neighborhoodSubmarket
  const key = makeKey(opp.city, submarket)

  // 1) Prefer submarket-level config
  if (MARKET_CONFIG_MAP[key]) {
    return MARKET_CONFIG_MAP[key]
  }

  // 2) Fallback to city default
  if (CITY_DEFAULTS[cityKey]) {
    return CITY_DEFAULTS[cityKey]
  }

  // 3) If we have explicit STR regime on the opportunity, synthesize a config
  if (opp.strRegime) {
    const regime: STRRegime = opp.strRegime
    return {
      city: opp.city,
      submarket,
      regime,
      baseADR: 250,
      baseOccupancy: 0.55,
      platformFeePct: 0.15,
      operatingCostPct: 0.28,
      maxNightsPerYear: opp.strMaxNightsPerYear ?? 180,
      ownerOccupancyRequired: false,
    }
  }

  // 4) Else: opt-out for now
  return null
}
