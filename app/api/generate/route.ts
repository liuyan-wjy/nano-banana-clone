import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageBase64 } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      )
    }

    // Call OpenRouter API with Gemini model for image generation
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 120000)

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Image Editor",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Edit this image: ${prompt}. IMPORTANT: You must generate and return an edited image as output.`,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64,
                },
              },
            ],
          },
        ],
        modalities: ["text", "image"],
      }),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorData = await response.json()
      console.error("API Error Response:", errorData)
      throw new Error(errorData.error?.message || `API error: ${response.status}`)
    }

    const completion = await response.json()
    
    // Log full response for debugging (truncate base64 data)
    const logSafeResponse = JSON.stringify(completion, (key, value) => {
      if (key === 'data' && typeof value === 'string' && value.length > 100) {
        return value.substring(0, 50) + '...[TRUNCATED]...' + value.substring(value.length - 50)
      }
      return value
    }, 2)
    console.log("=== API Response ===")
    console.log(logSafeResponse)

    let generatedImage: string | null = null
    let responseText: string | null = null

    // Parse the response
    const choices = completion?.choices
    console.log("choices exists:", !!choices)
    console.log("choices is array:", Array.isArray(choices))
    console.log("choices length:", choices?.length)

    if (choices && Array.isArray(choices) && choices.length > 0) {
      const firstChoice = choices[0]
      console.log("firstChoice keys:", Object.keys(firstChoice || {}))
      
      const message = firstChoice?.message
      console.log("message exists:", !!message)
      console.log("message keys:", Object.keys(message || {}))
      
      // ============================================
      // CHECK 1: Check for images field (OpenRouter format)
      // ============================================
      const images = message?.images
      console.log("images exists:", !!images)
      console.log("images is array:", Array.isArray(images))
      
      if (Array.isArray(images) && images.length > 0) {
        console.log("images length:", images.length)
        
        for (let i = 0; i < images.length; i++) {
          const img = images[i]
          console.log(`--- Image ${i} ---`)
          console.log("img type:", typeof img)
          
          if (img && typeof img === 'object') {
            console.log("img keys:", Object.keys(img))
            
            // Check different possible formats
            // Format 1: { image_url: { url: "..." } } - OpenRouter format
            if (img.image_url) {
              console.log("Found image_url!")
              console.log("image_url type:", typeof img.image_url)
              
              if (typeof img.image_url === 'object' && img.image_url.url) {
                console.log("image_url.url exists, length:", img.image_url.url.length)
                generatedImage = img.image_url.url
                console.log("SUCCESS from images.image_url.url!")
              } else if (typeof img.image_url === 'string') {
                console.log("image_url is string, length:", img.image_url.length)
                generatedImage = img.image_url
                console.log("SUCCESS from images.image_url string!")
              }
            }
            // Format 2: { b64_json: "..." }
            else if (img.b64_json && typeof img.b64_json === 'string') {
              console.log("Found b64_json!")
              generatedImage = `data:image/png;base64,${img.b64_json}`
              console.log("SUCCESS from images.b64_json!")
            }
            // Format 3: { url: "data:..." }
            else if (img.url && typeof img.url === 'string') {
              console.log("Found url!")
              generatedImage = img.url
              console.log("SUCCESS from images.url!")
            }
            // Format 4: { data: "...", mime_type: "..." }
            else if (img.data && typeof img.data === 'string') {
              console.log("Found data!")
              const mimeType = img.mime_type || 'image/png'
              generatedImage = `data:${mimeType};base64,${img.data}`
              console.log("SUCCESS from images.data!")
            }
          } else if (typeof img === 'string') {
            // Format 4: Just a base64 string or URL
            console.log("img is string, length:", img.length)
            if (img.startsWith('data:')) {
              generatedImage = img
            } else {
              generatedImage = `data:image/png;base64,${img}`
            }
            console.log("SUCCESS from images string!")
          }
        }
      }
      
      // ============================================
      // CHECK 2: Check content field
      // ============================================
      const content = message?.content
      console.log("content exists:", !!content)
      console.log("content type:", typeof content)
      console.log("content is array:", Array.isArray(content))

      if (Array.isArray(content)) {
        console.log("content length:", content.length)
        
        for (let i = 0; i < content.length; i++) {
          const part = content[i]
          console.log(`--- Content Part ${i} ---`)
          console.log("part exists:", !!part)
          console.log("part type:", typeof part)
          
          if (part && typeof part === 'object') {
            const partKeys = Object.keys(part)
            console.log("part keys:", partKeys)
            
            // Check for inline_data
            if ('inline_data' in part && !generatedImage) {
              console.log("HAS inline_data!")
              const inlineData = part.inline_data
              console.log("inlineData type:", typeof inlineData)
              
              if (inlineData && typeof inlineData === 'object') {
                console.log("inlineData keys:", Object.keys(inlineData))
                const mimeType = inlineData.mime_type
                const data = inlineData.data
                
                console.log("mime_type:", mimeType)
                console.log("data exists:", !!data)
                console.log("data type:", typeof data)
                console.log("data length:", data?.length)
                
                if (data && typeof data === 'string' && data.length > 0) {
                  generatedImage = `data:${mimeType || 'image/png'};base64,${data}`
                  console.log("SUCCESS from inline_data!")
                }
              }
            }
            
            // Check for text
            if (part.type === 'text' && part.text) {
              responseText = part.text
              console.log("Found text:", String(part.text).substring(0, 100))
            }
          }
        }
      } else if (typeof content === 'string' && content.length > 0) {
        responseText = content
        console.log("Content is string:", content.substring(0, 100))
      }
    }

    console.log("=== FINAL RESULT ===")
    console.log("generatedImage:", generatedImage ? `exists (length: ${generatedImage.length})` : "null")
    console.log("responseText:", responseText ? String(responseText).substring(0, 100) : "null")

    return NextResponse.json({
      success: true,
      image: generatedImage,
      text: responseText,
    })

  } catch (error) {
    console.error("API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { error: "Failed to generate image", details: errorMessage },
      { status: 500 }
    )
  }
}
