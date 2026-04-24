'use client'

import { useState, useEffect } from 'react'
import { Users, Eye, ExternalLink, Play } from 'lucide-react'
import Image from 'next/image'

interface StreamData {
  isLive: boolean
  streamer?: {
    id: string
    username: string
    displayName: string
    priority: number
    isActive: boolean
  }
  stream?: {
    id: string
    title: string
    gameName: string
    viewerCount: number
    startedAt: string
    thumbnailUrl: string
    language: string
  }
  user?: {
    id: string
    login: string
    displayName: string
    profileImageUrl: string
  }
}

export default function LiveStreamerEmbed() {
  const [liveData, setLiveData] = useState<StreamData | null>(null)
  const [loading, setLoading] = useState(true)

  const checkLiveStreamer = async () => {
    try {
      console.log('Checking for live streamers...')
      const response = await fetch('/api/twitch/live-streamer', {
        cache: 'no-store'
      })
      const data = await response.json()
      console.log('Live streamer response:', data)
      if (response.ok) {
        setLiveData(data)
        if (data.isLive) {
          console.log('Streamer is live!', data.streamer?.displayName)
        } else {
          console.log('No live streamers:', data.message)
        }
      } else {
        console.error('API error:', response.status, data)
      }
    } catch (err) {
      console.error('Live streamer check error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkLiveStreamer()
    const interval = setInterval(checkLiveStreamer, 120000) // 2 minutes
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="animate-pulse h-32 bg-slate-800/50 rounded-xl border border-slate-700/50"></div>
    )
  }

  if (!liveData?.isLive || !liveData.stream || !liveData.user) {
    return null // Hide if no one is live
  }

  const { stream, user } = liveData

  // Calculate stream duration
  const getStreamDuration = () => {
    const start = new Date(stream.startedAt)
    const now = new Date()
    const diff = now.getTime() - start.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  return (
    <div className="relative">
      {/* Partner Badge */}
      <div className="absolute -top-3 left-4 z-10">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center space-x-1">
          <Play className="w-3 h-3" />
          <span>Partner</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm rounded-xl border-2 border-purple-500/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-4 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={user.profileImageUrl}
                alt={user.displayName}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full border-2 border-purple-400 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{user.displayName}</h3>
              <p className="text-purple-300 text-sm flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span>LIVE</span>
                </span>
                <span className="text-gray-400">•</span>
                <span>{getStreamDuration()}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-red-400 bg-red-950/30 px-3 py-1 rounded-full">
                <Eye className="w-4 h-4" />
                <span className="font-semibold">
                  {stream.viewerCount >= 1000 
                    ? `${(stream.viewerCount / 1000).toFixed(1)}K` 
                    : stream.viewerCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Content */}
        <div className="p-4">
          <h4 className="text-white font-semibold mb-2 line-clamp-2">{stream.title}</h4>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30">
              {stream.gameName}
            </span>
          </div>

          {/* Twitch Embed */}
          <div className="relative aspect-video bg-slate-700 rounded-lg overflow-hidden shadow-inner">
            <iframe
              src={`https://player.twitch.tv/?channel=${user.login}&parent=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&autoplay=true&muted=true`}
              height="100%"
              width="100%"
              allowFullScreen
              allow="autoplay; fullscreen"
              className="w-full h-full"
            />
          </div>

          {/* Watch on Twitch Button */}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={`https://www.twitch.tv/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Watch on Twitch</span>
            </a>
            <div className="text-xs text-gray-400">
              Updates every 2 minutes
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

