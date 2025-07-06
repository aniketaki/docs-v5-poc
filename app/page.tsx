"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWizardState } from "@/hooks/useWizardState"
import { AuthPage } from "@/components/auth/AuthPage"
import { RoleSelection } from "@/components/wizard/RoleSelection"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isSessionValid, role, resetWizard } = useWizardState()

  useEffect(() => {
    // Check session validity on mount
    if (isAuthenticated && !isSessionValid()) {
      resetWizard()
    }
  }, [isAuthenticated, isSessionValid, resetWizard])

  useEffect(() => {
    // Redirect to wizard if user has selected a role
    if (isAuthenticated && role) {
      router.push("/wizard")
    }
  }, [isAuthenticated, role, router])

  if (!isAuthenticated || !isSessionValid()) {
    return (
      <ErrorBoundary>
        <AuthPage />
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF] py-8">
        <RoleSelection />
      </div>
    </ErrorBoundary>
  )
}
