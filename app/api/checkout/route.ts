import { NextRequest, NextResponse } from "next/server"

// Creem API base URL
const CREEM_API_URL = process.env.CREEM_API_URL || "https://api.creem.io/v1"

export async function POST(request: NextRequest) {
  try {
    const { productId, planId, billingInterval } = await request.json()

    console.log("=== Checkout Request ===")
    console.log("productId:", productId)
    console.log("planId:", planId)
    console.log("billingInterval:", billingInterval)

    if (!productId || !planId) {
      return NextResponse.json(
        { error: "Missing productId or planId" },
        { status: 400 }
      )
    }

    const apiKey = process.env.CREEM_API_KEY

    if (!apiKey) {
      console.error("CREEM_API_KEY is not configured in .env.local")
      return NextResponse.json(
        { error: "Payment system is not configured. Please add CREEM_API_KEY to .env.local" },
        { status: 500 }
      )
    }

    console.log("API Key configured:", apiKey.substring(0, 10) + "...")

    // Get the origin for redirect URLs
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const requestBody = {
      product_id: productId,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      request_id: `checkout_${Date.now()}`,
    }

    console.log("Request URL:", `${CREEM_API_URL}/checkouts`)
    console.log("Request body:", JSON.stringify(requestBody, null, 2))

    // Create checkout session with Creem API
    // Try with Authorization Bearer header (common pattern)
    const response = await fetch(`${CREEM_API_URL}/checkouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "x-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    })

    const responseText = await response.text()
    console.log("Response status:", response.status)
    console.log("Response body:", responseText)

    if (!response.ok) {
      let errorData: any = {}
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { message: responseText }
      }
      
      console.error("Creem API error:", response.status, errorData)
      
      // Handle specific error cases
      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { 
            error: "Payment API authentication failed. Please check your CREEM_API_KEY in .env.local",
            details: errorData.error || errorData.message 
          },
          { status: 500 }
        )
      }
      
      if (response.status === 404) {
        return NextResponse.json(
          { 
            error: "Product not found. Please create products in Creem dashboard and update NEXT_PUBLIC_CREEM_*_PRODUCT_ID in .env.local",
            details: errorData.error || errorData.message
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { error: errorData.message || errorData.error || "Failed to create checkout session" },
        { status: response.status }
      )
    }

    const data = JSON.parse(responseText)
    console.log("Checkout session created:", data)

    // Return the checkout URL
    return NextResponse.json({
      checkoutUrl: data.checkout_url || data.url,
      sessionId: data.id,
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { error: "An unexpected error occurred: " + (error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    )
  }
}
