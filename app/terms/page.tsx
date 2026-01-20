"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
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

      {/* Content */}
      <main className="container max-w-4xl py-16">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 20, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Nano Banana (&quot;Service&quot;), you agree to be bound by these Terms of Service 
              (&quot;Terms&quot;). If you do not agree to these Terms, please do not use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Nano Banana is an AI-powered image editing service that allows users to edit and generate 
              images using artificial intelligence technology. The Service uses third-party AI models 
              (including but not limited to Google Gemini) to process images and text prompts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-medium mb-3">3.1 Account Creation</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To access certain features, you must create an account using Google Sign-In. You are 
              responsible for maintaining the confidentiality of your account and for all activities 
              under your account.
            </p>
            
            <h3 className="text-xl font-medium mb-3">3.2 Account Responsibilities</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>You must be at least 13 years old to use this Service</li>
              <li>You must provide accurate and complete information</li>
              <li>You are responsible for all activity on your account</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Subscriptions and Payments</h2>
            <h3 className="text-xl font-medium mb-3">4.1 Billing</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Certain features of the Service require a paid subscription. By subscribing, you agree to 
              pay the applicable fees. All payments are processed securely through our payment provider, Creem.
            </p>
            
            <h3 className="text-xl font-medium mb-3">4.2 Subscription Plans</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Basic:</strong> 100 HD image generations per month</li>
              <li><strong>Pro:</strong> 400 HD image generations per month with priority processing</li>
              <li><strong>Max:</strong> 1800 HD image generations per month with API access</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4.3 Cancellation and Refunds</h3>
            <p className="text-muted-foreground leading-relaxed">
              You may cancel your subscription at any time. Upon cancellation, you will continue to have 
              access until the end of your current billing period. Refunds are generally not provided 
              for partial billing periods, except as required by law.
            </p>
            
            <h3 className="text-xl font-medium mb-3 mt-6">4.4 Price Changes</h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to change our pricing. Any price changes will be communicated to you 
              in advance and will take effect at the start of your next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree NOT to use the Service to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Create, upload, or distribute illegal content</li>
              <li>Generate content that infringes on intellectual property rights</li>
              <li>Create deepfakes or misleading content intended to deceive</li>
              <li>Generate explicit, pornographic, or sexually suggestive content</li>
              <li>Create content that promotes violence, hatred, or discrimination</li>
              <li>Harass, abuse, or harm others</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to circumvent usage limits or security measures</li>
              <li>Use automated systems to access the Service without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. AI-Generated Content</h2>
            <h3 className="text-xl font-medium mb-3">6.1 AI Disclosure</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              All images generated through our Service are created using artificial intelligence. The 
              AI may produce unexpected or imperfect results. We do not guarantee the accuracy, quality, 
              or appropriateness of AI-generated content.
            </p>
            
            <h3 className="text-xl font-medium mb-3">6.2 Content Ownership</h3>
            <p className="text-muted-foreground leading-relaxed">
              You retain ownership of the original images you upload. For AI-generated output, you are 
              granted a license to use the generated content for personal or commercial purposes 
              (depending on your subscription plan), subject to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Service, including its design, features, and content (excluding user-generated content), 
              is owned by Nano Banana and protected by intellectual property laws. You may not copy, 
              modify, distribute, or create derivative works without our permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, 
              EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, 
              OR SECURE. WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR 
              PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, NANO BANANA SHALL NOT BE LIABLE FOR ANY INDIRECT, 
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, 
              OR GOODWILL, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Nano Banana and its officers, directors, employees, 
              and agents from any claims, damages, losses, or expenses arising from your use of the 
              Service or violation of these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your access to the Service at any time, with or without cause. 
              Upon termination, your right to use the Service will immediately cease. Provisions that 
              by their nature should survive termination will survive.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may modify these Terms at any time. We will notify you of material changes by posting 
              the updated Terms on this page and updating the &quot;Last updated&quot; date. Your continued use 
              of the Service after changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the 
              jurisdiction in which Nano Banana operates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-medium">Nano Banana</p>
              <p className="text-muted-foreground">Email: <a href="mailto:hex@visiohex.com" className="text-primary hover:underline">hex@visiohex.com</a></p>
            </div>
          </section>
        </div>
      </main>

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
