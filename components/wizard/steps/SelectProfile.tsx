"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useWizardState } from "@/hooks/useWizardState"

const iprmProfiles = [
  {
    id: "standard",
    name: "Standard Protection",
    description: "Basic information protection suitable for general business applications",
    riskLevel: "low",
    requirements: ["Data encryption at rest", "Access logging", "Basic authentication"],
    icon: Shield,
  },
  {
    id: "enhanced",
    name: "Enhanced Protection",
    description: "Elevated security measures for sensitive business data",
    riskLevel: "medium",
    requirements: [
      "Advanced encryption",
      "Multi-factor authentication",
      "Data loss prevention",
      "Regular security audits",
    ],
    icon: AlertTriangle,
  },
  {
    id: "maximum",
    name: "Maximum Protection",
    description: "Highest level of security for critical and regulated data",
    riskLevel: "high",
    requirements: [
      "End-to-end encryption",
      "Zero-trust architecture",
      "Continuous monitoring",
      "Compliance reporting",
      "Data residency controls",
    ],
    icon: Shield,
  },
]

export function SelectProfile() {
  const { stepData, updateStepData } = useWizardState()
  const [selectedProfile, setSelectedProfile] = useState(stepData.selectProfile?.iprmProfile || "")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState(stepData.selectProfile?.riskLevel || "")

  useEffect(() => {
    if (selectedProfile) {
      const profile = iprmProfiles.find((p) => p.id === selectedProfile)
      if (profile) {
        setSelectedRiskLevel(profile.riskLevel)
        updateStepData("selectProfile", {
          iprmProfile: profile.id,
          profileName: profile.name,
          riskLevel: profile.riskLevel,
          requirements: profile.requirements,
        })
      }
    }
  }, [selectedProfile, updateStepData])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#000067]">Select IPRM Profile</h2>
        <p className="text-[#0000C9]">Choose the appropriate information protection and risk management profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#0095FF]" />
            Protection Profiles
          </CardTitle>
          <CardDescription>
            Select the profile that matches your application's security requirements and risk tolerance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedProfile} onValueChange={setSelectedProfile}>
            <div className="space-y-4">
              {iprmProfiles.map((profile) => {
                const IconComponent = profile.icon
                return (
                  <div
                    key={profile.id}
                    className="flex items-start space-x-4 p-6 border rounded-lg hover:bg-[#E0F5FF] transition-colors"
                  >
                    <RadioGroupItem value={profile.id} id={profile.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={profile.id} className="cursor-pointer">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <IconComponent className="h-6 w-6 text-[#0095FF]" />
                              <h3 className="text-lg font-semibold text-[#000067]">{profile.name}</h3>
                            </div>
                            <Badge
                              variant={
                                profile.riskLevel === "high"
                                  ? "destructive"
                                  : profile.riskLevel === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {profile.riskLevel} risk
                            </Badge>
                          </div>

                          <p className="text-[#0000C9]">{profile.description}</p>

                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-[#000067] flex items-center gap-1">
                              <Info className="h-4 w-4" />
                              Key Requirements
                            </h4>
                            <ul className="text-sm text-[#0000C9] space-y-1">
                              {profile.requirements.map((req, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#0095FF] rounded-full" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </div>
                )
              })}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
