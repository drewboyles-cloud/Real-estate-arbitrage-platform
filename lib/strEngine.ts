// lib/strEngine.ts

import type { Opportunity } from "./scoring"
import { getSTRConfigForOpportunity } from "./strConfig"
import { evaluateShortTermRental } from "./str"
import type { ShortTermRentalResult } from "./str"

export interface OpportunityWithSTR extends Opportunity {
  strResult?: ShortTermRentalResult
}

/**
 * Attach STR analysis to a single opportunity, if applicable.
 */
export function attachSTRToOpportunity(opp: Opportunity): OpportunityWithSTR {
  const cfg = getSTRConfigForOpportunity(opp)
  if (!cfg) {
    return { ...opp, strResult: undefined }
  }

  const strResult = evaluateShortTermRental(opp, cfg)
  return { ...opp, strResult }
}

/**
 * Batch helper for lists (e.g. in /insights or search results).
 */
export function attachSTRToOpportunities(opps: Opportunity[]): OpportunityWithSTR[] {
  return opps.map((o) => attachSTRToOpportunity(o))
}
