import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch user role from database
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const type = formData.get('type') as string

    if (!file || !type) {
      return NextResponse.json({ error: "File and type are required" }, { status: 400 })
    }

    // Validate type
    if (!['bat', 'snowflake', 'favicon'].includes(type)) {
      return NextResponse.json({ error: "Invalid type. Must be 'bat', 'snowflake', or 'favicon'" }, { status: 400 })
    }

    // Validate file type based on upload type
    if (type === 'favicon') {
      // Favicons can be ICO, PNG, or SVG
      const validFaviconTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml']
      if (!validFaviconTypes.includes(file.type) && !file.name.endsWith('.ico')) {
        return NextResponse.json({ error: "Favicon must be ICO, PNG, or SVG" }, { status: 400 })
      }
      // Validate file size (max 100KB for favicon)
      if (file.size > 100000) {
        return NextResponse.json({ error: "Favicon size must be under 100KB" }, { status: 400 })
      }
    } else {
      // For bat and snowflake animations
      if (!file.type.startsWith('image/gif') && !file.type.startsWith('image/png') && !file.type.startsWith('image/webp')) {
        return NextResponse.json({ error: "File must be a GIF, PNG, or WebP" }, { status: 400 })
      }
      // Validate file size (max 200KB for animations)
      if (file.size > 200000) {
        return NextResponse.json({ error: "File size must be under 200KB" }, { status: 400 })
      }
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Store in database using SiteSettings
    let settingKey: string
    if (type === 'bat') {
      settingKey = 'theme_gif_bat'
    } else if (type === 'snowflake') {
      settingKey = 'theme_gif_snowflake'
    } else if (type === 'favicon') {
      settingKey = 'site_favicon'
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }
    
    await prisma.siteSettings.upsert({
      where: { key: settingKey },
      create: {
        key: settingKey,
        value: dataUrl,
        updatedBy: session.user.id
      },
      update: {
        value: dataUrl,
        updatedBy: session.user.id
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: `${type} uploaded successfully`,
      dataUrl: dataUrl
    })

  } catch (error) {
    console.error("Error uploading GIF:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve GIF/favicon data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type || !['bat', 'snowflake', 'favicon'].includes(type)) {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    }

    let settingKey: string
    if (type === 'bat') {
      settingKey = 'theme_gif_bat'
    } else if (type === 'snowflake') {
      settingKey = 'theme_gif_snowflake'
    } else {
      settingKey = 'site_favicon'
    }
    
    const setting = await prisma.siteSettings.findUnique({
      where: { key: settingKey }
    })

    if (!setting) {
      return NextResponse.json({ error: `${type} not found` }, { status: 404 })
    }

    return NextResponse.json({ 
      dataUrl: setting.value
    })

  } catch (error) {
    console.error("Error fetching data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
