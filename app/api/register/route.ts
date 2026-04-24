import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, country, captchaToken } = body

    // Verify hCaptcha
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Captcha verification required" },
        { status: 400 }
      )
    }

    const captchaResponse = await fetch(
      "https://hcaptcha.com/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `response=${captchaToken}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
      }
    )

    const captchaData = await captchaResponse.json()

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "Captcha verification failed" },
        { status: 400 }
      )
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      }
    })

    if (existingUser) {
      // Check if user signed up with Discord (no password)
      if (!existingUser.password) {
        return NextResponse.json(
          { 
            error: "It looks like you already have an account with this email using Discord. Please log in with Discord instead.",
            accountType: "discord"
          },
          { status: 400 }
        )
      }
      
      // User has email/password account
      return NextResponse.json(
        { 
          error: "It looks like you already have an account with this email. Please log in instead.",
          accountType: "credentials"
        },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        country: country || null,
      },
    })

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}

