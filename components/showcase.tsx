import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    tag: "Nano Banana Speed",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    tag: "Nano Banana Speed",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    tag: "Nano Banana Speed",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    tag: "Nano Banana Speed",
  },
]

export function Showcase() {
  return (
    <section id="showcase" className="py-20 bg-accent/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Showcase</h2>
          <p className="text-lg text-muted-foreground">Lightning-Fast AI Creations</p>
          <p className="text-muted-foreground mt-2">See what Nano Banana generates in milliseconds</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20">🍌</div>
                <img
                  src={`/.jpg?key=zd92n&height=400&width=600&query=${encodeURIComponent(item.title)}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                  {item.tag}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg mb-4">Experience the power of Nano Banana yourself</p>
          <Button size="lg" className="gap-2">
            Try Nano Banana Generator
            <span className="text-xl">🍌</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
