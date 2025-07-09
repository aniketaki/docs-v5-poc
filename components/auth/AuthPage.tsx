"use client"

import { useState } from "react"
import Link from "next/link"
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
    <div className="min-h-screen bg-gradient-to-br from-[#E0F5FF] to-[#68D1FF] flex flex-col">
      {/* Header */}
      <header className="p-6">
        <div className="flex items-center justify-between">
          {/* Left side - Themis branding */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Scale className="h-8 w-8 text-[#000067]" />
            <h1 className="text-2xl font-bold text-[#000067]">Themis</h1>
          </Link>

          {/* Right side - Logo placeholder (Sign In not needed on auth page) */}
          <div className="flex items-center gap-4">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-white/20 rounded-lg border-2 border-white/30 flex items-center justify-center">
              <div className="w-6 h-6 bg-[#000067]/20 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
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
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/20">
        <div className="text-center">
          <p className="text-[#000067] text-sm">© {new Date().getFullYear()} Themis IPRM. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
