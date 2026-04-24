"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { Price } from "@/components/Price"
import DiscordServerStats from "@/components/DiscordServerStats"

interface Server {
  id: string
  name: string
  description: string | null
  gameType: string
  serverIp: string | null
  playerCount: number | null
  cost: number
  imageUrl: string | null
  region: string | null
  tags: string[]
  owner: {
    id: string
    name: string | null
  }
  _count: {
    pledges: number
  }
}

interface Community {
  id: string
  name: string
  description: string | null
  about: string | null
  imageUrl: string | null
  bannerUrl: string | null
  heroBannerUrl: string | null
  discordUrl: string | null
  websiteUrl: string | null
  twitterUrl: string | null
  youtubeUrl: string | null
  gameTypes: string[]
  region: string | null
  tags: string[]
  memberCount: number
  owner: {
    id: string
    name: string | null
    image: string | null
  }
  servers: Server[]
}

export default function CommunityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [community, setCommunity] = useState<Community | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchCommunity()
    }
  }, [params.id])

  const fetchCommunity = async () => {
    try {
      const response = await fetch(`/api/communities/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setCommunity(data)
      } else if (response.status === 404) {
        router.push("/communities")
      }
    } catch (error) {
      console.error("Failed to fetch community:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Community not found</p>
          <Link href="/communities" className="text-indigo-600 hover:text-indigo-700">
            ← Back to Communities
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = session?.user?.id === community.owner.id

  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <div className={`relative h-80 overflow-hidden ${community.heroBannerUrl ? '' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
        {community.heroBannerUrl && (
          <>
            {/* Blurred background image */}
            <Image
              src={community.heroBannerUrl}
              alt={community.name}
              fill
              className="object-cover blur-sm scale-110"
            />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <Link
              href="/communities"
              className="inline-flex items-center text-white hover:text-gray-200 mb-3 drop-shadow-lg"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Communities
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {community.name}
            </h1>
            {community.description && (
              <p className="text-lg text-gray-100 mt-2 drop-shadow-lg">{community.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Community Header Card */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-2xl p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Community Image */}
              {community.imageUrl && (
                <div className="flex-shrink-0">
                  <Image
                    src={community.imageUrl}
                    alt={community.name}
                    width={80}
                    height={80}
                    className="rounded-lg border-4 border-white shadow-lg"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-white">{community.name}</h1>
                {community.description && (
                  <p className="text-gray-300 mt-1">{community.description}</p>
                )}
              </div>
            </div>
            {isOwner && (
              <Link
                href={`/dashboard/community/${community.id}/edit`}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Edit
              </Link>
            )}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Community Info */}
            <div className="space-y-6">
              {/* Server Count */}
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
                <span className="text-lg font-semibold">{community.servers.length} {community.servers.length === 1 ? 'Server' : 'Servers'}</span>
              </div>

              {/* Games We Play */}
              {community.gameTypes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Games We Play</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.gameTypes.map((gameType) => (
                      <span
                        key={gameType}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 font-medium rounded-full"
                      >
                        {gameType}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Community Tags */}
              {community.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Community Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Website URL */}
              {community.websiteUrl && (
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Website</h3>
                  <a
                    href={community.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit Website
                  </a>
                </div>
              )}

              {/* Other Social Links */}
              <div className="flex flex-wrap gap-3">
                {community.twitterUrl && (
                  <a
                    href={community.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Twitter
                  </a>
                )}
                {community.youtubeUrl && (
                  <a
                    href={community.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    YouTube
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Discord Server Stats */}
            <div>
              {community.discordUrl ? (
                <DiscordServerStats 
                  discordUrl={community.discordUrl} 
                  communityName={community.name}
                />
              ) : (
                <div className="bg-slate-700/50 border border-slate-600/50 rounded-lg p-6 text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">No Discord Server</h3>
                  <p className="text-gray-400 text-sm">This community has not set up a Discord server yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        {community.about && (
          <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {community.about}
            </div>
          </div>
        )}

        {/* Community Servers */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Servers</h2>

          {community.servers.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              <p className="text-gray-500 text-lg mb-2">No servers yet</p>
              <p className="text-gray-400 text-sm">
                {isOwner ? "Link your servers to this community from the server edit page" : "Check back later for community servers"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {community.servers.map((server) => (
                <Link
                  key={server.id}
                  href={`/servers/${server.id}`}
                  className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{server.name}</h3>
                      <p className="text-sm text-indigo-600 font-medium">{server.gameType}</p>
                    </div>
                    {server.imageUrl && (
                      <div className="w-15 h-15 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={server.imageUrl}
                          alt={server.name}
                          width={60}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {server.description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{server.description}</p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {server._count.pledges} {server._count.pledges === 1 ? 'pledger' : 'pledgers'}
                    </div>
                    <div className="text-gray-500">
                      <Price amountUSD={server.cost} />/mo
                    </div>
                  </div>

                  {server.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {server.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/communities"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Communities
          </Link>
        </div>
      </div>
    </div>
  )
}

