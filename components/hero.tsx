import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Banana decorations */}
      <div className="absolute top-10 right-10 text-8xl opacity-10 rotate-12 hidden lg:block">🍌</div>
      <div className="absolute bottom-10 left-10 text-6xl opacity-10 -rotate-12 hidden lg:block">🍌</div>

      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium mb-8">
            <span className="text-2xl">🍌</span>
            <span>The AI model that outperforms Flux Kontext</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance">Nano Banana</h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance max-w-3xl mx-auto leading-relaxed">
            Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
            editing and scene preservation that surpasses Flux Kontext.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg gap-2" asChild>
              <a href="#generator">
                Start Editing
                <span className="text-xl">🍌</span>
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg gap-2 bg-transparent" asChild>
              <a href="#showcase">
                View Examples
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              One-shot editing
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Multi-image support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Natural language
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
