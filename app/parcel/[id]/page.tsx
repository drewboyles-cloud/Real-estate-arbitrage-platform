"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Building2, Shield, Droplets, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ParcelDetail() {
  const parcelData = {
    id: "12345",
    address: "1234 W Desert View Rd, Buckeye, AZ 85326",
    apn: "301-45-678",
    acres: 4.82,
    zoning: "R1-7 (Single Family Residential)",
    opportunityZone: true,
    gplet: false,
    tif: true,
    fema100Year: "Zone X (Minimal Risk)",
    water: "Available - 2,500 ft",
    sewer: "Available - Municipal",
    electric: "APS - Adjacent",
    gas: "Southwest Gas - 1 mile",
    arbitrageScore: 84,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-6">
          <Link
            href="/map"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Map
          </Link>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Parcel Intelligence Report</h1>
          <p className="mt-2 text-sm text-muted-foreground">Comprehensive data for investment decision-making</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Arbitrage Score Banner */}
        <div className="mb-6 overflow-hidden rounded-lg border border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 p-6 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium uppercase tracking-wide text-muted-foreground">Arbitrage Score</div>
                <div className="text-4xl font-bold text-foreground">{Number(parcelData.arbitrageScore).toFixed(1)}</div>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-sm text-muted-foreground">Strong investment opportunity</div>
              <div className="mt-1 text-xs text-muted-foreground">Based on 12+ market factors</div>
            </div>
          </div>
        </div>

        {/* Grid Layout for Cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* 1. Parcel Basics */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Parcel Basics</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Address
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  {parcelData.address}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    APN
                  </label>
                  <div className="rounded-md border border-border bg-muted/30 px-4 py-3 font-mono text-sm text-foreground">
                    {parcelData.apn}
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Acreage
                  </label>
                  <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm font-semibold text-foreground">
                    {parcelData.acres} acres
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Zoning
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  {parcelData.zoning}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Incentives */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Tax Incentives</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">Opportunity Zone</div>
                  <div className="text-xs text-muted-foreground">Capital gains deferral eligible</div>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${parcelData.opportunityZone ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {parcelData.opportunityZone ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">GPLET</div>
                  <div className="text-xs text-muted-foreground">Government Property Lease Excise Tax</div>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${parcelData.gplet ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {parcelData.gplet ? "Yes" : "No"}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-4 py-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">TIF District</div>
                  <div className="text-xs text-muted-foreground">Tax Increment Financing</div>
                </div>
                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${parcelData.tif ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {parcelData.tif ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Environmental */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Droplets className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Environmental Factors</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  FEMA 100-Year Flood Zone
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{parcelData.fema100Year}</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Low Risk
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Area of minimal flood hazard. No special flood insurance requirements.
                  </p>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Soil Type
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  Sandy Loam - Suitable for construction
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Wetlands
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  None identified
                </div>
              </div>
            </div>
          </div>

          {/* 4. Utilities */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Zap className="h-5 w-5 text-amber-600" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Utility Access</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Water
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{parcelData.water}</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Available
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Sewer
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{parcelData.sewer}</span>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">
                      Available
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Electric
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  {parcelData.electric}
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Natural Gas
                </label>
                <div className="rounded-md border border-border bg-muted/30 px-4 py-3 text-sm text-foreground">
                  {parcelData.gas}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button size="lg" className="h-12 rounded-lg px-8 text-sm font-semibold shadow-md">
            <MapPin className="mr-2 h-5 w-5" />
            Save to Opportunities
          </Button>
          <Button variant="outline" size="lg" className="h-12 rounded-lg px-8 text-sm font-semibold bg-transparent">
            Export Full Report
          </Button>
        </div>
      </div>
    </div>
  )
}
