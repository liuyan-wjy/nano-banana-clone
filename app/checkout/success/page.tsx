"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          {/* Success Icon */}
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <div className="absolute top-0 right-1/3 animate-bounce">
              <span className="text-3xl">🍌</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-4">
            Payment Successful! 🎉
          </h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Thank you for subscribing to Nano Banana! Your account has been upgraded and you now have access to all premium features.
          </p>

          {/* Session ID (if needed for support) */}
          {sessionId && (
            <p className="text-xs text-muted-foreground mb-8 font-mono bg-muted rounded-lg px-4 py-2">
              Order ID: {sessionId}
            </p>
          )}

          {/* What's Next */}
          <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              What&apos;s included in your plan:
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                HD image generations
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Priority processing
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                All AI models & styles
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                No watermarks
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 h-12 text-base" asChild>
              <Link href="/#generator">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="flex-1 h-12 text-base" asChild>
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Support Link */}
          <p className="text-xs text-muted-foreground mt-8">
            Need help?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-green-500/5 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full">
        <CardContent className="pt-12 pb-8 px-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SuccessContent />
    </Suspense>
  )
}
