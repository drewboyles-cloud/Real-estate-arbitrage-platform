"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Layers, Droplets, FileText } from "lucide-react"

const parcels = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  left: Math.random() * 70 + 10, // 10% to 80% from left
  top: Math.random() * 70 + 10, // 10% to 80% from top
  width: Math.random() * 8 + 4, // 4% to 12% width
  height: Math.random() * 8 + 4, // 4% to 12% height
  color: ["bg-blue-500/40", "bg-green-500/40", "bg-yellow-500/40", "bg-purple-500/40", "bg-pink-500/40"][
    Math.floor(Math.random() * 5)
  ],
  borderColor: ["border-blue-600", "border-green-600", "border-yellow-600", "border-purple-600", "border-pink-600"][
    Math.floor(Math.random() * 5)
  ],
  apn: `${100 + i}-${200 + i * 2}-${300 + i * 3}`,
  acres: (Math.random() * 5 + 0.5).toFixed(2),
  zoning: ["R1", "R2", "C1", "I1", "MU"][Math.floor(Math.random() * 5)],
}))

export default function MapVisualization() {
  const [selectedParcel, setSelectedParcel] = useState(parcels[0])
  const [overlays, setOverlays] = useState({
    opportunityZones: true,
    femaFloodplain: false,
    zoning: true,
  })

  const toggleOverlay = (key: keyof typeof overlays) => {
    setOverlays((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-background lg:flex-row">
      {/* Map Area */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Market Visualization</h1>
          <Button variant="outline" size="sm">
            <MapPin className="mr-2 h-4 w-4" />
            Change Location
          </Button>
        </div>

        {/* Overlay Toggles */}
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            onClick={() => toggleOverlay("opportunityZones")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              overlays.opportunityZones
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            <Layers className="h-4 w-4" />
            Opportunity Zones
          </button>
          <button
            onClick={() => toggleOverlay("femaFloodplain")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              overlays.femaFloodplain
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            <Droplets className="h-4 w-4" />
            FEMA Floodplain
          </button>
          <button
            onClick={() => toggleOverlay("zoning")}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              overlays.zoning
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-foreground hover:border-primary/40"
            }`}
          >
            <FileText className="h-4 w-4" />
            Zoning
          </button>
        </div>

        {/* Map Container */}
        <div className="relative h-[500px] overflow-hidden rounded-lg border border-border bg-muted shadow-sm lg:h-[calc(100vh-200px)]">
          {/* Map Label */}
          <div className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-muted-foreground">
            Map (Buckeye, AZ)
          </div>

          {/* Grid Pattern Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Parcel Overlays */}
          {parcels.map((parcel) => (
            <button
              key={parcel.id}
              onClick={() => setSelectedParcel(parcel)}
              className={`absolute z-10 border-2 transition-all hover:z-20 hover:scale-105 hover:shadow-lg ${parcel.color} ${parcel.borderColor} ${selectedParcel.id === parcel.id ? "ring-4 ring-primary/50 z-20" : ""}`}
              style={{
                left: `${parcel.left}%`,
                top: `${parcel.top}%`,
                width: `${parcel.width}%`,
                height: `${parcel.height}%`,
              }}
            >
              <span className="sr-only">Parcel {parcel.id}</span>
            </button>
          ))}

          {/* Overlay Indicators */}
          {overlays.opportunityZones && (
            <div className="absolute left-4 top-4 z-30 rounded-md bg-blue-500/20 px-3 py-1.5 text-xs font-medium text-blue-900 backdrop-blur-sm">
              OZ Active
            </div>
          )}
          {overlays.femaFloodplain && (
            <div className="absolute left-4 top-12 z-30 rounded-md bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-900 backdrop-blur-sm">
              Floodplain Active
            </div>
          )}
          {overlays.zoning && (
            <div className="absolute left-4 top-20 z-30 rounded-md bg-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-900 backdrop-blur-sm">
              Zoning Active
            </div>
          )}
        </div>
      </div>

      {/* Side Panel */}
      <div className="w-full border-t border-border bg-card p-4 lg:w-96 lg:border-l lg:border-t-0 lg:p-6">
        <h2 className="mb-6 text-xl font-bold text-foreground">Selected Parcel Information</h2>

        <div className="space-y-5">
          {/* Parcel ID */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Parcel ID
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              Parcel #{selectedParcel.id}
            </div>
          </div>

          {/* APN */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              APN Number
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm text-foreground">
              {selectedParcel.apn}
            </div>
          </div>

          {/* Acres */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Size (Acres)
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              {selectedParcel.acres} acres
            </div>
          </div>

          {/* Zoning */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Zoning
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              {selectedParcel.zoning}
            </div>
          </div>

          {/* Opportunity Zone */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Opportunity Zone
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
              {Math.random() > 0.5 ? "Yes" : "No"}
            </div>
          </div>

          {/* Floodplain */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              FEMA Floodplain
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground">
              {Math.random() > 0.7 ? "Zone X (minimal risk)" : "Zone A"}
            </div>
          </div>

          {/* Market Value */}
          <div>
            <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Estimated Market Value
            </label>
            <div className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground">
              ${(Math.random() * 500000 + 100000).toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </div>
          </div>

          {/* CTA Button */}
          <Button size="lg" className="mt-4 h-12 w-full rounded-lg text-sm font-semibold shadow-md">
            View Full Parcel Report
          </Button>
        </div>
      </div>
    </div>
  )
}
