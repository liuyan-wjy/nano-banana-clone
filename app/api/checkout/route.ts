// app/api/checkout/route.ts
import { Checkout } from '@creem_io/nextjs'

// Determine if we're in test mode based on API key prefix
const isTestMode = process.env.CREEM_API_KEY?.startsWith('creem_test')

export const GET = Checkout({
  apiKey: process.env.CREEM_API_KEY!,
  testMode: isTestMode ?? true,
  defaultSuccessUrl: '/checkout/success',
})
