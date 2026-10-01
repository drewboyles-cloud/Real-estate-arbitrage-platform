"use client"

import { useParams } from "next/navigation"
import { useMemo, useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react"
import { useArbitrageProfile } from "@/context/ArbitrageProfileContext"
import { scoreOpportunity, OPPORTUNITIES } from "@/lib/scoring"
import { attachSTRToOpportunity, type OpportunityWithSTR } from "@/lib/strEngine"

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>()
  const { profile } = useArbitrageProfile()
  const [showDetails, setShowDetails] = useState(false)

  const opportunityWithSTR: OpportunityWithSTR | undefined = useMemo(() => {
    const opp = OPPORTUNITIES.find((o) => o.id === params.id)
    return opp ? attachSTRToOpportunity(opp) : undefined
  }, [params.id])

  if (!opportunityWithSTR) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <p className="text-muted-foreground">Opportunity not found.</p>
        <Link href="/insights" className="text-primary hover:underline mt-4 inline-block">
          ← Back to insights
        </Link>
      </div>
    )
  }

  const opportunity = opportunityWithSTR
  const result = scoreOpportunity(opportunity, profile)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back link */}
      <Link
        href="/insights"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to insights
      </Link>

      {/* Header with score */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-1">{opportunity.title}</h1>
          <div className="text-sm text-muted-foreground">
            {opportunity.city} • {opportunity.zoning} • {opportunity.assetType.replace("_", " ")}
          </div>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{Number(result.score).toFixed(1)}/100</div>
          <div className="text-xs text-muted-foreground">Arbitrage Score</div>
        </div>
      </div>

      {/* Why this scores well */}
      <div className="border rounded-lg p-4 bg-card">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left"
        >
          <div>
            <div className="text-sm font-medium">Why this scores well for you</div>
            {result.drivers.length > 0 ? (
              <div className="text-xs text-muted-foreground mt-1">{result.drivers.join(" • ")}</div>
            ) : (
              <div className="text-xs text-muted-foreground mt-1">
                No dominant drivers detected — adjust your profile or compare with other properties.
              </div>
            )}
          </div>
          {showDetails ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground">Regulatory Environment:</span>
                <span className="ml-2 font-medium capitalize">{opportunity.regulatoryEnv}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Zoning:</span>
                <span className="ml-2 font-medium">{opportunity.zoning}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Legal Units:</span>
                <span className="ml-2 font-medium">{opportunity.legalUnits}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Existing Structures:</span>
                <span className="ml-2 font-medium">{opportunity.existingStructures}</span>
              </div>
            </div>
            {opportunity.underbuiltFlag && (
              <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded inline-block">
                Underbuilt lot with density upside
              </p>
            )}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="border rounded-lg p-6 bg-card space-y-4">
        <h2 className="text-lg font-semibold">Property Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-muted-foreground">Ask Price</div>
            <div className="font-semibold">${opportunity.askPrice.toLocaleString()}</div>
          </div>
          {opportunity.estMarketValue && (
            <div>
              <div className="text-muted-foreground">Est. Market Value</div>
              <div className="font-semibold">${opportunity.estMarketValue.toLocaleString()}</div>
            </div>
          )}
          <div>
            <div className="text-muted-foreground">Lot Size</div>
            <div className="font-semibold">{opportunity.lotSizeSqft.toLocaleString()} sqft</div>
          </div>
          <div>
            <div className="text-muted-foreground">Building Size</div>
            <div className="font-semibold">{opportunity.buildingSqft.toLocaleString()} sqft</div>
          </div>
          <div>
            <div className="text-muted-foreground">Year Built</div>
            <div className="font-semibold">{opportunity.yearBuilt}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Has Alley Access</div>
            <div className="font-semibold">{opportunity.hasAlley ? "Yes" : "No"}</div>
          </div>
        </div>
      </div>

      {/* Income Estimates */}
      <div className="border rounded-lg p-6 bg-card space-y-4">
        <h2 className="text-lg font-semibold">Income Estimates</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          {opportunity.rentExistingEst && (
            <div>
              <div className="text-muted-foreground">Existing Unit Rent (est.)</div>
              <div className="font-semibold">${opportunity.rentExistingEst.toLocaleString()}/mo</div>
            </div>
          )}
          {opportunity.rentADUEst && opportunity.rentADUEst > 0 && (
            <div>
              <div className="text-muted-foreground">ADU Rent Potential (est.)</div>
              <div className="font-semibold">${opportunity.rentADUEst.toLocaleString()}/mo</div>
            </div>
          )}
        </div>
      </div>

      {/* Short-Term Rental (STR) Performance */}
      {opportunity.strResult && opportunity.strResult.allowed && (
        <div className="border rounded-lg p-6 bg-card space-y-4">
          <h2 className="text-lg font-semibold">Short-Term Rental (STR) Performance</h2>

          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-muted-foreground">STR Arbitrage Score</div>
              <div className="text-2xl font-semibold">{opportunity.strResult.score0to10.toFixed(1)} / 10</div>
            </div>

            <div>
              <div className="text-muted-foreground">STR Net Yield</div>
              <div className="text-2xl font-semibold">{opportunity.strResult.strNetYieldPct.toFixed(1)}%</div>
            </div>

            <div>
              <div className="text-muted-foreground">Long-Term Yield</div>
              <div className="text-2xl font-semibold">{opportunity.strResult.longTermGrossYieldPct.toFixed(1)}%</div>
            </div>
          </div>

          {/* STR Uplift indicator */}
          <div className="pt-2">
            <div className="text-muted-foreground text-sm">Uplift vs Long-Term</div>
            <div
              className={`text-lg font-semibold ${opportunity.strResult.upliftVsLongTermPct >= 0 ? "text-green-600" : "text-red-600"}`}
            >
              {opportunity.strResult.upliftVsLongTermPct >= 0 ? "+" : ""}
              {opportunity.strResult.upliftVsLongTermPct.toFixed(1)}%
            </div>
          </div>

          {opportunity.strResult.drivers.length > 0 && (
            <div className="pt-2 border-t">
              <div className="text-muted-foreground text-sm mb-1">Top STR Drivers</div>
              <ul className="list-disc list-inside text-sm text-foreground">
                {opportunity.strResult.drivers.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
          Generate Diligence Packet
        </button>
        <button className="px-4 py-3 rounded-lg border bg-background font-medium hover:bg-muted transition-colors">
          Save to Watchlist
        </button>
      </div>
    </div>
  )
}
