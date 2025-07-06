"use client"

import { useState } from "react"
import { User, Code, TestTube, HeadphonesIcon, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useWizardState } from "@/hooks/useWizardState"
import type { UserRole, ImplementerProfile } from "@/types/wizard"

export function RoleSelection() {
  const { setRole, setProfile, setCurrentStep } = useWizardState()
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("")
  const [selectedProfile, setSelectedProfile] = useState<ImplementerProfile | "">("")

  const handleContinue = () => {
    if (selectedRole && (selectedRole !== "implementer" || selectedProfile)) {
      setRole(selectedRole as UserRole)
      setProfile(selectedRole === "implementer" ? (selectedProfile as ImplementerProfile) : null)
      setCurrentStep(0)
    }
  }

  const isValid = selectedRole && (selectedRole !== "implementer" || selectedProfile)

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#000067]">Select Your Role</h1>
        <p className="text-[#0000C9]">Choose your role to customize your IPRM workflow</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Primary Role</CardTitle>
          <CardDescription>Select your primary role in the IPRM process</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedRole}
            onValueChange={(value) => {
              setSelectedRole(value as UserRole)
              if (value !== "implementer") {
                setSelectedProfile("")
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors">
              <RadioGroupItem value="author" id="author" />
              <Label htmlFor="author" className="flex items-center space-x-2 cursor-pointer flex-1">
                <User className="h-5 w-5 text-[#0095FF]" />
                <div>
                  <div className="font-medium">Author</div>
                  <div className="text-sm text-muted-foreground">Create and design IPRM documentation</div>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors">
              <RadioGroupItem value="implementer" id="implementer" />
              <Label htmlFor="implementer" className="flex items-center space-x-2 cursor-pointer flex-1">
                <Code className="h-5 w-5 text-[#0095FF]" />
                <div>
                  <div className="font-medium">Implementer</div>
                  <div className="text-sm text-muted-foreground">Implement and execute IPRM requirements</div>
                </div>
              </Label>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50 cursor-not-allowed">
                    <RadioGroupItem value="qa" id="qa" disabled />
                    <Label htmlFor="qa" className="flex items-center space-x-2 cursor-not-allowed flex-1">
                      <TestTube className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          QA
                          <Info className="h-4 w-4" />
                        </div>
                        <div className="text-sm text-muted-foreground">Quality assurance and validation</div>
                      </div>
                    </Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coming soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </RadioGroup>
        </CardContent>
      </Card>

      {selectedRole === "implementer" && (
        <Card>
          <CardHeader>
            <CardTitle>Implementer Profile</CardTitle>
            <CardDescription>Select your specific implementer role</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedProfile}
              onValueChange={setSelectedProfile}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors">
                <RadioGroupItem value="developer" id="developer" />
                <Label htmlFor="developer" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <Code className="h-5 w-5 text-[#0095FF]" />
                  <div>
                    <div className="font-medium">Developer</div>
                    <div className="text-sm text-muted-foreground">Software development and coding</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors">
                <RadioGroupItem value="tester" id="tester" />
                <Label htmlFor="tester" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <TestTube className="h-5 w-5 text-[#0095FF]" />
                  <div>
                    <div className="font-medium">Tester</div>
                    <div className="text-sm text-muted-foreground">Testing and quality assurance</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-[#E0F5FF] transition-colors">
                <RadioGroupItem value="support" id="support" />
                <Label htmlFor="support" className="flex items-center space-x-2 cursor-pointer flex-1">
                  <HeadphonesIcon className="h-5 w-5 text-[#0095FF]" />
                  <div>
                    <div className="font-medium">Support Lead</div>
                    <div className="text-sm text-muted-foreground">Support operations and maintenance</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className="bg-[#000067] hover:bg-[#0000C9] text-white px-8"
          size="lg"
        >
          Continue to Wizard
        </Button>
      </div>
    </div>
  )
}
