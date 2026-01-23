import Link from "next/link"
import { Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-3xl">🍌</span>
            <span>Nano Banana</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <a href="mailto:hex@visiohex.com" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Mail className="w-4 h-4" />
              hex@visiohex.com
            </a>
          </div>

          <p className="text-sm text-muted-foreground">© 2026 Nano Banana. All rights reserved.</p>
        </div>
        
        {/* AI Disclosure */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            🤖 Nano Banana uses AI technology (Google Gemini) to process and generate images. 
            Results may vary and AI-generated content should be reviewed before use.
          </p>
          <p className="text-xs text-muted-foreground">
            Nano Banana is an independent service and is not affiliated with, endorsed by, or sponsored by Google LLC or any of its subsidiaries.
          </p>
        </div>
      </div>
    </footer>
  )
}
