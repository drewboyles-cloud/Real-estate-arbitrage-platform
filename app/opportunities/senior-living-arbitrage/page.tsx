import Link from "next/link"

export default function SeniorLivingArbitragePage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Senior Living Conversion & Development Arbitrage</h1>
        <p className="text-slate-600 max-w-3xl">
          Align aging demographics with the right locations, buildings, and approvals paths for senior living.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Why This Arbitrage Exists</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Aging populations are driving long-term demand for senior housing and care.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Zoning and licensing rules create sharp differences between viable and dead-on-arrival sites.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>
                Existing hotels, offices, and medical buildings can be converted into senior living at lower basis than
                new build.
              </span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Many markets under-supply memory care and assisted living despite clear demand data.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Municipalities often support senior housing but lack a systematic way to guide developers.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Who This Is For</h2>
          <ul className="space-y-3">
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Senior living developers and operators.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Healthcare real estate investors.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Family offices seeking durable, needs-based demand.</span>
            </li>
            <li className="text-sm text-slate-600 flex items-start gap-2">
              <span className="text-slate-400 mt-1">•</span>
              <span>Converters targeting hospitality, office, and medical assets.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Risks & Watchpoints</h2>
        <ul className="space-y-3">
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Licensing and regulatory compliance complexity.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Staffing and labor market constraints.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Local opposition in higher-income residential areas.</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Construction complexity of conversions (egress, accessibility, life safety).</span>
          </li>
          <li className="text-sm text-slate-600 flex items-start gap-2">
            <span className="text-slate-400 mt-1">•</span>
            <span>Reimbursement and payer-mix considerations in certain models.</span>
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
