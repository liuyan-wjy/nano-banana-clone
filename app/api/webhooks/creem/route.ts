import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// Verify webhook signature from Creem
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex")
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-creem-signature") || request.headers.get("creem-signature")
    const webhookSecret = process.env.CREEM_WEBHOOK_SECRET

    // Verify webhook signature if secret is configured
    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret)
      if (!isValid) {
        console.error("Invalid webhook signature")
        return NextResponse.json(
          { error: "Invalid signature" },
          { status: 401 }
        )
      }
    }

    const event = JSON.parse(body)

    console.log("Received Creem webhook event:", event.type)

    // Handle different event types
    switch (event.type) {
      case "checkout.completed":
        await handleCheckoutCompleted(event.data)
        break

      case "subscription.created":
        await handleSubscriptionCreated(event.data)
        break

      case "subscription.updated":
        await handleSubscriptionUpdated(event.data)
        break

      case "subscription.canceled":
      case "subscription.cancelled":
        await handleSubscriptionCanceled(event.data)
        break

      case "invoice.paid":
        await handleInvoicePaid(event.data)
        break

      case "invoice.payment_failed":
        await handlePaymentFailed(event.data)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(data: any) {
  console.log("Checkout completed:", data)
  
  // Extract relevant information
  const {
    customer_id,
    customer_email,
    subscription_id,
    metadata,
  } = data

  const planId = metadata?.plan_id
  const billingInterval = metadata?.billing_interval

  // TODO: Update your database
  // - Create or update user subscription record
  // - Grant access to premium features
  // - Send welcome email

  console.log(`User ${customer_email} subscribed to ${planId} (${billingInterval})`)
}

async function handleSubscriptionCreated(data: any) {
  console.log("Subscription created:", data)
  
  const {
    id: subscriptionId,
    customer_id,
    product_id,
    status,
    current_period_start,
    current_period_end,
  } = data

  // TODO: Store subscription details in your database
  console.log(`Subscription ${subscriptionId} created for customer ${customer_id}`)
}

async function handleSubscriptionUpdated(data: any) {
  console.log("Subscription updated:", data)
  
  const {
    id: subscriptionId,
    status,
    cancel_at_period_end,
  } = data

  // TODO: Update subscription status in your database
  console.log(`Subscription ${subscriptionId} updated to status: ${status}`)
}

async function handleSubscriptionCanceled(data: any) {
  console.log("Subscription canceled:", data)
  
  const {
    id: subscriptionId,
    customer_id,
  } = data

  // TODO: Update user's subscription status
  // - Revoke premium access at period end
  // - Send cancellation confirmation email

  console.log(`Subscription ${subscriptionId} canceled for customer ${customer_id}`)
}

async function handleInvoicePaid(data: any) {
  console.log("Invoice paid:", data)
  
  const {
    subscription_id,
    customer_id,
    amount_paid,
  } = data

  // TODO: Record payment in your database
  // - Extend subscription period
  // - Send receipt email

  console.log(`Invoice paid for subscription ${subscription_id}, amount: ${amount_paid}`)
}

async function handlePaymentFailed(data: any) {
  console.log("Payment failed:", data)
  
  const {
    subscription_id,
    customer_id,
    customer_email,
  } = data

  // TODO: Handle failed payment
  // - Send payment failed notification
  // - Consider grace period or dunning

  console.log(`Payment failed for subscription ${subscription_id}, customer: ${customer_email}`)
}
