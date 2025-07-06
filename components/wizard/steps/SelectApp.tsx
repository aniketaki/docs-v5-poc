"use client"

import { useState, useEffect } from "react"
import { Building2, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useWizardState } from "@/hooks/useWizardState"

const mockApplications = [
  { id: "app-1", name: "Customer Portal", description: "Web-based customer service portal", riskLevel: "medium" },
  { id: "app-2", name: "Payment Gateway", description: "Financial transaction processing system", riskLevel: "high" },
  { id: "app-3", name: "Internal Dashboard", description: "Employee management dashboard", riskLevel: "low" },
  { id: "app-4", name: "Mobile Banking App", description: "Consumer mobile banking application", riskLevel: "high" },
  { id: "app-5", name: "HR Management System", description: "Human resources information system", riskLevel: "medium" },
]

export function SelectApp() {
  const { stepData, updateStepData } = useWizardState()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedApp, setSelectedApp] = useState(stepData.selectApp?.applicationId || "")

  const filteredApps = mockApplications.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    if (selectedApp) {
      const app = mockApplications.find((a) => a.id === selectedApp)
      if (app) {
        updateStepData("selectApp", {
          applicationId: app.id,
          applicationName: app.name,
          description: app.description,
          riskLevel: app.riskLevel,
        })
      }
    }
  }, [selectedApp, updateStepData])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-[#000067]">Select Application</h2>
        <p className="text-[#0000C9]">Choose the application you want to create IPRM documentation for</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#0095FF]" />
            Available Applications
          </CardTitle>
          <CardDescription>Select from the list of registered applications in your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <RadioGroup value={selectedApp} onValueChange={setSelectedApp}>
            <div className="space-y-3">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors"
                >
                  <RadioGroupItem value={app.id} id={app.id} className="mt-1" />
                  <Label htmlFor={app.id} className="flex-1 cursor-pointer">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-[#000067]">{app.name}</h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            app.riskLevel === "high"
                              ? "bg-red-100 text-red-800"
                              : app.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {app.riskLevel} risk
                        </span>
                      </div>
                      <p className="text-sm text-[#0000C9]">{app.description}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {filteredApps.length === 0 && (
            <div className="text-center py-8 text-[#0000C9]">No applications found matching your search.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
