"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface DiscordServerStatsProps {
  discordUrl: string
  communityName: string
}

interface DiscordWidgetData {
  id: string
  name: string
  instant_invite: string | null
  members: {
    id: string
    username: string
    discriminator: string
    avatar: string | null
    status: string
    avatar_url?: string
  }[]
  presence_count: number // Online members
  approximate_member_count?: number
  channels?: {
    id: string
    name: string
    position: number
  }[]
}

export default function DiscordServerStats({ discordUrl, communityName }: DiscordServerStatsProps) {
  const [widgetData, setWidgetData] = useState<DiscordWidgetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiscordWidget = async () => {
      setLoading(true)
      setError(null)
      try {
        // Extract invite code from URL
        const inviteMatch = discordUrl.match(/(discord\.gg|discord\.com\/invite)\/([a-zA-Z0-9-]+)/)
        if (!inviteMatch || !inviteMatch[2]) {
          throw new Error("Invalid Discord invite URL")
        }
        const inviteCode = inviteMatch[2]

        // First, get the invite data to get the guild ID
        const inviteResponse = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true&with_expiration=true`)
        const inviteData = await inviteResponse.json()

        if (!inviteResponse.ok || inviteData.message === "Unknown Invite") {
          throw new Error(inviteData.message || "Failed to fetch Discord invite data. Invalid invite.")
        }

        const guildId = inviteData.guild.id

        // Now try to get the widget data
        try {
          const widgetResponse = await fetch(`https://discord.com/api/guilds/${guildId}/widget.json`)
          const widgetData = await widgetResponse.json()

          if (widgetResponse.ok && widgetData.id) {
            // Widget is enabled, use rich data
            setWidgetData({
              id: widgetData.id,
              name: widgetData.name,
              instant_invite: widgetData.instant_invite || discordUrl,
              members: widgetData.members || [],
              presence_count: widgetData.presence_count || 0,
              approximate_member_count: inviteData.approximate_member_count || 0,
              channels: widgetData.channels || [],
            })
          } else {
            // Widget disabled, use basic data
            setWidgetData({
              id: inviteData.guild.id,
              name: inviteData.guild.name,
              instant_invite: discordUrl,
              members: [],
              presence_count: inviteData.approximate_presence_count || 0,
              approximate_member_count: inviteData.approximate_member_count || 0,
              channels: [],
            })
          }
        } catch (widgetError) {
          // Widget not available, use basic invite data
          setWidgetData({
            id: inviteData.guild.id,
            name: inviteData.guild.name,
            instant_invite: discordUrl,
            members: [],
            presence_count: inviteData.approximate_presence_count || 0,
            approximate_member_count: inviteData.approximate_member_count || 0,
            channels: [],
          })
        }

      } catch (err: any) {
        console.error("Error fetching Discord widget:", err)
        setError(err.message || "Could not load Discord server stats. Ensure invite is valid.")
      } finally {
        setLoading(false)
      }
    }

    fetchDiscordWidget()
    const interval = setInterval(fetchDiscordWidget, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [discordUrl])

  if (loading) {
    return (
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
        <p className="text-gray-400">Loading Discord stats...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">{communityName}</h3>
          </div>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Join Server
          </a>
        </div>
        <div className="text-red-400 text-sm">
          <p className="font-semibold mb-2">Discord Stats Error:</p>
          <p>{error}</p>
          <p className="mt-2">Please ensure the Discord invite is valid and the server widget is enabled.</p>
        </div>
      </div>
    )
  }

  if (!widgetData || !widgetData.instant_invite) {
    return null // Hide section if no valid invite or widget data
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700/50 rounded-lg shadow-lg overflow-hidden">
      {/* Discord-style header */}
      <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
              {widgetData.id ? (
                <Image
                  src={`https://cdn.discordapp.com/icons/${widgetData.id}/a_${widgetData.id}.png?size=64`}
                  alt={widgetData.name || communityName}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to Discord icon if server icon fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                      `;
                    }
                  }}
                />
              ) : (
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{widgetData.name || communityName}</h3>
              <p className="text-gray-400 text-xs">
                {widgetData.presence_count} online • {widgetData.approximate_member_count || 0} members
              </p>
            </div>
          </div>
          <a
            href={widgetData.instant_invite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>Join</span>
          </a>
        </div>
      </div>

      {/* Channels section */}
      {widgetData.channels && widgetData.channels.length > 0 && (
        <div className="px-4 py-2 border-b border-slate-600/30">
          <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-2">Channels</h4>
          <div className="space-y-1">
            {widgetData.channels.slice(0, 5).map((channel) => (
              <div key={channel.id} className="flex items-center text-gray-300 text-sm hover:text-white transition-colors">
                <span className="text-gray-500 mr-2">#</span>
                <span>{channel.name}</span>
              </div>
            ))}
            {widgetData.channels.length > 5 && (
              <div className="text-gray-500 text-sm">
                +{widgetData.channels.length - 5} more channels
              </div>
            )}
          </div>
        </div>
      )}

      {/* Members section */}
      <div className="px-4 py-3">
        <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Members</h4>
        {widgetData.members && widgetData.members.length > 0 ? (
          <div className="space-y-2">
            {widgetData.members.slice(0, 8).map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <div className="relative">
                  {member.avatar ? (
                    <Image
                      src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=32`}
                      alt={member.username}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {member.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Online status indicator */}
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-800 ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'idle' ? 'bg-yellow-500' :
                    member.status === 'dnd' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}></div>
                </div>
                <span className="text-gray-300 text-sm truncate">
                  {member.username}
                  {member.discriminator && member.discriminator !== '0' && (
                    <span className="text-gray-500">#{member.discriminator}</span>
                  )}
                </span>
              </div>
            ))}
            {widgetData.members.length > 8 && (
              <div className="text-gray-500 text-sm">
                +{widgetData.members.length - 8} more members
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">
            <p className="mb-2">Member list not available (server widget may be disabled)</p>
            <a
              href="/help/enablediscordwidget"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors text-xs"
            >
              Learn how to enable widget here
              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}