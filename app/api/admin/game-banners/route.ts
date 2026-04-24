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
    const gameType = formData.get('gameType') as string
    const type = formData.get('type') as string

    if (!file || !gameType) {
      return NextResponse.json({ error: "File and gameType are required" }, { status: 400 })
    }

    // Validate type
    if (!['game-banner', 'default-banner'].includes(type)) {
      return NextResponse.json({ error: "Invalid type. Must be 'game-banner' or 'default-banner'" }, { status: 400 })
    }

    // Validate file type
    const validTypes = ['image/webp', 'image/png', 'image/jpeg']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Only WebP, PNG, and JPEG files are allowed." 
      }, { status: 400 })
    }

    // Validate file size (max 5MB for banners)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ 
        error: "File size must be under 5MB" 
      }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataUrl = `data:${file.type};base64,${base64}`

    // Store in database using SiteSettings
    let settingKey: string
    if (type === 'game-banner') {
      settingKey = `game_banner_${gameType.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`
    } else {
      settingKey = 'default_game_banner'
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
    console.error("Error uploading game banner:", error)
    return NextResponse.json(
      { error: `Internal server error: ${error}` },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve game banner data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const gameType = searchParams.get('gameType')
    const type = searchParams.get('type')

    if (!type || !['game-banner', 'default-banner'].includes(type)) {
      return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 })
    }

    let settingKey: string
    if (type === 'game-banner' && gameType) {
      settingKey = `game_banner_${gameType.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`
    } else {
      settingKey = 'default_game_banner'
    }
    
    const setting = await prisma.siteSettings.findUnique({
      where: { key: settingKey }
    })

    if (!setting) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 })
    }

    return NextResponse.json({ 
      dataUrl: setting.value
    })

  } catch (error) {
    console.error("Error fetching game banner:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
