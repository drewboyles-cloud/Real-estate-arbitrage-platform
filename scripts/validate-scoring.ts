import { OPPORTUNITIES, computeOpportunityArbitrageScore, type Opportunity } from "../lib/scoring"

// Properties to validate
const TARGET_IDS = [
  "848-penn-st-el-segundo",
  "hawthorne-hollyglen-r2-sfr-adu-1",
  "hawthorne-r2-duplex-adu-1",
  "hawthorne-r3-triplex-underbuilt-1",
  "hawthorne-r1-sfr-large-adu-1",
  "445-ocean", // Redondo R3 dev
  "hawthorne-r3-fourplex-yield-1",
]

// Get top 3 drivers for a property
function getTopDrivers(opp: Opportunity): string[] {
  const drivers: string[] = []

  // Neighborhood tier
  if (opp.neighborhoodTier === "prime") drivers.push("Prime-tier (+15%)")
  if (opp.neighborhoodTier === "strong") drivers.push("Strong-tier (+12%)")
  if (opp.neighborhoodTier === "value") drivers.push("Value-tier (-8%)")

  // Underbuilt
  if (opp.r2UnderbuiltFlag) drivers.push("R2 underbuilt")
  if (opp.r3UnderbuiltFlag) drivers.push("R3 underbuilt")
  if (opp.underbuiltFlag && !opp.r2UnderbuiltFlag && !opp.r3UnderbuiltFlag) drivers.push("Underbuilt")

  // ADU potential
  if (opp.rentADUEst && opp.rentADUEst > 0) drivers.push("ADU income")

  // Density
  if (opp.zoning === "R3") drivers.push("R3 zoning")
  if (opp.zoning === "R2") drivers.push("R2 zoning")

  // Regulatory
  if (opp.operationalEnv === "low" && opp.developmentEnv === "low") drivers.push("Low reg friction")
  if (opp.operationalEnv === "high" || opp.developmentEnv === "high") drivers.push("High enforcement penalty")

  // Dirt value
  const dirtValuePerUnit = opp.askPrice / opp.legalUnits
  if (dirtValuePerUnit < 500000) drivers.push("Great dirt value")
  else if (dirtValuePerUnit < 600000) drivers.push("Strong dirt value")

  return drivers.slice(0, 3)
}

// Run validation
console.log("=== ARBITRAGE SCORING ENGINE VALIDATION ===\n")

// 1. Build validation table
console.log("| Property | City | Submarket | Tier | Score | Top Drivers |")
console.log("|----------|------|-----------|------|-------|-------------|")

const results = OPPORTUNITIES.map((opp) => {
  const score = computeOpportunityArbitrageScore(opp)
  return {
    id: opp.id,
    title: opp.title,
    city: opp.city,
    score,
    tier: opp.neighborhoodTier,
    submarket: opp.neighborhoodSubmarket,
    drivers: getTopDrivers(opp),
  }
}).sort((a, b) => b.score - a.score)

for (const r of results) {
  console.log(
    `| ${r.title.substring(0, 30)}... | ${r.city} | ${r.submarket} | ${r.tier} | ${Number(r.score).toFixed(1)} | ${r.drivers.join(", ")} |`,
  )
}

console.log(`\nTotal properties: ${OPPORTUNITIES.length}`)

console.log("\n=== SANITY CHECKS ===\n")

// Group by city/tier for checks
const elSegundoProps = results.filter((r) => r.city === "El Segundo")
const genericHawthorne = results.filter((r) => r.tier === "value")
const primeProps = results.filter((r) => r.tier === "prime")
const strongProps = results.filter((r) => r.tier === "strong")

const maxElSegundo = Math.max(...elSegundoProps.map((p) => p.score), 0)
const maxHawthorne = Math.max(...genericHawthorne.map((p) => p.score), 0)

const checkA = elSegundoProps.length > 0 && genericHawthorne.length > 0 && maxElSegundo > maxHawthorne
console.log(
  `a) El Segundo > all Hawthorne: ${checkA ? "PASS" : "FAIL"} (ES: ${maxElSegundo.toFixed(1)}, Haw: ${maxHawthorne.toFixed(1)})`,
)

const checkB =
  primeProps.length > 0 &&
  strongProps.length > 0 &&
  Math.max(...primeProps.map((p) => p.score)) > Math.max(...strongProps.map((p) => p.score))
console.log(`b) Prime tier > Strong tier: ${checkB ? "PASS" : "FAIL"}`)

const checkC =
  strongProps.length > 0 &&
  genericHawthorne.length > 0 &&
  Math.min(...strongProps.map((p) => p.score)) > Math.max(...genericHawthorne.map((p) => p.score))
console.log(`c) Strong tier > Value tier: ${checkC ? "PASS" : "FAIL"}`)

// Summary
console.log("\n=== SUMMARY ===\n")
const allPassed = checkA && checkB && checkC
console.log(allPassed ? "Overall: PASS" : "Overall: ATTENTION NEEDED")
