import type { FlowStep, UserRole, ImplementerProfile } from "@/types/wizard"
import { z } from "zod"

// Validation schemas for each step
export const selectAppSchema = z.object({
  applicationId: z.string().min(1, "Please select an application"),
  applicationName: z.string().min(1, "Application name is required"),
})

export const selectProfileSchema = z.object({
  iprmProfile: z.string().min(1, "Please select an IPRM profile"),
  riskLevel: z.enum(["low", "medium", "high"]),
})

export const systemQuestionsSchema = z.object({
  dataClassification: z.string().min(1, "Data classification is required"),
  complianceRequirements: z.array(z.string()).min(1, "Select at least one compliance requirement"),
})

// Flow configurations
const authorFlow: FlowStep[] = [
  {
    key: "selectApp",
    title: "Select Application",
    component: () => "SelectApp",
    validationSchema: selectAppSchema,
  },
  {
    key: "iprmProfile",
    title: "Select IPRM Profile",
    component: () => "SelectProfile",
    validationSchema: selectProfileSchema,
  },
  {
    key: "systemQs",
    title: "Answer System Questions",
    component: () => "SystemQuestions",
    validationSchema: systemQuestionsSchema,
  },
  {
    key: "design",
    title: "Upload Design Document",
    component: () => "DesignUploader",
  },
  {
    key: "generateCRS",
    title: "Generate CRS",
    component: () => "CRSGenerator",
  },
  {
    key: "review",
    title: "Review & Submit",
    component: () => "SubmitReview",
  },
]

const implementerFlows = {
  developer: [
    {
      key: "selectApp",
      title: "Select Application",
      component: () => "SelectApp",
      validationSchema: selectAppSchema,
    },
    {
      key: "iprmProfile",
      title: "Select IPRM Profile",
      component: () => "SelectProfile",
      validationSchema: selectProfileSchema,
    },
    {
      key: "sysReqs",
      title: "Generate Requirements",
      component: () => "ReqGenerator",
    },
    {
      key: "trace",
      title: "Check Traceability",
      component: () => "TraceabilityCheck",
    },
  ],
  tester: [
    {
      key: "selectApp",
      title: "Select Application",
      component: () => "SelectApp",
      validationSchema: selectAppSchema,
    },
    {
      key: "iprmProfile",
      title: "Select IPRM Profile",
      component: () => "SelectProfile",
      validationSchema: selectProfileSchema,
    },
    {
      key: "scenarios",
      title: "Generate Test Scenarios",
      component: () => "TestScenarioGen",
    },
    {
      key: "trace",
      title: "Check Traceability to Scripts",
      component: () => "TraceabilityCheck",
    },
  ],
  support: [
    {
      key: "selectApp",
      title: "Select Application",
      component: () => "SelectApp",
      validationSchema: selectAppSchema,
    },
    {
      key: "iprmProfile",
      title: "Select IPRM Profile",
      component: () => "SelectProfile",
      validationSchema: selectProfileSchema,
    },
    {
      key: "periodicOps",
      title: "Generate Ops List",
      component: () => "OpsListForm",
    },
    {
      key: "trace",
      title: "Check Traceability to Support Plan",
      component: () => "TraceabilityCheck",
    },
  ],
}

export const flows = {
  author: authorFlow,
  implementer: implementerFlows,
}

export function getFlowSteps(role: UserRole, profile?: ImplementerProfile): FlowStep[] {
  if (role === "author") {
    return flows.author
  }

  if (role === "implementer" && profile) {
    return flows.implementer[profile]
  }

  return []
}
