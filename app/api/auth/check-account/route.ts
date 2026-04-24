import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      }
    })

    if (!user) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      )
    }

    // Determine account type
    const accountType = user.password ? 'credentials' : 'discord'

    return NextResponse.json({
      exists: true,
      accountType,
    })
  } catch (error) {
    console.error("Check account error:", error)
    return NextResponse.json(
      { error: "Failed to check account" },
      { status: 500 }
    )
  }
}


