"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Sparkles, Loader2, Download, X } from "lucide-react"

interface GenerateResponse {
  success?: boolean
  image?: string | null
  text?: string | null
  error?: string
  details?: string
}

export function ImageEditor() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [responseText, setResponseText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    // Reset the file input
    const input = document.getElementById("image-upload") as HTMLInputElement
    if (input) input.value = ""
  }

  const handleGenerate = async () => {
    if (!selectedImage) {
      setError("Please upload an image first")
      return
    }

    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsGenerating(true)
    setError(null)
    setGeneratedImage(null)
    setResponseText(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageBase64: selectedImage,
        }),
      })

      const data: GenerateResponse = await response.json()
      
      // Debug: log the full response
      console.log("API Response:", data)
      console.log("data.image type:", typeof data.image)
      console.log("data.image value (first 100 chars):", typeof data.image === "string" ? data.image.substring(0, 100) : data.image)

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to generate image")
      }

      if (data.image && typeof data.image === "string") {
        console.log("Setting generatedImage, length:", data.image.length)
        setGeneratedImage(data.image)
      } else if (data.image) {
        console.error("data.image is not a string:", data.image)
        setError("Invalid image format received from API")
      }
      
      if (data.text) {
        setResponseText(data.text)
      }

      if (!data.image && data.text) {
        // API returned text but no image - this sometimes happens
        setError("The AI responded with text but didn't generate an image. Try rephrasing your prompt to explicitly request image editing, like 'Edit this image to...' or 'Transform this photo into...'")
      } else if (!data.image && !data.text) {
        setError("No output received from the API. Please try a different prompt.")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred"
      setError(errorMessage)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="generator" className="py-20 bg-accent/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try The AI Editor</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the power of nano-banana&apos;s natural language image editing. Transform any photo with simple text
            commands
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Prompt Engine</h3>
            <p className="text-sm text-muted-foreground mb-6">Transform your image with AI-powered editing</p>

            <div className="space-y-6">
              {/* Image Upload */}
              <div>
                <label className="text-sm font-medium mb-2 block">Upload Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors relative overflow-hidden"
                  >
                    {selectedImage ? (
                      <>
                        <img
                          src={selectedImage}
                          alt="Uploaded"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            clearImage()
                          }}
                          className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-10 h-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload image</p>
                        <p className="text-xs text-muted-foreground">Max 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Prompt Input */}
              <div>
                <label className="text-sm font-medium mb-2 block">Main Prompt</label>
                <Textarea
                  placeholder="Describe how you want to transform your image..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 resize-none"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating || !selectedImage || !prompt.trim()}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Now
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Output Gallery</h3>
                <p className="text-sm text-muted-foreground mt-1">Your ultra-fast AI creations appear here instantly</p>
              </div>
              {generatedImage && (
                <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              )}
            </div>

            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border rounded-lg bg-accent/30 overflow-hidden">
              {isGenerating ? (
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-lg font-medium">Generating your image...</p>
                  <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                </div>
              ) : generatedImage ? (
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-full object-contain max-h-[400px]"
                />
              ) : responseText ? (
                <div className="p-4 text-center">
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{responseText}</p>
                </div>
              ) : (
                <>
                  <span className="text-6xl mb-4">🍌</span>
                  <p className="text-lg font-medium mb-2">Ready for instant generation</p>
                  <p className="text-sm text-muted-foreground text-center max-w-xs">
                    Enter your prompt and unleash the power
                  </p>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
