"use client"

import { useMemo } from "react"
import { useWizardState } from "./useWizardState"
import { getFlowSteps } from "@/config/flows"
import type { FlowStep } from "@/types/wizard"

export function useFlowConfig() {
  const { role, profile } = useWizardState()

  const steps = useMemo((): FlowStep[] => {
    if (!role) return []
    return getFlowSteps(role, profile || undefined)
  }, [role, profile])

  const isValidConfig = useMemo(() => {
    return steps.length > 0 && steps.every((step) => step.key && step.title && step.component)
  }, [steps])

  return {
    steps,
    isValidConfig,
    totalSteps: steps.length,
  }
}
