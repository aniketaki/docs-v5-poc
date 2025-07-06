"use client"

import { useState } from "react"
import { Scale, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWizardState } from "@/hooks/useWizardState"

export function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthenticated } = useWizardState()

  const handleSSOLogin = async () => {
    setIsLoading(true)

    // Simulate SSO login process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setAuthenticated(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-[#000067] rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-[#000067]">Welcome to Themis</CardTitle>
            <CardDescription className="text-[#0000C9]">
              Enterprise Information Protection & Risk Management
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleSSOLogin}
            disabled={isLoading}
            className="w-full bg-[#000067] hover:bg-[#0000C9] text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Authenticating...
              </>
            ) : (
              "SSO Login"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
