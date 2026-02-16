import Link from "next/link"

export default function AffordableHousingArbitragePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Affordable Housing Incentive & Density Arbitrage</h1>
        <p className="text-slate-600 max-w-3xl">
          Find sites where policy, incentives, and density bonuses create more value than traditional underwriting can
          see.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Why This Arbitrage Exists</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>State housing laws override local zoning in specific contexts.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Density bonuses, parking reductions, and height waivers are unevenly understood.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>LIHTC and local subsidy layering can transform marginal deals into core holdings.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Transit priority and CEQA relief zones create entitlement fast lanes.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Most capital still prices sites as if none of this exists.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Who This Is For</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Affordable housing developers.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Mission-driven family offices and foundations.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>ESG-focused institutional investors.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Municipal partners seeking private capital alignment.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Operators comfortable with complex capital stacks.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Risks & Watchpoints</h2>
        <ul className="space-y-3">
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Complexity of layering multiple subsidy programs.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Timing risk on awards, allocations, and approvals.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Political shifts that can alter incentive programs.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Construction cost volatility vs fixed affordable rents.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Community expectations for deeper affordability than economics support.</span>
          </li>
        </ul>
      </section>

      <section className="flex flex-col items-center gap-4 pt-4">
        <button className="bg-slate-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
          Generate Diligence Packet
        </button>
        <Link href="/opportunities" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
          ← Back to opportunities
        </Link>
      </section>
    </div>
  )
}
