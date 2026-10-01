import Link from "next/link"

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Your Arbitrage Profile™</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-2">
          Data-driven real estate investment decisions powered by regulatory insight, market intelligence, and capital
          structure modeling.
        </p>
        <p className="text-slate-500 max-w-xl mx-auto">
          Identify asymmetric opportunities where policy, zoning, and incentives create value invisible to conventional
          underwriting.
        </p>
      </section>

      {/* Three-Card Grid */}
      <section className="grid gap-6 md:grid-cols-3">
        {/* Card 1: Start New Assessment */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Start New Assessment</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Analyze a new investment opportunity with our scoring engine across zoning, incentives, financing, and risk.
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Start New Assessment
          </Link>
        </div>

        {/* Card 2: View Opportunities */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">View Opportunities</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Explore curated arbitrage strategies across asset classes and geographies.
          </p>
          <Link
            href="/opportunities"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            View Top Markets
          </Link>
        </div>

        {/* Card 3: Saved Opportunities */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Saved Opportunities</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Review opportunities you've saved along with updated market assumptions.
          </p>
          <Link
            href="/saved"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Saved Opportunities
          </Link>
        </div>
      </section>
    </div>
  )
}
