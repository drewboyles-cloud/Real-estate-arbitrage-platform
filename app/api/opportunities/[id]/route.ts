import { NextResponse } from "next/server"
import { OPPORTUNITIES } from "@/lib/scoring"
import { attachSTRToOpportunities } from "@/lib/strEngine"

const opportunitiesWithSTR = attachSTRToOpportunities(OPPORTUNITIES)

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params

  const opportunity = opportunitiesWithSTR.find((opp) => opp.id === id)

  if (!opportunity) {
    return new NextResponse("Not found", { status: 404 })
  }

  return NextResponse.json(opportunity)
}
