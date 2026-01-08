import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Showcase } from "@/components/showcase"
import { Reviews } from "@/components/reviews"
import { FAQ } from "@/components/faq"
import { ImageEditor } from "@/components/image-editor"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <ImageEditor />
      <Features />
      <Showcase />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}
