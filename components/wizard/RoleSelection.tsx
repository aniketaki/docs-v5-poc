"use client"

import type React from "react"

import { useState } from "react"
import { User, Code, TestTube, HeadphonesIcon, Info, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useWizardState } from "@/hooks/useWizardState"
import { cn } from "@/lib/utils"
import type { UserRole, ImplementerProfile } from "@/types/wizard"

interface RoleCardProps {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  isSelected: boolean
  isDisabled?: boolean
  onClick: () => void
  tooltip?: string
}

function RoleCard({ id, title, description, icon: Icon, isSelected, isDisabled, onClick, tooltip }: RoleCardProps) {
  const cardContent = (
    <Card
      className={cn(
        "relative cursor-pointer transition-all duration-200 border-2 hover:shadow-md",
        "focus-within:ring-2 focus-within:ring-[#0095FF] focus-within:ring-offset-2",
        isSelected && "border-[#0095FF] bg-[#E0F5FF] shadow-md",
        !isSelected && !isDisabled && "border-gray-200 hover:border-[#68D1FF] hover:bg-[#E0F5FF]/50",
        isDisabled && "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50",
      )}
      onClick={!isDisabled ? onClick : undefined}
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      onKeyDown={(e) => {
        if (!isDisabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onClick()
        }
      }}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 w-6 h-6 bg-[#0095FF] rounded-full flex items-center justify-center">
          <Check className="h-4 w-4 text-white" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "p-2 rounded-lg transition-colors",
              isSelected ? "bg-[#0095FF] text-white" : "bg-[#E0F5FF] text-[#0095FF]",
              isDisabled && "bg-gray-200 text-gray-400",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <CardTitle
              className={cn(
                "text-lg flex items-center gap-2",
                isSelected ? "text-[#000067]" : "text-[#000067]",
                isDisabled && "text-gray-400",
              )}
            >
              {title}
              {isDisabled && <Info className="h-4 w-4" />}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardDescription
          className={cn("text-sm", isSelected ? "text-[#0000C9]" : "text-[#0000C9]", isDisabled && "text-gray-400")}
        >
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )

  if (isDisabled && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return cardContent
}

export function RoleSelection() {
  const { setRole, setProfile, setCurrentStep } = useWizardState()
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("")
  const [selectedProfile, setSelectedProfile] = useState<ImplementerProfile | "">("")

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role)
    if (role !== "implementer") {
      setSelectedProfile("")
    }
  }

  const handleProfileSelect = (profile: ImplementerProfile) => {
    setSelectedProfile(profile)
  }

  const handleContinue = () => {
    if (selectedRole && (selectedRole !== "implementer" || selectedProfile)) {
      setRole(selectedRole as UserRole)
      setProfile(selectedRole === "implementer" ? (selectedProfile as ImplementerProfile) : null)
      setCurrentStep(0)
    }
  }

  const isValid = selectedRole && (selectedRole !== "implementer" || selectedProfile)

  const roleOptions = [
    {
      id: "author",
      title: "Author",
      description: "Create and design IPRM documentation",
      icon: User,
      isDisabled: false,
    },
    {
      id: "implementer",
      title: "Implementer",
      description: "Implement and execute IPRM requirements",
      icon: Code,
      isDisabled: false,
    },
    {
      id: "qa",
      title: "QA",
      description: "Quality assurance and validation",
      icon: TestTube,
      isDisabled: true,
      tooltip: "Coming soon",
    },
  ]

  const profileOptions = [
    {
      id: "developer",
      title: "Developer",
      description: "Software development and coding",
      icon: Code,
    },
    {
      id: "tester",
      title: "Tester",
      description: "Testing and quality assurance",
      icon: TestTube,
    },
    {
      id: "support",
      title: "Support Lead",
      description: "Support operations and maintenance",
      icon: HeadphonesIcon,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#000067]">Select Your Role</h1>
        <p className="text-[#0000C9]">Choose your role to customize your IPRM workflow</p>
      </div>

      <div className="space-y-8">
        {/* Primary Role Selection */}
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[#000067] mb-2">Primary Role</h2>
            <p className="text-[#0000C9] text-sm">Select your primary role in the IPRM process</p>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            role="radiogroup"
            aria-label="Select your primary role"
          >
            {roleOptions.map((option) => (
              <RoleCard
                key={option.id}
                id={option.id}
                title={option.title}
                description={option.description}
                icon={option.icon}
                isSelected={selectedRole === option.id}
                isDisabled={option.isDisabled}
                onClick={() => !option.isDisabled && handleRoleSelect(option.id as UserRole)}
                tooltip={option.tooltip}
              />
            ))}
          </div>
        </div>

        {/* Implementer Profile Selection */}
        {selectedRole === "implementer" && (
          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
            <div>
              <h2 className="text-xl font-semibold text-[#000067] mb-2">Implementer Profile</h2>
              <p className="text-[#0000C9] text-sm">Select your specific implementer role</p>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              role="radiogroup"
              aria-label="Select your implementer profile"
            >
              {profileOptions.map((option) => (
                <RoleCard
                  key={option.id}
                  id={option.id}
                  title={option.title}
                  description={option.description}
                  icon={option.icon}
                  isSelected={selectedProfile === option.id}
                  isDisabled={false}
                  onClick={() => handleProfileSelect(option.id as ImplementerProfile)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleContinue}
          disabled={!isValid}
          className={cn(
            "px-8 py-3 text-lg font-medium transition-all duration-200",
            "bg-[#000067] hover:bg-[#0000C9] text-white",
            "focus:ring-2 focus:ring-[#0095FF] focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
          )}
          size="lg"
        >
          Continue to Wizard
        </Button>
      </div>
    </div>
  )
}
