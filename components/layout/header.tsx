"use client"

import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-4 h-16 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Scale className="h-6 w-6 text-themis-blue-90" />
          <h1 className="text-xl font-bold text-themis-blue-90">Themis</h1>
        </Link>

        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-themis-blue-70 hover:bg-themis-cyan-10">
            Login
          </Button>
        </Link>
      </div>
    </header>
  )
}
