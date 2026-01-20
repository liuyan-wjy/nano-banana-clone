"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, Zap, Crown, Sparkles, ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const plans = [
  {
    id: "basic",
    name: "Basic",
    description: "Perfect for individuals and casual users",
    price: { monthly: 1, yearly: 0.8 },
    currency: "USD",
    icon: Sparkles,
    features: [
      "100 HD image generations / month",
      "Standard generation speed",
      "All basic AI models",
      "All style templates",
      "PNG & JPG downloads",
      "Email support",
    ],
    notIncluded: [
      "Priority generation queue",
      "API access",
    ],
    cta: "Get Basic",
    popular: false,
    productId: process.env.NEXT_PUBLIC_CREEM_BASIC_PRODUCT_ID || "prod_basic",
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professional creators and teams",
    price: { monthly: 2, yearly: 1.6 },
    currency: "USD",
    icon: Zap,
    features: [
      "400 HD image generations / month",
      "Priority generation queue",
      "All advanced AI models",
      "All style templates",
      "PNG, JPG & WebP downloads",
      "Priority email support",
      "Commercial usage rights",
      "No watermarks",
    ],
    notIncluded: [
      "API access",
    ],
    cta: "Get Pro",
    popular: true,
    productId: process.env.NEXT_PUBLIC_CREEM_PRO_PRODUCT_ID || "prod_pro",
  },
  {
    id: "max",
    name: "Max",
    description: "For enterprises and professional studios",
    price: { monthly: 3, yearly: 2.4 },
    currency: "USD",
    icon: Crown,
    features: [
      "1800 HD image generations / month",
      "Fastest generation speed",
      "All premium AI models",
      "All style templates",
      "All download formats",
      "24/7 priority support",
      "Commercial usage rights",
      "No watermarks",
      "API access",
      "Dedicated account manager",
    ],
    notIncluded: [],
    cta: "Get Max",
    popular: false,
    productId: process.env.NEXT_PUBLIC_CREEM_MAX_PRODUCT_ID || "prod_max",
  },
]

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [billingInterval, setBillingInterval] = useState<"monthly" | "yearly">("monthly")

  const handleSubscribe = (planId: string, productId: string) => {
    setLoading(planId)
    
    // Redirect to checkout with productId as query parameter (Creem SDK uses camelCase)
    const checkoutUrl = `/api/checkout?productId=${encodeURIComponent(productId)}`
    window.location.href = checkoutUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/10">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <span className="text-4xl">🍌</span>
            <span>Nano Banana</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="container">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 mb-6">
            <span className="text-xl">💰</span>
            <span className="font-medium text-sm">Simple, transparent pricing</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose the plan that fits{" "}
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              your needs
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Start creating amazing images today. Upgrade or downgrade anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-muted">
            <button
              onClick={() => setBillingInterval("monthly")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-medium text-sm transition-all",
                billingInterval === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval("yearly")}
              className={cn(
                "px-6 py-2.5 rounded-lg font-medium text-sm transition-all relative",
                billingInterval === "yearly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="absolute -top-2 -right-4 text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-bold">
                -20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => {
              const Icon = plan.icon
              const price = billingInterval === "yearly" ? plan.price.yearly : plan.price.monthly

              return (
                <Card
                  key={plan.id}
                  className={cn(
                    "relative flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                    plan.popular && "border-2 border-yellow-500 shadow-xl shadow-yellow-500/10"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg">
                      ⭐ Most Popular
                    </div>
                  )}

                  <CardHeader className="text-center pt-8 pb-4">
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors",
                      plan.popular 
                        ? "bg-gradient-to-br from-yellow-500 to-orange-500 text-white" 
                        : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 px-6">
                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl md:text-5xl font-bold">
                          ${price}
                        </span>
                        <span className="text-muted-foreground text-sm">/mo</span>
                      </div>
                      {billingInterval === "yearly" && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Billed ${(price * 12).toFixed(0)}/year
                        </p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature, index) => (
                        <li key={`not-${index}`} className="flex items-start gap-3 opacity-50">
                          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-3 h-3 text-muted-foreground" />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="pt-4 pb-8 px-6">
                    <Button
                      className={cn(
                        "w-full h-12 text-base font-semibold transition-all",
                        plan.popular && "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg shadow-orange-500/25"
                      )}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => handleSubscribe(plan.id, plan.productId)}
                      disabled={loading === plan.id}
                    >
                      {loading === plan.id ? (
                        <span className="flex items-center gap-2">
                          <span className="animate-spin">🍌</span>
                          Processing...
                        </span>
                      ) : (
                        plan.cta
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            All plans include
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Every plan comes with these great features
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🎨", title: "AI-Powered Editing", desc: "Advanced AI models for stunning results" },
              { icon: "⚡", title: "Fast Processing", desc: "Get your edited images in seconds" },
              { icon: "🔒", title: "Secure & Private", desc: "Your images are never stored" },
              { icon: "💾", title: "Multiple Formats", desc: "Download in PNG, JPG, and more" },
              { icon: "🌐", title: "Web-Based", desc: "No software installation needed" },
              { icon: "📱", title: "Mobile Friendly", desc: "Works on any device" },
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-background border">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Can I cancel my subscription anytime?",
                a: "Yes! You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.",
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and various local payment methods through our secure payment provider.",
              },
              {
                q: "Can I upgrade or downgrade my plan?",
                a: "Absolutely! You can change your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the change takes effect at the next billing cycle.",
              },
              {
                q: "What happens if I run out of generations?",
                a: "If you run out of monthly generations, you can wait until your plan renews or upgrade to a higher tier for more generations.",
              },
              {
                q: "Do unused generations roll over?",
                a: "No, unused generations don't roll over to the next month. We recommend choosing a plan that fits your typical monthly usage.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-xl p-6 border transition-colors hover:border-primary/50">
                <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to create amazing images? 🍌
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of creators using Nano Banana to transform their ideas into stunning visuals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600" asChild>
              <Link href="/#generator">
                Try Free Now
                <Sparkles className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8" asChild>
              <Link href="/#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍌</span>
            <span className="font-semibold">Nano Banana</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Nano Banana. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
