"use client"

import { useState } from "react"

export default function AssetPreferences() {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (item: string) => {
    setSelected((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const items = [
    "Multifamily",
    "Industrial",
    "Retail",
    "Office",
    "Hospitality",
    "Land / Entitlements",
    "Special Situations",
  ]

  return (
    <div className="flex flex-col items-center px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Preferred Asset Classes</h1>

      <div className="w-full flex flex-col space-y-4">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => toggle(item)}
            className={`w-full rounded-full border px-6 py-4 text-lg font-medium ${
              selected.includes(item) ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <button className="w-full rounded-full bg-gray-300 text-gray-700 px-6 py-4 text-lg font-semibold mt-6">
        Continue →
      </button>
    </div>
  )
}
