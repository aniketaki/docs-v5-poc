"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, Scale } from "lucide-react"
import { useWizardState } from "@/hooks/useWizardState"
import { RoleSelection } from "@/components/wizard/RoleSelection"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function SelectRolePage() {
  const router = useRouter()
  const { isAuthenticated, isSessionValid, role, resetWizard } = useWizardState()

  useEffect(() => {
    // Check session validity first
    if (isAuthenticated && !isSessionValid()) {
      resetWizard()
    }

    // If not authenticated or session invalid, redirect to auth page
    if (!isAuthenticated || !isSessionValid()) {
      router.push("/auth")
      return
    }

    // If authenticated and role is already selected, redirect to wizard
    if (isAuthenticated && isSessionValid() && role) {
      router.push("/wizard")
      return
    }
  }, [isAuthenticated, isSessionValid, role, resetWizard, router])

  // Show loading state while checking authentication/role or redirecting
  if (!isAuthenticated || !isSessionValid() || role) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF]">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Scale className="h-8 w-8 text-[#000067]" />
                <span className="text-2xl font-bold text-[#000067]">Themis</span>
              </Link>
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Loading Content */}
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#0095FF]" />
            <p className="text-[#000067]">Loading...</p>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/90 backdrop-blur-sm border-t border-white/20 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-[#000067]">
              &copy; {new Date().getFullYear()} Themis IPRM. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  // If authenticated and no role selected, show RoleSelection
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF]">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <Scale className="h-8 w-8 text-[#000067]" />
                <span className="text-2xl font-bold text-[#000067]">Themis</span>
              </Link>
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-xs">Logo</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 py-8">
          <RoleSelection />
        </main>

        {/* Footer */}
        <footer className="bg-white/90 backdrop-blur-sm border-t border-white/20 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-[#000067]">
              &copy; {new Date().getFullYear()} Themis IPRM. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}
