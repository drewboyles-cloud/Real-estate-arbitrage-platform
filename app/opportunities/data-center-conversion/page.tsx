import Link from "next/link"

export default function DataCenterConversionPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Data Center Conversion & Infill Strategy</h1>
        <p className="text-slate-600 max-w-3xl">
          Convert obsolete hotels, offices, and commercial properties into high-value data centers where power and
          policy align.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Why This Arbitrage Exists</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>AI and cloud demand are outpacing existing data center capacity.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Power availability and pricing are now more valuable than the underlying land.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Some cities quietly allow data centers by-right in commercial zones.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>
                Existing hotel and office buildings often have ideal structure, parking, and envelopes for conversion.
              </span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Most buyers still value these assets as hospitality or office, not as compute infrastructure.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Who This Is For</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Data center operators and co-location providers.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Institutional and family office investors focused on digital infrastructure.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Developers willing to navigate utility, power, and cooling complexity.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Groups partnering with hyperscalers, AI companies, or cloud providers.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Risks & Watchpoints</h2>
        <ul className="space-y-3">
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Substation lead times and transformer procurement.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Power pricing volatility and demand charges.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Community resistance around noise, diesel backup, or industrialization.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Cooling and water usage constraints in certain jurisdictions.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Rapidly evolving technical requirements for high-density racks.</span>
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
