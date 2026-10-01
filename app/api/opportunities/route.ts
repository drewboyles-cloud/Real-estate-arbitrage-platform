import { NextResponse } from "next/server"
import { OPPORTUNITIES } from "@/lib/scoring"
import { attachSTRToOpportunities } from "@/lib/strEngine"

// Pre-attach STR once per process so every request is cheap
const opportunitiesWithSTR = attachSTRToOpportunities(OPPORTUNITIES)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const city = searchParams.get("city")
  const minScoreParam = searchParams.get("minScore")

  let data = [...opportunitiesWithSTR]

  // Optional: filter by city (case-insensitive)
  if (city) {
    const cityLower = city.toLowerCase()
    data = data.filter((opp) => opp.city.toLowerCase() === cityLower)
  }

  // Optional: filter by minimum arbitrage score (0–100)
  if (minScoreParam) {
    const minScore = Number(minScoreParam)
    if (!Number.isNaN(minScore)) {
      data = data.filter((opp) => (opp.arbitrageScore ?? 0) >= minScore)
    }
  }

  // Always sort best → worst
  data.sort((a, b) => (b.arbitrageScore ?? 0) - (a.arbitrageScore ?? 0))

  return NextResponse.json({ opportunities: data })
}
