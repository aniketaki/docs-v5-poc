"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { type WizardState, WizardStateSchema, type UserRole, type ImplementerProfile } from "@/types/wizard"

interface WizardStore extends WizardState {
  setRole: (role: UserRole) => void
  setProfile: (profile: ImplementerProfile | null) => void
  setCurrentStep: (index: number) => void
  updateStepData: (stepKey: string, data: any) => void
  setAuthenticated: (isAuth: boolean) => void
  signOut: () => void
  resetWizard: () => void
  isSessionValid: () => boolean
}

const initialState: WizardState = {
  role: null,
  profile: null,
  currentStepIndex: 0,
  stepData: {},
  isAuthenticated: false,
  sessionExpiry: 0,
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

      setAuthenticated: (isAuth) =>
        set({
          isAuthenticated: isAuth,
          sessionExpiry: isAuth ? Date.now() + 24 * 60 * 60 * 1000 : 0, // 24 hours
        }),

      signOut: () =>
        set({
          ...initialState, // Reset everything to initial state
        }),

      resetWizard: () =>
        set({
          ...initialState,
          isAuthenticated: get().isAuthenticated,
          sessionExpiry: get().sessionExpiry,
        }),

      isSessionValid: () => {
        const state = get()
        return state.isAuthenticated && Date.now() < state.sessionExpiry
      },
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
