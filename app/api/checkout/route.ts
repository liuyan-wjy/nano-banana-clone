import { NextRequest, NextResponse } from "next/server"

const CREEM_API_URL = "https://api.creem.io/v1"

export async function POST(request: NextRequest) {
  try {
    const { productId, planId, billingInterval } = await request.json()

    if (!productId || !planId) {
      return NextResponse.json(
        { error: "Missing productId or planId" },
        { status: 400 }
      )
    }

    const apiKey = process.env.CREEM_API_KEY

    if (!apiKey) {
      console.error("CREEM_API_KEY is not configured")
      return NextResponse.json(
        { error: "Payment system is not configured" },
        { status: 500 }
      )
    }

    // Get the origin for redirect URLs
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Create checkout session with Creem API
    const response = await fetch(`${CREEM_API_URL}/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        product_id: productId,
        success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing`,
        metadata: {
          plan_id: planId,
          billing_interval: billingInterval,
        },
        // Optional: Pass customer email if user is logged in
        // customer_email: user?.email,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("Creem API error:", response.status, errorData)
      
      // Handle specific error cases
      if (response.status === 401) {
        return NextResponse.json(
          { error: "Payment authentication failed" },
          { status: 500 }
        )
      }
      
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Product not found. Please contact support." },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: errorData.message || "Failed to create checkout session" },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the checkout URL
    return NextResponse.json({
      checkoutUrl: data.checkout_url || data.url,
      sessionId: data.id,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    )
  }
}
