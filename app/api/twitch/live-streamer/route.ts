import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log('Fetching active partner streamers...')
    
    // Get all active partner streamers ordered by priority
    const streamers = await prisma.partnerStreamer.findMany({
      where: { isActive: true },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'asc' }
      ]
    })

    console.log(`Found ${streamers.length} active streamers:`, streamers.map(s => s.username))

    if (streamers.length === 0) {
      console.log('No partner streamers configured')
      return NextResponse.json({ isLive: false, message: 'No partner streamers configured' })
    }

    // Check each streamer to see who's live (in priority order)
    for (const streamer of streamers) {
      try {
        console.log(`Checking if ${streamer.username} is live...`)
        const url = `${process.env.NEXTAUTH_URL}/api/twitch/stream-status?username=${streamer.username}`
        console.log('Calling:', url)
        
        const response = await fetch(url, {
          cache: 'no-store'
        })
        const data = await response.json()
        
        console.log(`Response for ${streamer.username}:`, data)

        if (response.ok && data.isLive) {
          console.log(`✓ ${streamer.username} is LIVE!`)
          return NextResponse.json({
            isLive: true,
            streamer: streamer,
            stream: data.stream,
            user: data.user
          })
        } else {
          console.log(`✗ ${streamer.username} is not live`)
        }
      } catch (error) {
        console.error(`Error checking streamer ${streamer.username}:`, error)
        // Continue to next streamer
      }
    }

    // No streamers are live
    console.log('No streamers are currently live')
    return NextResponse.json({ 
      isLive: false, 
      message: 'No partner streamers are currently live',
      totalStreamers: streamers.length
    })

  } catch (error) {
    console.error('Error checking live streamers:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

