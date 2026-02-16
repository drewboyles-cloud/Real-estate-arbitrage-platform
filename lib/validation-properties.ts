export interface ValidationProperty {
  id: string
  city: string
  zoning: string
  type: string
  ask: number
  lotSqft: number
  units: number
  ownerOccupiedFit: number
  regulatoryUpside: number
  densityPotential: number
  renovationRisk: number
  arbitrageScore: number
  topDrivers: string[]
}

export const validationProperties: ValidationProperty[] = [
  {
    id: "es_848penn",
    city: "El Segundo",
    zoning: "R2",
    type: "Triplex",
    ask: 1699000,
    lotSqft: 7268,
    units: 3,
    ownerOccupiedFit: 92,
    regulatoryUpside: 88,
    densityPotential: 90,
    renovationRisk: 32,
    arbitrageScore: 89,
    topDrivers: [
      "Underbuilt R2 lot with strong ADU upside",
      "Low rent-control risk",
      "Excellent dirt value per unit",
      "House-hack friendly layout",
    ],
  },
  {
    id: "rb_445ocean",
    city: "Redondo Beach",
    zoning: "R3",
    type: "Teardown",
    ask: 2100000,
    lotSqft: 12000,
    units: 8,
    ownerOccupiedFit: 20,
    regulatoryUpside: 72,
    densityPotential: 94,
    renovationRisk: 81,
    arbitrageScore: 74,
    topDrivers: ["R3 redevelopment site", "Exceptional dirt value per unit", "High density uplift"],
  },
  {
    id: "haw_r2_deep",
    city: "Hawthorne",
    zoning: "R2",
    type: "Duplex",
    ask: 950000,
    lotSqft: 7000,
    units: 2,
    ownerOccupiedFit: 61,
    regulatoryUpside: 65,
    densityPotential: 78,
    renovationRisk: 42,
    arbitrageScore: 67,
    topDrivers: ["Underbuilt R2 with density upside", "Good dirt value per unit", "Rear ADU potential"],
  },
  {
    id: "haw_r3_triplex",
    city: "Hawthorne",
    zoning: "R3",
    type: "Triplex",
    ask: 925000,
    lotSqft: 6800,
    units: 3,
    ownerOccupiedFit: 48,
    regulatoryUpside: 70,
    densityPotential: 82,
    renovationRisk: 51,
    arbitrageScore: 64,
    topDrivers: ["Underbuilt R3 with MF upside", "Strong land value", "Good ADU placement options"],
  },
  {
    id: "haw_r2_sfr",
    city: "Hawthorne",
    zoning: "R2",
    type: "SFR",
    ask: 875000,
    lotSqft: 6500,
    units: 1,
    ownerOccupiedFit: 72,
    regulatoryUpside: 40,
    densityPotential: 55,
    renovationRisk: 28,
    arbitrageScore: 58,
    topDrivers: ["Underbuilt SFR with room for duplex conversion", "Solid ADU upside"],
  },
]
