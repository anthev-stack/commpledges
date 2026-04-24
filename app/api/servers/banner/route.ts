import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 })
    }

    // Validate file type (webp, gif, png)
    const validTypes = ['image/webp', 'image/gif', 'image/png']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only WebP, GIF, and PNG files are allowed." 
      }, { status: 400 })
    }

    // Validate file size (max 2MB for banners)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ 
        error: "File size must be under 2MB" 
      }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    return NextResponse.json({ 
      success: true, 
      message: "Banner uploaded successfully",
      dataUrl: dataUrl
    })

  } catch (error) {
    console.error("Error uploading banner:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

