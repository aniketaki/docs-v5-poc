import Link from "next/link"
import { Scale, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
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

          {/* Right side - Logo placeholder only */}
          <div className="flex items-center gap-4">
            {/* Logo placeholder */}
            <div className="w-10 h-10 bg-white/20 rounded-lg border-2 border-white/30 flex items-center justify-center">
              <div className="w-6 h-6 bg-[#000067]/20 rounded"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Welcome Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-[#000067]">Welcome to Themis</h1>
            <p className="text-xl md:text-2xl text-[#0000C9] max-w-2xl mx-auto">
              Enterprise Information Protection & Risk Management Workflow System
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#000067]">Author</CardTitle>
                <CardDescription className="text-[#0000C9]">
                  Create and design IPRM documentation with guided workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#000067]">Implementer</CardTitle>
                <CardDescription className="text-[#0000C9]">
                  Execute IPRM requirements with role-specific guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#000067]">Compliance</CardTitle>
                <CardDescription className="text-[#0000C9]">
                  Ensure adherence to security standards and regulations
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <Link href="/auth">
              <Button
                size="lg"
                className="bg-[#000067] hover:bg-[#0000C9] text-white px-8 py-4 text-lg font-semibold inline-flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Footer Info */}
          <div className="pt-12 text-center">
            <p className="text-[#0000C9] text-sm">
              Streamline your information protection and risk management processes
            </p>
          </div>
        </div>
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
