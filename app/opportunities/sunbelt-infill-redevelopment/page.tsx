import Link from "next/link"

export default function SunbeltInfillRedevelopmentPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Sunbelt Infill Redevelopment</h1>
        <p className="text-slate-600 max-w-3xl">
          Capitalize on migration, infrastructure, and zoning in fast-growing Sunbelt metros through targeted infill
          plays.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Why This Arbitrage Exists</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Population and income growth in the Sunbelt are unevenly reflected in land and asset pricing.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Many infill parcels are stranded by outdated assumptions about use and density.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Infrastructure and transit investments create new nodes of viability.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Municipalities often support higher density but lack capital willing to go first.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Traditional underwriting frequently lags behind on-the-ground shifts in demand.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Who This Is For</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Infill developers.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Regional and national real estate funds.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Family offices looking for Sunbelt exposure with structured risk.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Sponsors specializing in entitlement and upzoning.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Risks & Watchpoints</h2>
        <ul className="space-y-3">
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Overbuilding risk in certain submarkets.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Infrastructure and utility timing misaligned with project schedules.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Political changes impacting approvals and incentives.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Construction cost and interest rate volatility.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Competition from large integrated developers.</span>
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
