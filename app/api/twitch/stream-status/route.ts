import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username')

    console.log('Checking stream status for:', username)

    if (!username) {
      return NextResponse.json(
        { message: 'Username is required' },
        { status: 400 }
      )
    }

    // Check if Twitch credentials are set
    if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
      console.error('Twitch credentials not configured!')
      return NextResponse.json(
        { message: 'Twitch API not configured' },
        { status: 500 }
      )
    }

    console.log('Getting Twitch access token...')

    // Step 1: Get Twitch access token (using client credentials flow)
    const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID || '',
        client_secret: process.env.TWITCH_CLIENT_SECRET || '',
        grant_type: 'client_credentials',
      }),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json()
      console.error('Failed to get Twitch access token:', errorData)
      return NextResponse.json(
        { message: 'Failed to authenticate with Twitch' },
        { status: 500 }
      )
    }

    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    console.log('Got Twitch access token')

    // Step 2: Get user ID from username
    console.log('Looking up Twitch user:', username)
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID || '',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!userResponse.ok) {
      console.error('Failed to get Twitch user data')
      return NextResponse.json(
        { message: 'Failed to get user data from Twitch' },
        { status: 500 }
      )
    }

    const userData = await userResponse.json()
    console.log('User data response:', userData)
    
    if (!userData.data || userData.data.length === 0) {
      console.log('Twitch user not found:', username)
      return NextResponse.json({
        isLive: false,
        message: 'User not found'
      })
    }

    const userId = userData.data[0].id
    const userInfo = userData.data[0]
    console.log('Found Twitch user:', userInfo.display_name, 'ID:', userId)

    // Step 3: Check if user is currently streaming
    console.log('Checking stream status...')
    const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID || '',
        'Authorization': `Bearer ${accessToken}`,
      },
    })

    if (!streamResponse.ok) {
      console.error('Failed to get Twitch stream data')
      return NextResponse.json(
        { message: 'Failed to get stream data from Twitch' },
        { status: 500 }
      )
    }

    const streamData = await streamResponse.json()
    const isLive = streamData.data && streamData.data.length > 0

    // Return stream data if live
    if (isLive) {
      const stream = streamData.data[0]
      return NextResponse.json({
        isLive: true,
        stream: {
          id: stream.id,
          title: stream.title,
          gameName: stream.game_name,
          viewerCount: stream.viewer_count,
          startedAt: stream.started_at,
          thumbnailUrl: stream.thumbnail_url,
          language: stream.language,
        },
        user: {
          id: userInfo.id,
          login: userInfo.login,
          displayName: userInfo.display_name,
          profileImageUrl: userInfo.profile_image_url,
        }
      })
    } else {
      return NextResponse.json({
        isLive: false,
        user: {
          id: userInfo.id,
          login: userInfo.login,
          displayName: userInfo.display_name,
          profileImageUrl: userInfo.profile_image_url,
        }
      })
    }

  } catch (error) {
    console.error('Twitch API error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

