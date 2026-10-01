"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Building2, Award, CheckCircle2, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const filterOptions = [
  { id: "all", label: "All" },
  { id: "oz", label: "Opportunity Zones" },
  { id: "high-score", label: "Score 70+" },
  { id: "multifamily", label: "Multifamily" },
  { id: "industrial", label: "Industrial" },
]

const savedParcels = [
  {
    id: 1,
    address: "1234 W Desert View Rd",
    city: "Buckeye, AZ",
    arbitrageScore: 84,
    zoning: "R1-7",
    parcelSize: "4.82 acres",
    incentives: ["OZ", "TIF"],
    tags: ["multifamily", "oz", "high-score"],
  },
  {
    id: 2,
    address: "5670 N Industrial Pkwy",
    city: "Mesa, AZ",
    arbitrageScore: 78,
    zoning: "I-2 (Light Industrial)",
    parcelSize: "12.3 acres",
    incentives: ["GPLET", "OZ"],
    tags: ["industrial", "oz", "high-score"],
  },
  {
    id: 3,
    address: "890 E Commerce Center",
    city: "Phoenix, AZ",
    arbitrageScore: 72,
    zoning: "C-3 (Commercial)",
    parcelSize: "2.15 acres",
    incentives: ["TIF"],
    tags: ["high-score"],
  },
  {
    id: 4,
    address: "2345 S Mountain Vista",
    city: "Gilbert, AZ",
    arbitrageScore: 68,
    zoning: "R-3 (Multifamily)",
    parcelSize: "6.4 acres",
    incentives: ["OZ"],
    tags: ["multifamily", "oz"],
  },
  {
    id: 5,
    address: "7890 W Gateway Blvd",
    city: "Goodyear, AZ",
    arbitrageScore: 65,
    zoning: "PAD (Planned Area Dev)",
    parcelSize: "18.7 acres",
    incentives: ["TIF", "GPLET"],
    tags: [],
  },
  {
    id: 6,
    address: "4567 N Tech Center Dr",
    city: "Tempe, AZ",
    arbitrageScore: 59,
    zoning: "I-1 (Industrial Park)",
    parcelSize: "8.9 acres",
    incentives: ["GPLET"],
    tags: ["industrial"],
  },
]

export default function SavedOpportunities() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["all"])

  const toggleFilter = (filterId: string) => {
    if (filterId === "all") {
      setActiveFilters(["all"])
    } else {
      const newFilters = activeFilters.includes(filterId)
        ? activeFilters.filter((f) => f !== filterId)
        : [...activeFilters.filter((f) => f !== "all"), filterId]

      setActiveFilters(newFilters.length === 0 ? ["all"] : newFilters)
    }
  }

  const filteredParcels =
    activeFilters.includes("all") || activeFilters.length === 0
      ? savedParcels
      : savedParcels.filter((parcel) => activeFilters.some((filter) => parcel.tags.includes(filter)))

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Saved Opportunities
          </h1>
          <p className="mt-2 text-balance text-muted-foreground">
            {filteredParcels.length} {filteredParcels.length === 1 ? "parcel" : "parcels"} saved to your profile
          </p>
        </div>

        {/* Filter Chips */}
        <div className="mb-6 flex flex-wrap gap-2">
          {filterOptions.map((filter) => {
            const isActive = activeFilters.includes(filter.id)
            return (
              <button
                key={filter.id}
                onClick={() => toggleFilter(filter.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                }`}
              >
                {isActive && filter.id !== "all" && <CheckCircle2 className="h-4 w-4" />}
                {filter.label}
                {isActive && filter.id !== "all" && (
                  <X className="h-3 w-3 opacity-70 hover:opacity-100" onClick={(e) => e.stopPropagation()} />
                )}
              </button>
            )
          })}
        </div>

        {/* Parcels Grid */}
        {filteredParcels.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8">
            <div className="text-center">
              <Building2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">No parcels match your filters</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your filter selection</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filteredParcels.map((parcel) => (
              <Link
                key={parcel.id}
                href={`/parcel/${parcel.id}`}
                className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                {/* Score Banner */}
                <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Arbitrage Score
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-primary">{Number(parcel.arbitrageScore).toFixed(1)}</div>
                </div>

                {/* Parcel Details */}
                <div className="space-y-4 p-4">
                  {/* Address */}
                  <div>
                    <div className="mb-1 flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-semibold leading-tight text-foreground">{parcel.address}</div>
                        <div className="text-sm text-muted-foreground">{parcel.city}</div>
                      </div>
                    </div>
                  </div>

                  {/* Key Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Zoning
                      </div>
                      <div className="text-sm font-semibold text-foreground">{parcel.zoning}</div>
                    </div>
                    <div className="rounded-md border border-border bg-muted/30 p-3">
                      <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Size</div>
                      <div className="text-sm font-semibold text-foreground">{parcel.parcelSize}</div>
                    </div>
                  </div>

                  {/* Incentives */}
                  <div>
                    <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Incentives
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {parcel.incentives.map((incentive) => (
                        <span
                          key={incentive}
                          className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-700"
                        >
                          {incentive}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* View Details Footer */}
                <div className="border-t border-border bg-muted/20 px-4 py-3 text-center">
                  <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                    View Full Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="flex-1 rounded-lg text-base font-semibold shadow-sm">
            Export to PDF
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1 rounded-lg border-2 text-base font-semibold shadow-sm bg-transparent"
          >
            Share Portfolio
          </Button>
        </div>
      </div>
    </div>
  )
}
