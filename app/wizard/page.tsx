"use client"

import type React from "react"

import { useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useWizardState } from "@/hooks/useWizardState"
import { useFlowConfig } from "@/hooks/useFlowConfig"
import { WizardLayout } from "@/components/wizard/WizardLayout"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import { SelectApp } from "@/components/wizard/steps/SelectApp"
import { SelectProfile } from "@/components/wizard/steps/SelectProfile"
import { SystemQuestions } from "@/components/wizard/steps/SystemQuestions"

// Step component mapping
const stepComponents: Record<string, React.ComponentType> = {
  SelectApp,
  SelectProfile,
  SystemQuestions,
  // Add more step components as they're implemented
}

function StepLoader({ stepKey }: { stepKey: string }) {
  const StepComponent = stepComponents[stepKey]

  if (!StepComponent) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#000067]">Step Under Development</h2>
          <p className="text-[#0000C9]">
            The "{stepKey}" step is currently being developed and will be available soon.
          </p>
        </div>
      </div>
    )
  }

  return <StepComponent />
}

function WizardContent() {
  const router = useRouter()
  const { isAuthenticated, isSessionValid, role, resetWizard, currentStepIndex } = useWizardState()
  const { steps, isValidConfig } = useFlowConfig()

  useEffect(() => {
    // Check session validity first
    if (isAuthenticated && !isSessionValid()) {
      resetWizard()
    }

    // Redirect if not authenticated or session expired
    if (!isAuthenticated || !isSessionValid()) {
      router.push("/auth")
      return
    }

    // Redirect if no role selected
    if (!role) {
      router.push("/select-role")
      return
    }
  }, [isAuthenticated, isSessionValid, role, resetWizard, router])

  if (!isAuthenticated || !isSessionValid() || !role || !isValidConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#0095FF]" />
          <p className="text-[#000067]">Loading...</p>
        </div>
      </div>
    )
  }

  const currentStep = steps[currentStepIndex]

  return (
    <WizardLayout>
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#0095FF]" />
          </div>
        }
      >
        {currentStep && <StepLoader stepKey={currentStep.component()} />}
      </Suspense>
    </WizardLayout>
  )
}

export default function WizardPage() {
  return (
    <ErrorBoundary>
      <WizardContent />
    </ErrorBoundary>
  )
}
