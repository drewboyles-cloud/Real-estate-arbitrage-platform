import { OPPORTUNITIES, computeOpportunityArbitrageScore, type Opportunity } from "@/lib/scoring"
import { attachSTRToOpportunities } from "@/lib/strEngine"

const withSTR = attachSTRToOpportunities(OPPORTUNITIES)

function getTopDrivers(opp: Opportunity): string[] {
  const drivers: string[] = []
  if (opp.neighborhoodTier === "prime") drivers.push("Prime-tier (+15%)")
  if (opp.neighborhoodTier === "strong") drivers.push("Strong-tier (+12%)")
  if (opp.neighborhoodTier === "value") drivers.push("Value-tier (-8%)")
  if (opp.r2UnderbuiltFlag) drivers.push("R2 underbuilt")
  if (opp.r3UnderbuiltFlag) drivers.push("R3 underbuilt")
  if (opp.rentADUEst && opp.rentADUEst > 0) drivers.push("ADU income potential")
  if (opp.zoning === "R3") drivers.push("R3 zoning")
  if (opp.zoning === "R2") drivers.push("R2 zoning")
  if (opp.operationalEnv === "low" && opp.developmentEnv === "low") drivers.push("Low reg friction")
  const dirtValuePerUnit = opp.askPrice / opp.legalUnits
  if (dirtValuePerUnit < 500000) drivers.push("Exceptional dirt value")
  else if (dirtValuePerUnit < 600000) drivers.push("Strong dirt value")
  return drivers.slice(0, 3)
}

export default function ValidationPage() {
  const results = withSTR
    .map((opp) => {
      const score = computeOpportunityArbitrageScore(opp)
      return {
        id: opp.id,
        found: true,
        score,
        tier: opp.neighborhoodTier,
        submarket: opp.neighborhoodSubmarket,
        title: opp.title,
        city: opp.city,
        drivers: getTopDrivers(opp),
        strResult: opp.strResult,
      }
    })
    .sort((a, b) => b.score - a.score) // Sort by score descending

  const elSegundoProps = results.filter((r) => r.city === "El Segundo")
  const hawthorneProps = results.filter((r) => r.city === "Hawthorne")
  const redondoProps = results.filter((r) => r.city === "Redondo Beach")
  const hollyglenProp = results.find((r) => r.submarket?.includes("Hollyglen"))
  const genericHawthorne = results.filter((r) => r.tier === "value" && r.city === "Hawthorne")
  const primeProps = results.filter((r) => r.tier === "prime")
  const strongProps = results.filter((r) => r.tier === "strong")
  const fourplexYield = results.find((r) => r.id.includes("fourplex") || r.title.toLowerCase().includes("fourplex"))

  // Sanity checks
  const maxElSegundo = Math.max(...elSegundoProps.map((p) => p.score), 0)
  const maxHawthorne = Math.max(...genericHawthorne.map((p) => p.score), 0)
  const maxRedondo = Math.max(...redondoProps.map((p) => p.score), 0)

  const checkA = elSegundoProps.length > 0 && genericHawthorne.length > 0 && maxElSegundo > maxHawthorne
  const checkB_above = hollyglenProp && genericHawthorne.every((h) => hollyglenProp.score > h.score)
  const checkB_below =
    hollyglenProp && primeProps.length > 0 && hollyglenProp.score < Math.max(...primeProps.map((p) => p.score))
  const checkC = redondoProps.length > 0 && genericHawthorne.length > 0 && maxRedondo > maxHawthorne
  const checkD =
    fourplexYield &&
    primeProps.length > 0 &&
    strongProps.length > 0 &&
    fourplexYield.score < Math.max(...primeProps.map((p) => p.score)) &&
    fourplexYield.score < Math.max(...strongProps.map((p) => p.score))
  const checkE = hollyglenProp ? genericHawthorne.every((h) => h.score < hollyglenProp.score) : true

  const nonUnderbuiltSFR = OPPORTUNITIES.filter(
    (o) => !o.underbuiltFlag && !o.r2UnderbuiltFlag && (o.assetType === "SFR_ADU" || o.assetType === "SFR_Underbuilt"),
  )
  const checkF =
    primeProps.length > 0 &&
    strongProps.length > 0 &&
    nonUnderbuiltSFR.every((o) => {
      const score = computeOpportunityArbitrageScore(o)
      return score < Math.max(...primeProps.map((p) => p.score)) && score < Math.max(...strongProps.map((p) => p.score))
    })

  const allPassed = checkA && checkB_above && checkB_below && checkC && checkD && checkE && checkF

  const checks = [
    {
      label: "a) El Segundo (prime) > all generic Hawthorne",
      pass: checkA,
      detail: `El Segundo max: ${maxElSegundo.toFixed(1)}, Hawthorne max: ${maxHawthorne.toFixed(1)}`,
    },
    {
      label: "b) Hollyglen > generic Hawthorne",
      pass: checkB_above,
      detail: hollyglenProp ? `Hollyglen: ${hollyglenProp.score.toFixed(1)}` : "Hollyglen not found",
    },
    {
      label: "   Hollyglen < El Segundo (prime)",
      pass: checkB_below,
      detail: hollyglenProp
        ? `Hollyglen: ${hollyglenProp.score.toFixed(1)} < Prime max: ${Math.max(...primeProps.map((p) => p.score)).toFixed(1)}`
        : "",
    },
    {
      label: "c) Redondo Beach > generic Hawthorne",
      pass: checkC,
      detail: `Redondo max: ${maxRedondo.toFixed(1)}`,
    },
    {
      label: "d) Fourplex yield < prime & strong tiers",
      pass: checkD,
      detail: fourplexYield ? `Fourplex: ${fourplexYield.score.toFixed(1)}` : "No fourplex found",
    },
    {
      label: "e) No generic Hawthorne > Hollyglen",
      pass: checkE,
      detail: "",
    },
    {
      label: "f) No non-underbuilt SFR > prime/strong",
      pass: checkF,
      detail: `${nonUnderbuiltSFR.length} non-underbuilt SFRs checked`,
    },
  ]

  // Group results by city for display
  const groupedByCity = results.reduce(
    (acc, r) => {
      const city = r.city || "Unknown"
      if (!acc[city]) acc[city] = []
      acc[city].push(r)
      return acc
    },
    {} as Record<string, typeof results>,
  )

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Arbitrage Scoring Engine Validation</h1>
      <p className="text-muted-foreground">
        Validating {OPPORTUNITIES.length} properties across {Object.keys(groupedByCity).length} cities
      </p>

      {/* Results Table - All Properties */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">All Properties (sorted by score)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-border text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-3 py-2 text-left">Property</th>
                <th className="px-3 py-2 text-left">City</th>
                <th className="px-3 py-2 text-left">Submarket</th>
                <th className="px-3 py-2 text-left">Tier</th>
                <th className="px-3 py-2 text-right">Score</th>
                <th className="px-3 py-2 text-right">STR Yield</th>
                <th className="px-3 py-2 text-right">STR Uplift</th>
                <th className="px-3 py-2 text-left">Top Drivers</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">
                    {r.title.length > 40 ? r.title.substring(0, 40) + "..." : r.title}
                  </td>
                  <td className="px-3 py-2">{r.city}</td>
                  <td className="px-3 py-2 text-xs">{r.submarket}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        r.tier === "prime"
                          ? "bg-green-100 text-green-800"
                          : r.tier === "strong"
                            ? "bg-blue-100 text-blue-800"
                            : r.tier === "value"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {r.tier}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right font-mono font-semibold">{Number(r.score).toFixed(1)}</td>
                  <td className="px-3 py-2 text-right font-mono text-xs">
                    {r.strResult ? `${r.strResult.strNetYieldPct.toFixed(1)}%` : "—"}
                  </td>
                  <td className="px-3 py-2 text-right font-mono text-xs">
                    {r.strResult ? (
                      <span className={r.strResult.upliftVsLongTermPct > 0 ? "text-green-600" : "text-red-600"}>
                        {r.strResult.upliftVsLongTermPct > 0 ? "+" : ""}
                        {r.strResult.upliftVsLongTermPct.toFixed(0)}%
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground text-xs">{r.drivers.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sanity Checks */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sanity Checks</h2>
        <div className="space-y-2">
          {checks.map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className={`px-2 py-0.5 rounded text-xs font-bold ${
                  c.pass ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {c.pass ? "PASS" : "FAIL"}
              </span>
              <span>{c.label}</span>
              {c.detail && <span className="text-muted-foreground text-sm">({c.detail})</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Summary */}
      <section className="p-4 rounded-lg border border-border bg-card">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        {allPassed ? (
          <p className="text-green-700 font-medium">Overall: PASS - All sanity checks passed.</p>
        ) : (
          <div>
            <p className="text-red-700 font-medium mb-2">Overall: ATTENTION NEEDED - Some checks failed.</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside">
              {!checkA && <li>Increase prime-tier multiplier or reduce value-tier further</li>}
              {(!checkB_above || !checkB_below) && <li>Adjust strong-tier multiplier positioning</li>}
              {!checkC && <li>Boost Redondo Beach scoring or reduce Hawthorne</li>}
              {!checkD && <li>Reduce yield-only play scoring vs arbitrage plays</li>}
              {!checkE && <li>Ensure strong-tier always beats value-tier</li>}
              {!checkF && <li>Underbuilt bonus may need increase</li>}
            </ul>
          </div>
        )}
      </section>
    </main>
  )
}
