import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
    const { id } = await params

    const streamer = await prisma.partnerStreamer.update({
      where: { id },
      data: {
        ...(username && { username: username.toLowerCase() }),
        ...(displayName && { displayName }),
        ...(priority !== undefined && { priority }),
        ...(isActive !== undefined && { isActive }),
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

    return NextResponse.json(streamer)
  } catch (error) {
    console.error('Update partner streamer error:', error)
    return NextResponse.json(
      { error: 'Failed to update partner streamer' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params

    await prisma.partnerStreamer.delete({
      where: { id }
    })

    return NextResponse.json({ success: true, message: 'Streamer deleted successfully' })
  } catch (error) {
    console.error('Delete partner streamer error:', error)
    return NextResponse.json(
      { error: 'Failed to delete partner streamer' },
      { status: 500 }
    )
  }
}

