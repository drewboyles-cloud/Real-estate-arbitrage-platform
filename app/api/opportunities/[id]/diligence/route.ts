// v0 Real Estate Arbitrage – Diligence Packet API (App Router)

import { NextResponse } from "next/server"
import { OPPORTUNITIES } from "@/lib/scoring"
import { attachSTRToOpportunities } from "@/lib/strEngine"

// ---------- Types for the response shape ----------

type LongTermYield = {
  monthlyRent: number
  annualRent: number
  grossYieldPct: number
}

type STRYield = {
  nightlyRate: number
  occupancyPct: number
  grossRevenue: number
  netRevenue: number
  netYieldPct: number
  upliftVsLongTermPct: number
}

type OwnerOccSummary = {
  estimatedPITI: number
  totalRents: number
  netHousingCost: number
  comment: string
}

type ZoningSummary = {
  zone: string
  maxUnitsAllowed?: number | null
  heightLimitFeet?: number | null
  lotCoveragePct?: number | null
  parkingReqSummary?: string
  adu: {
    jaduAllowed: boolean
    aduAllowed: boolean
    maxADUs?: number | null
    notes?: string
  }
  sb9: {
    eligible: "yes" | "no" | "partial"
    lotSplitAllowed: boolean
    fourUnitConfigAllowed: boolean
    notes?: string
  }
  density: {
    existingUnits: number
    allowedUnits?: number | null
    underbuiltPct?: number | null
  }
  risks?: string[]
}

type IncentivesSummary = {
  opportunityZone: boolean
  gplet: boolean
  taxIncrementTools: string[]
  localDensityBonuses: string[]
  notes?: string
}

type RedevScenario = {
  name: string
  description: string
  estHardCosts: number
  estAnnualRent: number
  yieldOnCostPct: number
  developerMarginPct: number
}

type Comp = {
  address: string
  distanceMiles?: number
  type: "rent" | "sale" | "str"
  beds?: number
  baths?: number
  sqft?: number
  priceOrRent: number
  notes?: string
}

type DiligenceSummary = {
  verdict: string
  keyPositives: string[]
  keyRisks: string[]
  recommendation: string
}

type DiligencePayload = {
  id: string
  address?: string
  city: string
  arbitrageScore: number
  topDrivers: string[]
  zoning: ZoningSummary
  incentives: IncentivesSummary
  yield: {
    longTerm: LongTermYield
    str: STRYield | null
    ownerOcc: OwnerOccSummary
  }
  redevelopmentScenarios: RedevScenario[]
  rentComps: Comp[]
  salesComps: Comp[]
  strComps: Comp[]
  summary: DiligenceSummary
}

// ---------- Helper functions ----------

function computeLongTermYield(opp: any): LongTermYield {
  const monthlyRent = Number(opp.rentExistingEst ?? 0) + Number(opp.rentADUEst ?? 0)
  const annualRent = monthlyRent * 12
  const grossYieldPct = opp.askPrice && opp.askPrice > 0 ? (annualRent / opp.askPrice) * 100 : 0

  return {
    monthlyRent,
    annualRent,
    grossYieldPct: Number(grossYieldPct.toFixed(2)),
  }
}

function buildZoningSummary(opp: any): ZoningSummary {
  const legalUnits = Number(opp.legalUnits ?? 1)
  const allowedUnits =
    opp.zoning === "R3" ? Math.max(legalUnits, 4) : opp.zoning === "R2" ? Math.max(legalUnits, 2) : legalUnits

  const underbuiltPct = allowedUnits > 0 ? Number((((allowedUnits - legalUnits) / allowedUnits) * 100).toFixed(1)) : 0

  const aduAllowed = opp.zoning === "R1" || opp.zoning === "R2"
  const jaduAllowed = opp.zoning === "R1"

  const isElSegundo = typeof opp.city === "string" && opp.city.toLowerCase().includes("el segundo")

  const sb9Eligible: "yes" | "no" | "partial" = isElSegundo ? "no" : "partial"

  return {
    zone: opp.zoning ?? "Unknown",
    maxUnitsAllowed: allowedUnits,
    heightLimitFeet: null,
    lotCoveragePct: null,
    parkingReqSummary: "See local code; ADU parking exemptions may apply.",
    adu: {
      jaduAllowed,
      aduAllowed,
      maxADUs: aduAllowed ? 2 : 0,
      notes: aduAllowed
        ? "State ADU law generally overrides local minimums for this zone."
        : "ADUs likely limited or disallowed; requires case-by-case review.",
    },
    sb9: {
      eligible: sb9Eligible,
      lotSplitAllowed: sb9Eligible === "yes",
      fourUnitConfigAllowed: sb9Eligible !== "no",
      notes: isElSegundo
        ? "City has effectively blocked SB-9 through local implementation; treat as non-SB-9 parcel for now."
        : "State SB-9 may permit lot split + up to 4 units; confirm local overlays.",
    },
    density: {
      existingUnits: legalUnits,
      allowedUnits,
      underbuiltPct,
    },
    risks: [],
  }
}

function buildIncentivesSummary(): IncentivesSummary {
  return {
    opportunityZone: false,
    gplet: false,
    taxIncrementTools: [],
    localDensityBonuses: [],
    notes:
      "No mapped incentives in v0 dataset. Future versions will integrate OZ, GPLET, TIF/CFD/PID/SID, TOD bonuses, and local programs.",
  }
}

function computeOwnerOccSummary(opp: any, longTerm: LongTermYield): OwnerOccSummary {
  const estimatedPITI = Math.max(opp.askPrice * 0.0055, 4000)
  const totalRents = longTerm.monthlyRent
  const netHousingCost = estimatedPITI - totalRents

  let comment = ""
  if (netHousingCost <= 0) {
    comment = "Rents fully cover or exceed estimated PITI – aggressive house-hack."
  } else if (netHousingCost <= estimatedPITI * 0.5) {
    comment = "Rents significantly offset ownership cost, with strong equity upside potential."
  } else {
    comment = "Rents provide partial offset to ownership cost; arbitrage is more long-term / redevelopment-driven."
  }

  return {
    estimatedPITI: Math.round(estimatedPITI),
    totalRents: Math.round(totalRents),
    netHousingCost: Math.round(netHousingCost),
    comment,
  }
}

function computeSTRYield(opp: any, longTerm: LongTermYield): STRYield | null {
  const strResult = opp.strResult ?? null
  if (!strResult) return null

  const nightlyRate = Number(strResult.nightlyRate ?? 0)
  const occupancyPct = Number(strResult.occupancyPct ?? 0)
  const grossRevenue = nightlyRate * 365 * (occupancyPct / 100)
  const netRevenue = grossRevenue * 0.7
  const netYieldPct = opp.askPrice && opp.askPrice > 0 ? (netRevenue / opp.askPrice) * 100 : 0

  const upliftVsLongTermPct =
    longTerm.annualRent > 0 ? Number((((netRevenue - longTerm.annualRent) / longTerm.annualRent) * 100).toFixed(1)) : 0

  return {
    nightlyRate,
    occupancyPct,
    grossRevenue: Math.round(grossRevenue),
    netRevenue: Math.round(netRevenue),
    netYieldPct: Number(netYieldPct.toFixed(2)),
    upliftVsLongTermPct,
  }
}

function buildRedevelopmentScenarios(opp: any): RedevScenario[] {
  const longTerm = computeLongTermYield(opp)

  return [
    {
      name: "Scenario A – Keep Structure + Add ADU",
      description:
        "Retain existing improvements, add a conforming ADU in rear yard or above garage, and upgrade interiors to market standard.",
      estHardCosts: 350000,
      estAnnualRent: longTerm.annualRent + 36000,
      yieldOnCostPct: Number((((longTerm.annualRent + 36000) / (opp.askPrice + 350000)) * 100).toFixed(1)),
      developerMarginPct: 15,
    },
    {
      name: "Scenario B – Full Redevelopment to Max Density",
      description:
        "Scrape existing improvements and rebuild to near-max density allowed by zoning (subject to design, parking and financing constraints).",
      estHardCosts: 1500000,
      estAnnualRent: longTerm.annualRent * 2.2,
      yieldOnCostPct: Number((((longTerm.annualRent * 2.2) / (opp.askPrice + 1500000)) * 100).toFixed(1)),
      developerMarginPct: 20,
    },
  ]
}

function buildComps(opp: any): { rent: Comp[]; sales: Comp[]; str: Comp[] } {
  const baseComp: Comp = {
    address: `${opp.city} – Placeholder Comp`,
    type: "sale",
    priceOrRent: opp.askPrice ?? 0,
    notes: "Placeholder comp – wire to real MLS/AirDNA in v1.",
  }

  return {
    rent: [{ ...baseComp, type: "rent", priceOrRent: 3500 }],
    sales: [{ ...baseComp, type: "sale", priceOrRent: opp.askPrice ?? 0 }],
    str: [{ ...baseComp, type: "str", priceOrRent: 275 }],
  }
}

function buildSummary(opp: any, topDrivers: string[], zoning: ZoningSummary): DiligenceSummary {
  const positives: string[] = []
  const risks: string[] = []

  if (zoning.density.underbuiltPct && zoning.density.underbuiltPct > 0) {
    positives.push("Underbuilt relative to allowed density.")
  }
  if (zoning.adu.aduAllowed) positives.push("ADU-eligible under state law.")
  if (zoning.sb9.eligible !== "no") positives.push("Potential SB-9 upside (subject to local constraints).")

  if (zoning.sb9.eligible === "no") risks.push("SB-9 impact limited or blocked in this jurisdiction.")
  if (zoning.risks && zoning.risks.length) risks.push(...zoning.risks)

  const verdict = `This property scores ${opp.arbitrageScore ?? 0}/100 with key drivers: ${topDrivers.join(", ")}.`

  const recommendation =
    "Proceed to deeper diligence (rent roll, permits, survey, and contractor pricing) before writing an offer."

  return {
    verdict,
    keyPositives: positives,
    keyRisks: risks,
    recommendation,
  }
}

// ---------- Route Handler ----------

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  if (!id) {
    return NextResponse.json({ error: "Missing opportunity id" }, { status: 400 })
  }

  const baseOpp = OPPORTUNITIES.find((o) => o.id === id)

  if (!baseOpp) {
    return NextResponse.json({ error: "Opportunity not found" }, { status: 404 })
  }

  // Attach STR data using existing STR engine
  const [oppWithSTR] = attachSTRToOpportunities([baseOpp as any])
  const opp: any = oppWithSTR ?? baseOpp

  const arbitrageScore = Number(opp.arbitrageScore ?? 0)
  const topDrivers: string[] = Array.isArray(opp.drivers) ? opp.drivers : []

  const longTerm = computeLongTermYield(opp)
  const zoning = buildZoningSummary(opp)
  const incentives = buildIncentivesSummary()
  const ownerOcc = computeOwnerOccSummary(opp, longTerm)
  const strYield = computeSTRYield(opp, longTerm)
  const redev = buildRedevelopmentScenarios(opp)
  const comps = buildComps(opp)
  const summary = buildSummary(opp, topDrivers, zoning)

  const payload: DiligencePayload = {
    id: opp.id,
    address: opp.address,
    city: opp.city ?? "Unknown",
    arbitrageScore,
    topDrivers,
    zoning,
    incentives,
    yield: {
      longTerm,
      str: strYield,
      ownerOcc,
    },
    redevelopmentScenarios: redev,
    rentComps: comps.rent,
    salesComps: comps.sales,
    strComps: comps.str,
    summary,
  }

  return NextResponse.json(payload)
}
