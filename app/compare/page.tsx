"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Building2, Shield, Droplets, Zap, Award, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const parcelA = {
  id: 1,
  address: "1234 W Desert View Rd",
  city: "Buckeye, AZ 85326",
  arbitrageScore: 84.5,
  zoning: "R1-7 (Single Family Residential)",
  parcelSize: "4.82 acres",
  incentives: ["Opportunity Zone", "TIF District"],
  environmentalFlags: [
    { label: "FEMA Flood Zone", value: "Zone X", status: "safe" },
    { label: "Wetlands", value: "None", status: "safe" },
  ],
  utilities: [
    { label: "Water", value: "Available - 2,500 ft", status: "available" },
    { label: "Sewer", value: "Municipal", status: "available" },
    { label: "Electric", value: "APS - Adjacent", status: "available" },
    { label: "Gas", value: "SW Gas - 1 mile", status: "nearby" },
  ],
}

const parcelB = {
  id: 2,
  address: "5670 N Industrial Pkwy",
  city: "Mesa, AZ 85205",
  arbitrageScore: 78.3,
  zoning: "I-2 (Light Industrial)",
  parcelSize: "12.3 acres",
  incentives: ["GPLET", "Opportunity Zone"],
  environmentalFlags: [
    { label: "FEMA Flood Zone", value: "Zone AE", status: "warning" },
    { label: "Wetlands", value: "None", status: "safe" },
  ],
  utilities: [
    { label: "Water", value: "Available - On-site", status: "available" },
    { label: "Sewer", value: "Municipal", status: "available" },
    { label: "Electric", value: "SRP - On-site", status: "available" },
    { label: "Gas", value: "Not Available", status: "unavailable" },
  ],
}

export default function ParcelComparison() {
  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/saved"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Saved Opportunities
          </Link>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Parcel Comparison
          </h1>
          <p className="mt-2 text-balance text-muted-foreground">Side-by-side investment analysis</p>
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Parcel A */}
          <div className="space-y-6">
            {/* Arbitrage Score */}
            <div className="overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Arbitrage Score
                    </div>
                    <div className="text-4xl font-bold text-foreground">
                      {Number(parcelA.arbitrageScore).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Parcel A</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{parcelA.address}</div>
                  <div className="text-sm text-muted-foreground">{parcelA.city}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</div>
                    <div className="text-sm font-semibold text-foreground">{parcelA.parcelSize}</div>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">ID</div>
                    <div className="font-mono text-sm font-semibold text-foreground">#{parcelA.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoning */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Zoning</h2>
              </div>
              <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-foreground">
                {parcelA.zoning}
              </div>
            </div>

            {/* Incentives */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Tax Incentives</h2>
              </div>
              <div className="space-y-2">
                {parcelA.incentives.map((incentive) => (
                  <div
                    key={incentive}
                    className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{incentive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Flags */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Environmental</h2>
              </div>
              <div className="space-y-3">
                {parcelA.environmentalFlags.map((flag) => (
                  <div key={flag.label} className="rounded-md border border-border bg-muted/30 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {flag.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          flag.status === "safe" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {flag.status === "safe" ? "Clear" : "Review"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{flag.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Utilities */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Utility Access</h2>
              </div>
              <div className="space-y-3">
                {parcelA.utilities.map((utility) => (
                  <div key={utility.label} className="rounded-md border border-border bg-muted/30 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {utility.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          utility.status === "available"
                            ? "bg-green-100 text-green-700"
                            : utility.status === "nearby"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {utility.status === "available" ? "Available" : utility.status === "nearby" ? "Nearby" : "N/A"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{utility.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parcel B */}
          <div className="space-y-6">
            {/* Arbitrage Score */}
            <div className="overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 shadow-sm">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                    <Award className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Arbitrage Score
                    </div>
                    <div className="text-4xl font-bold text-foreground">
                      {Number(parcelB.arbitrageScore).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Parcel B</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{parcelB.address}</div>
                  <div className="text-sm text-muted-foreground">{parcelB.city}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</div>
                    <div className="text-sm font-semibold text-foreground">{parcelB.parcelSize}</div>
                  </div>
                  <div className="rounded-md border border-border bg-muted/30 p-3">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">ID</div>
                    <div className="font-mono text-sm font-semibold text-foreground">#{parcelB.id}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoning */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Building2 className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Zoning</h2>
              </div>
              <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-foreground">
                {parcelB.zoning}
              </div>
            </div>

            {/* Incentives */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Tax Incentives</h2>
              </div>
              <div className="space-y-2">
                {parcelB.incentives.map((incentive) => (
                  <div
                    key={incentive}
                    className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                    <span className="text-sm font-semibold text-green-700">{incentive}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Flags */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <Droplets className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Environmental</h2>
              </div>
              <div className="space-y-3">
                {parcelB.environmentalFlags.map((flag) => (
                  <div key={flag.label} className="rounded-md border border-border bg-muted/30 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {flag.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          flag.status === "safe" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {flag.status === "safe" ? "Clear" : "Review"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{flag.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Utilities */}
            <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Zap className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-foreground">Utility Access</h2>
              </div>
              <div className="space-y-3">
                {parcelB.utilities.map((utility) => (
                  <div key={utility.label} className="rounded-md border border-border bg-muted/30 px-4 py-3">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {utility.label}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-bold ${
                          utility.status === "available"
                            ? "bg-green-100 text-green-700"
                            : utility.status === "nearby"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {utility.status === "available" ? "Available" : utility.status === "nearby" ? "Nearby" : "N/A"}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{utility.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="h-12 rounded-lg px-8 text-base font-semibold shadow-md">
            Generate Comparison Report
          </Button>
          <Button variant="outline" size="lg" className="h-12 rounded-lg px-8 text-base font-semibold bg-transparent">
            Add Another Parcel
          </Button>
        </div>
      </div>
    </div>
  )
}
