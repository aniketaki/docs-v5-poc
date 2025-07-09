"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Scale, Menu, RotateCcw, ChevronLeft, ChevronRight, Check, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useWizardState } from "@/hooks/useWizardState"
import { useFlowConfig } from "@/hooks/useFlowConfig"
import { cn } from "@/lib/utils"

interface WizardLayoutProps {
  children: React.ReactNode
}

export function WizardLayout({ children }: WizardLayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { currentStepIndex, setCurrentStep, resetWizard, signOut, role, profile, stepData } = useWizardState()
  const { steps, totalSteps } = useFlowConfig()

  const currentStep = steps[currentStepIndex]
  const progress = totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0

  const canGoNext = currentStepIndex < totalSteps - 1
  const canGoPrevious = currentStepIndex > 0

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep(currentStepIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (canGoPrevious) {
      setCurrentStep(currentStepIndex - 1)
    }
  }

  const handleStepClick = (index: number) => {
    // Only allow navigation to completed steps or the next immediate step
    if (index <= currentStepIndex || index === currentStepIndex + 1) {
      setCurrentStep(index)
    }
  }

  const handleSignOut = () => {
    signOut()
    router.push("/auth")
  }

  const isStepCompleted = (index: number) => {
    const step = steps[index]
    return step && stepData[step.key] && index < currentStepIndex
  }

  const isStepAccessible = (index: number) => {
    return index <= currentStepIndex || index === currentStepIndex + 1
  }

  const getUserDisplayName = () => {
    if (role === "author") return "Author"
    if (role === "implementer" && profile) {
      return `${role} - ${profile}`
    }
    return role || "User"
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#000067] rounded-lg">
            <Scale className="h-5 w-5 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h2 className="font-semibold text-[#000067]">Themis</h2>
              <p className="text-xs text-[#0000C9]">IPRM Wizard</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 space-y-2">
        <div className="mb-4">
          {!sidebarCollapsed && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-[#000067]">{getUserDisplayName()}</div>
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-[#0000C9]">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-1" role="navigation" aria-label="Wizard steps">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex
            const isCompleted = isStepCompleted(index)
            const isAccessible = isStepAccessible(index)

            return (
              <button
                key={step.key}
                onClick={() => handleStepClick(index)}
                disabled={!isAccessible}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-[#0095FF] focus:ring-offset-2",
                  isActive && "bg-[#0095FF] text-white",
                  !isActive && isAccessible && "hover:bg-[#E0F5FF] text-[#000067]",
                  !isAccessible && "opacity-50 cursor-not-allowed text-gray-400",
                )}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${index + 1}: ${step.title}${isCompleted ? " (completed)" : ""}`}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                    isActive && "bg-white text-[#0095FF]",
                    isCompleted && !isActive && "bg-green-500 text-white",
                    !isActive && !isCompleted && isAccessible && "bg-[#68D1FF] text-[#000067]",
                    !isAccessible && "bg-gray-300 text-gray-500",
                  )}
                >
                  {isCompleted ? <Check className="h-3 w-3" /> : index + 1}
                </div>
                {!sidebarCollapsed && <span className="font-medium truncate">{step.title}</span>}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <Button
          onClick={resetWizard}
          variant="outline"
          size="sm"
          className={cn("w-full border-[#0095FF] text-[#0095FF] hover:bg-[#E0F5FF]", sidebarCollapsed && "px-2")}
        >
          <RotateCcw className="h-4 w-4" />
          {!sidebarCollapsed && <span className="ml-2">Start Over</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-4">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-80">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Scale className="h-6 w-6 text-[#000067]" />
              <h1 className="text-xl font-bold text-[#000067]">Themis</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-[#0000C9] hidden sm:block">{currentStep?.title}</div>

            {/* User Menu with Sign Out */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{getUserDisplayName()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden md:flex flex-col bg-white border-r shadow-sm transition-all duration-300",
            sidebarCollapsed ? "w-20" : "w-80",
          )}
        >
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          <div className="flex-1 p-6">{children}</div>

          {/* Navigation Footer */}
          <div className="border-t bg-white p-4">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handlePrevious}
                  disabled={!canGoPrevious}
                  variant="outline"
                  className="border-[#0095FF] text-[#0095FF] hover:bg-[#E0F5FF] bg-transparent"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>

                <Button onClick={resetWizard} variant="ghost" size="sm" className="text-[#0000C9] hover:bg-[#E0F5FF]">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Start Over
                </Button>
              </div>

              <div className="text-sm text-[#0000C9]">
                Step {currentStepIndex + 1} of {totalSteps}
              </div>

              <Button onClick={handleNext} disabled={!canGoNext} className="bg-[#000067] hover:bg-[#0000C9] text-white">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#000067] text-white py-4">
        <div className="max-w-4xl mx-auto px-6 text-center text-sm">
          © {new Date().getFullYear()} Themis IPRM. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
