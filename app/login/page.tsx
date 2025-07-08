"use client"

import type React from "react"

import { useState } from "react"
import { Scale, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("user@example.com") // Default for demo
  const [password, setPassword] = useState("password") // Default for demo
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in a real app, this would validate against a backend
    if (email === "user@example.com" && password === "password") {
      // Store a simple auth token in localStorage (for demo purposes only)
      localStorage.setItem("isAuthenticated", "true")

      toast({
        title: "Login Successful",
        description: "Redirecting to wizard...",
      })

      router.push("/wizard")
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-themis-cyan-10 to-themis-cyan-30">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-themis-blue-90 rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-themis-blue-90">Welcome to Themis</CardTitle>
            <CardDescription className="text-themis-blue-70">
              Enterprise Information Protection & Risk Management
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-themis-blue-90 hover:bg-themis-blue-70 text-white"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
