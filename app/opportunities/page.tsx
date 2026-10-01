import Link from "next/link"

const opportunities = [
  {
    slug: "affordable-housing-arbitrage",
    title: "Affordable Housing Incentive & Density Arbitrage",
    summary:
      "Leverage density bonuses, state housing laws, and stacked incentives to unlock value in sites that are invisible to conventional underwriting.",
    bullets: [
      "Identifies sites where policy-driven density is far above what zoning appears to allow.",
      "Scores locations by LIHTC potential, CEQA relief, transit priority, and local overlays.",
      "Targets asymmetric upside where public incentives de-risk private capital.",
    ],
  },
  {
    slug: "coastal-small-multifamily-southbay",
    title: "Coastal Small Multifamily Arbitrage — South Bay",
    summary:
      "Target 2–6 unit buildings in El Segundo and the South Bay where ADUs, low enforcement, and zoning asymmetries create outsized value-add potential.",
    bullets: [
      "Scores R2 and small multifamily lots for ADU and SB9/SB10 density stacking.",
      "Captures rent lift in cities with low rent-control enforcement and strong incomes.",
      "Prioritizes locations with job nodes, coastal demand, and constrained supply.",
    ],
  },
  {
    slug: "data-center-conversion",
    title: "Data Center Conversion & Infill Strategy",
    summary:
      "Convert obsolete hotels, offices, and low-yield commercial into high-value data centers in power-privileged jurisdictions.",
    bullets: [
      "Scores sites by power availability, pricing, and substation timelines.",
      "Evaluates zoning permissiveness and community sentiment toward data centers.",
      "Flags cooling, water, and fiber proximity as core arbitrage drivers.",
    ],
  },
  {
    slug: "senior-living-arbitrage",
    title: "Senior Living Conversion & Development Arbitrage",
    summary:
      "Align surging senior housing demand with zoning and building stock that can support assisted living, memory care, and independent living.",
    bullets: [
      "Layers demographic aging curves on top of permissive land-use and licensing regimes.",
      "Identifies hotel, office, and medical conversions optimal for senior living.",
      "Scores municipalities by approvals friction and political support.",
    ],
  },
  {
    slug: "entitled-land-banking",
    title: "Entitled Land Banking Strategy",
    summary:
      "Control fully-entitled sites in supply-constrained markets and monetize through pad sales, phased development, or JV structures.",
    bullets: [
      "Separates land appreciation from vertical construction risk.",
      "Scores jurisdictions by reimbursement programs, OZ/GPLET/TIF tools, and entitlement durability.",
      "Targets locations where infrastructure is funded but value is not yet priced in.",
    ],
  },
  {
    slug: "last-mile-distribution",
    title: "Last-Mile Distribution Centers",
    summary:
      "Assemble and reposition infill industrial and commercial sites into last-mile logistics assets serving dense population hubs.",
    bullets: [
      "Scores sites by drive-time access to rooftops and logistics corridors.",
      "Evaluates conversion potential from legacy uses into modern industrial layouts.",
      "Factors tenant stickiness, vacancy risk, and rent growth in e-commerce nodes.",
    ],
  },
  {
    slug: "sunbelt-infill-redevelopment",
    title: "Sunbelt Infill Redevelopment",
    summary:
      "Target underutilized infill parcels in high-growth Sunbelt metros where zoning, migration, and infrastructure create multi-phase upside.",
    bullets: [
      "Scores submarkets by population and income growth, not just headline cap rates.",
      "Identifies parcels with mixed-use, multifamily, or commercial upzoning potential.",
      "Models multiple exit paths: build-to-core, merchant build, or pad sales.",
    ],
  },
]

export default function OpportunitiesPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Recommended Arbitrage Plays</h1>
        <p className="text-slate-600 max-w-3xl">
          These are strategy-level use cases, not individual deals. Each represents a category of arbitrage where
          regulatory, policy, or market asymmetries create value for informed investors.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {opportunities.map((opp) => (
          <div key={opp.slug} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{opp.title}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{opp.summary}</p>
            <ul className="space-y-2">
              {opp.bullets.map((bullet, idx) => (
                <li key={idx} className="text-sm text-slate-500 flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Link
              href={`/opportunities/${opp.slug}`}
              className="inline-block text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors"
            >
              View Details →
            </Link>
          </div>
        ))}
      </section>
    </div>
  )
}
