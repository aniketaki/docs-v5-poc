import { z } from "zod"

export type UserRole = "author" | "implementer" | "qa"
export type ImplementerProfile = "developer" | "tester" | "support"

export interface FlowStep {
  key: string
  title: string
  component: () => string
  validationSchema?: z.ZodSchema
}

export interface WizardState {
  role: UserRole | null
  profile: ImplementerProfile | null
  currentStepIndex: number
  stepData: Record<string, any>
}

export const UserRoleSchema = z.enum(["author", "implementer", "qa"])
export const ImplementerProfileSchema = z.enum(["developer", "tester", "support"])

export const WizardStateSchema = z.object({
  role: UserRoleSchema.nullable(),
  profile: ImplementerProfileSchema.nullable(),
  currentStepIndex: z.number().min(0),
  stepData: z.record(z.any()),
})
