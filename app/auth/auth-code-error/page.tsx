"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

function AuthCodeErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-muted-foreground mb-4">
            There was an error during the authentication process. Please try again.
          </p>
          {error && (
            <p className="text-sm text-red-500 mb-4 p-2 bg-red-50 rounded">
              Error: {error}
            </p>
          )}
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default function AuthCodeError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Loading...</h1>
          </div>
        </Card>
      </div>
    }>
      <AuthCodeErrorContent />
    </Suspense>
  )
}
