"use client"

import { useState, useEffect } from "react"
import { HelpCircle, Database, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWizardState } from "@/hooks/useWizardState"

const dataClassifications = [
  { id: "public", label: "Public", description: "Information that can be freely shared" },
  { id: "internal", label: "Internal", description: "Information for internal use only" },
  { id: "confidential", label: "Confidential", description: "Sensitive business information" },
  { id: "restricted", label: "Restricted", description: "Highly sensitive or regulated data" },
]

const complianceOptions = [
  { id: "gdpr", label: "GDPR", description: "General Data Protection Regulation" },
  { id: "hipaa", label: "HIPAA", description: "Health Insurance Portability and Accountability Act" },
  { id: "pci-dss", label: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
  { id: "sox", label: "SOX", description: "Sarbanes-Oxley Act" },
  { id: "iso27001", label: "ISO 27001", description: "Information Security Management" },
  { id: "nist", label: "NIST", description: "National Institute of Standards and Technology" },
]

export function SystemQuestions() {
  const { stepData, updateStepData } = useWizardState()
  const [dataClassification, setDataClassification] = useState(stepData.systemQs?.dataClassification || "")
  const [complianceRequirements, setComplianceRequirements] = useState<string[]>(
    stepData.systemQs?.complianceRequirements || [],
  )
  const [additionalNotes, setAdditionalNotes] = useState(stepData.systemQs?.additionalNotes || "")

  useEffect(() => {
    updateStepData("systemQs", {
      dataClassification,
      complianceRequirements,
      additionalNotes,
    })
  }, [dataClassification, complianceRequirements, additionalNotes, updateStepData])

  const handleComplianceChange = (complianceId: string, checked: boolean) => {
    if (checked) {
      setComplianceRequirements([...complianceRequirements, complianceId])
    } else {
      setComplianceRequirements(complianceRequirements.filter((id) => id !== complianceId))
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#000067]">System Questions</h2>
        <p className="text-[#0000C9]">Answer these questions to help us understand your system requirements</p>
      </div>

      <div className="space-y-6">
        {/* Data Classification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-[#0095FF]" />
              Data Classification
            </CardTitle>
            <CardDescription>What is the highest level of data classification your system will handle?</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={dataClassification} onValueChange={setDataClassification}>
              <div className="space-y-3">
                {dataClassifications.map((classification) => (
                  <div
                    key={classification.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-[#E0F5FF] transition-colors"
                  >
                    <RadioGroupItem value={classification.id} id={classification.id} className="mt-1" />
                    <Label htmlFor={classification.id} className="flex-1 cursor-pointer">
                      <div className="space-y-1">
                        <h3 className="font-medium text-[#000067]">{classification.label}</h3>
                        <p className="text-sm text-[#0000C9]">{classification.description}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Compliance Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#0095FF]" />
              Compliance Requirements
            </CardTitle>
            <CardDescription>
              Select all compliance frameworks that apply to your system (select at least one)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceOptions.map((compliance) => (
                <div
                  key={compliance.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-[#E0F5FF] transition-colors"
                >
                  <Checkbox
                    id={compliance.id}
                    checked={complianceRequirements.includes(compliance.id)}
                    onCheckedChange={(checked) => handleComplianceChange(compliance.id, checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor={compliance.id} className="flex-1 cursor-pointer">
                    <div className="space-y-1">
                      <h3 className="font-medium text-[#000067]">{compliance.label}</h3>
                      <p className="text-sm text-[#0000C9]">{compliance.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-[#0095FF]" />
              Additional Information
            </CardTitle>
            <CardDescription>Provide any additional context or special requirements for your system</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter any additional notes, special requirements, or context that might be relevant for the IPRM assessment..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
