import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: "Token is required", valid: false },
        { status: 400 }
      )
    }

    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          }
        }
      }
    })

    // Check if token exists
    if (!resetToken) {
      return NextResponse.json({
        valid: false,
        error: "Invalid or expired reset link"
      })
    }

    // Check if token has been used
    if (resetToken.used) {
      return NextResponse.json({
        valid: false,
        error: "This reset link has already been used"
      })
    }

    // Check if token has expired (5 minutes)
    if (new Date() > resetToken.expires) {
      return NextResponse.json({
        valid: false,
        error: "This reset link has expired. Please request a new one."
      })
    }

    // Token is valid
    return NextResponse.json({
      valid: true,
      email: resetToken.user.email,
      name: resetToken.user.name,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json(
      { error: "Failed to verify token", valid: false },
      { status: 500 }
    )
  }
}



