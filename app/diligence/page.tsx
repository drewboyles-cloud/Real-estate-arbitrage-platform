"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, FileText, Shield, Droplets, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DiligencePacket() {
  return (
    <div className="min-h-screen bg-background">
      {/* Premium Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
          <Link
            href="/parcel/12345"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Parcel
          </Link>
          <div className="text-center">
            <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Automated Diligence Packet
            </h1>
            <p className="mt-3 text-balance text-sm text-muted-foreground sm:text-base">
              Comprehensive investment intelligence for 1234 W Desert View Rd, Buckeye, AZ
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <span>Generated: {new Date().toLocaleDateString()}</span>
              <span>•</span>
              <span>APN: 301-45-678</span>
              <span>•</span>
              <span className="font-semibold text-foreground">4.82 acres</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="space-y-6">
          {/* 1. Zoning Summary */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Zoning Summary</h2>
                  <p className="text-sm text-muted-foreground">Current classification and permitted uses</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Current Zoning
                  </label>
                  <div className="text-base font-semibold text-foreground">R1-7 (Single Family Residential)</div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Minimum Lot Size
                  </label>
                  <div className="text-base font-semibold text-foreground">7,000 sq ft</div>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Permitted Uses
                </label>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                    Single-Family Homes
                  </span>
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                    Parks & Recreation
                  </span>
                  <span className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground">
                    Public Utilities
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Rezoning Potential
                </label>
                <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
                  <span className="font-semibold">High:</span> Adjacent parcels rezoned to R1-10 and R1-43 within last
                  24 months
                </div>
              </div>
            </div>
          </div>

          {/* 2. Incentive Layers */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Incentive Layers</h2>
                  <p className="text-sm text-muted-foreground">Tax benefits and economic development programs</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex items-start gap-4 rounded-md border border-green-200 bg-green-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-green-900">Qualified Opportunity Zone</div>
                  <p className="mt-1 text-sm text-green-800">
                    Eligible for capital gains deferral until 2026 and up to 10% basis step-up. Additional 10% exclusion
                    if held 7+ years.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-md border border-green-200 bg-green-50 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-green-900">TIF District (Westgate Development Area)</div>
                  <p className="mt-1 text-sm text-green-800">
                    Tax Increment Financing available for infrastructure improvements. Estimated value: $45K-$65K over
                    10 years.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-md border border-border bg-muted/30 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                  <svg className="h-5 w-5 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">GPLET</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Not currently eligible. Commercial/industrial development required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Environmental Indicators */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Environmental Indicators</h2>
                  <p className="text-sm text-muted-foreground">Risk assessment and site conditions</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    FEMA Flood Zone
                  </label>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">Zone X</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Low Risk
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">No special flood insurance requirements</p>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Soil Conditions
                  </label>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">Sandy Loam</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Suitable
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Good drainage, construction-ready</p>
                </div>
              </div>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Environmental Clearances
                </label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">Wetlands</span>
                    <span className="font-medium text-green-600">None identified</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">Phase I ESA</span>
                    <span className="font-medium text-green-600">Clear</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">Protected Species</span>
                    <span className="font-medium text-green-600">None present</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Utility Feasibility */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Utility Feasibility</h2>
                  <p className="text-sm text-muted-foreground">Infrastructure availability and connection costs</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Water</label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Available
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-foreground">Main: 2,500 ft</div>
                  <div className="text-xs text-muted-foreground">Est. connection: $18,000-$22,000</div>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Sewer</label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Available
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-foreground">Municipal - Adjacent</div>
                  <div className="text-xs text-muted-foreground">Est. connection: $12,000-$15,000</div>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Electric
                    </label>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">Ready</span>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-foreground">APS - Adjacent</div>
                  <div className="text-xs text-muted-foreground">Overhead and underground options</div>
                </div>
                <div className="rounded-md border border-border bg-muted/30 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Natural Gas
                    </label>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-bold text-amber-700">
                      Extension Required
                    </span>
                  </div>
                  <div className="mb-1 text-sm font-semibold text-foreground">Southwest Gas - 1 mile</div>
                  <div className="text-xs text-muted-foreground">Est. extension: $35,000-$45,000</div>
                </div>
              </div>
              <div className="rounded-md border border-primary/30 bg-primary/5 p-4">
                <div className="text-sm font-semibold text-foreground">Total Estimated Utility Costs</div>
                <div className="mt-1 text-2xl font-bold text-foreground">$65K - $82K</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on standard residential development. Commercial builds may vary.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Redevelopment Potential */}
          <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-muted/30 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Redevelopment Potential</h2>
                  <p className="text-sm text-muted-foreground">Future value drivers and market dynamics</p>
                </div>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Market Growth Indicators
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Population Growth (5yr)</span>
                    <span className="font-semibold text-green-600">+18.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Median Home Price Increase</span>
                    <span className="font-semibold text-green-600">+24.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">New Construction Permits</span>
                    <span className="font-semibold text-green-600">+41.2%</span>
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-border bg-muted/30 p-4">
                <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Comparable Sales (0.5 mi radius, 12 months)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Median Price per Acre</span>
                    <span className="font-semibold text-foreground">$142,500</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Transaction Volume</span>
                    <span className="font-semibold text-foreground">12 sales</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">Days on Market (avg)</span>
                    <span className="font-semibold text-foreground">68 days</span>
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-purple-200 bg-purple-50 p-4">
                <div className="mb-2 text-sm font-semibold text-purple-900">Strategic Opportunities</div>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Adjacent to proposed Westgate commercial corridor expansion</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Within 2 miles of new Intel facility (15,000 jobs projected)</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Potential for land banking with 7-15 year horizon</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="h-14 rounded-lg px-12 text-base font-semibold shadow-lg">
            <Download className="mr-3 h-5 w-5" />
            Download PDF
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Complete 24-page diligence packet including exhibits and supporting documentation
          </p>
        </div>
      </div>
    </div>
  )
}
