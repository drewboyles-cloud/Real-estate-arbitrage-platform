import Link from "next/link"

export default function CoastalSmallMultifamilyPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Coastal Small Multifamily Arbitrage — South Bay</h1>
        <p className="text-slate-600 max-w-3xl">
          2–6 unit buildings in El Segundo, Torrance, Hawthorne, and nearby submarkets where enforcement, ADUs, and
          income levels create real upside.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Why This Arbitrage Exists</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>
                El Segundo and select South Bay cities have low rent-control enforcement compared with LA City/County.
              </span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>R2 and small multifamily lots can behave like R3/R4 via ADU and SB9/SB10 expansions.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Many assets are long-held, under-managed, and under-rented relative to tenant incomes.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Coastal proximity, job centers, and tight supply support long-term rent growth.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>
                Most investors underwrite as plain-vanilla duplex/triplex rather than future 4–6 unit income streams.
              </span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Who This Is For</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Small and mid-sized multifamily operators.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>1031 exchange buyers upgrading from SFRs.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>ADU-focused developers and builders.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Value-add investors comfortable with light-to-moderate renovations.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Local operators who understand neighborhood-by-neighborhood regulatory nuances.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Risks & Watchpoints</h2>
        <ul className="space-y-3">
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>ADU and SB9/SB10 implementation details varying by city.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Construction cost inflation and contractor capacity.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Parking, access, and lot geometry constraints.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Tenant turnover timing vs business plan pacing.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Potential future policy shifts around small multifamily regulation.</span>
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
