import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin or moderator
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'MODERATOR')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin or Moderator access required' },
        { status: 403 }
      )
    }

    const streamers = await prisma.partnerStreamer.findMany({
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' }
      ],
      include: {
        addedByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(streamers)
  } catch (error) {
    console.error('Get partner streamers error:', error)
    return NextResponse.json(
      { error: 'Failed to get partner streamers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if user is admin or moderator
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'MODERATOR')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin or Moderator access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { username, displayName, priority, isActive } = body

    // Validate required fields
    if (!username || !displayName) {
      return NextResponse.json(
        { error: 'Username and display name are required' },
        { status: 400 }
      )
    }

    // Check if username already exists
    const existing = await prisma.partnerStreamer.findUnique({
      where: { username: username.toLowerCase() }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'A streamer with this username already exists' },
        { status: 400 }
      )
    }

    const streamer = await prisma.partnerStreamer.create({
      data: {
        username: username.toLowerCase(),
        displayName: displayName,
        priority: priority || 0,
        isActive: isActive !== undefined ? isActive : true,
        addedBy: session.user.id
      },
      include: {
        addedByUser: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    })

    return NextResponse.json(streamer, { status: 201 })
  } catch (error) {
    console.error('Add partner streamer error:', error)
    return NextResponse.json(
      { error: 'Failed to add partner streamer' },
      { status: 500 }
    )
  }
}


