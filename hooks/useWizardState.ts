"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type WizardState, WizardStateSchema, type UserRole, type ImplementerProfile } from "@/types/wizard"

interface WizardStore extends WizardState {
  setRole: (role: UserRole) => void
  setProfile: (profile: ImplementerProfile | null) => void
  setCurrentStep: (index: number) => void
  updateStepData: (stepKey: string, data: any) => void
  resetWizard: () => void
}

const initialState: WizardState = {
  role: null,
  profile: null,
  currentStepIndex: 0,
  stepData: {},
}

export const useWizardState = create<WizardStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      setRole: (role) => set({ role }),

      setProfile: (profile) => set({ profile }),

      setCurrentStep: (index) => set({ currentStepIndex: index }),

      updateStepData: (stepKey, data) =>
        set((state) => ({
          stepData: { ...state.stepData, [stepKey]: data },
        })),

      resetWizard: () =>
        set({
          role: initialState.role,
          profile: initialState.profile,
          currentStepIndex: initialState.currentStepIndex,
          stepData: initialState.stepData,
        }),
    }),
    {
      name: "themis-wizard-state",
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // Handle state migration if needed
        try {
          return WizardStateSchema.parse(persistedState)
        } catch {
          return initialState
        }
      },
    },
  ),
)
