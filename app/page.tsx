import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Scale } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-themis-cyan-10 to-themis-cyan-30">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-themis-blue-90 rounded-full">
              <Scale className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-themis-blue-90">Welcome to Themis</CardTitle>
          <CardDescription className="text-themis-blue-70 text-lg">
            Your Enterprise Information Protection & Risk Management Wizard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-themis-blue-70 mb-6">
            Streamline your IPRM workflows with an intuitive, guided experience.
          </p>
          <Link href="/login">
            <Button className="w-full bg-themis-blue-90 hover:bg-themis-blue-70 text-white text-lg py-3" size="lg">
              Sign In to Get Started
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
