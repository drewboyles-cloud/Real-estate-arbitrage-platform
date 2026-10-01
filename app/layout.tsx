import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Link from "next/link"
import "./globals.css"
import { ArbitrageProfileProvider } from "@/context/ArbitrageProfileContext"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Real Estate Arbitrage Platform",
  description:
    "Data-driven real estate investment decisions powered by regulatory insight, market intelligence, and capital structure modeling.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100 text-slate-900 font-sans antialiased">
        <ArbitrageProfileProvider>
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
              <div>
                <Link href="/" className="text-lg font-semibold text-slate-900 hover:text-slate-700">
                  Real Estate Arbitrage Platform
                </Link>
                <p className="text-sm text-slate-500">Your Arbitrage Profile™</p>
              </div>
              <nav className="flex gap-6">
                <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Home
                </Link>
                <Link href="/opportunities" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                  Opportunities
                </Link>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
          <Analytics />
        </ArbitrageProfileProvider>
      </body>
    </html>
  )
}
