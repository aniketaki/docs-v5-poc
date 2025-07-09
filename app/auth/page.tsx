"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWizardState } from "@/hooks/useWizardState"
import { AuthPage } from "@/components/auth/AuthPage"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { Loader2 } from "lucide-react"

export default function AuthPageRoute() {
  const router = useRouter()
  const { isAuthenticated, isSessionValid, role, resetWizard } = useWizardState()

  useEffect(() => {
    // Check session validity first
    if (isAuthenticated && !isSessionValid()) {
      resetWizard()
    }

    // Redirect authenticated users to appropriate page
    if (isAuthenticated && isSessionValid()) {
      if (role) {
        router.push("/wizard")
      } else {
        router.push("/select-role")
      }
    }
  }, [isAuthenticated, isSessionValid, role, resetWizard, router])

  // Show auth page if not authenticated or session expired
  if (!isAuthenticated || !isSessionValid()) {
    return (
      <ErrorBoundary>
        <AuthPage />
      </ErrorBoundary>
    )
  }

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF] flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-[#0095FF] mx-auto" />
        <p className="text-[#000067]">Redirecting...</p>
      </div>
    </div>
  )
}
