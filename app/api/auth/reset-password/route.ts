import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { emailService } from "@/lib/email"
import { randomBytes } from "crypto"

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

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent."
      })
    }

    // Only allow password reset for users with passwords (not OAuth users)
    if (!user.password) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent."
      })
    }

    // Delete any existing unused reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        used: false,
      }
    })

    // Generate secure reset token
    const resetToken = randomBytes(32).toString('hex')
    const resetExpiry = new Date(Date.now() + 300000) // 5 minutes from now

    // Store reset token in database
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expires: resetExpiry,
      }
    })

    // Create reset link
    const resetLink = `https://communitypledges.com/reset-password?token=${resetToken}`

    // Send password reset email
    try {
      await emailService.sendPasswordReset(
        user.email!,
        user.name || 'User',
        resetLink
      )
    } catch (error) {
      console.error('Failed to send password reset email:', error)
      return NextResponse.json(
        { error: "Failed to send reset email" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset link has been sent."
    })
  } catch (error) {
    console.error("Password reset error:", error)
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    )
  }
}
